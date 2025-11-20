import { Sparkles, Bookmark, Shuffle } from "lucide-react";
import { useState, useEffect } from "react";
import { Affirmation } from "@/utils/dailyAffirmations";
import { isAffirmationSaved, toggleSavedAffirmation, SavedAffirmation } from "@/utils/savedAffirmations";

interface DailyAffirmationProps {
  affirmation: Affirmation;
  shuffleCount: number;
  canShuffle: boolean;
  onShuffle: () => void;
  onView: () => void;
}

export const DailyAffirmation = ({ 
  affirmation, 
  shuffleCount, 
  canShuffle, 
  onShuffle, 
  onView 
}: DailyAffirmationProps) => {
  const [isSaved, setIsSaved] = useState(false);

  // Check saved status when affirmation changes
  useEffect(() => {
    setIsSaved(isAffirmationSaved(affirmation.id));
  }, [affirmation.id]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const savedAffirmation: SavedAffirmation = {
      id: affirmation.id,
      text: affirmation.text,
      meaning: affirmation.meaning,
      date: new Date().toISOString().split('T')[0]
    };
    const newSavedState = toggleSavedAffirmation(savedAffirmation);
    setIsSaved(newSavedState);
  };

  return (
    <div 
      className="liquid-glass-card rounded-[16px] p-5 border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group"
      onClick={onView}
      role="button"
      tabIndex={0}
      aria-label={`View daily affirmation: ${affirmation.text}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView();
        }
      }}
    >
      {/* Header Row */}
      <div className="flex items-center justify-end mb-1">
        {/* Right: Save Button */}
        <button
          onClick={handleSaveClick}
          className="p-1.5 rounded-[8px] hover:bg-white/5 transition-colors duration-200"
          aria-label={isSaved ? "Unsave affirmation" : "Save affirmation"}
        >
          <Bookmark 
            className={`w-4 h-4 ${isSaved ? 'fill-accent text-accent' : 'text-muted-foreground'}`} 
          />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-headline text-foreground font-semibold leading-tight mb-3 text-center">
        Daily Affirmation
      </h3>

      {/* Affirmation Text */}
      <div className="relative mb-4">
        {/* Optional glow effect */}
        <div className="absolute inset-0 blur-sm opacity-20" style={{
          background: 'radial-gradient(circle, rgba(209, 122, 82, 0.3) 0%, transparent 70%)'
        }} />
        <p className="text-body text-foreground text-center leading-relaxed relative z-10" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          "{affirmation.text}"
        </p>
      </div>

      {/* Footer Row */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (canShuffle) {
              onShuffle();
            }
          }}
          disabled={!canShuffle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-footnote hover:bg-white/10 hover:border-glass-highlight hover:text-foreground transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={canShuffle ? "Get new affirmation" : "Daily shuffle limit reached"}
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>New one</span>
        </button>
        
        {shuffleCount > 0 && (
          <p className="text-[10px] text-muted-foreground opacity-60">
            Shuffled {shuffleCount} time{shuffleCount > 1 ? 's' : ''} today
          </p>
        )}
      </div>
    </div>
  );
};
