import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-20 text-center text-white bg-gradient-to-br from-indigo-500 to-purple-700">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-4xl mb-4 bg-gradient-to-br from-white via-blue-50 to-blue-100 bg-clip-text text-transparent">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of businesses that trust our platform to drive success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            className="px-8 py-4 bg-white text-blue-800 border-2 border-white font-semibold rounded-lg hover:bg-gray-100 hover:transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Free Trial
          </button>
          <button
            type="button"
            className="px-8 py-4 bg-transparent text-white border-2 border-white font-semibold rounded-lg hover:bg-white hover:text-blue-800 transition-all duration-300"
          >
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
