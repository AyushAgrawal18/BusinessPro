import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Email validation
  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  // Password validation
  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    if (isEmailValid && isPasswordValid) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          alert(
            "Sign in successful! In a real app, you would be redirected to the dashboard."
          );
          setSuccess(false);
          setEmail("");
          setPassword("");
          setRememberMe(false);
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-800 p-4 relative overflow-hidden ">
      {/* Animated background grid overlay for depth */}
      <div
        className="pointer-events-none absolute inset-0 z-0 "
        style={{
          background:
            "radial-gradient(circle,rgba(255,255,255,0.07) 1px,transparent 1px)",
          backgroundSize: "100px 100px",
          animation: "floatbg 20s linear infinite",
        }}
      />
      {/* Keyframes for floating grid (Tailwind cannot do this directly) */}
      <style>{`
        @keyframes floatbg {
          0% { transform: translate(0,0) rotate(0deg);}
          100% {transform: translate(-100px,-100px) rotate(360deg);}
        }
        .animate-floatbg {
          animation: floatbg 20s linear infinite;
        }
      `}</style>
      <div className="relative z-10 w-full max-w-md mt-20">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl animate-slideUp relative">
          <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-2xl" />
          <div className="mb-7 text-center">
            <h1 className="text-[1.75rem] font-semibold text-white drop-shadow">
              Welcome Back
            </h1>
            <p className="text-white/80 mt-1 text-sm">
              Please sign in to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
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
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                placeholder="Enter your email"
                className={`w-full py-3 px-4 bg-white/10 backdrop-blur-lg rounded-lg text-base text-white/95 border transition-all outline-none ${
                  emailError
                    ? "border-red-400 bg-red-100/10"
                    : email && !emailError
                    ? "border-emerald-400 bg-emerald-100/10"
                    : "border-white/20"
                } placeholder-white/60 focus:border-white/40 focus:bg-white/15 focus:shadow`}
              />
              <div
                className={`mt-1 text-xs rounded-md px-3 py-2 border backdrop-blur-sm transition-all ${
                  emailError
                    ? "opacity-100 translate-y-0 bg-red-100/10 border-red-200 text-red-500"
                    : "opacity-0 -translate-y-2 bg-transparent border-transparent"
                }`}
                aria-live="polite"
              >
                {emailError}
              </div>
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
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                  placeholder="Enter your password"
                  className={`w-full py-3 px-4 bg-white/10 backdrop-blur-lg rounded-lg text-base text-white/95 border transition-all outline-none ${
                    passwordError
                      ? "border-red-400 bg-red-100/10"
                      : password && !passwordError
                      ? "border-emerald-400 bg-emerald-100/10"
                      : "border-white/20"
                  } placeholder-white/60 focus:border-white/40 focus:bg-white/15 focus:shadow`}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white/90 bg-white/5 hover:bg-white/10 p-1.5 rounded transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="text-lg">{showPassword ? "🙈" : "👁️"}</span>
                </button>
              </div>
              <div
                className={`mt-1 text-xs rounded-md px-3 py-2 border backdrop-blur-sm transition-all ${
                  passwordError
                    ? "opacity-100 translate-y-0 bg-red-100/10 border-red-200 text-red-500"
                    : "opacity-0 -translate-y-2 bg-transparent border-transparent"
                }`}
                aria-live="polite"
              >
                {passwordError}
              </div>
            </div>
            {/* Remember me & Forgot password */}
            <div className="flex justify-between items-center mb-1">
              <label className="flex items-center text-white/80 text-sm gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-white w-4 h-4"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-white/80 hover:text-white hover:underline text-sm transition bg-transparent border-none p-0 cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            {/* Sign In Button */}
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
                Sign In
              </span>
              {loading && (
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Simple spinner */}
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
              ✅ Sign in successful! Redirecting...
            </div>
          </form>
          {/* Footer */}
          <div className="text-center mt-6 pt-4 border-t border-white/10">
            <p className="text-sm text-white/70">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-white/90 font-semibold hover:text-white underline ml-1 bg-transparent border-none p-0 cursor-pointer"
                onClick={() => alert('Redirect to sign up page')}
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
