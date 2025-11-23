import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Shield, Sparkles } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(true);
  const [personalization, setPersonalization] = useState(true);

  const handleContinue = () => {
    navigate("/onboarding/cheering");
  };

  const handleBack = () => {
    navigate("/onboarding/daily-reflections");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={8}
      totalSteps={14}
      title="Privacy & insights"
      subtitle="Your sacred space, your control"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto space-y-6">
          <BaseCard className="p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-headline font-medium text-foreground">Analytics</h3>
                      <p className="text-body text-muted-foreground mt-2 leading-relaxed">
                        Help us improve Aroti by sharing anonymous data
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

              <div className="h-px bg-glass-border" />

              <div className="flex items-start gap-4">
                <Sparkles className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-headline font-medium text-foreground">Personalized insights</h3>
                      <p className="text-body text-muted-foreground mt-2 leading-relaxed">
                        Tailor your guidance based on patterns
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
          </BaseCard>

          <BaseCard className="p-6">
            <p className="text-body text-muted-foreground text-center leading-relaxed">
              Your birth details and readings are encrypted and private
            </p>
          </BaseCard>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default PrivacySettings;
