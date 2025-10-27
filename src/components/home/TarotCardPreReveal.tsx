import { useState, useEffect } from "react";

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

      {/* CSS-generated tarot card back - matches Celestial theme */}
      <div className="relative mx-auto" style={{ width: '72%', aspectRatio: '3/5' }}>
        {/* Base dark glass card */}
        <div className="w-full h-full bg-gradient-to-br from-[hsl(235,30%,11%)] to-[hsl(240,28%,13%)] rounded-[12px] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.35)] relative overflow-hidden">
          
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
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent rounded-[12px]" />
          
          {/* Hover shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-[12px]" />
        </div>
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
