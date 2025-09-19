const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const emailService = require("../services/emailService");
const { generateOTP } = require("../utils/otpUtils");

// Temporary in-memory storage for users and OTPs (replace with database in production)
const users = new Map();
const otpStorage = new Map();
const userAttempts = new Map();

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Helper function to get user by email
const getUserByEmail = (email) => {
  for (const [id, user] of users.entries()) {
    if (user.email === email) {
      return { id, ...user };
    }
  }
  return null;
};

// Helper function to check rate limiting
const checkRateLimit = (
  identifier,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000
) => {
  const now = Date.now();
  const attempts = userAttempts.get(identifier) || [];

  // Remove old attempts outside the window
  const recentAttempts = attempts.filter((time) => now - time < windowMs);

  if (recentAttempts.length >= maxAttempts) {
    return false;
  }

  recentAttempts.push(now);
  userAttempts.set(identifier, recentAttempts);
  return true;
};

// Signup controller
const signup = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, company, password, agreeToTerms } =
      req.body;

    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Check rate limiting for signup attempts
    if (!checkRateLimit(`signup_${email}`, 3, 60 * 60 * 1000)) {
      // 3 attempts per hour
      return res.status(429).json({
        success: false,
        message: "Too many signup attempts. Please try again later.",
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Create user (without saving to database yet)
    const userId = Date.now().toString(); // Simple ID generation
    const newUser = {
      firstName,
      lastName,
      email,
      company,
      password: hashedPassword,
      agreeToTerms,
      isVerified: false,
      createdAt: new Date(),
    };

    // Store user and OTP temporarily
    users.set(userId, newUser);
    otpStorage.set(email, {
      otp,
      expiry: otpExpiry,
      attempts: 0,
      lastSent: new Date(),
    });

    // Send OTP email
    try {
      await emailService.sendOTPEmail(email, otp, firstName);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Remove user and OTP if email fails
      users.delete(userId);
      otpStorage.delete(email);

      return res.status(500).json({
        success: false,
        message: "Failed to send verification email. Please try again.",
      });
    }

    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please check your email for the verification code.",
      data: {
        email,
        otpSent: true,
        expiresIn: 5 * 60, // 5 minutes in seconds
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Signin controller
const signin = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Check rate limiting for signin attempts
    if (!checkRateLimit(`signin_${email}`, 5, 15 * 60 * 1000)) {
      // 5 attempts per 15 minutes
      return res.status(429).json({
        success: false,
        message: "Too many signin attempts. Please try again later.",
      });
    }

    // Find user
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email before signing in",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Remove sensitive data from user object
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: "Signin successful",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Verify OTP controller
const verifyOTP = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { email, otp } = req.body;

    // Check rate limiting for OTP verification attempts
    if (!checkRateLimit(`verify_${email}`, 5, 15 * 60 * 1000)) {
      // 5 attempts per 15 minutes
      return res.status(429).json({
        success: false,
        message: "Too many verification attempts. Please try again later.",
      });
    }

    // Get stored OTP
    const storedOTPData = otpStorage.get(email);
    if (!storedOTPData) {
      return res.status(400).json({
        success: false,
        message: "No OTP found for this email. Please request a new one.",
      });
    }

    // Check OTP attempts
    if (storedOTPData.attempts >= 3) {
      otpStorage.delete(email);
      return res.status(400).json({
        success: false,
        message: "Maximum OTP attempts exceeded. Please request a new OTP.",
      });
    }

    // Check if OTP is expired
    if (new Date() > storedOTPData.expiry) {
      otpStorage.delete(email);
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Verify OTP
    if (storedOTPData.otp !== otp) {
      storedOTPData.attempts += 1;
      otpStorage.set(email, storedOTPData);

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${
          3 - storedOTPData.attempts
        } attempts remaining.`,
      });
    }

    // Find and verify user
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verifiedAt = new Date();
    users.set(user.id, user);

    // Clean up OTP
    otpStorage.delete(email);

    // Generate JWT token
    const token = generateToken(user.id);

    // Remove sensitive data from user object
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: "Email verified successfully",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Resend OTP controller
const resendOTP = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { email } = req.body;

    // Check rate limiting for OTP resend attempts
    if (!checkRateLimit(`resend_${email}`, 3, 60 * 60 * 1000)) {
      // 3 attempts per hour
      return res.status(429).json({
        success: false,
        message: "Too many resend attempts. Please try again later.",
      });
    }

    // Check if user exists
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
    }

    // Check if enough time has passed since last OTP (1 minute cooldown)
    const existingOTP = otpStorage.get(email);
    if (existingOTP && existingOTP.lastSent) {
      const timeSinceLastSent = Date.now() - existingOTP.lastSent.getTime();
      const cooldownMs = 60 * 1000; // 1 minute

      if (timeSinceLastSent < cooldownMs) {
        const remainingTime = Math.ceil(
          (cooldownMs - timeSinceLastSent) / 1000
        );
        return res.status(429).json({
          success: false,
          message: `Please wait ${remainingTime} seconds before requesting a new OTP`,
        });
      }
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store new OTP
    otpStorage.set(email, {
      otp,
      expiry: otpExpiry,
      attempts: 0,
      lastSent: new Date(),
    });

    // Send OTP email
    try {
      await emailService.sendOTPEmail(email, otp, user.firstName);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      otpStorage.delete(email);

      return res.status(500).json({
        success: false,
        message: "Failed to send verification email. Please try again.",
      });
    }

    res.json({
      success: true,
      message: "New verification code sent to your email",
      data: {
        email,
        otpSent: true,
        expiresIn: 5 * 60, // 5 minutes in seconds
      },
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get current user controller
const getMe = async (req, res) => {
  try {
    const userId = req.userId; // Set by auth middleware
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove sensitive data
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: { id: userId, ...userWithoutPassword },
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update profile controller
const updateProfile = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const userId = req.userId; // Set by auth middleware
    const user = users.get(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user data
    const { firstName, lastName, company } = req.body;
    const updatedUser = {
      ...user,
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(company && { company }),
      updatedAt: new Date(),
    };

    users.set(userId, updatedUser);

    // Remove sensitive data
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: { id: userId, ...userWithoutPassword },
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Placeholder for forgot password (not implemented)
const forgotPassword = async (req, res) => {
  res.status(501).json({
    success: false,
    message: "Forgot password functionality not implemented yet",
  });
};

// Placeholder for reset password (not implemented)
const resetPassword = async (req, res) => {
  res.status(501).json({
    success: false,
    message: "Reset password functionality not implemented yet",
  });
};

module.exports = {
  signup,
  signin,
  verifyOTP,
  resendOTP,
  getMe,
  updateProfile,
  forgotPassword,
  resetPassword,
};
