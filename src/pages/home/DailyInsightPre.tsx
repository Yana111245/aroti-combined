import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import tarotBack from "@/assets/tarot-back.png";

const DailyInsightPre = () => {
  const navigate = useNavigate();
  const [isRevealing, setIsRevealing] = useState(false);

  const handleReveal = () => {
    setIsRevealing(true);
    setTimeout(() => {
      navigate("/home/daily-insight-post");
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="px-6 py-8 space-y-4">
        <p className="text-sm text-muted-foreground">Daily Reading</p>
        
        <h1 className="font-subtitle text-4xl">
          Your Card Awaits
        </h1>
        
        <p className="text-muted-foreground leading-relaxed">
          Take a moment to center yourself. What question weighs on your heart today?
        </p>
      </div>

      {/* Card Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-24">
        <div className="relative">
          <div 
            className={`transition-all duration-700 ${
              isRevealing ? "scale-110 opacity-0 rotate-180" : "scale-100 opacity-100"
            }`}
          >
            <img
              src={tarotBack}
              alt="Tarot Card Back"
              className="w-64 rounded-3xl shadow-[var(--shadow-soft)]"
              style={{ filter: "blur(4px)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-3xl" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-accent animate-pulse" />
          </div>
        </div>

        <div className="mt-12 text-center space-y-6 w-full max-w-md">
          <p className="text-sm text-muted-foreground">
            Breathe deeply and tap when you&apos;re ready
          </p>

          <Button
            variant="pill"
            size="lg"
            onClick={handleReveal}
            disabled={isRevealing}
            className="w-full animate-glow"
          >
            {isRevealing ? "Revealing..." : "Reveal Your Card"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyInsightPre;
