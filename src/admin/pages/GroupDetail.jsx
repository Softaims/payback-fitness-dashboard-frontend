import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Activity, ArrowRight } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../../shared/lib/apiClient";
import customToast from "../../shared/lib/toast";
import {
  UserAvatar,
  GroupStatusBadge,
  Dropdown,
  DataTable,
  SkeletonGroupDetail,
  SkeletonChart,
} from "../components/dashboard";
import GroupProgressChart from "../components/group/GroupProgressChart";

/**
 * Group Detail Page
 * Displays comprehensive group information, progress chart, and member stats
 */
const GroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [availableWeeks, setAvailableWeeks] = useState([]);

  useEffect(() => {
    fetchGroupDetails();
    fetchGroupMembers();
  }, [id]);

  useEffect(() => {
    fetchGroupProgress(selectedWeek);
  }, [id, selectedWeek]);

  const fetchGroupDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/admin/groups/${id}`);
      setGroup(response.data);
    } catch (error) {
      customToast.error(error?.message || "Failed to fetch group details");
      navigate("/admin/groups");
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupProgress = async (week) => {
    try {
      setProgressLoading(true);
      const response = await api.get(`/api/admin/groups/${id}/progress`, {
        params: { week },
      });
      setProgressData(response.data);
      if (response.data.availableWeeks?.length > 0) {
        setAvailableWeeks(response.data.availableWeeks);
      }
    } catch (error) {
      customToast.error(error?.message || "Failed to fetch group progress");
    } finally {
      setProgressLoading(false);
    }
  };

  const fetchGroupMembers = async () => {
    try {
      const response = await api.get(`/api/admin/groups/${id}/members`);
      setMembers(response.data || []);
    } catch (error) {
      customToast.error(error?.message || "Failed to fetch group members");
    }
  };

  const handleWeekChange = (week) => {
    setSelectedWeek(week);
  };

  const handleCreatorClick = () => {
    if (group?.creator?.id) {
      navigate(`/admin/users/${group.creator.id}`);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <button className="flex items-center gap-2 text-[#FFFFFF]/70 mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Group Detail</span>
        </button>
        <SkeletonGroupDetail />
      </AdminLayout>
    );
  }

  if (!group) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-[#FFFFFF]/50">Group not found</p>
        </div>
      </AdminLayout>
    );
  }

  const memberColumns = [
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
      key: "completedWorkouts",
      label: "Completed Workouts",
      render: (value, row) => (
        <span className="text-sm text-white font-medium">
          {value}/{row.expectedWorkouts}
        </span>
      ),
    },
    {
      key: "minutesLogged",
      label: "Minutes Logged",
      render: (value) => (
        <span className="text-sm text-white font-medium">{value}mins</span>
      ),
    },
    {
      key: "pfPointsEarned",
      label: "PF Points Earned",
      render: (value) => (
        <span className="text-sm text-white font-medium">{value}PF</span>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/groups")}
        className="flex items-center gap-2 text-[#FFFFFF]/70 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Group Detail</span>
      </button>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Group Info */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
            {/* Group Image/Icon */}
            <div className="flex justify-center mb-6">
              {group.icon ? (
                <img
                  src={group.icon}
                  alt={group.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-[#4BEEA2]/20 flex items-center justify-center">
                  <span className="text-[#4BEEA2] font-bold text-4xl">
                    {group.name?.charAt(0).toUpperCase() || "G"}
                  </span>
                </div>
              )}
            </div>

            {/* Group Name */}
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              {group.name}
            </h2>

            {/* Activation Date */}
            <p className="text-sm text-[#FFFFFF]/50 text-center mb-4">
              Activation Date:{" "}
              {group.startDate
                ? new Date(group.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </p>

            {/* Status Badge */}
            <div className="flex justify-center mb-6">
              <GroupStatusBadge status={group.status} />
            </div>

            {/* About Group */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-2">
                About Group
              </h3>
              <p className="text-sm text-[#FFFFFF]/70 leading-relaxed">
                {group.description ||
                  "Group Detail module starting from when the user enters an invitation code to joining and interacting with a group in Payback Fitness, considering your rule that users can join multiple groups."}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-6">
              {/* Members Joined */}
              <div className="flex items-center justify-between p-3 bg-[#0f1c16] rounded-lg border border-[#FFFFFF]/10">
                <span className="text-[#FFFFFF]/70 text-sm">
                  Members Joined
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">
                    {group.stats.joinedMembers}/{group.maxMembers}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#4BEEA2]/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#4BEEA2]" />
                  </div>
                </div>
              </div>

              {/* Workouts Per Week */}
              <div className="flex items-center justify-between p-3 bg-[#0f1c16] rounded-lg border border-[#FFFFFF]/10">
                <span className="text-[#FFFFFF]/70 text-sm">
                  Workouts Per Week
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">
                    {group.weeklyGoal?.toString().padStart(2, "0") || "00"}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#4BEEA2]/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#4BEEA2]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Creator */}
            <div className="pt-4 border-t border-[#FFFFFF]/10">
              <h3 className="text-sm font-semibold text-white mb-3">Creator</h3>
              <button
                onClick={handleCreatorClick}
                className="flex items-center justify-between w-full p-3 bg-[#0f1c16] rounded-lg border border-[#FFFFFF]/10 hover:border-[#4BEEA2]/30 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <UserAvatar
                    src={group.creator?.avatar}
                    name={group.creator?.name}
                    size="sm"
                  />
                  <span className="text-sm text-white font-medium">
                    {group.creator?.name || "Unknown"}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-[#FFFFFF]/50 group-hover:text-[#4BEEA2] transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Progress & Members */}
        <div className="lg:col-span-2 space-y-6">
          {/* Group Progress Chart */}
          <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Group Progress
              </h3>
              {availableWeeks.length > 0 && (
                <Dropdown
                  options={availableWeeks}
                  value={selectedWeek}
                  onChange={handleWeekChange}
                  size="sm"
                />
              )}
            </div>

            {progressLoading ? (
              <SkeletonChart height="300px" />
            ) : (
              <GroupProgressChart
                data={progressData?.chartData || []}
                maxWorkouts={progressData?.maxWorkouts || 3}
              />
            )}
          </div>

          {/* Group Members Table */}
          <div className="bg-[#1a2e23] border border-[#FFFFFF]/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Group Members
            </h3>
            <DataTable
              columns={memberColumns}
              data={members}
              loading={false}
              emptyMessage="No members found"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GroupDetail;
