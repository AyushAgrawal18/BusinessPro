import React from 'react';

const DashboardPreview = () => {
  const performanceMetrics = [
    { 
      label: 'Revenue Growth', 
      value: '+24.5%', 
      positive: true,
      description: 'vs last quarter'
    },
    { 
      label: 'Customer Acquisition', 
      value: '+18.2%', 
      positive: true,
      description: 'new customers this month'
    },
    { 
      label: 'User Engagement', 
      value: '+31.7%', 
      positive: true,
      description: 'active daily users'
    }
  ];

  const chartData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 82 },
    { month: 'Apr', value: 95 },
    { month: 'May', value: 88 },
    { month: 'Jun', value: 102 }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
            Powerful Dashboard
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
            Get insights that matter with our comprehensive analytics platform that transforms data into actionable intelligence
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Performance Metrics Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-2xl font-bold text-gray-800">Performance Metrics</h4>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              Track your key performance indicators in real-time with live updates
            </p>

            <div className="space-y-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center py-4 px-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div>
                      <span className="text-gray-800 font-medium text-lg">{metric.label}</span>
                      <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold text-2xl ${
                        metric.positive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.value}
                      </span>
                      <div className="flex items-center mt-1">
                        {metric.positive && (
                          <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className="text-sm text-gray-500">trending up</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Overview Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-2xl font-bold text-gray-800">Analytics Overview</h4>
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                View Details
              </button>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              Visualize your data with interactive charts and comprehensive insights
            </p>
            
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border-2 border-dashed border-gray-200 relative overflow-hidden">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h5 className="text-xl font-semibold text-gray-700 mb-2">Interactive Chart</h5>
                <p className="text-gray-500">Real-time data visualization</p>
              </div>
              
              {/* Simulated chart bars */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between space-x-1">
                {chartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-6 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t opacity-30"
                      style={{ height: `${item.value}px` }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-1">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Reports Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">Monthly Reports</h4>
              <p className="text-gray-600 text-lg">
                Automated reporting that saves you time and provides actionable insights for strategic decisions
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Schedule
              </button>
            </div>
          </div>
          
          <div className="h-48 flex items-center justify-center bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-xl border-2 border-dashed border-gray-200 relative overflow-hidden">
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <h5 className="text-xl font-semibold text-gray-700 mb-2">Monthly Trends</h5>
              <p className="text-gray-500">Comprehensive growth analytics</p>
            </div>
            
            {/* Simulated trend line */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 200">
              <path 
                d="M 50,150 Q 100,100 150,120 T 250,80 T 350,60" 
                stroke="#3b82f6" 
                strokeWidth="3" 
                fill="none"
                strokeDasharray="5,5"
              />
              <circle cx="50" cy="150" r="4" fill="#3b82f6" />
              <circle cx="150" cy="120" r="4" fill="#3b82f6" />
              <circle cx="250" cy="80" r="4" fill="#3b82f6" />
              <circle cx="350" cy="60" r="4" fill="#3b82f6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
