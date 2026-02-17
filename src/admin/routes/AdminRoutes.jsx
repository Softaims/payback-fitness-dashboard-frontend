import { Routes, Route, Navigate } from "react-router-dom";
import AdminLoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/Dashboard";
import UserManagement from "../pages/UserManagement";
import UserDetail from "../pages/UserDetail";
import GroupManagement from "../pages/GroupManagement";
import GroupDetail from "../pages/GroupDetail";
import PFPurchaseHistory from "../pages/PFPurchaseHistory";
import PFRedemptionHistory from "../pages/PFRedemptionHistory";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import AdminRoute from "../components/AdminRoute";

/**
 * Admin Routes Configuration
 * All admin routes are prefixed with /admin
 */
const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public Admin Routes */}
      <Route path="/login" element={<AdminLoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Admin Routes */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* User Management Routes */}
      <Route
        path="/users"
        element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <AdminRoute>
            <UserDetail />
          </AdminRoute>
        }
      />

      {/* Group Management Routes */}
      <Route
        path="/groups"
        element={
          <AdminRoute>
            <GroupManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/groups/:id"
        element={
          <AdminRoute>
            <GroupDetail />
          </AdminRoute>
        }
      />

      {/* PF Purchases & Redemptions Routes */}
      <Route
        path="/purchases"
        element={
          <AdminRoute>
            <PFPurchaseHistory />
          </AdminRoute>
        }
      />
      <Route
        path="/redemptions"
        element={
          <AdminRoute>
            <PFRedemptionHistory />
          </AdminRoute>
        }
      />

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
