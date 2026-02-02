import { DataTable, StatusBadge } from "../../components/dashboard";

/**
 * PF Redemptions Tab Component
 * Displays user's PF points redemption history
 */
const PFRedemptionsTab = ({ redemptions, loading }) => {
  const columns = [
    {
      key: "pfPoints",
      label: "PF Points",
      render: (value) => (
        <span className="text-sm text-white font-medium">{value}</span>
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
    <div className="mt-6">
      <DataTable
        columns={columns}
        data={redemptions}
        loading={loading}
        emptyMessage="No redemption history found"
      />
    </div>
  );
};

export default PFRedemptionsTab;
