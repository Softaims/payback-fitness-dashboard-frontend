import { DataTable, StatusBadge } from "../../components/dashboard";

/**
 * Subscriptions Tab Component
 * Displays user's subscription history in a table
 */
const SubscriptionsTab = ({ subscriptions, loading }) => {
  const columns = [
    {
      key: "planName",
      label: "Plan Name",
      render: (value) => (
        <span className="text-sm text-white font-medium">{value}</span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (value) => (
        <span className="text-sm text-white font-medium">
          ${Number(value || 0).toFixed(2)}
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
      key: "expiredOn",
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
      key: "subscribedThrough",
      label: "Subscribed Through",
      render: (value) => (
        <span className="text-sm text-[#FFFFFF]/70">{value || "N/A"}</span>
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
        data={subscriptions}
        loading={loading}
        emptyMessage="No subscription history found"
      />
    </div>
  );
};

export default SubscriptionsTab;
