import { useState, useEffect } from "react";
import { Users, UsersRound } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../shared/lib/apiClient";
import customToast from "../../shared/lib/toast";
import {
  StatCard,
  CircularProgress,
  ProgressBar,
  StatusBadge,
  Dropdown,
  DataTable,
  UserAvatar,
  Pagination,
  SkeletonDashboard,
} from "../components/dashboard";

/**
 * Admin Dashboard Page
 */
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("all-time");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const filterOptions = [
    { value: "last-week", label: "Last Week" },
    { value: "last-month", label: "Last Month" },
    { value: "last-3-months", label: "Last 3 Months" },
    { value: "last-year", label: "Last Year" },
    { value: "all-time", label: "All Time" },
  ];

  useEffect(() => {
    fetchDashboardStats();
    fetchSubscriptionHistory();
  }, [timeRange]);

  useEffect(() => {
    fetchSubscriptionHistory();
  }, [currentPage]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/dashboard/stats", {
        params: { timeRange },
      });
      setStats(response.data);
    } catch (error) {
      customToast.error(error?.message || "Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptionHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await api.get("/api/admin/dashboard/history", {
        params: {
          timeRange,
          page: currentPage,
          limit: 10,
        },
      });
      setSubscriptionHistory(response.data.subscriptions || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      customToast.error(
        error?.message || "Failed to fetch subscription history",
      );
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  if (loading) {
    return (
      <AdminLayout>
        <SkeletonDashboard />
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-[#FFFFFF]/50">Failed to load dashboard stats</p>
        </div>
      </AdminLayout>
    );
  }

  const totalSubs = stats.totalSubscriptions || 0;
  const monthlyPercentage = stats.monthlySubscriptions?.percentage || 0;
  const yearlyPercentage = stats.yearlySubscriptions?.percentage || 0;
  const throughApp = stats.subscriptionsByPlatform?.throughApp || 0;
  const throughWeb = stats.subscriptionsByPlatform?.throughWeb || 0;

  const columns = [
    {
      key: "planName",
      label: "Plan Name",
      render: (value) => (
        <span className="text-sm text-white">{value || "N/A"}</span>
      ),
    },
    {
      key: "subscribedBy",
      label: "Subscribed by",
      render: (user) => (
        <div className="flex items-center gap-3">
          <UserAvatar src={user?.avatar} name={user?.name} size="sm" />
          <div>
            <p className="text-sm text-white font-medium">
              {user?.name || "N/A"}
            </p>
            <p className="text-xs text-[#FFFFFF]/50">{user?.email || ""}</p>
          </div>
        </div>
      ),
    },
    {
      key: "subscribedThrough",
      label: "Subscribed Through",
      render: (value) => (
        <span className="text-sm text-[#FFFFFF]/70">{value || "N/A"}</span>
      ),
    },
    {
      key: "charges",
      label: "Charges",
      render: (value) => (
        <span className="text-sm text-white font-medium">
          {value || "$0.00"}
        </span>
      ),
    },
    {
      key: "subscribedOn",
      label: "Subscribed On",
      render: (value) => (
        <span className="text-sm text-[#FFFFFF]/70">
          {value
            ? new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"}
        </span>
      ),
    },
    {
      key: "expiresOn",
      label: "Expired On",
      render: (value) => (
        <span className="text-sm text-[#FFFFFF]/70">
          {value
            ? new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusBadge status={value || "unknown"} />,
    },
  ];

  return (
    <AdminLayout>
      {/* Page Header with Time Range Filter */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <Dropdown
          options={filterOptions}
          value={timeRange}
          onChange={handleTimeRangeChange}
          size="md"
        />
      </div>

      {/* Main Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column: 2x2 grid inside */}
        <div className="grid grid-cols-2 gap-6">
          <StatCard
            title="Total Users Added"
            value={stats.totalUsersAdded?.toLocaleString() || "0"}
            icon={Users}
            variant="primary"
          />

          <StatCard
            title="Total Groups Added"
            value={stats.totalGroupsAdded?.toLocaleString() || "0"}
            icon={UsersRound}
            variant="default"
          />

          <StatCard
            title="Total Active Groups"
            value={stats.totalActiveGroups?.toLocaleString() || "0"}
            icon={UsersRound}
            variant="default"
          />

          <StatCard
            title="Total Deactivated Groups"
            value={stats.totalDeactivatedGroups?.toLocaleString() || "0"}
            icon={UsersRound}
            variant="default"
          />
        </div>

        {/* Right Column: Total Subscriptions */}
        <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6 hover:border-[#FFFFFF]/20 transition-all duration-200">
          <h3 className="text-lg font-semibold text-white mb-6">
            Total Subscriptions
          </h3>

          {/* 2 Column Layout Inside */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left: Circular Progress */}
            <div className="flex flex-col items-center justify-center">
              <CircularProgress
                appValue={throughApp}
                webValue={throughWeb}
                size={200}
                label={totalSubs}
                sublabel="Subscriptions"
              />

              {/* Platform Stats below circle */}
              <div className="flex items-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#4BEEA2]"></div>
                  <span className="text-[#FFFFFF]/70">Through App</span>
                  <span className="font-bold text-white">{throughApp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#4BEEA2]/30"></div>
                  <span className="text-[#FFFFFF]/70">Through Web</span>
                  <span className="font-bold text-white">{throughWeb}</span>
                </div>
              </div>
            </div>

            {/* Right: Progress Bars */}
            <div className="flex flex-col justify-center space-y-6">
              <ProgressBar
                label="Monthly Subscriptions"
                percentage={monthlyPercentage}
                color="#4BEEA2"
                height="h-2"
              />
              <ProgressBar
                label="Yearly Subscriptions"
                percentage={yearlyPercentage}
                color="#4BEEA2"
                height="h-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subscription History */}
      <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            Subscription History
          </h2>
        </div>

        <DataTable
          columns={columns}
          data={subscriptionHistory}
          loading={historyLoading}
          emptyMessage="No subscription history available"
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-6"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
