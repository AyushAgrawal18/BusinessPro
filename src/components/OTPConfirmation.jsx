import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authAPI from "../services/authAPI";

const OTPConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute for resend
  const [codeExpiry, setCodeExpiry] = useState(300); // 5 minutes for code expiration
  const [canResend, setCanResend] = useState(false);
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [showResendSuccess, setShowResendSuccess] = useState(false);

  // Refs for OTP inputs
  const inputRefs = useRef([]);

  // Get user data from navigation state (passed from SignUp)
  const userData = location.state?.userData || {
    email: "user@example.com",
    firstName: "User",
  };

  // Timer effects
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft, setCanResend]);

  // Code expiry timer effect
  useEffect(() => {
    if (codeExpiry > 0 && !isCodeExpired) {
      const timer = setTimeout(() => setCodeExpiry(codeExpiry - 1), 1000);
      return () => clearTimeout(timer);
    } else if (codeExpiry === 0) {
      setIsCodeExpired(true);
      setError("Verification code has expired. Please request a new code.");
    }
  }, [codeExpiry, isCodeExpired]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keydown for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (isCodeExpired) {
      setError("Verification code has expired. Please request a new code.");
      return;
    }

    if (otpString.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call OTP verification API
      const response = await authAPI.verifyOTP({
        email: userData.email,
        otp: otpString,
      });

      if (response.success) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          alert(
            `Welcome to BusinessPro, ${userData.firstName}! Your account has been verified successfully.`
          );
          navigate("/"); // Redirect to home or dashboard
        }, 1500);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      setLoading(false);
      setError(error.message || "Invalid verification code. Please try again.");
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (resendCount >= 3) {
      setError(
        "Maximum resend attempts reached. Please try again later or contact support."
      );
      return;
    }

    setResendLoading(true);
    setError("");
    setShowResendSuccess(false);

    try {
      // Call resend OTP API
      const response = await authAPI.resendOTP(userData.email);

      if (response.success) {
        setResendLoading(false);
        setTimeLeft(60); // Reset resend timer to 1 minute
        setCodeExpiry(300); // Reset code expiry to 5 minutes
        setCanResend(false);
        setIsCodeExpired(false);
        setOtp(["", "", "", "", "", ""]);
        setResendCount((prev) => prev + 1);
        setShowResendSuccess(true);
        inputRefs.current[0]?.focus();

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowResendSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      setResendLoading(false);
      setError(
        error.message || "Failed to resend verification code. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-800 p-4 relative overflow-hidden">
      {/* Animated background grid overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle,rgba(255,255,255,0.07) 1px,transparent 1px)",
          backgroundSize: "100px 100px",
          animation: "floatbg 20s linear infinite",
        }}
      />
      {/* Keyframes for floating grid */}
      <style>{`
        @keyframes floatbg {
          0% { transform: translate(0,0) rotate(0deg);}
          100% {transform: translate(-100px,-100px) rotate(360deg);}
        }
      `}</style>

      <div className="relative z-10 w-full max-w-md mt-20">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl relative">
          <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-2xl" />

          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h1 className="text-[1.75rem] font-semibold text-white drop-shadow mb-2">
              Verify Your Email
            </h1>
            <p className="text-white/80 text-sm leading-relaxed">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-white font-medium text-sm mt-1">
              {userData.email}
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            {/* OTP Input Fields */}
            <div>
              <label className="block mb-3 text-white/90 font-medium text-sm text-center">
                Enter Verification Code
              </label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    disabled={isCodeExpired}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-12 h-12 text-center text-xl font-bold bg-white/10 backdrop-blur-lg rounded-lg text-white border transition-all outline-none ${
                      isCodeExpired
                        ? "opacity-50 cursor-not-allowed border-gray-400"
                        : error
                        ? "border-red-400 bg-red-100/10"
                        : digit
                        ? "border-emerald-400 bg-emerald-100/10"
                        : "border-white/20"
                    } focus:border-white/40 focus:bg-white/15 focus:shadow focus:scale-105`}
                  />
                ))}
              </div>
              {error && (
                <div className="mt-3 text-center">
                  <div className="inline-block px-3 py-2 bg-red-100/10 border border-red-200/30 rounded-md text-red-400 text-xs">
                    {error}
                  </div>
                </div>
              )}
            </div>

            {/* Code Expiry Display */}
            <div className="text-center">
              <p
                className={`text-sm font-medium ${
                  codeExpiry <= 60 ? "text-red-400" : "text-white/80"
                }`}
              >
                {isCodeExpired ? (
                  "⚠️ Code has expired"
                ) : (
                  <>⏰ Code expires in {formatTime(codeExpiry)}</>
                )}
              </p>
            </div>

            {/* Timer and Resend */}
            <div className="text-center space-y-2">
              {timeLeft > 0 && !isCodeExpired ? (
                <p className="text-white/70 text-sm">
                  Didn't receive the code?{" "}
                  <span className="text-white/90 font-medium">
                    Resend in {formatTime(timeLeft)}
                  </span>
                </p>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendLoading || resendCount >= 3}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      resendCount >= 3
                        ? "bg-gray-500/20 text-gray-400 cursor-not-allowed"
                        : resendLoading
                        ? "bg-white/10 text-white/70 cursor-not-allowed"
                        : "bg-white/20 text-white/90 hover:bg-white/30 hover:text-white border border-white/30 hover:border-white/50"
                    }`}
                  >
                    {resendLoading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-30"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className="opacity-90"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : resendCount >= 3 ? (
                      "Max attempts reached"
                    ) : (
                      `Resend Code ${
                        resendCount > 0 ? `(${3 - resendCount} left)` : ""
                      }`
                    )}
                  </button>
                  {resendCount > 0 && resendCount < 3 && (
                    <p className="text-white/60 text-xs">
                      {3 - resendCount} resend attempts remaining
                    </p>
                  )}
                </div>
              )}

              {/* Resend Success Message */}
              <div
                className={`transition-all duration-300 ${
                  showResendSuccess
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="inline-block px-3 py-2 bg-emerald-400/20 border border-emerald-400/30 rounded-lg text-emerald-300 text-xs backdrop-blur-sm">
                  ✅ New verification code sent to {userData.email}
                </div>
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.join("").length !== 6 || isCodeExpired}
              className={`relative w-full py-3 font-semibold rounded-lg border text-white/95 bg-white/20 border-white/30 backdrop-blur-xl shadow-md transition-all flex items-center justify-center ${
                loading ? "pointer-events-none text-transparent" : ""
              } ${
                isCodeExpired
                  ? "opacity-30 cursor-not-allowed"
                  : otp.join("").length === 6
                  ? "hover:bg-white/25 hover:-translate-y-0.5 hover:shadow-xl"
                  : "opacity-50 cursor-not-allowed"
              } active:translate-y-0`}
            >
              <span
                className={`transition-opacity ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
              >
                {isCodeExpired
                  ? "Code Expired - Request New Code"
                  : "Verify Account"}
              </span>
              {loading && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-30"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="opacity-90"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                </span>
              )}
            </button>

            {/* Success message */}
            <div
              className={`transition-all text-center mt-2 px-4 py-3 rounded-lg text-base bg-emerald-400/20 text-white font-medium border border-emerald-400/30 backdrop-blur-lg ${
                success
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              aria-live="polite"
            >
              ✅ Email verified successfully! Welcome to BusinessPro!
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-center space-y-2">
              <p className="text-xs text-white/60">
                For demo purposes, use code:{" "}
                <span className="font-mono font-bold text-white/80">
                  123456
                </span>
              </p>
              <p className="text-xs text-white/60">
                Code expires in 5 minutes • Resend available after 1 minute •{" "}
                {3 - resendCount} attempts remaining
              </p>
              <p className="text-xs text-white/60">
                Having trouble?{" "}
                <button
                  type="button"
                  className="text-white/80 hover:text-white underline bg-transparent border-none p-0 cursor-pointer"
                  onClick={() =>
                    alert(
                      "Contact support at support@businesspro.com\n\nCommon issues:\n• Check spam/junk folder\n• Ensure email address is correct\n• Try requesting a new code"
                    )
                  }
                >
                  Contact Support
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-white/70 hover:text-white/90 text-sm bg-transparent border-none p-0 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              ← Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPConfirmation;
