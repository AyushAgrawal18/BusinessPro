import React from "react";

const PrivacyPolicy = () => {
  const lastUpdated = "December 1, 2024";

  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: When you create an account, we collect information such as your name, email address, phone number, and company details.",
        "Usage Data: We automatically collect information about how you use our services, including pages visited, features used, and time spent on our platform.",
        "Device Information: We collect information about the devices you use to access our services, including IP address, browser type, and operating system.",
        "Cookies and Tracking: We use cookies and similar technologies to enhance your experience and analyze usage patterns.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "Provide and improve our services and features",
        "Personalize your experience and deliver relevant content",
        "Communicate with you about updates, security alerts, and support",
        "Process payments and prevent fraudulent activities",
        "Analyze usage patterns to improve our platform",
        "Comply with legal obligations and enforce our terms",
      ],
    },
    {
      title: "Information Sharing and Disclosure",
      content: [
        "Service Providers: We share information with trusted third-party service providers who help us operate our business.",
        "Business Transfers: Information may be transferred in connection with mergers, acquisitions, or asset sales.",
        "Legal Requirements: We may disclose information when required by law or to protect our rights and safety.",
        "Consent: We may share information with your explicit consent for specific purposes.",
      ],
    },
    {
      title: "Data Security",
      content: [
        "We implement industry-standard security measures to protect your information",
        "All data transmission is encrypted using SSL/TLS protocols",
        "We conduct regular security audits and vulnerability assessments",
        "Access to personal information is restricted to authorized personnel only",
        "We maintain data backups and disaster recovery procedures",
      ],
    },
    {
      title: "Your Rights and Choices",
      content: [
        "Access: You can request access to your personal information we hold",
        "Correction: You can update or correct your personal information",
        "Deletion: You can request deletion of your personal information",
        "Portability: You can request a copy of your data in a portable format",
        "Opt-out: You can opt-out of marketing communications at any time",
      ],
    },
    {
      title: "International Data Transfers",
      content: [
        "Your information may be processed and stored in countries other than your own",
        "We ensure adequate protection through appropriate safeguards",
        "We comply with applicable data protection laws for international transfers",
        "You can contact us for more information about international transfers",
      ],
    },
    {
      title: "Children's Privacy",
      content: [
        "Our services are not intended for children under 13 years of age",
        "We do not knowingly collect personal information from children under 13",
        "If we learn we have collected information from a child under 13, we will delete it",
        "Parents or guardians can contact us to review or delete their child's information",
      ],
    },
    {
      title: "Changes to This Policy",
      content: [
        "We may update this privacy policy from time to time",
        "We will notify you of significant changes via email or platform notification",
        "Continued use of our services after changes constitutes acceptance",
        "We encourage you to review this policy periodically",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-50 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-semibold text-indigo-900 mb-4">
              Introduction
            </h2>
            <p className="text-indigo-800 leading-relaxed">
              At BusinessPro, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy describes how we collect, use, disclose, and safeguard your
              information when you use our platform and services. By using our
              services, you agree to the collection and use of information in
              accordance with this policy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-0 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-12 last:border-b-0"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {index + 1}. {section.title}
                </h2>
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us using the information below:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Privacy Officer
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>Email: privacy@businesspro.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Response time: Within 48 hours</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Mailing Address
                </h3>
                <div className="space-y-1 text-gray-600">
                  <p>BusinessPro Inc.</p>
                  <p>Attn: Privacy Department</p>
                  <p>123 Business Plaza, Suite 500</p>
                  <p>San Francisco, CA 94105</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Related Policies and Information
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/terms"
                className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Terms of Service
                </h3>
                <p className="text-gray-600 text-sm">
                  Review our terms and conditions for using BusinessPro
                </p>
              </a>

              <a
                href="/contact"
                className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Contact Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Get help with privacy-related questions
                </p>
              </a>

              <a
                href="/features"
                className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Security Features
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn about our security and privacy features
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
