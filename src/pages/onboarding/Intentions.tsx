import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useState } from "react";

const intentions = [
  "Insight",
  "Purpose",
  "Calm",
  "Healing",
  "Growth",
  "Love",
  "Clarity",
  "Strength",
  "Abundance",
  "Balance",
  "Creativity",
  "Connection",
];

const Intentions = () => {
  const navigate = useNavigate();
  const [selectedIntentions, setSelectedIntentions] = useState<string[]>([]);

  const toggleIntention = (intention: string) => {
    setSelectedIntentions((prev) =>
      prev.includes(intention)
        ? prev.filter((i) => i !== intention)
        : [...prev, intention]
    );
  };

  const handleContinue = () => {
    if (selectedIntentions.length > 0) {
      navigate("/onboarding/daily-summary");
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <ProgressBar currentStep={4} totalSteps={9} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl">Set your intentions</h2>
            <p className="text-muted-foreground">
              Choose what you'd like to cultivate in your life
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {intentions.map((intention) => {
              const isSelected = selectedIntentions.includes(intention);
              return (
                <button
                  key={intention}
                  onClick={() => toggleIntention(intention)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? "bg-gradient-to-r from-secondary to-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "glass-card border border-accent/20 text-foreground hover:border-accent/40"
                  }`}
                >
                  {intention}
                </button>
              );
            })}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Selected: {selectedIntentions.length}
          </div>

          <Button
            variant="pill"
            size="lg"
            onClick={handleContinue}
            disabled={selectedIntentions.length === 0}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Intentions;
