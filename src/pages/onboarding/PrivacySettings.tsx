import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Shield, Sparkles } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(true);
  const [personalization, setPersonalization] = useState(true);

  const handleContinue = () => {
    navigate("/onboarding/subscription");
  };

  const handleBack = () => {
    navigate("/onboarding/daily-summary");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={6}
      totalSteps={9}
      title="Privacy & insights"
      subtitle="Customize your experience while keeping your data secure"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto">
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base">Analytics</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Help us improve Aroti by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch
                    checked={analytics}
                    onCheckedChange={setAnalytics}
                    className="ml-4"
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base">Personalized insights</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Get tailored guidance based on your patterns and preferences
                    </p>
                  </div>
                  <Switch
                    checked={personalization}
                    onCheckedChange={setPersonalization}
                    className="ml-4"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 mt-4">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Your birth details and readings are encrypted and private. We never share your personal information with third parties.
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default PrivacySettings;
