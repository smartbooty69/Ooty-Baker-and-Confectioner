"use client";

import { useEffect, useState, useRef } from "react";
import { DashboardStats as DashboardStatsType } from "@/types";
import { StatCardSkeleton } from "./SkeletonLoader";
import { logger } from "@/lib/logger";

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRealTime, setIsRealTime] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // Initial fetch
    fetchStats();

    // Set up SSE for real-time updates
    try {
      const eventSource = new EventSource("/api/dashboard/events");
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setIsRealTime(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "stats" && data.data) {
            // Update stats from SSE
            setStats((prevStats) => {
              if (prevStats) {
                return { ...prevStats, ...data.data };
              }
              return null;
            });
          }
        } catch (error) {
          logger.error("Error parsing SSE data", error);
        }
      };

      eventSource.onerror = () => {
        setIsRealTime(false);
        // Fallback to polling if SSE fails
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
      };

      return () => {
        eventSource.close();
        eventSourceRef.current = null;
      };
    } catch (error) {
      logger.error("SSE not available, using polling", error);
      // Fallback to polling
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      logger.error("Error fetching stats", error);
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
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-body/60 uppercase">{title}</h3>
        <div className="p-2 bg-[#E5F2EC] rounded-lg">
          <i className={`${icon} text-2xl text-heading`}></i>
        </div>
      </div>
      <div className="text-2xl font-bold text-body mb-2">{value}</div>
      <div className="text-sm text-body/70 mb-2">{subtitle}</div>
      {trend && (
        <div className={`flex items-center space-x-1 text-xs font-medium ${trend.isPositive ? "text-primary" : "text-danger"}`}>
          <i className={`bx ${trend.isPositive ? "bx-up-arrow-alt" : "bx-down-arrow-alt"}`}></i>
          <span>{trend.label}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-heading">Dashboard Statistics</h2>
          <p className="text-xs sm:text-sm text-body/70 mt-1">Key performance metrics at a glance</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {isRealTime && (
            <span className="text-xs text-primary flex items-center gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="hidden sm:inline">Live</span>
            </span>
          )}
          <button
            onClick={fetchStats}
            className="px-3 sm:px-4 py-2 bg-heading text-white rounded-lg hover:bg-heading/90 transition-colors flex items-center space-x-2 text-sm sm:text-base"
            title="Refresh Stats"
          >
            <i className="bx bx-refresh text-lg sm:text-xl"></i>
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
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
