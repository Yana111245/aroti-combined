import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sparkles, Star } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const CheeringScreen = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Auto-continue after 1.5 seconds, but also show button after 1 second
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    const autoContinueTimer = setTimeout(() => {
      navigate("/onboarding/how-to-use");
    }, 1500);

    return () => {
      clearTimeout(buttonTimer);
      clearTimeout(autoContinueTimer);
    };
  }, [navigate]);

  const handleContinue = () => {
    navigate("/onboarding/how-to-use");
  };

  const handleBack = () => {
    navigate("/onboarding/privacy");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={9}
      totalSteps={14}
      title="You're almost there"
      subtitle="We're crafting your personalized cosmic journey…"
      ctaButton={
        showButton && (
          <CTAButton
            onClick={handleContinue}
            icon={<Sparkles className="w-5 h-5" />}
          >
            Continue
          </CTAButton>
        )
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="relative flex justify-center items-center h-64">
            {/* Constellation shimmer effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-accent/40 rounded-full animate-pulse"
                  style={{
                    left: `${50 + Math.cos((i * Math.PI * 2) / 12) * 80}%`,
                    top: `${50 + Math.sin((i * Math.PI * 2) / 12) * 80}%`,
                    animationDelay: `${i * 0.1}s`,
                    filter: 'drop-shadow(0 0 8px rgba(209, 122, 82, 0.6))'
                  }}
                />
              ))}
            </div>
            
            {/* Central mandala/sparkle */}
            <div className="relative z-10">
              <div className="relative">
                <Star className="w-16 h-16 text-accent animate-pulse" 
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(209, 122, 82, 0.6))'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/30 to-accent/20 opacity-50 blur-2xl rounded-full animate-pulse" />
              </div>
            </div>

            {/* Golden spark particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full animate-ping"
                style={{
                  left: `${50 + Math.cos((i * Math.PI * 2) / 6) * 100}%`,
                  top: `${50 + Math.sin((i * Math.PI * 2) / 6) * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CheeringScreen;

