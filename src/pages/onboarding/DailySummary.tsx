import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useState } from "react";
import { Sunrise, Sun, Sunset } from "lucide-react";

const times = [
  { id: "morning", label: "Morning", time: "7:00 AM", icon: Sunrise },
  { id: "afternoon", label: "Afternoon", time: "1:00 PM", icon: Sun },
  { id: "evening", label: "Evening", time: "7:00 PM", icon: Sunset },
];

const DailySummary = () => {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleComplete = () => {
    if (selectedTime) {
      navigate("/onboarding/privacy");
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <ProgressBar currentStep={5} totalSteps={9} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl">Daily reflections</h2>
            <p className="text-muted-foreground">
              When would you like to receive your daily guidance?
            </p>
          </div>

          <div className="space-y-4">
            {times.map(({ id, label, time, icon: Icon }) => {
              const isSelected = selectedTime === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedTime(id)}
                  className={`glass-card w-full p-6 transition-all duration-300 hover:scale-[1.02] ${
                    isSelected
                      ? "ring-2 ring-accent bg-white/90"
                      : "hover:bg-white/80"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${isSelected ? 'bg-gradient-to-br from-secondary to-primary' : 'bg-muted'}`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-accent'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg">{label}</h3>
                      <p className="text-sm text-muted-foreground">{time}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            variant="pill"
            size="lg"
            onClick={handleComplete}
            disabled={!selectedTime}
            className="w-full"
          >
            Complete Setup
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            You can always change this later in settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;
