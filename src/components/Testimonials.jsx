import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "This platform has transformed how we manage our business. Analytics insights alone helped us increase revenue by 40%.",
      author: "Sarah Johnson",
      position: "CEO, TechStart Inc."
    },
    {
      text: "Automation features save us countless hours every week—our team focuses on strategy instead of manual tasks.",
      author: "Michael Chen",
      position: "Operations Director, GrowthCorp"
    },
    {
      text: "Outstanding support and an intuitive interface—exactly what we needed to scale efficiently.",
      author: "Emily Rodriguez",
      position: "Founder, InnovateLab"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-center text-4xl mb-4 bg-gradient-to-br from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
          What Our Clients Say
        </h2>
        <p className="text-center text-xl mb-12 text-gray-600">
          Don't just take our word for it—hear from our customers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <p className="italic mb-6 text-gray-600 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.author}</div>
                  <div className="text-gray-600 text-sm">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
