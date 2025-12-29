import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ReferralCodePage from "./pages/ReferralCodePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SubscriptionPage from "./pages/OnboardingSubscriptionPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";
import UserDashboard from "./pages/UserDashboard";
import PFCoinsPage from "./pages/PFCoinsPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
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
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />

          {/* Protected Routess */}

          <Route path="/" element={<ProtectedRoute children={<UserDashboard />} />} />
          <Route path="/dashboard" element={<ProtectedRoute children={<UserDashboard />} />} />
          <Route path="/onboarding-referral-code" element={<ProtectedRoute children={<ReferralCodePage />} />} />
          <Route path="/reset-password" element={<ProtectedRoute children={<ResetPasswordPage />} />} />
          <Route path="/onboarding-subscription" element={<ProtectedRoute children={<SubscriptionPage />} />} />
          <Route path="/success" element={<ProtectedRoute children={<PaymentSuccessPage />} />} />
          <Route path="/cancel" element={<ProtectedRoute children={<PaymentFailurePage />} />} />
          <Route path="/pf-points" element={<ProtectedRoute children={<PFCoinsPage />} />} />
          <Route path="/profile-settings" element={<ProtectedRoute children={<ProfileSettingsPage />} />} />
        </Routes>
        <CustomToaster />
      </Router>
    </>
  );
}

export default App;
