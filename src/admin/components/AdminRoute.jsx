import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuthStore } from "../store/adminAuthStore";
import api from "../../shared/lib/apiClient";
import PageLoader from "../../shared/components/common/PageLoader";
import { USER_ROLES } from "../../shared/constants/config";

/**
 * Protected route component for admin pages
 */
const AdminRoute = ({ children, requiredPermission }) => {
  const { admin, setAdmin, isAdmin } = useAdminAuthStore();
  const [loading, setLoading] = useState(true);
  const [allowAccess, setAllowAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = async () => {
      if (admin && isAdmin()) {
        if (
          requiredPermission &&
          !admin.permissions?.includes(requiredPermission)
        ) {
          navigate("/admin/unauthorized", { replace: true });
          return;
        }
        setAllowAccess(true);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/api/user/profile");

        const adminUser = response.data;

        if (!adminUser?.role || adminUser.role !== USER_ROLES.ADMIN) {
          window.location.href = "/admin/login";
          return;
        }

        setAdmin(adminUser);

        if (
          requiredPermission &&
          !adminUser.permissions?.includes(requiredPermission)
        ) {
          navigate("/admin/unauthorized", { replace: true });
          return;
        }

        setAllowAccess(true);
      } catch (error) {
        console.error("Admin auth check failed:", error);
        window.location.href = "/admin/login";
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, [admin, requiredPermission, setAdmin, isAdmin, navigate]);

  if (loading) return <PageLoader />;
  if (allowAccess) return children;
  return null;
};

export default AdminRoute;
