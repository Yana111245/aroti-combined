import { Check } from "lucide-react";

interface Ritual {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  intention: string;
  steps: string[];
  affirmation?: string;
}

interface TodaysRitualProps {
  ritual: Ritual | null;
  isCompleted: boolean;
  onBegin: () => void;
}

export const TodaysRitual = ({ ritual, isCompleted, onBegin }: TodaysRitualProps) => {
  if (!ritual) {
    return (
      <div className="liquid-glass-card rounded-[16px] p-4 border border-glass-border shadow-glass">
        <div className="text-center py-6">
          <p className="text-body text-muted-foreground">
            Your ritual will appear soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="liquid-glass-card rounded-[16px] p-4 border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group"
      onClick={onBegin}
      role="button"
      tabIndex={0}
      aria-label={`${isCompleted ? 'View again' : 'Begin'} today's ritual: ${ritual.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onBegin();
        }
      }}
    >
      <div>
        {/* Header with title, completion status, and chips */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-headline text-foreground font-semibold leading-tight">
                Today's Ritual
              </h3>
            </div>
            {isCompleted && (
              <p className="text-footnote text-accent mb-1 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Completed today
              </p>
            )}
            <p className="text-footnote text-muted-foreground">
              {ritual.description}
            </p>
          </div>
          {/* Chips on the top right - same line */}
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
              {ritual.duration}
            </span>
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
              {ritual.type}
            </span>
          </div>
        </div>

        {/* Button - matching Book session button style */}
        <button
          className="w-full mt-3 px-4 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          onClick={(e) => {
            e.stopPropagation();
            onBegin();
          }}
        >
          {isCompleted ? 'View Again' : 'Begin Practice'}
        </button>
      </div>
    </div>
  );
};

