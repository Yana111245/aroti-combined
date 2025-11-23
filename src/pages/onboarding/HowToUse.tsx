import { useNavigate } from "react-router-dom";
import { Sparkles, Calendar, Bot, BookOpen } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";

const features = [
  {
    icon: Sparkles,
    title: "Tarot",
    description: "Tap to flip cards"
  },
  {
    icon: Calendar,
    title: "Astrology",
    description: "See your personalized blueprint"
  },
  {
    icon: Bot,
    title: "AI Guidance",
    description: "Ask anything, anytime"
  },
  {
    icon: BookOpen,
    title: "Reflections",
    description: "Write your daily insights"
  },
];

const HowToUse = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/onboarding/subscription");
  };

  const handleBack = () => {
    navigate("/onboarding/cheering");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={10}
      totalSteps={14}
      title="How Aroti works"
      subtitle="A gentle guide to navigating your spiritual path"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, description }, index) => (
              <BaseCard 
                key={title} 
                className="p-6 text-center stagger-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-[12px] bg-gradient-to-br from-accent/15 to-accent/8">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-headline font-medium text-foreground mb-2">{title}</h3>
                    <p className="text-body text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </div>
              </BaseCard>
            ))}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default HowToUse;

