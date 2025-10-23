import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const BirthDetails = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthLocation, setBirthLocation] = useState("");

  const handleContinue = () => {
    if (birthDate && birthTime && birthLocation) {
      navigate("/onboarding/intentions");
    }
  };

  const handleBack = () => {
    navigate("/onboarding/path");
  };

  const isFormValid = birthDate && birthTime && birthLocation;

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={3}
      totalSteps={9}
      title="Your cosmic blueprint"
      subtitle="We'll use this to create your personalized astrological profile"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
          disabled={!isFormValid}
        >
          Continue
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto">
          <div className="glass-card p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-medium">
                Date of Birth
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="glass-card border-accent/30 focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthTime" className="text-sm font-medium">
                Time of Birth
              </Label>
              <Input
                id="birthTime"
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="glass-card border-accent/30 focus:border-accent"
              />
              <p className="text-xs text-muted-foreground">
                If unsure, use 12:00 PM as an estimate
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthLocation" className="text-sm font-medium">
                Place of Birth
              </Label>
              <Input
                id="birthLocation"
                type="text"
                placeholder="City, Country"
                value={birthLocation}
                onChange={(e) => setBirthLocation(e.target.value)}
                className="glass-card border-accent/30 focus:border-accent"
              />
            </div>
          </div>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            Your data is encrypted and never shared
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BirthDetails;
