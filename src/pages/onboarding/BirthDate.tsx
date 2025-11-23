import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";

const BirthDate = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState("");

  const handleContinue = () => {
    if (birthDate) {
      // Store in localStorage for later use
      localStorage.setItem('birthDate', birthDate);
      navigate("/onboarding/birth-time");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/path");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={3}
      totalSteps={14}
      title="Your cosmic blueprint"
      subtitle="Let's discover the stars that guided your arrival"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
          disabled={!birthDate}
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
                <Label htmlFor="birthDate" className="text-headline font-medium text-foreground">
                  Date of Birth
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full"
                />
                <p className="text-footnote text-muted-foreground">
                  Format: dd.mm.yyyy
                </p>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BirthDate;

