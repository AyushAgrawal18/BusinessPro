import React, { useState } from "react";

const Hero = () => {
  const [formData, setFormData] = useState({
    email: "",
    industry: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = [
    { value: "", label: "Select your industry" },
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "education", label: "Education" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert(
      `Thank you for your interest! We'll send information about our ${formData.industry} solutions to ${formData.email}`
    );
    setFormData({ email: "", industry: "" });
    setIsSubmitting(false);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-16 text-center text-white bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mt-14">
            Find the Best Instantly
          </h1>

          {/* Hero Description */}
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-12 opacity-90 leading-relaxed">
            Discover powerful business solutions that help you grow faster and
            achieve more with our comprehensive platform designed for modern
            enterprises.
          </p>

          {/* Hero Form */}
          <div className="w-full max-w-md mx-auto p-8 bg-white/95 backdrop-blur-sm text-gray-800 rounded-2xl shadow-2xl border border-white/20">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
              Get Started Today
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your business email"
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>

              <div>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white"
                >
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Starting Your Trial...
                  </span>
                ) : (
                  "Start Free Trial"
                )}
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-600">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
