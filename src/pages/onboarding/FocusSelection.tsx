import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useState } from "react";
import { Heart, Lightbulb, TrendingUp, Scale, Sparkles, Target } from "lucide-react";

const focuses = [
  { id: "clarity", label: "Clarity", icon: Lightbulb, color: "text-accent" },
  { id: "love", label: "Love", icon: Heart, color: "text-terracotta" },
  { id: "growth", label: "Growth", icon: TrendingUp, color: "text-accent" },
  { id: "balance", label: "Balance", icon: Scale, color: "text-sage" },
  { id: "healing", label: "Healing", icon: Sparkles, color: "text-terracotta" },
  { id: "purpose", label: "Purpose", icon: Target, color: "text-accent" },
];

const FocusSelection = () => {
  const navigate = useNavigate();
  const [selectedFocuses, setSelectedFocuses] = useState<string[]>([]);

  const toggleFocus = (id: string) => {
    setSelectedFocuses((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (selectedFocuses.length > 0) {
      navigate("/onboarding/path");
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <ProgressBar currentStep={1} totalSteps={5} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl">What brings you here?</h2>
            <p className="text-muted-foreground">
              Choose the areas you'd like to explore
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {focuses.map(({ id, label, icon: Icon, color }) => {
              const isSelected = selectedFocuses.includes(id);
              return (
                <button
                  key={id}
                  onClick={() => toggleFocus(id)}
                  className={`glass-card p-6 transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? "ring-2 ring-accent bg-white/90"
                      : "hover:bg-white/80"
                  }`}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Icon className={`w-8 h-8 ${color}`} />
                    <span className="font-medium">{label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            variant="pill"
            size="lg"
            onClick={handleContinue}
            disabled={selectedFocuses.length === 0}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FocusSelection;
