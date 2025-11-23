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
          Begin Your Journey
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={arotiLogo} 
                  alt="Aroti" 
                  className="h-28 w-28 animate-scale-in"
                  style={{
                    filter: 'drop-shadow(0 0 24px rgba(209, 122, 82, 0.5))',
                    animation: 'scale-in 0.6s ease-out, glow 3s ease-in-out infinite'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/40 to-accent/25 opacity-60 blur-3xl rounded-full -z-10 animate-pulse" />
              </div>
            </div>
            
            <p className="text-body text-muted-foreground leading-relaxed">
              Guidance through Tarot, Astrology & AI
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Welcome;
