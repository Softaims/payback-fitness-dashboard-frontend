import { DataTable } from "../../components/dashboard";

/**
 * PF Purchase History Tab Component
 * Displays user's PF points purchase history
 */
const PFPurchaseHistoryTab = ({ purchases, loading }) => {
  const columns = [
    {
      key: "pfPoints",
      label: "PF Points",
      render: (value) => (
        <span className="text-sm text-white font-medium">{value}</span>
      ),
    },
    {
      key: "purchasedThrough",
      label: "Purchased Through",
      render: (value) => (
        <span className="text-sm text-[#FFFFFF]/70">{value || "N/A"}</span>
      ),
    },
    {
      key: "amount",
      label: "Amount in $",
      render: (value) => (
        <span className="text-sm text-white font-medium">
          ${Number(value || 0).toFixed(0)}
        </span>
      ),
    },
    {
      key: "purchasedOn",
      label: "Purchased On",
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
        data={purchases}
        loading={loading}
        emptyMessage="No purchase history found"
      />
    </div>
  );
};

export default PFPurchaseHistoryTab;
