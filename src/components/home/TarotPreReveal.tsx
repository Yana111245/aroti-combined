import { useState, useEffect } from "react";
import tarotBack from "@/assets/tarot-back.png";

interface TarotPreRevealProps {
  onReveal: () => void;
  isRevealing?: boolean;
}

export const TarotPreReveal = ({ onReveal, isRevealing = false }: TarotPreRevealProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="liquid-glass-card p-8 text-center space-y-6 animate-fade-in relative overflow-hidden">
      {/* Floating particles */}
      {!isRevealing && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-accent/20 rounded-full particle-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="relative">
        <img
          src={tarotBack}
          alt="Tarot card back"
          className={`w-[70vw] h-[85vw] mx-auto rounded-[12px] transition-all duration-700 ${
            isRevealing 
              ? 'reveal-flip scale-110' 
              : 'liquid-glass-glow hover:scale-105 cursor-pointer'
          }`}
          onClick={!isRevealing ? onReveal : undefined}
        />
        
        {!isRevealing && (
          <>
            {/* Pulsing glow ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-accent/10 rounded-full animate-ping" />
            </div>
            
            {/* Tap indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/30 backdrop-blur-sm rounded-full p-4 animate-pulse">
                <div className="w-3 h-3 bg-accent rounded-full animate-bounce" />
              </div>
            </div>
          </>
        )}
        
        {isRevealing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-accent text-2xl animate-spin">✨</div>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        <h3 className="text-title-2 text-foreground">
          {isRevealing ? "Revealing your insight..." : "Tap to reveal your daily insight"}
        </h3>
        <p className="text-body text-muted-foreground">
          {isRevealing ? "The universe is aligning your guidance" : "Your card awaits with guidance for today"}
        </p>
      </div>
    </div>
  );
};
