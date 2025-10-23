import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const intentions = [
  "Insight",
  "Purpose",
  "Calm",
  "Healing",
  "Growth",
  "Love",
  "Clarity",
  "Strength",
  "Abundance",
  "Balance",
  "Creativity",
  "Connection",
];

const Intentions = () => {
  const navigate = useNavigate();
  const [selectedIntentions, setSelectedIntentions] = useState<string[]>([]);

  const toggleIntention = (intention: string) => {
    setSelectedIntentions((prev) =>
      prev.includes(intention)
        ? prev.filter((i) => i !== intention)
        : [...prev, intention]
    );
  };

  const handleContinue = () => {
    if (selectedIntentions.length > 0) {
      navigate("/onboarding/daily-summary");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/birth-details");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={4}
      totalSteps={9}
      title="Set your intentions"
      subtitle="Choose what you'd like to cultivate in your life"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
          disabled={selectedIntentions.length === 0}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {intentions.map((intention) => {
              const isSelected = selectedIntentions.includes(intention);
              return (
                <button
                  key={intention}
                  onClick={() => toggleIntention(intention)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? "bg-gradient-to-r from-secondary to-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "glass-card border border-accent/20 text-foreground hover:border-accent/40"
                  }`}
                >
                  {intention}
                </button>
              );
            })}
          </div>

          <div className="text-center text-sm text-muted-foreground mt-4">
            Selected: {selectedIntentions.length}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Intentions;
