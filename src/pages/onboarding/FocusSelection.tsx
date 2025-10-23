import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Heart, Lightbulb, TrendingUp, Scale, Sparkles, Target } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const focuses = [
  { id: "clarity", label: "Clarity", icon: Lightbulb, color: "text-accent" },
  { id: "love", label: "Love", icon: Heart, color: "text-terracotta" },
  { id: "growth", label: "Growth", icon: TrendingUp, color: "text-accent" },
  { id: "balance", label: "Balance", icon: Scale, color: "text-sage" },
  { id: "healing", label: "Healing", icon: Sparkles, color: "text-terracotta" },
  { id: "purpose", label: "Purpose", icon: Target, color: "text-accent" },
];

const FocusSelection = () => {
  const navigate = useNavigate();
  const [selectedFocuses, setSelectedFocuses] = useState<string[]>([]);

  const toggleFocus = (id: string) => {
    setSelectedFocuses((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
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
      totalSteps={9}
      title="What brings you here?"
      subtitle="Choose the areas you'd like to explore"
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
          <div className="grid grid-cols-2 gap-3">
            {focuses.map(({ id, label, icon: Icon, color }) => {
              const isSelected = selectedFocuses.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleFocus(id)}
                  className={`glass-card p-4 transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? "ring-2 ring-accent bg-white/90"
                      : "hover:bg-white/80"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Icon className={`w-6 h-6 ${color}`} />
                    <span className="font-medium text-sm">{label}</span>
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

export default FocusSelection;
