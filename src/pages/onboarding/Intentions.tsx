import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";
import { cn } from "@/lib/utils";

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
    setSelectedIntentions((prev) => {
      if (prev.includes(intention)) {
        return prev.filter((i) => i !== intention);
      } else if (prev.length < 5) {
        return [...prev, intention];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    if (selectedIntentions.length > 0) {
      navigate("/onboarding/daily-reflections");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/birth-place");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={6}
      totalSteps={14}
      title="Set your intentions"
      subtitle="What energies would you like to invite into your life?"
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
          <div className="flex flex-wrap gap-3 justify-center">
            {intentions.map((intention, index) => {
              const isSelected = selectedIntentions.includes(intention);
              return (
                <BaseCard
                  key={intention}
                  variant="interactive"
                  onClick={() => toggleIntention(intention)}
                  className={cn(
                    "px-5 py-3 rounded-full transition-all duration-300 hover:scale-105 relative",
                    "stagger-fade-up",
                    isSelected
                      ? "bg-gradient-to-r from-accent/90 to-accent text-white shadow-[0_4px_20px_rgba(209,122,82,0.4)]"
                      : "liquid-glass-card border border-glass-border text-foreground hover:border-accent/40 hover:bg-white/5"
                  )}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    ...(isSelected && {
                      border: '2px solid',
                      borderColor: 'hsl(42 38% 57%)',
                      boxShadow: '0 0 0 1px rgba(209, 122, 82, 0.4), 0 4px 20px rgba(209, 122, 82, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.1)'
                    })
                  }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full pointer-events-none" 
                      style={{
                        border: '1px solid',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.15), 0 0 15px rgba(209, 122, 82, 0.3)'
                      }}
                    />
                  )}
                  <span className="text-subhead font-medium">{intention}</span>
                </BaseCard>
              );
            })}
          </div>

          <div className="text-center text-footnote text-muted-foreground mt-6">
            Selected: {selectedIntentions.length} of 5
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Intentions;
