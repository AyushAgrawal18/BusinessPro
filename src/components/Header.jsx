import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMobileMenu } from "../hooks/useMobileMenu";

const Header = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { href: "#home", label: "Home", route: "/" },
    { href: "/features", label: "Features", route: "/features" },
    { href: "/pricing", label: "Pricing", route: "/pricing" },
    { href: "/about", label: "About", route: "/about" },
    { href: "/contact", label: "Contact", route: "/contact" },
  ];

  const handleNavClick = (e, href, route) => {
    e.preventDefault();

    // For hash-based navigation within the home page
    if (href.startsWith("#")) {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // We're already on the right page, just scroll
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      // For regular page navigation
      navigate(route);
    }
    closeMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg -my-2">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 relative">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-2xl font-bold bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200"
          >
            BusinessPro
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex list-none gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.route)}
                  className="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Navigation Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="hidden sm:inline-block px-6 py-3 border-2 border-indigo-500 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 hover:transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="hidden sm:inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Sign In
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-2xl text-blue-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              ☰
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-lg md:hidden border-t">
              <ul className="py-4 px-4 space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.route)}
                      className="block py-3 px-4 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t border-gray-100 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/signup");
                      closeMenu();
                    }}
                    className="block w-full py-3 px-4 text-center border-2 border-indigo-500 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200"
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/signin");
                      closeMenu();
                    }}
                    className="block w-full py-3 px-4 text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg"
                  >
                    Sign In
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
