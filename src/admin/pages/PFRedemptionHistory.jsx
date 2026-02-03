import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../shared/lib/apiClient";
import customToast from "../../shared/lib/toast";
import {
  DataTable,
  UserAvatar,
  SearchInput,
  StatusBadge,
  Pagination,
} from "../components/dashboard";
import DateRangePicker from "../components/dashboard/DateRangePicker";

/**
 * PF Redemption History Page
 */
const PFRedemptionHistory = () => {
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRedemptions, setTotalRedemptions] = useState(0);

  // Date range state
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchRedemptions();
  }, [currentPage, searchQuery, startDate, endDate]);

  const fetchRedemptions = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchQuery || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        page: currentPage,
        limit: 10,
      };

      const response = await api.get("/api/admin/pf-redemptions", { params });
      setRedemptions(response.data.redemptions || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setTotalRedemptions(response.data.pagination?.totalCount || 0);
    } catch (error) {
      customToast.error(error?.message || "Failed to fetch redemption history");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDateRangeChange = ({ startDate: newStart, endDate: newEnd }) => {
    setStartDate(newStart);
    setEndDate(newEnd);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const columns = [
    {
      key: "pfPoints",
      label: "PF Points",
      render: (value) => (
        <span className="text-sm text-white font-medium">{value}</span>
      ),
    },
    {
      key: "redeemedBy",
      label: "Redeemed By",
      render: (user) => (
        <div className="flex items-center gap-3">
          <UserAvatar src={user?.avatar} name={user?.name} size="sm" />
          <span className="text-sm text-white font-medium">
            {user?.name || "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "redeemedOn",
      label: "Redeemed On",
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
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white">
              PF Redemptions History
            </h1>
            <p className="text-[#FFFFFF]/50 mt-2">
              Total Redemptions: {totalRedemptions}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateRangeChange}
            />
            <SearchInput
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search User.."
              className="w-96"
            />
          </div>
        </div>
      </div>

      {/* Redemptions Table */}
      <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
        <DataTable
          columns={columns}
          data={redemptions}
          loading={loading}
          emptyMessage="No redemption history found"
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

export default PFRedemptionHistory;
