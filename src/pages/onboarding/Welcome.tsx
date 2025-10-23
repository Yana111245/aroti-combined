import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import arotiLogo from "@/assets/aroti-logo.png";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <OnboardingLayout
      title="Welcome to Aroti"
      subtitle="Your path to balance begins within"
      ctaButton={
        <CTAButton
          onClick={() => navigate("/onboarding/focus")}
          icon={<Sparkles className="w-5 h-5" />}
        >
          Get Started
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <img 
                src={arotiLogo} 
                alt="Aroti" 
                className="h-20 w-20 animate-scale-in"
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Discover guidance through Tarot, Astrology & AI
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Welcome;
