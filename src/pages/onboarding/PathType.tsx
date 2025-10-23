import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bot, User, Users } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const paths = [
  {
    id: "ai",
    title: "AI Guidance",
    description: "Instant insights available anytime, powered by advanced AI",
    icon: Bot,
  },
  {
    id: "human",
    title: "Human Mentor",
    description: "Connect with certified specialists for personalized sessions",
    icon: User,
  },
  {
    id: "hybrid",
    title: "Hybrid",
    description: "Blend AI convenience with human wisdom for balanced guidance",
    icon: Users,
  },
];

const PathType = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<string>("");

  const handleContinue = () => {
    if (selectedPath) {
      navigate("/onboarding/birth-details");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/focus");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={2}
      totalSteps={9}
      title="Choose your path"
      subtitle="How would you like to receive guidance?"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
          disabled={!selectedPath}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto">
          <div className="space-y-3">
            {paths.map(({ id, title, description, icon: Icon }) => {
              const isSelected = selectedPath === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedPath(id)}
                  className={`glass-card w-full p-4 text-left transition-all duration-300 hover:scale-[1.02] ${
                    isSelected
                      ? "ring-2 ring-accent bg-white/90"
                      : "hover:bg-white/80"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-gradient-to-br from-secondary to-primary' : 'bg-muted'}`}>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-accent'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default PathType;
