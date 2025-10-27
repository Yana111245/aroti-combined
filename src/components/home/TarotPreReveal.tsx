import { useState, useEffect } from "react";

interface TarotPreRevealProps {
  onReveal: () => void;
  isRevealing?: boolean;
}

export const TarotPreReveal = ({ onReveal, isRevealing = false }: TarotPreRevealProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [isPressed, setIsPressed] = useState(false);

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
    <div className="apple-material-card-elevated p-8 text-center space-y-6 animate-fade-in relative overflow-hidden apple-material-glow">
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
        {/* CSS-generated tarot card back - matches Celestial theme */}
        <div 
          className={`w-[70vw] h-[85vw] mx-auto rounded-[12px] transition-all duration-700 apple-material-shimmer apple-touch-target-comfortable ${
            isRevealing 
              ? 'reveal-flip scale-110' 
              : `hover:scale-105 cursor-pointer ${isPressed ? 'scale-95' : ''}`
          }`}
          onClick={!isRevealing ? onReveal : undefined}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          onTouchCancel={() => setIsPressed(false)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          role="button"
          tabIndex={0}
          aria-label="Reveal your daily tarot card insight"
          aria-describedby="tarot-description"
        >
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
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 rounded-[12px]" />
          </div>
        </div>
        
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
        <p id="tarot-description" className="text-body text-muted-foreground">
          {isRevealing ? "The universe is aligning your guidance" : "Your card awaits with guidance for today"}
        </p>
      </div>
    </div>
  );
};
