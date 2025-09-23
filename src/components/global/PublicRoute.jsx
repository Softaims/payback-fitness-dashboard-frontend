import { useEffect, useState } from "react";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import PageLoader from "./PageLoader";
import api from "../utils/apiClient";

const PublicRoute = ({ children }) => {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        navigate("/", { replace: true });
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/api/user/profile");
        console.log("response", response);
        setUser(response?.data?.user || null);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [user, setUser, navigate]);

  if (loading) return <PageLoader />;
  if (!user) return children;
  return null;
};

export default PublicRoute;
