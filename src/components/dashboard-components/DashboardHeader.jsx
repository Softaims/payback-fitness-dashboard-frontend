import { ChevronDown, Menu } from "lucide-react";

const DashboardHeader = ({ onMenuClick }) => {
  return (
    <header className="h-16 bg-[#0B0F0D]/60 flex items-center justify-between px-6 border-b border-[#ffffff]/7">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="cursor-pointer md:hidden text-gray-300 hover:text-white">
          <Menu size={24} />
        </button>

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src="/images/PaybackLogo.png" alt="PayBack Fitness Logo" className="h-10 w-10" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[#4BEEA2] font-bold text-lg">Pay</span>
              <span className="text-white font-bold text-lg">Back</span>
            </div>
            <span className="text-[#ffffff]/50 text-xs tracking-[0.55em]">Fitness</span>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
          <div className="w-8 h-8 bg-[#4BEEA2] rounded-full flex items-center justify-center">
            <span className="ont-bold text-sm">A</span>
          </div>
          <span className="text-white text-sm font-medium">Alex stephno</span>
          <ChevronDown size={16} className="text-[#4BEEA2]" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
