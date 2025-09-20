import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const performanceMetrics = [
    {
      label: "Total Revenue",
      value: "$127,850",
      change: "+12.5%",
      positive: true,
      description: "vs last month",
    },
    {
      label: "Active Users",
      value: "8,432",
      change: "+8.2%",
      positive: true,
      description: "monthly active users",
    },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "+0.8%",
      positive: true,
      description: "from last period",
    },
    {
      label: "Customer Satisfaction",
      value: "4.9/5",
      change: "+0.2",
      positive: true,
      description: "average rating",
    },
  ];

  const recentActivities = [
    {
      action: "New user registration",
      user: "Sarah Johnson",
      time: "2 minutes ago",
      type: "user",
    },
    {
      action: "Payment processed",
      user: "Acme Corp",
      time: "15 minutes ago",
      type: "payment",
    },
    {
      action: "Support ticket resolved",
      user: "Tech Solutions Inc",
      time: "1 hour ago",
      type: "support",
    },
    {
      action: "New subscription",
      user: "Digital Marketing Co",
      time: "2 hours ago",
      type: "subscription",
    },
    {
      action: "Report generated",
      user: "Analytics Team",
      time: "3 hours ago",
      type: "report",
    },
  ];

  const chartData = [
    { month: "Jan", revenue: 65000, users: 1200 },
    { month: "Feb", revenue: 78000, users: 1800 },
    { month: "Mar", revenue: 82000, users: 2100 },
    { month: "Apr", revenue: 95000, users: 2800 },
    { month: "May", revenue: 108000, users: 3200 },
    { month: "Jun", revenue: 127850, users: 3900 },
  ];

  const quickActions = [
    {
      title: "Generate Report",
      description: "Create detailed analytics report",
      icon: "📊",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Add New User",
      description: "Invite team member",
      icon: "👥",
      color: "bg-green-50 text-green-600 border-green-200",
    },
    {
      title: "View Analytics",
      description: "Detailed performance metrics",
      icon: "📈",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      title: "Settings",
      description: "Configure account preferences",
      icon: "⚙️",
      color: "bg-gray-50 text-gray-600 border-gray-200",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "user":
        return "👤";
      case "payment":
        return "💳";
      case "support":
        return "🎧";
      case "subscription":
        return "📋";
      case "report":
        return "📄";
      default:
        return "📝";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Current Time</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleTimeString()}
              </p>
              <p className="text-sm text-gray-500">
                {currentTime.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  {metric.label}
                </h3>
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    metric.positive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {metric.value}
              </p>
              <p className="text-sm text-gray-500">{metric.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Revenue Overview
                </h2>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>Last 6 months</option>
                  <option>Last 12 months</option>
                  <option>This year</option>
                </select>
              </div>

              {/* Simple Chart Visualization */}
              <div className="space-y-4">
                {chartData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">
                      {data.month}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full"
                        style={{ width: `${(data.revenue / 130000) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-20 text-sm font-semibold text-gray-900">
                      ${(data.revenue / 1000).toFixed(0)}k
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-lg border-2 text-left hover:shadow-md transition-all duration-200 ${action.color}`}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm opacity-80">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activities
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="text-xl">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                View All Activities
              </button>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                System Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Healthy
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">CDN</span>
                  <span className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Server Load</span>
                  <span className="text-sm text-gray-900">23%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
