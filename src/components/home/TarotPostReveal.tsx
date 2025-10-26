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
    <div className="apple-material-card-elevated p-8 space-y-8 relative overflow-hidden apple-material-glow">
      {/* Floating golden dust particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-accent/20 rounded-full golden-dust" />
      <div className="absolute top-8 left-4 w-1 h-1 bg-accent/30 rounded-full golden-dust" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-accent/25 rounded-full golden-dust" style={{ animationDelay: '1s' }} />

      {/* Card Art & Title */}
      <div className="text-center space-y-6">
        <div className="relative">
          <img
            src={tarotFool}
            alt={card.name}
            className="w-[70vw] h-[85vw] mx-auto rounded-[12px] breathing-glow animate-scale-in apple-material-shimmer"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-title-1 text-foreground animate-fade-in">{card.name}</h3>
          
          {showContent && (
            <div className="flex flex-wrap justify-center gap-3 animate-fade-in">
              {card.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 glassmorphic-chip text-sm font-medium rounded-[24px] transition-all duration-300 hover:bg-accent/20"
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
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-headline text-foreground text-left">
              Interpretation
            </h4>
            <p className="text-body text-muted-foreground">
              {card.interpretation}
            </p>
          </div>

          {/* Today's Guidance */}
          <div className="space-y-4 animate-fade-in">
            <h4 className="text-headline text-foreground text-left">
              Today's Guidance
            </h4>
            <ul className="space-y-4">
              {card.guidance.map((tip, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-body text-muted-foreground animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
