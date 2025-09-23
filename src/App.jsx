import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ReferralCodePage from "./pages/ReferralCodePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import PublicRoute from "./components/global/PublicRoute";
import ProtectedRoute from "./components/global/ProtectedRoute";
import { CustomToaster } from "./lib/toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<PublicRoute children={<LoginPage />} />} />
          <Route path="/signup" element={<PublicRoute children={<SignupPage />} />} />
          <Route path="/email-verification" element={<PublicRoute children={<EmailVerificationPage />} />} />
          <Route path="/forgot-password" element={<PublicRoute children={<ForgotPasswordPage />} />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute children={<HomePage />} />} />
          <Route path="/referral-code" element={<ProtectedRoute children={<ReferralCodePage />} />} />
          <Route path="/reset-password" element={<ProtectedRoute children={<ResetPasswordPage />} />} />
        </Routes>
        <CustomToaster />
      </Router>
    </>
  );
}

export default App;
