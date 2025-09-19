import React from 'react';

const Stats = () => {
  const stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '150+', label: 'Countries' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <h3 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
