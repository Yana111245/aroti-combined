import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart, Lightbulb, TrendingUp, Scale, Sparkles, Target } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";
import { cn } from "@/lib/utils";

const focuses = [
  { id: "clarity", label: "Clarity", icon: Lightbulb },
  { id: "love", label: "Love", icon: Heart },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "balance", label: "Balance", icon: Scale },
  { id: "healing", label: "Healing", icon: Sparkles },
  { id: "purpose", label: "Purpose", icon: Target },
];

const FocusSelection = () => {
  const navigate = useNavigate();
  const [selectedFocuses, setSelectedFocuses] = useState<string[]>([]);

  const toggleFocus = (id: string) => {
    setSelectedFocuses((prev) => {
      if (prev.includes(id)) {
        return prev.filter((f) => f !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    if (selectedFocuses.length > 0) {
      navigate("/onboarding/path");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={1}
      totalSteps={14}
      title="What calls to your soul?"
      subtitle="Choose up to 3 areas that speak to your inner journey"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
          disabled={selectedFocuses.length === 0}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {focuses.map(({ id, label, icon: Icon }, index) => {
              const isSelected = selectedFocuses.includes(id);
              return (
                <BaseCard
                  key={id}
                  variant="interactive"
                  onClick={() => toggleFocus(id)}
                  className={cn(
                    "p-6 transition-all duration-300 stagger-fade-up relative",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    isSelected && "scale-[1.02]",
                    isSelected && "bg-gradient-to-br from-accent/15 to-accent/8 shadow-[0_4px_20px_rgba(209,122,82,0.2)]"
                  )}
                  style={{ 
                    animationDelay: `${index * 80}ms`,
                    ...(isSelected && {
                      border: '2px solid',
                      borderColor: 'hsl(42 38% 57%)',
                      boxShadow: '0 0 0 1px rgba(209, 122, 82, 0.3), 0 4px 20px rgba(209, 122, 82, 0.25), inset 0 0 20px rgba(209, 122, 82, 0.1)'
                    })
                  }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 rounded-[12px] pointer-events-none" 
                      style={{
                        border: '1px solid',
                        borderColor: 'rgba(209, 122, 82, 0.6)',
                        boxShadow: 'inset 0 0 30px rgba(209, 122, 82, 0.15), 0 0 20px rgba(209, 122, 82, 0.2)'
                      }}
                    />
                  )}
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div 
                      className={cn(
                        "p-4 rounded-[12px] transition-all duration-300",
                        isSelected 
                          ? "bg-gradient-to-br from-accent/25 to-accent/15" 
                          : "bg-white/5"
                      )}
                      style={isSelected ? {
                        filter: 'drop-shadow(0 0 16px rgba(209, 122, 82, 0.5))',
                        transform: 'scale(1.1)'
                      } : {}}
                    >
                      <Icon className={cn(
                        "w-7 h-7 transition-all duration-300",
                        isSelected ? "text-accent" : "text-muted-foreground"
                      )} />
                    </div>
                    <span className="text-headline font-medium text-foreground">{label}</span>
                  </div>
                </BaseCard>
              );
            })}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default FocusSelection;
