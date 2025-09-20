import React from "react";

const TermsOfService = () => {
  const lastUpdated = "December 1, 2024";

  const sections = [
    {
      title: "Acceptance of Terms",
      content: [
        "By accessing and using BusinessPro's services, you accept and agree to be bound by these Terms of Service.",
        "If you do not agree to these terms, you may not use our services.",
        "These terms apply to all users, including visitors, registered users, and subscribers.",
        "We reserve the right to modify these terms at any time with notice to users.",
      ],
    },
    {
      title: "Description of Service",
      content: [
        "BusinessPro provides cloud-based business management and analytics tools.",
        "Our platform includes features for project management, team collaboration, and business intelligence.",
        "We offer various subscription plans with different feature sets and usage limits.",
        "Service availability and features may vary by subscription plan and geographic location.",
      ],
    },
    {
      title: "User Accounts and Registration",
      content: [
        "You must create an account to access most features of our service.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must provide accurate and complete information during registration.",
        "You are responsible for all activities that occur under your account.",
        "You must notify us immediately of any unauthorized use of your account.",
      ],
    },
    {
      title: "Acceptable Use Policy",
      content: [
        "You may not use our service for any unlawful or prohibited activities.",
        "You may not interfere with or disrupt the service or servers.",
        "You may not attempt to gain unauthorized access to our systems.",
        "You may not use our service to transmit spam, malware, or harmful content.",
        "You may not violate any applicable laws or regulations while using our service.",
      ],
    },
    {
      title: "Subscription Plans and Billing",
      content: [
        "Subscription fees are billed in advance on a monthly or annual basis.",
        "All fees are non-refundable except as required by law.",
        "We may change subscription pricing with 30 days notice to subscribers.",
        "Failed payments may result in suspension or termination of your account.",
        "You can cancel your subscription at any time through your account settings.",
      ],
    },
    {
      title: "Intellectual Property Rights",
      content: [
        "BusinessPro retains all rights to our software, platform, and related materials.",
        "You retain ownership of your data and content uploaded to our platform.",
        "You grant us a license to use your data solely to provide our services.",
        "You may not copy, modify, or distribute our software or platform.",
        "Any feedback or suggestions you provide may be used by us without compensation.",
      ],
    },
    {
      title: "Data and Privacy",
      content: [
        "Your use of our service is subject to our Privacy Policy.",
        "We implement security measures to protect your data.",
        "You are responsible for backing up your important data.",
        "We may process your data as necessary to provide our services.",
        "Data retention periods vary by data type and subscription status.",
      ],
    },
    {
      title: "Service Availability and Support",
      content: [
        "We strive to maintain 99.9% uptime but do not guarantee uninterrupted service.",
        "Scheduled maintenance will be announced in advance when possible.",
        "Support response times vary by subscription plan.",
        "We provide documentation and resources to help users.",
        "Emergency support is available for critical issues on premium plans.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "Our liability is limited to the amount you paid for the service in the past 12 months.",
        "We are not liable for indirect, incidental, or consequential damages.",
        "We do not warrant that our service will be error-free or uninterrupted.",
        "You use our service at your own risk.",
        "Some jurisdictions do not allow limitation of liability, so these limits may not apply to you.",
      ],
    },
    {
      title: "Termination",
      content: [
        "You may terminate your account at any time.",
        "We may terminate accounts for violation of these terms.",
        "Upon termination, your access to the service will be discontinued.",
        "Data may be deleted after account termination according to our retention policy.",
        "Termination does not relieve you of obligations incurred before termination.",
      ],
    },
    {
      title: "Governing Law and Disputes",
      content: [
        "These terms are governed by the laws of California, United States.",
        "Disputes will be resolved through binding arbitration.",
        "You waive the right to participate in class action lawsuits.",
        "Any legal proceedings must be brought in California courts.",
        "We may seek injunctive relief to protect our intellectual property.",
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
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Please read these terms carefully before using BusinessPro's
              services.
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
              Agreement Overview
            </h2>
            <p className="text-indigo-800 leading-relaxed mb-4">
              These Terms of Service ("Terms") govern your use of BusinessPro's
              platform, services, and related offerings. By creating an account
              or using our services, you agree to be bound by these terms.
            </p>
            <p className="text-indigo-800 leading-relaxed">
              If you are using our services on behalf of an organization, you
              represent that you have the authority to bind that organization to
              these terms.
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

      {/* Important Notice */}
      <section className="py-12 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-yellow-400">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Important Notice
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These terms include important provisions such as limitation of
                  liability and mandatory arbitration of disputes. Please read
                  them carefully.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  If you have questions about these terms, please contact our
                  legal team before using our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Questions About These Terms?
            </h2>
            <p className="text-gray-700 mb-6">
              If you have any questions about these Terms of Service or need
              clarification on any provision, please contact us:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Legal Department
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>Email: legal@businesspro.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Response time: Within 3 business days</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Mailing Address
                </h3>
                <div className="space-y-1 text-gray-600">
                  <p>BusinessPro Inc.</p>
                  <p>Attn: Legal Department</p>
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Related Legal Documents
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/privacy"
                className="block bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Privacy Policy
                </h3>
                <p className="text-gray-600 text-sm">
                  How we collect, use, and protect your information
                </p>
              </a>

              <a
                href="/contact"
                className="block bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Contact Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Get help with legal or service questions
                </p>
              </a>

              <a
                href="/pricing"
                className="block bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Subscription Plans
                </h3>
                <p className="text-gray-600 text-sm">
                  View pricing and subscription terms
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
