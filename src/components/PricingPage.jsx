import React, { useState } from "react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses getting started",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "Up to 5 team members",
        "Basic analytics dashboard",
        "10 GB storage",
        "Email support",
        "Basic reporting",
        "Mobile app access",
      ],
      isPopular: false,
      buttonText: "Start Free Trial",
      buttonStyle:
        "border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses",
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        "Up to 25 team members",
        "Advanced analytics & insights",
        "100 GB storage",
        "Priority support",
        "Custom reporting",
        "API access",
        "Advanced integrations",
        "Team collaboration tools",
      ],
      isPopular: true,
      buttonText: "Start Free Trial",
      buttonStyle:
        "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700",
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        "Unlimited team members",
        "Enterprise analytics suite",
        "Unlimited storage",
        "24/7 dedicated support",
        "Custom dashboards",
        "Advanced API access",
        "Single sign-on (SSO)",
        "Advanced security features",
        "Custom integrations",
        "Dedicated account manager",
      ],
      isPopular: false,
      buttonText: "Contact Sales",
      buttonStyle: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50",
    },
  ];

  const faqItems = [
    {
      question: "Can I change my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial for all plans. No credit card required to start your trial.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.",
    },
    {
      question: "Do you offer discounts for non-profits?",
      answer:
        "Yes, we offer special pricing for qualifying non-profit organizations. Contact our sales team for more information.",
    },
    {
      question: "What happens if I exceed my storage limit?",
      answer:
        "We'll notify you when you're approaching your limit. You can upgrade your plan or purchase additional storage as needed.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade security measures including encryption at rest and in transit, regular security audits, and compliance with major security standards.",
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getPrice = (plan) => {
    return isAnnual ? Math.floor(plan.annualPrice / 12) : plan.monthlyPrice;
  };

  const getSavings = (plan) => {
    const annualMonthly = Math.floor(plan.annualPrice / 12);
    const monthlySavings = plan.monthlyPrice - annualMonthly;
    const percentSavings = Math.floor(
      (monthlySavings / plan.monthlyPrice) * 100
    );
    return percentSavings;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        id="pricing"
        className="pt-24 pb-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple,{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Transparent
              </span>{" "}
              Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose the perfect plan for your business. Start with a free trial
              and scale as you grow.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span
                className={`mr-3 ${
                  !isAnnual ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isAnnual ? "bg-indigo-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`ml-3 ${
                  isAnnual ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Annual
                <span className="ml-1 text-sm text-green-600 font-medium">
                  (Save up to 25%)
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.isPopular
                    ? "border-indigo-500 shadow-xl scale-105"
                    : "border-gray-200 shadow-lg"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ${getPrice(plan)}
                    </span>
                    <span className="text-gray-600">/month</span>
                    {isAnnual && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        Save {getSavings(plan)}% annually
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>

                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    What's included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openFaqIndex === index ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-indigo-200 mb-8">
            Join thousands of businesses already using BusinessPro to accelerate
            their growth.
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

export default Pricing;
