import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import arotiLogo from "@/assets/aroti-logo.png";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const Finish = () => {
  const navigate = useNavigate();

  return (
    <OnboardingLayout 
      showBackButton={false}
      currentStep={9}
      totalSteps={9}
      title="You're all set"
      subtitle="Your journey to inner balance begins now"
      ctaButton={
        <CTAButton
          onClick={() => navigate("/home")}
          icon={<Sparkles className="w-5 h-5" />}
        >
          Enter Aroti
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative animate-glow">
                <img 
                  src={arotiLogo} 
                  alt="Aroti" 
                  className="h-24 w-24 animate-scale-in"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-20 blur-3xl rounded-full" />
              </div>
            </div>
            
            <div className="glass-card p-6 space-y-3">
              <Sparkles className="w-6 h-6 text-accent mx-auto" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Aroti will guide you through daily insights, personalized readings, and meaningful reflections
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              Begin with your first daily reading
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Finish;
