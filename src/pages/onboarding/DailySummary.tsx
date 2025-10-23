import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sunrise, Sun, Sunset } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const times = [
  { id: "morning", label: "Morning", time: "7:00 AM", icon: Sunrise },
  { id: "afternoon", label: "Afternoon", time: "1:00 PM", icon: Sun },
  { id: "evening", label: "Evening", time: "7:00 PM", icon: Sunset },
];

const DailySummary = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleComplete = () => {
    if (selectedTime) {
      navigate("/onboarding/privacy");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/intentions");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={5}
      totalSteps={9}
      title="Daily reflections"
      subtitle="When would you like to receive your daily guidance?"
      ctaButton={
        <CTAButton
          onClick={handleComplete}
          disabled={!selectedTime}
        >
          Complete Setup
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto">
          <div className="space-y-3">
            {times.map(({ id, label, time, icon: Icon }) => {
              const isSelected = selectedTime === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedTime(id)}
                  className={`glass-card w-full p-4 transition-all duration-300 hover:scale-[1.02] ${
                    isSelected
                      ? "ring-2 ring-accent bg-white/90"
                      : "hover:bg-white/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-gradient-to-br from-secondary to-primary' : 'bg-muted'}`}>
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-accent'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-base">{label}</h3>
                      <p className="text-sm text-muted-foreground">{time}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4">
            You can always change this later in settings
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default DailySummary;
