import { useState, useEffect } from "react";
import tarotBack from "@/assets/tarot-back.png";

interface TarotCardPreRevealProps {
  onReveal: () => void;
}

export const TarotCardPreReveal = ({ onReveal }: TarotCardPreRevealProps) => {
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
    <div 
      className="apple-material-card-interactive liquid-glass-card p-3 text-center space-y-2.5 cursor-pointer group relative overflow-hidden min-h-[240px]"
      onClick={onReveal}
    >
      {/* Shimmer effect */}
      <div className="apple-material-shimmer absolute inset-0 rounded-[12px]" />
      
      {/* Floating particles */}
      {particles.map((particle) => (
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

      {/* Bigger artwork - 72% width, 3:5 aspect ratio */}
      <div className="relative mx-auto" style={{ width: '72%', aspectRatio: '3/5' }}>
        <img 
          src={tarotBack} 
          alt="Tarot Card Back"
          className="w-full h-full object-cover rounded-[12px] transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-[12px]" />
      </div>
      
      {/* Tighter text */}
      <div className="space-y-1.5">
        <h3 className="text-headline text-foreground">Today's Tarot Card</h3>
        <p className="text-callout text-muted-foreground opacity-75">Tap to reveal your guidance</p>
      </div>
      
      {/* Enhanced shimmer effect - much more visible tap indicator */}
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
      
      {/* Additional glow layer for more prominence */}
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-t from-accent/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-600 pointer-events-none" />
      
      {/* Subtle pulsing border on hover */}
      <div className="absolute inset-0 rounded-[12px] border-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
      
      {/* Tap indicator - subtle dot with pulsing animation */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-accent/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none tap-indicator" />
    </div>
  );
};
