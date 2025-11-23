import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";

const BirthTime = () => {
  const navigate = useNavigate();
  const [birthTime, setBirthTime] = useState("12:00");

  const handleContinue = () => {
    if (birthTime) {
      // Store in localStorage for later use
      localStorage.setItem('birthTime', birthTime);
      navigate("/onboarding/birth-place");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/birth-date");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={4}
      totalSteps={14}
      title="Birth time"
      subtitle="The moment you entered this world shapes your inner landscape"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
          disabled={!birthTime}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto">
          <BaseCard className="p-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="birthTime" className="text-headline font-medium text-foreground">
                  Time of Birth
                </Label>
                <Input
                  id="birthTime"
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  className="w-full"
                />
                <p className="text-footnote text-muted-foreground">
                  If unsure, choose 12:00 PM
                </p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BirthTime;

