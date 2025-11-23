import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sunrise, Sun, Sunset } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";
import { cn } from "@/lib/utils";

const times = [
  { 
    id: "morning", 
    label: "Morning", 
    description: "Start your day with clarity.",
    icon: Sunrise 
  },
  { 
    id: "afternoon", 
    label: "Afternoon", 
    description: "A moment to reconnect.",
    icon: Sun 
  },
  { 
    id: "evening", 
    label: "Evening", 
    description: "Wind down with guidance.",
    icon: Sunset 
  },
];

const DailyReflections = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleContinue = () => {
    if (selectedTime) {
      localStorage.setItem('dailyReflectionTime', selectedTime);
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
      currentStep={7}
      totalSteps={14}
      title="Daily reflections"
      subtitle="When would you like Aroti to gently check in with you?"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
          disabled={!selectedTime}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto">
          <div className="space-y-4">
            {times.map(({ id, label, description, icon: Icon }, index) => {
              const isSelected = selectedTime === id;
              return (
                <BaseCard
                  key={id}
                  variant="interactive"
                  onClick={() => setSelectedTime(id)}
                  className={cn(
                    "w-full p-6 transition-all duration-300 stagger-fade-up relative",
                    "hover:scale-[1.01] active:scale-[0.99]",
                    isSelected && "scale-[1.01]",
                    isSelected && "bg-gradient-to-br from-accent/15 to-accent/8 shadow-[0_4px_20px_rgba(209,122,82,0.2)]"
                  )}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
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
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-4 rounded-[12px] transition-all duration-300 flex-shrink-0",
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
                    <div className="flex-1 text-left">
                      <h3 className="text-headline font-medium text-foreground mb-2">{label}</h3>
                      <p className="text-body text-muted-foreground leading-relaxed">{description}</p>
                    </div>
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

export default DailyReflections;

