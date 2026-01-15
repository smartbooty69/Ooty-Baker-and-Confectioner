"use client";

import { useEffect, useState } from "react";
import { DashboardStats as DashboardStatsType } from "@/types";
import { StatCardSkeleton } from "./SkeletonLoader";

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const StatCard = ({
    title,
    value,
    subtitle,
    trend,
    icon,
  }: {
    title: string;
    value: string | number;
    subtitle: string;
    trend?: { value: number; label: string; isPositive: boolean };
    icon: string;
  }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-primary-600 uppercase">{title}</h3>
        <i className={`${icon} text-3xl text-accent`}></i>
      </div>
      <div className="text-3xl font-bold text-primary-800 mb-2">{value}</div>
      <div className="text-sm text-primary-600 mb-2">{subtitle}</div>
      {trend && (
        <div className={`flex items-center space-x-1 text-xs ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
          <i className={`bx ${trend.isPositive ? "bx-up-arrow-alt" : "bx-down-arrow-alt"}`}></i>
          <span>{trend.label}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary-800">Dashboard Statistics</h2>
          <p className="text-sm text-primary-600 mt-1">Key performance metrics at a glance</p>
        </div>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-primary-100 text-primary-800 rounded-lg hover:bg-primary-200 transition-colors flex items-center space-x-2"
          title="Refresh Stats"
        >
          <i className="bx bx-refresh text-xl"></i>
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Inquiries"
          value={stats.totalInquiries}
          subtitle="Total Business Inquiries"
          trend={{
            value: stats.trends.totalInquiriesTrend,
            label: `${Math.abs(stats.trends.totalInquiriesTrend)} vs last month`,
            isPositive: stats.trends.totalInquiriesTrend >= 0,
          }}
          icon="bx bxs-business"
        />
        <StatCard
          title="New Inquiries This Week"
          value={stats.newInquiries}
          subtitle="New Inquiries"
          trend={{
            value: stats.trends.newInquiriesTrend,
            label: `${Math.abs(stats.trends.newInquiriesTrend)} vs last week`,
            isPositive: stats.trends.newInquiriesTrend >= 0,
          }}
          icon="bx bx-plus-circle"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgressInquiries}
          subtitle="Active Inquiries"
          icon="bx bx-loader-alt"
        />
        <StatCard
          title="Completed This Week"
          value={stats.completedInquiries}
          subtitle="Completed Inquiries"
          trend={{
            value: stats.trends.completedTrend,
            label: `${Math.abs(stats.trends.completedTrend)} vs last week`,
            isPositive: stats.trends.completedTrend >= 0,
          }}
          icon="bx bx-check-circle"
        />
        <StatCard
          title="Cancelled This Week"
          value={stats.cancelledInquiries}
          subtitle="Cancelled Inquiries"
          trend={{
            value: stats.trends.cancelledTrend,
            label: `${Math.abs(stats.trends.cancelledTrend)} vs last week`,
            isPositive: stats.trends.cancelledTrend < 0,
          }}
          icon="bx bx-x-circle"
        />
        <StatCard
          title="Average Response Time"
          value={`${stats.avgResponseTime}h`}
          subtitle="Hours to First Response"
          icon="bx bx-timer"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          subtitle="Last 30 Days"
          icon="bx bx-line-chart"
        />
        <StatCard
          title="Estimated Value"
          value={`₹${stats.estimatedValue.toLocaleString()}`}
          subtitle="This Week's Potential"
          trend={{
            value: stats.trends.valueTrend,
            label: `₹${Math.abs(stats.trends.valueTrend).toLocaleString()} vs last week`,
            isPositive: stats.trends.valueTrend >= 0,
          }}
          icon="bx bx-rupee"
        />
      </div>
    </div>
  );
}
