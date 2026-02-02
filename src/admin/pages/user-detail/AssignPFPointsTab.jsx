import { DataTable } from "../../components/dashboard";

/**
 * Assign PF Points Tab Component
 * Displays history of PF points assigned to the user
 */
const AssignPFPointsTab = ({ assignedPoints, loading }) => {
  const columns = [
    {
      key: "pfPoints",
      label: "PF Points",
      render: (value) => (
        <span className="text-sm text-white font-medium">{value}</span>
      ),
    },
    {
      key: "assignedOn",
      label: "Assigned On",
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
  ];

  return (
    <div className="mt-6">
      <DataTable
        columns={columns}
        data={assignedPoints}
        loading={loading}
        emptyMessage="No assigned points history found"
      />
    </div>
  );
};

export default AssignPFPointsTab;
