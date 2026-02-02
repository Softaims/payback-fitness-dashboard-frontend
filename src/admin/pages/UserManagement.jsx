import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../shared/lib/apiClient";
import customToast from "../../shared/lib/toast";
import {
  DataTable,
  UserAvatar,
  SearchInput,
  UserActionsDropdown,
  Pagination,
} from "../components/dashboard";

/**
 * User Management Page
 */
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchQuery]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/admin/users", {
        params: {
          search: searchQuery || undefined,
          page: currentPage,
          limit: 10,
        },
      });
      setUsers(response.data.users || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setTotalUsers(response.data.pagination?.totalCount || 0);
    } catch (error) {
      customToast.error(error?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const columns = [
    {
      key: "user",
      label: "User",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <UserAvatar src={row.avatar} name={row.name} size="sm" />
          <span className="text-sm text-white font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email Address",
      render: (value) => (
        <span className="text-sm text-[#FFFFFF]/70">{value}</span>
      ),
    },
    {
      key: "joinedOn",
      label: "Joined On",
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
      key: "hasActiveGroup",
      label: "Active Group(Y/N)",
      render: (value) => (
        <span className="text-sm text-white font-medium">
          {value ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "pastJoinedGroups",
      label: "Past Joined Groups",
      render: (value) => (
        <span className="text-sm text-white font-medium">{String(value)}</span>
      ),
    },
    {
      key: "currentPFPoints",
      label: "Current PF Points",
      render: (value) => (
        <span className="text-sm text-white font-medium">{value}PF Points</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (_, row) => <UserActionsDropdown userId={row.id} />,
    },
  ];

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white">User Management</h1>
            <p className="text-[#FFFFFF]/50 mt-2">Total Users : {totalUsers}</p>
          </div>
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search User.."
            className="w-96"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
        <DataTable
          columns={columns}
          data={users}
          loading={loading}
          emptyMessage="No users found"
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

export default UserManagement;
