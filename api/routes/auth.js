const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Validation rules for signup
const signupValidation = [
  body("firstName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters and spaces"),

  body("lastName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name can only contain letters and spaces"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("company")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be between 2 and 100 characters"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),

  body("agreeToTerms")
    .isBoolean()
    .custom((value) => {
      if (!value) {
        throw new Error("You must agree to the terms and conditions");
      }
      return true;
    }),
];

// Validation rules for signin
const signinValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),
];

// Validation rules for OTP verification
const otpValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("otp")
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage("OTP must be a 6-digit number"),
];

// Validation rules for OTP resend
const otpResendValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),
];

// Authentication routes
router.post("/signup", signupValidation, authController.signup);
router.post("/signin", signinValidation, authController.signin);
router.post("/verify-otp", otpValidation, authController.verifyOTP);
router.post("/resend-otp", otpResendValidation, authController.resendOTP);
router.post(
  "/forgot-password",
  [body("email").isEmail().normalizeEmail()],
  authController.forgotPassword
);
router.post(
  "/reset-password",
  [
    body("token").notEmpty().withMessage("Reset token is required"),
    body("password")
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  ],
  authController.resetPassword
);

// Protected routes
router.get("/me", authMiddleware, authController.getMe);
router.put(
  "/profile",
  authMiddleware,
  [
    body("firstName").optional().trim().isLength({ min: 2, max: 50 }),
    body("lastName").optional().trim().isLength({ min: 2, max: 50 }),
    body("company").optional().trim().isLength({ min: 2, max: 100 }),
  ],
  authController.updateProfile
);

module.exports = router;
