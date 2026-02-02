import { Crown, Check } from "lucide-react";

const OnboardingSubscriptionFeatures = () => {
  const features = [
    {
      title: "Unlock Access to a joined group",
    },
    {
      title: "Establish your exclusive group",
    },
    {
      title: "Real-time user activity notifications",
    },
    {
      title: "Seamless tracking of team member's progress",
    },
  ];

  return (
    <div className="flex p-4 md:p-8 items-center justify-center">
      <div className="w-full max-w-lg flex flex-col mt-15 md:mt-0">
        {/* Crown Icon */}
        <div className="mb-2 md:mb-6">
          <Crown className="w-8 h-8 text-[#4BEEA2]" />
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold mb-6">
            Experience <span className="text-[#4BEEA2]">Unlimited</span> Features
          </h1>
          <p className="text-[#ffffff]/50 text-sm">Enjoy PayBack Fitness fully with all our app has to offer</p>
        </div>

        {/* Features List */}
        <div>
          <h2 className="text-white text-lg font-semibold md:text-xl md:font-bold mb-6">Features Include:</h2>
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
