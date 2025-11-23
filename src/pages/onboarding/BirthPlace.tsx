import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";

const BirthPlace = () => {
  const navigate = useNavigate();
  const [birthPlace, setBirthPlace] = useState("");

  const handleContinue = () => {
    if (birthPlace) {
      // Store in localStorage for later use
      localStorage.setItem('birthPlace', birthPlace);
      navigate("/onboarding/intentions");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/birth-time");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={5}
      totalSteps={14}
      title="Place of birth"
      subtitle="Where your journey began in this world"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
          disabled={!birthPlace}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto space-y-6">
          <BaseCard className="p-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="birthPlace" className="text-headline font-medium text-foreground">
                  City, Country
                </Label>
                <Input
                  id="birthPlace"
                  type="text"
                  placeholder="e.g., San Francisco, USA"
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </BaseCard>

          <BaseCard className="p-5">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
              <p className="text-body text-muted-foreground leading-relaxed">
                Your data is encrypted and never shared
              </p>
            </div>
          </BaseCard>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BirthPlace;

