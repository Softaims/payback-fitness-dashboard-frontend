import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import api from "../../lib/apiClient";
import PageLoader from "./PageLoader";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { user, setUser, userLoading, setUserLoading } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [allowAccess, setAllowAccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkAuth = async () => {
      if (user || userLoading) return;

      try {
        setUserLoading(true);
        const userResponse = await api.get("/api/user/profile");
        setUser(userResponse?.data);
      } catch {
        window.location.href = "/login";
      } finally {
        setUserLoading(false);
      }
    };
    checkAuth();
  }, [user, setUser, userLoading, setUserLoading]);

  useEffect(() => {
    if (!user) return;
    const onboardingCompleted = !user?.not_onboarded;
    const isOnboardingPage = location.pathname.startsWith("/onboarding");

    if (onboardingCompleted && isOnboardingPage) {
      setAllowAccess(false);
      setLoading(false);
      navigate("/", { replace: true });
      return;
    } else if (!onboardingCompleted && !isOnboardingPage) {
      setAllowAccess(false);
      setLoading(false);
      navigate("/onboarding-referral-code", { replace: true });
      return;
    }
    setAllowAccess(true);
    setLoading(false);
  }, [location.pathname, navigate, user]);

  if (loading) return <PageLoader />;
  if (allowAccess) return children;
  if (!allowAccess) return null;
};

export default ProtectedRoute;
