import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const isFormValid = birthDate && birthTime && birthLocation;

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <ProgressBar currentStep={3} totalSteps={5} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl">Your cosmic blueprint</h2>
            <p className="text-muted-foreground">
              We'll use this to create your personalized astrological profile
            </p>
          </div>

          <div className="glass-card p-8 space-y-6">
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

          <Button
            variant="pill"
            size="lg"
            onClick={handleContinue}
            disabled={!isFormValid}
            className="w-full"
          >
            Continue
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your data is encrypted and never shared
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthDetails;
