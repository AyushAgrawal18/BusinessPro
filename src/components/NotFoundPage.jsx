import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const popularPages = [
    {
      name: "Home",
      path: "/",
      description: "Return to our homepage",
      icon: "🏠",
    },
    {
      name: "Features",
      path: "/features",
      description: "Explore our platform features",
      icon: "⚡",
    },
    {
      name: "Pricing",
      path: "/pricing",
      description: "View our pricing plans",
      icon: "💰",
    },
    {
      name: "Contact",
      path: "/contact",
      description: "Get in touch with us",
      icon: "📞",
    },
    {
      name: "About",
      path: "/about",
      description: "Learn more about BusinessPro",
      icon: "ℹ️",
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      description: "Access your dashboard",
      icon: "📊",
    },
  ];

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePageClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-4">
            404
          </div>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have wandered off into
            the digital wilderness. Don't worry, we'll help you find your way
            back.
          </p>
          <p className="text-lg text-gray-500">
            The page might have been moved, deleted, or you may have mistyped
            the URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoHome}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🏠 Go to Homepage
            </button>
            <button
              onClick={handleGoBack}
              className="px-8 py-4 border-2 border-indigo-500 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200"
            >
              ← Go Back
            </button>
          </div>
        </div>

        {/* Popular Pages */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Popular Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPages.map((page, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(page.path)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-200 text-left group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {page.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {page.name}
                </h3>
                <p className="text-gray-600 text-sm">{page.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-600 mb-6">
            If you're having trouble finding what you're looking for, our
            support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 transition-colors duration-200"
            >
              💬 Contact Support
            </button>
            <button
              onClick={() => navigate("/features")}
              className="px-6 py-3 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transition-colors duration-200"
            >
              📚 Browse Documentation
            </button>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Did you know?
            </h3>
            <p className="text-gray-700">
              The HTTP 404 error code was named after room 404 at CERN, where
              the World Wide Web was created. While you're here, why not explore
              our amazing features? 🚀
            </p>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Tip: Use the navigation menu at the top to explore all our pages, or
            try the search feature to find specific content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
