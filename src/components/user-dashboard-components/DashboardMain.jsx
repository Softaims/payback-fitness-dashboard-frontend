import AppDownloadSection from "./AppDownloadSection";
import ManageSubscriptionSection from "./ManageSubscriptionSection";

const DashboardMain = () => {
  return (
    <div className="min-h-screen p-6 space-y-6">
      <AppDownloadSection />
      <ManageSubscriptionSection />
    </div>
  );
};

export default DashboardMain;
