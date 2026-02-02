import { DataTable, GroupStatusBadge, UserActionsDropdown } from "../../components/dashboard";

/**
 * Created Groups Tab Component
 * Displays groups created by the user
 */
const CreatedGroupsTab = ({ groups, loading }) => {
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
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-[#4BEEA2]/10 flex items-center justify-center">
              <span className="text-[#4BEEA2] font-bold text-lg">
                {row.groupName?.[0]?.toUpperCase() || "G"}
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
      key: "createdOn",
      label: "Created On",
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
            : "N/A"}
        </span>
      ),
    },
    {
      key: "totalMembers",
      label: "Total Members",
      render: (value) => (
        <span className="text-sm text-white font-medium">
          {String(value || 0).padStart(3, "0")}
        </span>
      ),
    },
    {
      key: "workoutsPerWeek",
      label: "Workouts/Week",
      render: (value) => (
        <span className="text-sm text-white font-medium">
          {String(value || 0).padStart(2, "0")}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <GroupStatusBadge status={value} />,
    },
    {
      key: "action",
      label: "Action",
      render: (_, row) => <UserActionsDropdown userId={row.groupId} />,
    },
  ];

  return (
    <div className="mt-6">
      <DataTable
        columns={columns}
        data={groups}
        loading={loading}
        emptyMessage="No created groups found"
      />
    </div>
  );
};

export default CreatedGroupsTab;
