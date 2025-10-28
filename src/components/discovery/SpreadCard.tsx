interface SpreadCardProps {
  id: string;
  title: string;
  description: string;
  cardCount: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate?: string;
  onClick?: () => void;
}

export const SpreadCard = ({ 
  id, 
  title, 
  description, 
  cardCount, 
  difficulty = 'Beginner',
  timeEstimate = '15 min',
  onClick 
}: SpreadCardProps) => {
  const difficultyColors = {
    Beginner: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    Intermediate: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    Advanced: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
  };

  return (
    <div 
      className="flex-shrink-0 w-48 cursor-pointer group"
      onClick={onClick}
    >
      {/* Enhanced card with dark celestial gradient */}
      <div className="relative h-40 flex apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 mb-3 group-hover:scale-105">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-title font-medium text-foreground mb-2 drop-shadow-lg">{title}</h3>
            <p className="text-sm text-muted-foreground drop-shadow-lg">{description}</p>
          </div>
        </div>
        
        {/* Subtle liquid glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
        
        {/* Decorative shimmer element */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full liquid-glass-shimmer" />
        
        {/* Enhanced overlays */}
        <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          <span className="text-footnote text-white font-body">{cardCount} cards</span>
        </div>
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-footnote font-body border ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>
      
      <h3 className="font-title text-base font-medium text-foreground mb-1 line-clamp-1">{title}</h3>
      <p className="text-footnote text-muted-foreground responsive-text-clamp mb-2">{description}</p>
      <div className="flex items-center gap-2 text-footnote text-muted-foreground">
        <span className="font-body">{timeEstimate}</span>
      </div>
    </div>
  );
};
