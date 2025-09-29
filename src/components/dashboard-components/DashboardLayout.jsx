import { useState, useEffect, useRef } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 768 && sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header at the top */}
      <DashboardHeader onMenuClick={toggleSidebar} />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div ref={sidebarRef}>
          <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        <main className="flex-1 overflow-x-auto overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
