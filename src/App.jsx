import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ReferralCodePage from "./pages/ReferralCodePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SubscriptionPage from "./pages/OnboardingSubscriptionPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import HomePage from "./pages/HomePage";
import UserDashboard from "./pages/UserDashboard";
import ManageSubscriptionsPage from "./pages/ManageSubscriptionsPage";
import PFCoinsPage from "./pages/PFCoinsPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
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
          <Route path="/" element={<ProtectedRoute children={<UserDashboard />} />} />
          <Route path="/dashboard" element={<ProtectedRoute children={<UserDashboard />} />} />
          <Route path="/referral-code" element={<ProtectedRoute children={<ReferralCodePage />} />} />
          <Route path="/reset-password" element={<ProtectedRoute children={<ResetPasswordPage />} />} />
          <Route path="/onboarding-subscription" element={<ProtectedRoute children={<SubscriptionPage />} />} />
          <Route path="/payment/success" element={<ProtectedRoute children={<PaymentSuccessPage />} />} />
          <Route path="/manage-subscriptions" element={<ProtectedRoute children={<ManageSubscriptionsPage />} />} />
          <Route path="/pf-coins" element={<ProtectedRoute children={<PFCoinsPage />} />} />
          <Route path="/profile-settings" element={<ProtectedRoute children={<ProfileSettingsPage />} />} />
        </Routes>
        <CustomToaster />
      </Router>
    </>
  );
}

export default App;
