import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import arotiLogo from "@/assets/aroti-logo.png";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";

const Finish = () => {
  const navigate = useNavigate();

  return (
    <OnboardingLayout 
      showBackButton={false}
      currentStep={14}
      totalSteps={14}
      title="You're all set"
      subtitle="Your journey to inner wisdom and balance begins now"
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
        <div className="w-full max-w-md mx-auto text-center space-y-8">
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
          
          <BaseCard className="p-8">
            <p className="text-body text-muted-foreground leading-relaxed">
              Aroti will gently guide you with personalized insights, daily reflections, and meaningful readings tailored to your unique path
            </p>
          </BaseCard>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default Finish;
