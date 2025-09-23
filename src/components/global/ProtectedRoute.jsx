import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import api from "../../lib/apiClient";
import PageLoader from "./PageLoader";
const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (user || !loading) return;

      try {
        const userResponse = await api.get("/api/user/profile");
        setUser(userResponse?.data);
      } catch {
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [user, setUser, loading, setLoading]);

  if (user) return children;
  else if (loading) return <PageLoader />;
  else return null;
};

export default ProtectedRoute;
