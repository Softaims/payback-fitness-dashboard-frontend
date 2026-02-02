import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, UsersRound, ShoppingCart, Gift, CreditCard, Plus } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../shared/lib/apiClient";
import customToast from "../../shared/lib/toast";
import { UserAvatar, TabNavigation, Modal } from "../components/dashboard";
import JoinedGroupsTab from "./user-detail/JoinedGroupsTab";
import CreatedGroupsTab from "./user-detail/CreatedGroupsTab";
import PFPurchaseHistoryTab from "./user-detail/PFPurchaseHistoryTab";
import PFRedemptionsTab from "./user-detail/PFRedemptionsTab";
import SubscriptionsTab from "./user-detail/SubscriptionsTab";
import AssignPFPointsTab from "./user-detail/AssignPFPointsTab";

/**
 * User Detail Page
 * Displays comprehensive user information with multiple tabs
 */
const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("joined-groups");
  const [tabData, setTabData] = useState({
    joinedGroups: [],
    createdGroups: [],
    purchaseHistory: [],
    redemptions: [],
    subscriptionHistory: [],
    assignedPoints: [],
  });
  const [tabLoading, setTabLoading] = useState(false);

  // Assign Points Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignPoints, setAssignPoints] = useState("");
  const [assignLoading, setAssignLoading] = useState(false);

  const tabs = [
    { key: "joined-groups", label: "Joined Groups", icon: UsersRound },
    { key: "created-groups", label: "Created Groups", icon: UsersRound },
    { key: "purchase-history", label: "PF Purchase History", icon: ShoppingCart },
    { key: "redemptions", label: "PF Redemptions", icon: Gift },
    { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
    { key: "assign-points", label: "Assign PF Points", icon: Plus },
  ];

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  useEffect(() => {
    fetchTabData(activeTab);
  }, [activeTab, id]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/admin/users/${id}`);
      setUser(response.data);
    } catch (error) {
      customToast.error(error?.message || "Failed to fetch user details");
      navigate("/admin/users");
    } finally {
      setLoading(false);
    }
  };

  const fetchTabData = async (tab) => {
    try {
      setTabLoading(true);

      switch (tab) {
        case "joined-groups":
          if (tabData.joinedGroups.length === 0) {
            const response = await api.get(`/api/admin/users/${id}/joined-groups`);
            setTabData((prev) => ({ ...prev, joinedGroups: response.data }));
          }
          break;

        case "created-groups":
          if (tabData.createdGroups.length === 0) {
            const response = await api.get(`/api/admin/users/${id}/created-groups`);
            setTabData((prev) => ({ ...prev, createdGroups: response.data }));
          }
          break;

        case "purchase-history":
          if (tabData.purchaseHistory.length === 0) {
            const response = await api.get(`/api/admin/users/${id}/purchase-history`);
            setTabData((prev) => ({ ...prev, purchaseHistory: response.data }));
          }
          break;

        case "redemptions":
          if (tabData.redemptions.length === 0) {
            const response = await api.get(`/api/admin/users/${id}/redemptions`);
            setTabData((prev) => ({ ...prev, redemptions: response.data }));
          }
          break;

        case "subscriptions":
          if (tabData.subscriptionHistory.length === 0) {
            const response = await api.get(`/api/admin/users/${id}/subscription-history`);
            setTabData((prev) => ({ ...prev, subscriptionHistory: response.data }));
          }
          break;

        case "assign-points":
          if (tabData.assignedPoints.length === 0) {
            const response = await api.get(`/api/admin/users/${id}/assigned-points`);
            setTabData((prev) => ({ ...prev, assignedPoints: response.data }));
          }
          break;

        default:
          break;
      }
    } catch (error) {
      customToast.error(error?.message || "Failed to fetch tab data");
    } finally {
      setTabLoading(false);
    }
  };

  const handleAssignPoints = async (e) => {
    e.preventDefault();

    if (!assignPoints || Number(assignPoints) <= 0) {
      customToast.error("Please enter a valid number of points");
      return;
    }

    try {
      setAssignLoading(true);
      await api.post(`/api/admin/users/${id}/assign-points`, {
        points: Number(assignPoints),
        description: "Admin assigned points",
      });

      customToast.success("PF Points assigned successfully");
      setAssignPoints("");
      setIsAssignModalOpen(false);

      // Refresh user data and assigned points history
      fetchUserDetails();
      setTabData((prev) => ({ ...prev, assignedPoints: [] }));
      if (activeTab === "assign-points") {
        fetchTabData("assign-points");
      }
    } catch (error) {
      customToast.error(error?.message || "Failed to assign PF points");
    } finally {
      setAssignLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#4BEEA2]/20 border-t-[#4BEEA2] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#FFFFFF]/50">Loading user details...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-[#FFFFFF]/50">User not found</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header Section */}
      <div className="mb-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center gap-2 text-[#FFFFFF]/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">User Detail</span>
        </button>

        {/* User Info Section */}
        <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
          <div className="flex items-start justify-between">
            {/* Left: User Info */}
            <div className="flex items-center gap-4">
              <UserAvatar src={user.avatar} name={user.name} size="lg" />
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  {user.name}
                </h1>
                <p className="text-[#FFFFFF]/70 mb-2">{user.email}</p>
                <p className="text-sm text-[#FFFFFF]/50">
                  Joined On:{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Right: Assign PF Points Button */}
            <button
              onClick={() => setIsAssignModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#4BEEA2] text-[#0f1c16] font-semibold rounded-lg hover:bg-[#3dd891] transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Assign PF Points</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-0"
      />

      {/* Tab Content */}
      <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 border-t-0 rounded-b-xl p-6">
        {activeTab === "joined-groups" && (
          <JoinedGroupsTab
            groups={tabData.joinedGroups}
            loading={tabLoading}
          />
        )}

        {activeTab === "created-groups" && (
          <CreatedGroupsTab
            groups={tabData.createdGroups}
            loading={tabLoading}
          />
        )}

        {activeTab === "purchase-history" && (
          <PFPurchaseHistoryTab
            purchases={tabData.purchaseHistory}
            loading={tabLoading}
          />
        )}

        {activeTab === "redemptions" && (
          <PFRedemptionsTab
            redemptions={tabData.redemptions}
            loading={tabLoading}
          />
        )}

        {activeTab === "subscriptions" && (
          <SubscriptionsTab
            subscriptions={tabData.subscriptionHistory}
            loading={tabLoading}
          />
        )}

        {activeTab === "assign-points" && (
          <AssignPFPointsTab
            assignedPoints={tabData.assignedPoints}
            loading={tabLoading}
          />
        )}
      </div>

      {/* Assign PF Points Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign PF Points"
        subtitle="Assign points to users based on user participations."
      >
        <form onSubmit={handleAssignPoints}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="points"
                className="block text-sm font-medium text-white mb-2"
              >
                PF Points to Assign
              </label>
              <input
                id="points"
                type="number"
                min="1"
                value={assignPoints}
                onChange={(e) => setAssignPoints(e.target.value)}
                placeholder="Enter PF Points"
                className="w-full px-4 py-3 bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-lg text-white placeholder-[#FFFFFF]/50 focus:outline-none focus:border-[#4BEEA2] focus:ring-1 focus:ring-[#4BEEA2] transition-all duration-200"
                disabled={assignLoading}
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={assignLoading}
                className="flex-1 px-6 py-3 bg-[#4BEEA2] text-[#0f1c16] font-semibold rounded-lg hover:bg-[#3dd891] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {assignLoading ? "Assigning..." : "Assign"}
              </button>
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                disabled={assignLoading}
                className="flex-1 px-6 py-3 bg-transparent border border-[#FFFFFF]/10 text-white font-semibold rounded-lg hover:bg-[#FFFFFF]/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default UserDetail;
