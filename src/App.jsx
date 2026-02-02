import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./user/routes/UserRoutes";
import AdminRoutes from "./admin/routes/AdminRoutes";
import { CustomToaster } from "./shared/lib/toast";

/**
 * Main App Component
 * Routes are organized by module: User and Admin
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - /admin/* */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* User Routes - /* (default) */}
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
      <CustomToaster />
    </Router>
  );
}

export default App;
