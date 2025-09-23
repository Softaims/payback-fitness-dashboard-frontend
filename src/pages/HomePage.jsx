import { useUserStore } from "../store/userStore";

const HomePage = () => {
  const { user } = useUserStore();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0B0F0D]/90 via-[#0B0F0D] to-[#0B0F0D] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-4">Welcome to Payback Fitness</h1>
        <p className="text-[#ffffff]/50 text-lg mb-8">{user ? `Hello, ${user.email || "User"}!` : "Welcome to your dashboard"}</p>
        <div className="bg-[#FFFFFF]/7 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-white text-sm">This is a dummy home page. You can replace this with your actual dashboard content.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
