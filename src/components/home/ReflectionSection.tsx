import { Plus, Pencil } from "lucide-react";

interface ReflectionSectionProps {
  hasReflection: boolean;
  reflection?: string;
  onAddReflection: () => void;
  reflectionTimestamp?: Date;
}

export const ReflectionSection = ({ hasReflection, reflection, onAddReflection, reflectionTimestamp }: ReflectionSectionProps) => {
  // Format timestamp for "Added today at X:XX PM"
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      const minutesStr = minutes.toString().padStart(2, '0');
      return `Added today at ${hour12}:${minutesStr} ${ampm}`;
    }
    return null;
  };

  return (
    <div 
      className="liquid-glass-card rounded-[16px] p-5 border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300"
    >
      {/* Title - matching Today's Ritual */}
      <h3 className="text-headline text-foreground font-semibold leading-tight mb-3">
        Your Reflection
      </h3>
      
      {/* Reflection Preview or Empty State */}
      {hasReflection && reflection ? (
        <div className="space-y-4">
          {/* Preview with fade truncation */}
          <div className="relative min-h-[60px]">
            <p 
              className="text-body text-muted-foreground italic leading-[1.4]"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
              }}
            >
              {reflection}
            </p>
            {/* Fade gradient overlay for truncation - only show if text might be truncated */}
            {reflection.length > 150 && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgba(23, 20, 31, 0.95))',
                }}
              />
            )}
          </div>
          
          {/* Optional timestamp */}
          {reflectionTimestamp && (
            <p className="text-footnote text-muted-foreground/60">
              {formatTimestamp(reflectionTimestamp)}
            </p>
          )}
          
          {/* Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddReflection();
            }}
            className="w-full mt-4 px-4 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 flex items-center justify-center"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Reflection
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-footnote text-muted-foreground">
            Write something small about your day or energy.
          </p>
          
          {/* Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddReflection();
            }}
            className="w-full mt-4 px-4 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Reflection
          </button>
        </div>
      )}
    </div>
  );
};
