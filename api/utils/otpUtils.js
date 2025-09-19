// OTP utility functions

/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit OTP
 */
const generateOTP = () => {
  // Generate a random number between 100000 and 999999
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

/**
 * Check if OTP is valid (basic format validation)
 * @param {string} otp - The OTP to validate
 * @returns {boolean} True if OTP is valid format
 */
const isOTPValid = (otp) => {
  // Check if OTP is a string of exactly 6 digits
  if (!otp || typeof otp !== "string") {
    return false;
  }

  // Check if it's exactly 6 digits
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

/**
 * Check if OTP has expired
 * @param {Date} expiryTime - The expiry time of the OTP
 * @returns {boolean} True if OTP has expired
 */
const isOTPExpired = (expiryTime) => {
  if (!expiryTime || !(expiryTime instanceof Date)) {
    return true;
  }

  return new Date() > expiryTime;
};

/**
 * Get remaining time until OTP expires (in seconds)
 * @param {Date} expiryTime - The expiry time of the OTP
 * @returns {number} Remaining time in seconds (0 if expired)
 */
const getOTPRemainingTime = (expiryTime) => {
  if (!expiryTime || !(expiryTime instanceof Date)) {
    return 0;
  }

  const now = new Date();
  const remaining = Math.max(
    0,
    Math.floor((expiryTime.getTime() - now.getTime()) / 1000)
  );
  return remaining;
};

/**
 * Generate OTP expiry time
 * @param {number} minutes - Number of minutes from now (default: 5)
 * @returns {Date} Expiry time
 */
const generateOTPExpiry = (minutes = 5) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

/**
 * Validate OTP attempt count
 * @param {number} attempts - Current attempt count
 * @param {number} maxAttempts - Maximum allowed attempts (default: 3)
 * @returns {boolean} True if more attempts are allowed
 */
const canAttemptOTP = (attempts, maxAttempts = 3) => {
  return attempts < maxAttempts;
};

/**
 * Generate a secure random OTP using crypto (more secure alternative)
 * @returns {string} 6-digit OTP
 */
const generateSecureOTP = () => {
  const crypto = require("crypto");

  // Generate random bytes and convert to number
  const randomBytes = crypto.randomBytes(4);
  const randomNumber = randomBytes.readUInt32BE(0);

  // Ensure it's a 6-digit number
  const otp = (randomNumber % 900000) + 100000;
  return otp.toString();
};

/**
 * Hash OTP for secure storage (optional security enhancement)
 * @param {string} otp - The OTP to hash
 * @param {string} salt - Salt for hashing (optional)
 * @returns {string} Hashed OTP
 */
const hashOTP = (otp, salt = "") => {
  const crypto = require("crypto");
  return crypto
    .createHash("sha256")
    .update(otp + salt)
    .digest("hex");
};

/**
 * Verify hashed OTP
 * @param {string} otp - The OTP to verify
 * @param {string} hashedOTP - The hashed OTP to compare against
 * @param {string} salt - Salt used for hashing (optional)
 * @returns {boolean} True if OTP matches
 */
const verifyHashedOTP = (otp, hashedOTP, salt = "") => {
  const hashedInput = hashOTP(otp, salt);
  return hashedInput === hashedOTP;
};

module.exports = {
  generateOTP,
  generateSecureOTP,
  isOTPValid,
  isOTPExpired,
  getOTPRemainingTime,
  generateOTPExpiry,
  canAttemptOTP,
  hashOTP,
  verifyHashedOTP,
};
