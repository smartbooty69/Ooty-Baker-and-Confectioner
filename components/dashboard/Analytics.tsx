"use client";

import { useEffect, useState, useMemo } from "react";
import { BiTrendingUp, BiTrendingDown, BiBarChart, BiPieChart } from "react-icons/bi";
import { StatCardSkeleton } from "./SkeletonLoader";

interface AnalyticsData {
  period: number;
  dailyInquiries: Record<string, number>;
  statusDistribution: {
    new: number;
    inProgress: number;
    completed: number;
    cancelled: number;
  };
  topProducts: Array<{ name: string; count: number; revenue: number }>;
  dailyRevenue: Record<string, number>;
  avgDailyResponseTime: Record<string, number>;
  conversionFunnel: {
    total: number;
    new: number;
    inProgress: number;
    completed: number;
    cancelled: number;
  };
  businessNatureCounts: Record<string, number>;
  frequencyCounts: Record<string, number>;
  totalRevenue: number;
  totalInquiries: number;
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("30");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setIsAnimating(false);
      const response = await fetch(`/api/analytics?period=${period}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
        // Trigger animation after data loads
        setTimeout(() => setIsAnimating(true), 100);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!analytics) return null;

    // Daily inquiries chart data
    const dates = Object.keys(analytics.dailyInquiries).sort();
    const inquiryData = dates.map((date) => ({
      date,
      count: analytics.dailyInquiries[date],
    }));

    // Revenue chart data
    const revenueData = dates.map((date) => ({
      date,
      revenue: analytics.dailyRevenue[date] || 0,
    }));

    return { inquiryData, revenueData, dates };
  }, [analytics]);

  // Calculate percentages for status distribution
  const statusPercentages = useMemo(() => {
    if (!analytics) return null;
    const total = analytics.conversionFunnel.total || 1;
    return {
      new: (analytics.statusDistribution.new / total) * 100,
      inProgress: (analytics.statusDistribution.inProgress / total) * 100,
      completed: (analytics.statusDistribution.completed / total) * 100,
      cancelled: (analytics.statusDistribution.cancelled / total) * 100,
    };
  }, [analytics]);

  if (isLoading || !analytics) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-heading">Analytics Dashboard</h2>
            <p className="text-sm text-body/70 mt-1">
              Comprehensive insights and performance metrics
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border border-heading/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-primary cursor-pointer bg-white"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="180">Last 6 months</option>
            </select>
            <button
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-heading text-white rounded-lg hover:bg-heading/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group border-2 border-transparent hover:border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-body/70 uppercase">Total Inquiries</h3>
            <BiBarChart className="text-2xl text-heading transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3" />
          </div>
          <div className="text-3xl font-bold text-body transition-colors duration-300 group-hover:text-heading">
            {analytics.totalInquiries}
          </div>
          <p className="text-sm text-body/70 mt-1">In the selected period</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group border-2 border-transparent hover:border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-body/70 uppercase">Total Revenue</h3>
            <BiTrendingUp className="text-2xl text-primary transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3" />
          </div>
          <div className="text-3xl font-bold text-body transition-colors duration-300 group-hover:text-primary">
            ₹{analytics.totalRevenue.toLocaleString()}
          </div>
          <p className="text-sm text-body/70 mt-1">Estimated value</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group border-2 border-transparent hover:border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-body/70 uppercase">Completion Rate</h3>
            <BiPieChart className="text-2xl text-purple-500 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3" />
          </div>
          <div className="text-3xl font-bold text-primary-800 transition-colors duration-300 group-hover:text-purple-600">
            {analytics.conversionFunnel.total > 0
              ? Math.round(
                  (analytics.conversionFunnel.completed / analytics.conversionFunnel.total) * 100
                )
              : 0}
            %
          </div>
          <p className="text-sm text-primary-600 mt-1">Inquiries completed</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group border-2 border-transparent hover:border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-body/70 uppercase">Avg Response Time</h3>
            <BiTrendingDown className="text-2xl text-orange-500 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-3" />
          </div>
          <div className="text-3xl font-bold text-primary-800 transition-colors duration-300 group-hover:text-orange-600">
            {Object.keys(analytics.avgDailyResponseTime).length > 0
              ? Math.round(
                  Object.values(analytics.avgDailyResponseTime).reduce((a, b) => a + b, 0) /
                    Object.values(analytics.avgDailyResponseTime).length
                )
              : 0}
            h
          </div>
          <p className="text-sm text-primary-600 mt-1">Hours to first response</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Inquiries Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-bold text-heading mb-4">Inquiries Over Time</h3>
          {chartData && chartData.inquiryData.length > 0 ? (
            <div className="space-y-2">
              {chartData.inquiryData.map((item, index) => {
                const maxCount = Math.max(...chartData.inquiryData.map((d) => d.count));
                const percentage = (item.count / maxCount) * 100;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 group/bar hover:bg-blue-50 p-2 rounded-lg transition-all duration-200"
                    style={{
                      animation: isAnimating
                        ? `slideInLeft 0.5s ease-out ${index * 0.05}s both`
                        : "none",
                    }}
                  >
                    <div className="w-20 text-xs text-primary-600 font-medium">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden group-hover/bar:bg-gray-200 transition-colors duration-200">
                      <div
                        className="bg-heading h-full rounded-full transition-all duration-500 ease-out group-hover/bar:bg-heading/90 group-hover/bar:shadow-lg"
                        style={{
                          width: isAnimating ? `${percentage}%` : "0%",
                        }}
                      >
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-white opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-body/70 py-8">No data available</p>
          )}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-bold text-heading mb-4">Revenue Over Time</h3>
          {chartData && chartData.revenueData.length > 0 ? (
            <div className="space-y-2">
              {chartData.revenueData.map((item, index) => {
                const maxRevenue = Math.max(...chartData.revenueData.map((d) => d.revenue));
                const percentage = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 group/bar hover:bg-green-50 p-2 rounded-lg transition-all duration-200"
                    style={{
                      animation: isAnimating
                        ? `slideInLeft 0.5s ease-out ${index * 0.05}s both`
                        : "none",
                    }}
                  >
                    <div className="w-20 text-xs text-primary-600 font-medium">
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex-1 bg-primary-100 rounded-full h-6 relative overflow-hidden group-hover/bar:bg-green-100 transition-colors duration-200">
                      <div
                        className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out group-hover/bar:bg-green-600 group-hover/bar:shadow-lg"
                        style={{
                          width: isAnimating ? `${percentage}%` : "0%",
                        }}
                      >
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-white opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200">
                          ₹{item.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-body/70 py-8">No data available</p>
          )}
        </div>
      </div>

      {/* Status Distribution & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-bold text-heading mb-4">Status Distribution</h3>
          {statusPercentages && (
            <div className="space-y-4">
              {[
                { label: "New", value: analytics.statusDistribution.new, percentage: statusPercentages.new, color: "bg-[#E5F2EC]", hoverColor: "hover:bg-[#E5F2EC]/80" }, // Neutral
                { label: "In Progress", value: analytics.statusDistribution.inProgress, percentage: statusPercentages.inProgress, color: "bg-[#FFF8E1]", hoverColor: "hover:bg-[#FFF8E1]/80" }, // Warning - Golden Crust
                { label: "Completed", value: analytics.statusDistribution.completed, percentage: statusPercentages.completed, color: "bg-[#E6F5ED]", hoverColor: "hover:bg-[#E6F5ED]/80" }, // Success - Gimmie Vibrant Green
                { label: "Cancelled", value: analytics.statusDistribution.cancelled, percentage: statusPercentages.cancelled, color: "bg-red-100", hoverColor: "hover:bg-red-200" }, // Danger - Berry Red
              ].map((status, index) => (
                <div
                  key={index}
                  className="group/status hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
                  style={{
                    animation: isAnimating
                      ? `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-body group-hover/status:font-semibold transition-all">
                      {status.label}
                    </span>
                    <span className="text-sm text-body/70 group-hover/status:text-body transition-colors">
                      {status.value} ({status.percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden group-hover/status:bg-gray-200 transition-colors">
                    <div
                      className={`${status.color} h-3 rounded-full transition-all duration-700 ease-out ${status.hoverColor} group-hover/status:shadow-md`}
                      style={{
                        width: isAnimating ? `${status.percentage}%` : "0%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-bold text-primary-800 mb-4">Top Products</h3>
          {analytics.topProducts.length > 0 ? (
            <div className="space-y-3">
              {analytics.topProducts.slice(0, 5).map((product, index) => {
                const maxCount = Math.max(...analytics.topProducts.map((p) => p.count));
                const percentage = (product.count / maxCount) * 100;
                return (
                  <div
                    key={index}
                    className="group/product hover:bg-purple-50 p-2 rounded-lg transition-all duration-200"
                    style={{
                      animation: isAnimating
                        ? `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                        : "none",
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-primary-700 group-hover/product:font-semibold transition-all">
                        {product.name}
                      </span>
                      <span className="text-sm text-primary-600 group-hover/product:text-primary-800 transition-colors">
                        {product.count} inquiries • ₹{product.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-primary-100 rounded-full h-2 overflow-hidden group-hover/product:bg-purple-100 transition-colors">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-700 ease-out hover:bg-purple-600 group-hover/product:shadow-md"
                        style={{
                          width: isAnimating ? `${percentage}%` : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-primary-600 py-8">No product data available</p>
          )}
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-xl">
        <h3 className="text-lg font-bold text-primary-800 mb-4">Conversion Funnel</h3>
        <div className="space-y-4">
          {[
            { label: "Total Inquiries", value: analytics.conversionFunnel.total, color: "bg-blue-500", hoverColor: "hover:bg-blue-600" },
            { label: "New", value: analytics.conversionFunnel.new, color: "bg-yellow-500", hoverColor: "hover:bg-yellow-600" },
            {
              label: "In Progress",
              value: analytics.conversionFunnel.inProgress,
              color: "bg-orange-500",
              hoverColor: "hover:bg-orange-600",
            },
            {
              label: "Completed",
              value: analytics.conversionFunnel.completed,
              color: "bg-green-500",
              hoverColor: "hover:bg-green-600",
            },
            {
              label: "Cancelled",
              value: analytics.conversionFunnel.cancelled,
              color: "bg-red-500",
              hoverColor: "hover:bg-red-600",
            },
          ].map((stage, index) => {
            const percentage =
              analytics.conversionFunnel.total > 0
                ? (stage.value / analytics.conversionFunnel.total) * 100
                : 0;
            return (
              <div
                key={index}
                className="group/funnel hover:bg-gray-50 p-2 rounded-lg transition-all duration-200"
                style={{
                  animation: isAnimating
                    ? `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                    : "none",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-primary-700 group-hover/funnel:font-semibold transition-all">
                    {stage.label}
                  </span>
                  <span className="text-sm font-bold text-primary-800 group-hover/funnel:text-primary-900 transition-colors">
                    {stage.value} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-primary-100 rounded-full h-4 overflow-hidden group-hover/funnel:bg-gray-200 transition-colors">
                  <div
                    className={`${stage.color} ${stage.hoverColor} h-4 rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2 group-hover/funnel:shadow-lg`}
                    style={{
                      width: isAnimating ? `${percentage}%` : "0%",
                    }}
                  >
                    {percentage > 10 && (
                      <span className="text-xs font-semibold text-white opacity-0 group-hover/funnel:opacity-100 transition-opacity duration-200">
                        {stage.value}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Business Nature & Frequency Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Nature */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-bold text-primary-800 mb-4">Business Nature Distribution</h3>
          {Object.keys(analytics.businessNatureCounts).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(analytics.businessNatureCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([nature, count], index) => {
                  const total = Object.values(analytics.businessNatureCounts).reduce(
                    (a, b) => a + b,
                    0
                  );
                  const percentage = (count / total) * 100;
                  return (
                    <div
                      key={index}
                      className="group/nature hover:bg-indigo-50 p-2 rounded-lg transition-all duration-200"
                      style={{
                        animation: isAnimating
                          ? `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                          : "none",
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-primary-700 group-hover/nature:font-semibold transition-all">
                          {nature}
                        </span>
                        <span className="text-sm text-primary-600 group-hover/nature:text-primary-800 transition-colors">
                          {count} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-primary-100 rounded-full h-2 overflow-hidden group-hover/nature:bg-indigo-100 transition-colors">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-700 ease-out hover:bg-indigo-600 group-hover/nature:shadow-md"
                          style={{
                            width: isAnimating ? `${percentage}%` : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-center text-body/70 py-8">No data available</p>
          )}
        </div>

        {/* Delivery Frequency */}
        <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-bold text-primary-800 mb-4">Delivery Frequency</h3>
          {Object.keys(analytics.frequencyCounts).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(analytics.frequencyCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([frequency, count], index) => {
                  const total = Object.values(analytics.frequencyCounts).reduce((a, b) => a + b, 0);
                  const percentage = (count / total) * 100;
                  return (
                    <div
                      key={index}
                      className="group/frequency hover:bg-teal-50 p-2 rounded-lg transition-all duration-200"
                      style={{
                        animation: isAnimating
                          ? `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                          : "none",
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-primary-700 group-hover/frequency:font-semibold transition-all">
                          {frequency}
                        </span>
                        <span className="text-sm text-primary-600 group-hover/frequency:text-primary-800 transition-colors">
                          {count} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-primary-100 rounded-full h-2 overflow-hidden group-hover/frequency:bg-teal-100 transition-colors">
                        <div
                          className="bg-teal-500 h-2 rounded-full transition-all duration-700 ease-out hover:bg-teal-600 group-hover/frequency:shadow-md"
                          style={{
                            width: isAnimating ? `${percentage}%` : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-center text-body/70 py-8">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
