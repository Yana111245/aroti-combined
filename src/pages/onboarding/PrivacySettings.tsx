import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Shield, Sparkles } from "lucide-react";

const PrivacySettings = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(true);
  const [personalization, setPersonalization] = useState(true);

  const handleContinue = () => {
    navigate("/onboarding/subscription");
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <ProgressBar currentStep={6} totalSteps={9} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl">Privacy & insights</h2>
            <p className="text-muted-foreground">
              Customize your experience while keeping your data secure
            </p>
          </div>

          <div className="glass-card p-8 space-y-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Analytics</h3>
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

            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Personalized insights</h3>
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

          <div className="glass-card p-6">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Your birth details and readings are encrypted and private. We never share your personal information with third parties.
            </p>
          </div>

          <Button
            variant="pill"
            size="lg"
            onClick={handleContinue}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
