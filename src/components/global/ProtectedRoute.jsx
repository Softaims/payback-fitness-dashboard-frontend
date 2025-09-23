import { useEffect } from "react";
import { useUserStore } from "../store/userStore";
import api from "../utils/apiClient";
import PageLoader from "../components/shared/PageLoader";
const ProtectedRoute = ({ children }) => {
  const { user, setUser, userLoading, setUserLoading } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      if (user || userLoading) return;
      try {
        setUserLoading(true);
        const userResponse = await api.get("/auth/me");
        setUser(userResponse?.data?.user);
      } catch {
        window.location.href = "/login";
      } finally {
        setUserLoading(false);
      }
    };
    checkAuth();
  }, [user, userLoading, setUserLoading, setUser]);

  if (userLoading) return <PageLoader />;
  if (user) return children;
  return null;
};

export default ProtectedRoute;
