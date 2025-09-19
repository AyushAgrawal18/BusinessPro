import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '💼',
      title: 'Business Management',
      description: 'Streamline operations with comprehensive management tools built for growth.',
      bgColor: 'bg-blue-500'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Make data-driven decisions with powerful analytics and reporting features.',
      bgColor: 'bg-green-500'
    },
    {
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level security keeps your data safe and compliant with industry standards.',
      bgColor: 'bg-purple-500'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Experience blazing-fast performance with optimized infrastructure.',
      bgColor: 'bg-yellow-500'
    },
    {
      icon: '🎯',
      title: 'Smart Automation',
      description: 'Automate repetitive tasks so you can focus on what matters most.',
      bgColor: 'bg-red-500'
    },
    {
      icon: '🌐',
      title: 'Global Integration',
      description: 'Connect with hundreds of popular tools for seamless workflows.',
      bgColor: 'bg-teal-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center text-4xl mb-4 bg-gradient-to-br from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
          Why Choose Us?
        </h2>
        <p className="text-center text-xl mb-12 text-gray-600">
          Everything you need to scale your business efficiently
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-xl hover:transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl text-white ${feature.bgColor}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
