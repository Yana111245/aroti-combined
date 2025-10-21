import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useState } from "react";
import { Bot, User, Users } from "lucide-react";

const paths = [
  {
    id: "ai",
    title: "AI Guidance",
    description: "Instant insights available anytime, powered by advanced AI",
    icon: Bot,
  },
  {
    id: "human",
    title: "Human Mentor",
    description: "Connect with certified specialists for personalized sessions",
    icon: User,
  },
  {
    id: "hybrid",
    title: "Hybrid",
    description: "Blend AI convenience with human wisdom for balanced guidance",
    icon: Users,
  },
];

const PathType = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<string>("");

  const handleContinue = () => {
    if (selectedPath) {
      navigate("/onboarding/birth-details");
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <ProgressBar currentStep={2} totalSteps={5} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl">Choose your path</h2>
            <p className="text-muted-foreground">
              How would you like to receive guidance?
            </p>
          </div>

          <div className="space-y-4">
            {paths.map(({ id, title, description, icon: Icon }) => {
              const isSelected = selectedPath === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedPath(id)}
                  className={`glass-card w-full p-6 text-left transition-all duration-300 hover:scale-[1.02] ${
                    isSelected
                      ? "ring-2 ring-accent bg-white/90"
                      : "hover:bg-white/80"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-2xl ${isSelected ? 'bg-gradient-to-br from-secondary to-primary' : 'bg-muted'}`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-accent'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            variant="pill"
            size="lg"
            onClick={handleContinue}
            disabled={!selectedPath}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PathType;
