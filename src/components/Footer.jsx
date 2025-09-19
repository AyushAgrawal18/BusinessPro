import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Integrations', 'API']
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Blog', 'Press']
    },
    {
      title: 'Resources',
      links: ['Documentation', 'Help Center', 'Webinars', 'Case Studies']
    },
    {
      title: 'Support',
      links: ['Contact Us', 'System Status', 'Privacy Policy', 'Terms of Service']
    }
  ];

  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="mb-4 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 bg-clip-text text-transparent font-semibold">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      type="button"
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 bg-transparent p-0 border-none cursor-pointer"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-600 pt-8 text-center text-gray-400">
          © 2024 BusinessPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
