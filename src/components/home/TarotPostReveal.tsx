import { useState, useEffect } from "react";
import tarotFool from "@/assets/tarot-fool.png";

interface TarotPostRevealProps {
  card: {
    name: string;
    keywords: string[];
    interpretation: string;
    guidance: string[];
  };
}

export const TarotPostReveal = ({ card }: TarotPostRevealProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay content appearance for dramatic effect
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="glass-card p-6 space-y-6 relative overflow-hidden">
      {/* Magical sparkles */}
      <div className="absolute top-4 right-4 text-accent text-lg animate-pulse">✨</div>
      <div className="absolute top-8 left-4 text-accent text-sm animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute bottom-8 right-8 text-accent text-base animate-pulse" style={{ animationDelay: '1s' }}>✨</div>

      {/* Card Art & Title */}
      <div className="text-center space-y-4">
        <div className="relative">
          <img
            src={tarotFool}
            alt={card.name}
            className="w-32 h-48 mx-auto rounded-xl shadow-glow animate-scale-in"
          />
          {/* Card glow effect */}
          <div className="absolute inset-0 w-32 h-48 mx-auto rounded-xl bg-accent/10 animate-pulse" />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-serif text-foreground animate-fade-in">{card.name}</h3>
          
          {showContent && (
            <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
              {card.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full border border-accent/20 hover:bg-accent/20 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {showContent && (
        <>
          {/* Interpretation */}
          <div className="space-y-3 animate-fade-in">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <span className="text-accent">🔮</span>
              Interpretation
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.interpretation}
            </p>
          </div>

          {/* Today's Guidance */}
          <div className="space-y-3 animate-fade-in">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <span className="text-accent">💫</span>
              Today's Guidance
            </h4>
            <ul className="space-y-3">
              {card.guidance.map((tip, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-sm text-muted-foreground animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0 animate-pulse" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
