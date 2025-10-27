import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

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
        
        <h1 className="font-title text-4xl font-medium">
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
            {/* CSS-generated tarot card back - matches Celestial theme */}
            <div className="w-64 h-[426px] bg-gradient-to-br from-[hsl(235,30%,11%)] to-[hsl(240,28%,13%)] rounded-3xl border border-[rgba(255,255,255,0.08)] shadow-[var(--shadow-soft)] relative overflow-hidden">
              
              {/* Mystical pattern overlay with copper accents */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-[hsl(20,55%,58%)] rounded-full animate-pulse" />
                <div className="absolute top-[30%] right-[25%] w-1 h-1 bg-[hsl(20,55%,58%)] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-[20%] left-[15%] w-1 h-1 bg-[hsl(20,55%,58%)] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-[40%] right-[20%] w-1 h-1 bg-[hsl(20,55%,58%)] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
              </div>
              
              {/* Central mystical symbol - copper gradient */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute -inset-4 border border-accent/20 rounded-full animate-pulse opacity-60" />
                  
                  {/* Main symbol circle */}
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/40 to-accent/20 rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(209,122,82,0.35)] border border-accent/30 backdrop-blur-sm">
                    <div className="text-2xl text-accent font-bold leading-none">✦</div>
                  </div>
                  
                  {/* Inner glow */}
                  <div className="absolute inset-0 w-16 h-16 bg-accent/10 rounded-full blur-md" />
                </div>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-3 left-3 w-4 h-4 border border-accent/20 rounded-full flex items-center justify-center opacity-50">
                <div className="w-1 h-1 bg-accent/40 rounded-full" />
              </div>
              <div className="absolute top-3 right-3 w-4 h-4 border border-accent/20 rounded-full flex items-center justify-center opacity-50">
                <div className="w-1 h-1 bg-accent/40 rounded-full" />
              </div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border border-accent/20 rounded-full flex items-center justify-center opacity-50">
                <div className="w-1 h-1 bg-accent/40 rounded-full" />
              </div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border border-accent/20 rounded-full flex items-center justify-center opacity-50">
                <div className="w-1 h-1 bg-accent/40 rounded-full" />
              </div>
              
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent rounded-3xl" />
            </div>
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
