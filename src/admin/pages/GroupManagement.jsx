import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../shared/lib/apiClient";
import customToast from "../../shared/lib/toast";
import {
  DataTable,
  UserAvatar,
  SearchInput,
  GroupStatusBadge,
  Pagination,
  Dropdown,
  ActionsDropdown,
} from "../components/dashboard";

/**
 * Group Management Page
 */
const GroupManagement = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalGroups, setTotalGroups] = useState(0);

  const statusFilterOptions = [
    { value: "all", label: "All Groups" },
    { value: "active", label: "Active Groups" },
    { value: "past", label: "Past Groups" },
    { value: "upcoming", label: "Upcoming Groups" },
  ];

  useEffect(() => {
    fetchGroups();
  }, [currentPage, searchQuery, statusFilter]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/groups", {
        params: {
          search: searchQuery || undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
          page: currentPage,
          limit: 10,
        },
      });
      setGroups(response.data.groups || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setTotalGroups(response.data.pagination?.totalCount || 0);
    } catch (error) {
      customToast.error(error?.message || "Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const columns = [
    {
      key: "group",
      label: "Group",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.groupIcon ? (
            <img
              src={row.groupIcon}
              alt={row.groupName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#4BEEA2]/20 flex items-center justify-center">
              <span className="text-[#4BEEA2] font-semibold text-sm">
                {row.groupName?.charAt(0).toUpperCase() || "G"}
              </span>
            </div>
          )}
          <span className="text-sm text-white font-medium">
            {row.groupName}
          </span>
        </div>
      ),
    },
    {
      key: "creator",
      label: "Creator",
      render: (creator) => (
        <div className="flex items-center gap-3">
          <UserAvatar src={creator?.avatar} name={creator?.name} size="sm" />
          <span className="text-sm text-white font-medium">
            {creator?.name || "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "activatedOn",
      label: "Activated On",
      render: (value) => (
        <span className="text-sm text-[#FFFFFF]/70">
          {value
            ? new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "--"}
        </span>
      ),
    },
    {
      key: "totalMembers",
      label: "Total Members",
      render: (value) => (
        <span className="text-sm text-white font-medium">{value || 0}</span>
      ),
    },
    {
      key: "workoutsPerWeek",
      label: "Workouts/Week",
      render: (value) => (
        <span className="text-sm text-white font-medium">
          {value?.toString().padStart(2, "0") || "00"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <GroupStatusBadge status={value || "unknown"} />,
    },
    {
      key: "action",
      label: "Action",
      render: (_, row) => (
        <ActionsDropdown
          actions={[
            {
              icon: Eye,
              label: "View Detail",
              onClick: () => navigate(`/admin/groups/${row.groupId}`),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white">Group Management</h1>
            <p className="text-[#FFFFFF]/50 mt-2">
              Total Groups : {totalGroups}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SearchInput
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Group.."
              className="w-96"
            />
            <Dropdown
              options={statusFilterOptions}
              value={statusFilter}
              onChange={handleStatusFilterChange}
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Groups Table */}
      <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
        <DataTable
          columns={columns}
          data={groups}
          loading={loading}
          emptyMessage="No groups found"
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

export default GroupManagement;
