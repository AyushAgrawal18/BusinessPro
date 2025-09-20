import React, { useState } from "react";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const mainFeatures = [
    {
      title: "Advanced Analytics Dashboard",
      description:
        "Get comprehensive insights into your business performance with real-time analytics, custom reports, and interactive visualizations.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      benefits: [
        "Real-time data visualization",
        "Custom report generation",
        "Performance tracking",
        "Predictive analytics",
      ],
    },
    {
      title: "Team Collaboration Tools",
      description:
        "Streamline teamwork with integrated communication tools, project management, and file sharing capabilities.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      benefits: [
        "Real-time messaging",
        "Project management",
        "File sharing & storage",
        "Video conferencing",
      ],
    },
    {
      title: "Automated Workflows",
      description:
        "Automate repetitive tasks and processes to save time and reduce errors with our intelligent workflow engine.",
      image:
        "https://images.unsplash.com/photo-1518186233392-c232b3f1dd84?w=600&h=400&fit=crop",
      benefits: [
        "Process automation",
        "Custom workflows",
        "Task scheduling",
        "Error reduction",
      ],
    },
    {
      title: "Customer Relationship Management",
      description:
        "Manage customer relationships effectively with our comprehensive CRM system and customer analytics.",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      benefits: [
        "Contact management",
        "Sales pipeline tracking",
        "Customer analytics",
        "Communication history",
      ],
    },
  ];

  const allFeatures = [
    {
      category: "Analytics & Reporting",
      features: [
        {
          name: "Real-time Dashboard",
          description:
            "Monitor your business metrics in real-time with customizable dashboards",
          icon: "📊",
        },
        {
          name: "Advanced Reports",
          description:
            "Generate detailed reports with custom filters and export options",
          icon: "📈",
        },
        {
          name: "Data Visualization",
          description:
            "Interactive charts and graphs for better data understanding",
          icon: "📉",
        },
        {
          name: "Predictive Analytics",
          description:
            "AI-powered insights to predict future trends and outcomes",
          icon: "🔮",
        },
      ],
    },
    {
      category: "Team Management",
      features: [
        {
          name: "User Roles & Permissions",
          description: "Granular control over user access and permissions",
          icon: "👥",
        },
        {
          name: "Team Communication",
          description: "Built-in messaging and collaboration tools",
          icon: "💬",
        },
        {
          name: "Project Management",
          description:
            "Organize and track projects with integrated project tools",
          icon: "📋",
        },
        {
          name: "Time Tracking",
          description: "Track time spent on tasks and projects",
          icon: "⏰",
        },
      ],
    },
    {
      category: "Automation",
      features: [
        {
          name: "Workflow Automation",
          description: "Automate repetitive tasks and business processes",
          icon: "⚙️",
        },
        {
          name: "Smart Notifications",
          description:
            "Intelligent alerts and notifications based on your preferences",
          icon: "🔔",
        },
        {
          name: "API Integration",
          description: "Connect with your favorite tools and services",
          icon: "🔗",
        },
        {
          name: "Scheduled Tasks",
          description: "Set up recurring tasks and automated workflows",
          icon: "📅",
        },
      ],
    },
    {
      category: "Security & Compliance",
      features: [
        {
          name: "Data Encryption",
          description: "End-to-end encryption for all your sensitive data",
          icon: "🔒",
        },
        {
          name: "Two-Factor Authentication",
          description: "Enhanced security with 2FA support",
          icon: "🛡️",
        },
        {
          name: "Compliance Tools",
          description: "Built-in compliance features for various regulations",
          icon: "✅",
        },
        {
          name: "Audit Logs",
          description: "Comprehensive logging of all system activities",
          icon: "📝",
        },
      ],
    },
  ];

  const integrations = [
    { name: "Slack", logo: "💬", description: "Team communication" },
    {
      name: "Google Workspace",
      logo: "📧",
      description: "Email & productivity",
    },
    { name: "Salesforce", logo: "🏢", description: "CRM integration" },
    { name: "Zoom", logo: "📹", description: "Video conferencing" },
    { name: "Dropbox", logo: "📁", description: "File storage" },
    { name: "GitHub", logo: "👨‍💻", description: "Code repository" },
    { name: "Stripe", logo: "💳", description: "Payment processing" },
    { name: "HubSpot", logo: "🎯", description: "Marketing automation" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Features
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover the comprehensive suite of tools designed to streamline
              your business operations and drive growth across every aspect of
              your organization.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Feature Navigation */}
              <div className="space-y-4 mb-8">
                {mainFeatures.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      activeFeature === index
                        ? "bg-indigo-50 border-2 border-indigo-200"
                        : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                    }`}
                  >
                    <h3
                      className={`text-lg font-semibold mb-2 ${
                        activeFeature === index
                          ? "text-indigo-900"
                          : "text-gray-900"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        activeFeature === index
                          ? "text-indigo-700"
                          : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              {/* Active Feature Display */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={mainFeatures[activeFeature].image}
                  alt={mainFeatures[activeFeature].title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {mainFeatures[activeFeature].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {mainFeatures[activeFeature].description}
                  </p>
                  <div className="space-y-2">
                    {mainFeatures[activeFeature].benefits.map(
                      (benefit, index) => (
                        <div key={index} className="flex items-center">
                          <svg
                            className="w-5 h-5 text-green-500 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Feature Set
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to run your business efficiently
            </p>
          </div>

          <div className="space-y-16">
            {allFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {category.category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="text-3xl mb-4">{feature.icon}</div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Connect with the tools you already use and love
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {integrations.map((integration, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200 group-hover:shadow-md">
                  <div className="text-3xl mb-3">{integration.logo}</div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {integration.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {integration.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Don't see your favorite tool?</p>
            <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              Request Integration
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Experience All Features</h2>
          <p className="text-xl text-indigo-200 mb-8">
            Ready to see how BusinessPro can transform your operations? Start
            your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-indigo-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-900 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
