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
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkAuth = async () => {
      if (user || userLoading || authChecked) return;

      try {
        setUserLoading(true);
        console.log("protected route api called");
        const userResponse = await api.get("/api/user/profile");
        setUser(userResponse?.data);
      } catch {
        console.log("error occured protected route redirecting to login");
        window.location.href = "/login";
      } finally {
        setUserLoading(false);
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, [user, setUser, userLoading, setUserLoading, authChecked]);

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
