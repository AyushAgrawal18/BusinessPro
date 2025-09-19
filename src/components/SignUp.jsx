import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authAPI from "../services/authAPI";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return !value.trim() ? "First name is required" : "";
      case "lastName":
        return !value.trim() ? "Last name is required" : "";
      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? "Please enter a valid email address"
          : "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return "Password must contain uppercase, lowercase, and number";
        }
        return "";
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        return value !== formData.password ? "Passwords do not match" : "";
      case "company":
        return !value.trim() ? "Company name is required" : "";
      case "agreeToTerms":
        return !value ? "You must agree to the terms and conditions" : "";
      default:
        return "";
    }
  };

  // Validate single field
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(
      name,
      name === "agreeToTerms" ? formData.agreeToTerms : value
    );
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setApiError("");

      try {
        // Call signup API
        const response = await authAPI.signup({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          agreeToTerms: formData.agreeToTerms,
        });

        if (response.success) {
          setSuccess(true);
          setTimeout(() => {
            // Navigate to OTP confirmation with user data
            navigate("/otp-confirmation", {
              state: {
                userData: {
                  email: formData.email,
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  company: formData.company,
                },
              },
            });
          }, 1500);
        }
      } catch (error) {
        console.error("Signup error:", error);
        setApiError(error.message || "Signup failed. Please try again.");
        setLoading(false);
      }
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

      <div className="relative z-10 w-full max-w-lg mt-20">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl relative">
          <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-2xl" />

          <div className="mb-7 text-center">
            <h1 className="text-[1.75rem] font-semibold text-white drop-shadow">
              Create Your Account
            </h1>
            <p className="text-white/80 mt-1 text-sm">
              Join thousands of businesses using BusinessPro
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-white/90 font-medium text-sm"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="John"
                  className={`w-full py-3 px-4 bg-white/10 backdrop-blur-lg rounded-lg text-base text-white/95 border transition-all outline-none ${
                    errors.firstName
                      ? "border-red-400 bg-red-100/10"
                      : formData.firstName && !errors.firstName
                      ? "border-emerald-400 bg-emerald-100/10"
                      : "border-white/20"
                  } placeholder-white/60 focus:border-white/40 focus:bg-white/15 focus:shadow`}
                />
                {errors.firstName && (
                  <div className="mt-1 text-xs text-red-400">
                    {errors.firstName}
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-white/90 font-medium text-sm"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Doe"
                  className={`w-full py-3 px-4 bg-white/10 backdrop-blur-lg rounded-lg text-base text-white/95 border transition-all outline-none ${
                    errors.lastName
                      ? "border-red-400 bg-red-100/10"
                      : formData.lastName && !errors.lastName
                      ? "border-emerald-400 bg-emerald-100/10"
                      : "border-white/20"
                  } placeholder-white/60 focus:border-white/40 focus:bg-white/15 focus:shadow`}
                />
                {errors.lastName && (
                  <div className="mt-1 text-xs text-red-400">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-white/90 font-medium text-sm"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="john.doe@company.com"
                className={`w-full py-3 px-4 bg-white/10 backdrop-blur-lg rounded-lg text-base text-white/95 border transition-all outline-none ${
                  errors.email
                    ? "border-red-400 bg-red-100/10"
                    : formData.email && !errors.email
                    ? "border-emerald-400 bg-emerald-100/10"
                    : "border-white/20"
                } placeholder-white/60 focus:border-white/40 focus:bg-white/15 focus:shadow`}
              />
              {errors.email && (
                <div className="mt-1 text-xs text-red-400">{errors.email}</div>
              )}
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-white/90 font-medium text-sm"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Your Company Inc."
                className={`w-full py-3 px-4 bg-white/10 backdrop-blur-lg rounded-lg text-base text-white/95 border transition-all outline-none ${
                  errors.company
                    ? "border-red-400 bg-red-100/10"
                    : formData.company && !errors.company
                    ? "border-emerald-400 bg-emerald-100/10"
                    : "border-white/20"
                } placeholder-white/60 focus:border-white/40 focus:bg-white/15 focus:shadow`}
              />
              {errors.company && (
                <div className="mt-1 text-xs text-red-400">
                  {errors.company}
                </div>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-white/90 font-medium text-sm"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Create a strong password"
                  className={`w-full py-3 px-4 bg-white/10 backdrop-blur-lg rounded-lg text-base text-white/95 border transition-all outline-none ${
                    errors.password
                      ? "border-red-400 bg-red-100/10"
                      : formData.password && !errors.password
                      ? "border-emerald-400 bg-emerald-100/10"
                      : "border-white/20"
                  } placeholder-white/60 focus:border-white/40 focus:bg-white/15 focus:shadow`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white/90 bg-white/5 hover:bg-white/10 p-1.5 rounded transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="text-lg">{showPassword ? "🙈" : "👁️"}</span>
                </button>
              </div>
              {errors.password && (
                <div className="mt-1 text-xs text-red-400">
                  {errors.password}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-white/90 font-medium text-sm"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  className={`w-full py-3 px-4 bg-white/10 backdrop-blur-lg rounded-lg text-base text-white/95 border transition-all outline-none ${
                    errors.confirmPassword
                      ? "border-red-400 bg-red-100/10"
                      : formData.confirmPassword && !errors.confirmPassword
                      ? "border-emerald-400 bg-emerald-100/10"
                      : "border-white/20"
                  } placeholder-white/60 focus:border-white/40 focus:bg-white/15 focus:shadow`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white/90 bg-white/5 hover:bg-white/10 p-1.5 rounded transition"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  <span className="text-lg">
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </span>
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="mt-1 text-xs text-red-400">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start text-white/80 text-sm gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="accent-white w-4 h-4 mt-0.5"
                />
                <span>
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-white/90 hover:text-white underline bg-transparent border-none p-0 cursor-pointer"
                    onClick={() =>
                      alert("Terms and conditions would open here")
                    }
                  >
                    Terms and Conditions
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    className="text-white/90 hover:text-white underline bg-transparent border-none p-0 cursor-pointer"
                    onClick={() => alert("Privacy policy would open here")}
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.agreeToTerms && (
                <div className="mt-1 text-xs text-red-400">
                  {errors.agreeToTerms}
                </div>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className={`relative w-full py-3 font-semibold rounded-lg border text-white/95 bg-white/20 border-white/30 backdrop-blur-xl shadow-md transition-all flex items-center justify-center ${
                loading ? "pointer-events-none text-transparent" : ""
              } hover:bg-white/25 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0`}
              disabled={loading}
            >
              <span
                className={`transition-opacity ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
              >
                Create Account
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

            {/* API Error message */}
            {apiError && (
              <div className="mt-3 px-4 py-3 rounded-lg text-sm bg-red-400/20 text-red-200 border border-red-400/30 backdrop-blur-lg">
                {apiError}
              </div>
            )}

            {/* Success message */}
            <div
              className={`transition-all text-center mt-2 px-4 py-3 rounded-lg text-base bg-emerald-400/20 text-white font-medium border border-emerald-400/30 backdrop-blur-lg ${
                success
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              aria-live="polite"
            >
              ✅ Account created! Sending verification email...
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-white/10">
            <p className="text-sm text-white/70">
              Already have an account?{" "}
              <button
                type="button"
                className="text-white/90 font-semibold hover:text-white underline ml-1 bg-transparent border-none p-0 cursor-pointer"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
