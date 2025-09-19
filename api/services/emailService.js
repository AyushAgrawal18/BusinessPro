const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  // Initialize email transporter
  initializeTransporter() {
    try {
      // Create transporter based on environment
      if (process.env.NODE_ENV === "production") {
        // Production configuration (e.g., using SendGrid, AWS SES, etc.)
        this.transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          secure: true,
          port: 465,
        });
      } else {
        // Development configuration (using Gmail or custom SMTP)
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: process.env.SMTP_PORT || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
      }

      console.log("Email service initialized successfully");
    } catch (error) {
      console.error("Failed to initialize email service:", error);
    }
  }

  // Verify email configuration
  async verifyConnection() {
    try {
      if (!this.transporter) {
        throw new Error("Email transporter not initialized");
      }

      await this.transporter.verify();
      console.log("Email service connection verified");
      return true;
    } catch (error) {
      console.error("Email service verification failed:", error);
      return false;
    }
  }

  // Send OTP email
  async sendOTPEmail(email, otp, firstName = "User") {
    try {
      // Development mode - log OTP instead of sending email
      if (
        process.env.NODE_ENV === "development" &&
        (!process.env.EMAIL_USER ||
          process.env.EMAIL_USER === "test@example.com")
      ) {
        console.log("=".repeat(50));
        console.log("📧 DEVELOPMENT MODE - EMAIL SIMULATION");
        console.log("=".repeat(50));
        console.log(`To: ${email}`);
        console.log(`Subject: Verify Your Email - BusinessPro`);
        console.log(`Hello ${firstName}!`);
        console.log(`Your verification code is: ${otp}`);
        console.log(`This code will expire in 5 minutes.`);
        console.log("=".repeat(50));

        // Return a mock success result
        return { messageId: `dev-${Date.now()}` };
      }

      if (!this.transporter) {
        throw new Error("Email transporter not initialized");
      }

      const mailOptions = {
        from: {
          name: process.env.FROM_NAME || "BusinessPro",
          address: process.env.EMAIL_USER,
        },
        to: email,
        subject: "Verify Your Email - BusinessPro",
        html: this.generateOTPEmailTemplate(otp, firstName),
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("OTP email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Failed to send OTP email:", error);
      throw new Error("Failed to send verification email");
    }
  }

  // Send welcome email
  async sendWelcomeEmail(email, firstName = "User") {
    try {
      // Development mode - log welcome message instead of sending email
      if (
        process.env.NODE_ENV === "development" &&
        (!process.env.EMAIL_USER ||
          process.env.EMAIL_USER === "test@example.com")
      ) {
        console.log("=".repeat(50));
        console.log("🎉 DEVELOPMENT MODE - WELCOME EMAIL SIMULATION");
        console.log("=".repeat(50));
        console.log(`To: ${email}`);
        console.log(`Subject: Welcome to BusinessPro!`);
        console.log(
          `Welcome ${firstName}! Your account has been successfully verified.`
        );
        console.log("=".repeat(50));

        // Return a mock success result
        return { messageId: `dev-welcome-${Date.now()}` };
      }

      if (!this.transporter) {
        throw new Error("Email transporter not initialized");
      }

      const mailOptions = {
        from: {
          name: process.env.FROM_NAME || "BusinessPro",
          address: process.env.EMAIL_USER,
        },
        to: email,
        subject: "Welcome to BusinessPro!",
        html: this.generateWelcomeEmailTemplate(firstName),
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("Welcome email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Failed to send welcome email:", error);
      throw new Error("Failed to send welcome email");
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email, resetToken, firstName = "User") {
    try {
      if (!this.transporter) {
        throw new Error("Email transporter not initialized");
      }

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

      const mailOptions = {
        from: {
          name: process.env.FROM_NAME || "BusinessPro",
          address: process.env.EMAIL_USER,
        },
        to: email,
        subject: "Reset Your Password - BusinessPro",
        html: this.generatePasswordResetEmailTemplate(resetUrl, firstName),
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log("Password reset email sent successfully:", result.messageId);
      return result;
    } catch (error) {
      console.error("Failed to send password reset email:", error);
      throw new Error("Failed to send password reset email");
    }
  }

  // Generate OTP email template
  generateOTPEmailTemplate(otp, firstName) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .otp-box { background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
          .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; margin: 10px 0; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 15px; margin: 20px 0; color: #856404; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>BusinessPro</h1>
          <p>Verify Your Email Address</p>
        </div>
        <div class="content">
          <h2>Hello ${firstName}!</h2>
          <p>Thank you for signing up with BusinessPro. To complete your registration, please verify your email address by entering the verification code below:</p>
          
          <div class="otp-box">
            <p>Your verification code is:</p>
            <div class="otp-code">${otp}</div>
            <p><small>This code will expire in 5 minutes</small></p>
          </div>
          
          <div class="warning">
            <strong>Security Notice:</strong> If you didn't request this verification code, please ignore this email. Do not share this code with anyone.
          </div>
          
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>The BusinessPro Team</p>
        </div>
        <div class="footer">
          <p>© 2024 BusinessPro. All rights reserved.</p>
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </body>
      </html>
    `;
  }

  // Generate welcome email template
  generateWelcomeEmailTemplate(firstName) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to BusinessPro</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Welcome to BusinessPro!</h1>
        </div>
        <div class="content">
          <h2>Hello ${firstName}!</h2>
          <p>Congratulations! Your email has been successfully verified and your BusinessPro account is now active.</p>
          
          <p>You can now access all the features of our platform to help grow your business:</p>
          <ul>
            <li>Advanced analytics and reporting</li>
            <li>Customer relationship management</li>
            <li>Project management tools</li>
            <li>Team collaboration features</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="${process.env.FRONTEND_URL}/signin" class="cta-button">Sign In to Your Account</a>
          </div>
          
          <p>If you have any questions or need help getting started, our support team is here to assist you.</p>
          
          <p>Welcome aboard!<br>The BusinessPro Team</p>
        </div>
        <div class="footer">
          <p>© 2024 BusinessPro. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
  }

  // Generate password reset email template
  generatePasswordResetEmailTemplate(resetUrl, firstName) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 15px; margin: 20px 0; color: #856404; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <h2>Hello ${firstName}!</h2>
          <p>We received a request to reset your password for your BusinessPro account.</p>
          
          <div style="text-align: center;">
            <a href="${resetUrl}" class="cta-button">Reset Your Password</a>
          </div>
          
          <div class="warning">
            <strong>Security Notice:</strong> This link will expire in 1 hour for security reasons. If you didn't request this password reset, please ignore this email.
          </div>
          
          <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
          
          <p>If you continue to have problems, please contact our support team.</p>
          
          <p>Best regards,<br>The BusinessPro Team</p>
        </div>
        <div class="footer">
          <p>© 2024 BusinessPro. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;
  }
}

// Create and export a single instance
const emailService = new EmailService();
module.exports = emailService;
