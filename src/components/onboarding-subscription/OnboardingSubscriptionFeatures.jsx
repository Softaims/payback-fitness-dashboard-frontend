import { Crown, Check } from "lucide-react";

const OnboardingSubscriptionFeatures = () => {
  const features = [
    {
      title: "Access to all joined groups",
      description: "Access all of the groups that you've joined and participate in that joined group",
    },
    {
      title: "Can Create Your Own Group",
      description: "Now you can create your own group and then invite your all friends to that group",
    },
    {
      title: "User Activity Notifications",
      description: "Now you can get notified on every step in your fitness journey with your friends",
    },
    {
      title: "Access Team Progress",
      description: "You can access all of your joined team members progress in a group",
    },
  ];

  return (
    <div className="hidden lg:flex flex-1 p-8 items-center justify-center">
      <div className="w-full max-w-lg flex flex-col">
        {/* Crown Icon */}
        <div className="mb-6">
          <Crown className="w-8 h-8 text-[#4BEEA2]" />
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-6">
            Experience <span className="text-[#4BEEA2]">Unlimited</span> Features With Our Plan
          </h1>
          <p className="text-[#ffffff]/50 text-sm">Enjoy the Payback app more conveniently and get all features with our plans</p>
        </div>

        {/* Features List */}
        <div>
          <h2 className="text-white text-xl font-bold mb-6">Features Include:</h2>
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="w-4 h-4 rounded-full bg-[#4BEEA2] flex items-center justify-center mr-3 flex-shrink-0">
                  <Check className="w-3 h-3 text-black" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-medium mb-1">{feature.title}</h3>
                  <p className="text-[#ffffff]/50 text-xs leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingSubscriptionFeatures;
