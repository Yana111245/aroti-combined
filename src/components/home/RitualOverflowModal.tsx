import { useState } from "react";
import { Share2, Sparkles, Check } from "lucide-react";
import { LiquidGlassDialog, LiquidGlassDialogContent } from "@/components/ui/liquid-glass-dialog";
import { shareContent, downloadShareImage, ShareableContent } from "@/lib/shareUtils";

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

interface RitualOverflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  ritual: Ritual;
  isCompleted: boolean;
  onComplete: () => void;
}

export const RitualOverflowModal = ({ isOpen, onClose, ritual, isCompleted, onComplete }: RitualOverflowModalProps) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    const shareableContent: ShareableContent = {
      title: `Today's Ritual: ${ritual.title}`,
      content: `${ritual.intention}\n\n${ritual.steps.join('\n')}${ritual.affirmation ? `\n\n${ritual.affirmation}` : ''}`,
      type: 'ritual',
      keywords: [ritual.duration, ritual.type]
    };

    try {
      const success = await shareContent(shareableContent);
      if (!success) {
        await downloadShareImage(shareableContent);
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleMarkCompleted = () => {
    if (!isCompleted) {
      onComplete();
    }
  };

  return (
    <LiquidGlassDialog open={isOpen} onOpenChange={onClose}>
      <LiquidGlassDialogContent className="!max-w-sm mx-auto p-0 overflow-hidden">
        {/* Unified Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          {/* Hero Icon */}
          <div className="w-16 h-16 mx-auto mb-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 liquid-glass-glow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          
          {/* Title */}
          <h2 className="text-headline text-foreground font-semibold mb-2">Today's Ritual</h2>
          
          {/* Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
              {ritual.duration}
            </span>
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
              {ritual.type}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          {/* Intention Section */}
          <div className="mt-4 space-y-2">
            <h3 className="text-headline text-foreground font-semibold">Intention</h3>
            <p className="text-body text-muted-foreground">{ritual.intention}</p>
          </div>
          
          {/* Today's Practice Section */}
          <div className="mt-4 space-y-2">
            <h3 className="text-headline text-foreground font-semibold">Today's Practice</h3>
            <ul className="space-y-2">
              {ritual.steps.map((step, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-body text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Affirmation Section (optional) */}
          {ritual.affirmation && (
            <div className="mt-4 space-y-2">
              <h3 className="text-headline text-foreground font-semibold">Affirmation</h3>
              <p className="text-body text-muted-foreground italic">"{ritual.affirmation}"</p>
            </div>
          )}
          
          {/* Action Buttons - Horizontal Row */}
          <div className="flex gap-4 pt-6 pb-8">
            {/* Primary: Complete */}
            <button
              onClick={handleMarkCompleted}
              disabled={isCompleted}
              className="flex-1 px-4 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center"
            >
              {isCompleted ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Completed
                </>
              ) : (
                'Complete'
              )}
            </button>
            
            {/* Secondary: Share */}
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="flex-1 px-4 py-3 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isSharing ? 'Sharing...' : 'Share'}
            </button>
          </div>
        </div>
      </LiquidGlassDialogContent>
    </LiquidGlassDialog>
  );
};

