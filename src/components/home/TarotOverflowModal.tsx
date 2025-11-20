import { useState } from "react";
import { Share2, Download, X } from "lucide-react";
import { LiquidGlassDialog, LiquidGlassDialogContent } from "@/components/ui/liquid-glass-dialog";
import { shareContent, downloadShareImage, ShareableContent } from "@/lib/shareUtils";

interface TarotCard {
  name: string;
  keywords: string[];
  interpretation: string;
  guidance: string[];
  image: string;
}

interface TarotOverflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: TarotCard;
}

export const TarotOverflowModal = ({ isOpen, onClose, card }: TarotOverflowModalProps) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    const shareableContent: ShareableContent = {
      title: `Today's Tarot: ${card.name}`,
      content: card.interpretation,
      type: 'tarot',
      keywords: card.keywords,
      image: card.image
    };

    try {
      const success = await shareContent(shareableContent);
      if (!success) {
        // Fallback to image download
        await downloadShareImage(shareableContent);
      }
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleDownloadImage = async () => {
    const shareableContent: ShareableContent = {
      title: `Today's Tarot: ${card.name}`,
      content: card.interpretation,
      type: 'tarot',
      keywords: card.keywords,
      image: card.image
    };

    await downloadShareImage(shareableContent);
  };

  return (
    <LiquidGlassDialog open={isOpen} onOpenChange={onClose}>
      <LiquidGlassDialogContent className="!max-w-sm mx-auto p-0 overflow-hidden rounded-[16px] shadow-[0_16px_48px_rgba(0,0,0,0.55),0_4px_16px_rgba(0,0,0,0.45),0_0_60px_rgba(209,122,82,0.15)]">
        {/* Unified Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          {/* Hero Image with glow */}
          <div className="w-20 h-32 mx-auto mb-3 relative">
            <div className="absolute inset-0 -z-10 blur-xl opacity-30" style={{ 
              background: 'radial-gradient(circle, rgba(209, 122, 82, 0.4) 0%, transparent 70%)' 
            }} />
            <img 
              src="/src/assets/tarot-fool.png" 
              alt={card.name}
              className="w-full h-full object-cover rounded-[8px] shadow-lg breathing-glow"
              style={{
                boxShadow: '0 0 20px rgba(209, 122, 82, 0.3)'
              }}
            />
          </div>
          
          {/* Title - matching Home style */}
          <h2 className="text-headline text-foreground mb-2">{card.name}</h2>
          
          {/* Chips - matching Home page exactly */}
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {card.keywords.map((keyword, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
          
          {/* Optional metadata */}
          <p className="text-[11px] text-muted-foreground opacity-60">
            Major Arcana • Card 0
          </p>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-4">
          {/* Interpretation Section */}
          <div className="mt-2 space-y-2">
            <h3 className="text-headline text-foreground font-semibold opacity-90">Interpretation</h3>
            <p className="text-body text-muted-foreground leading-[1.6]">{card.interpretation}</p>
          </div>
          
          {/* Today's Guidance Section */}
          <div className="mt-4 space-y-2">
            <h3 className="text-headline text-foreground font-semibold opacity-90">Today's Guidance</h3>
            <ul className="space-y-1.5">
              {card.guidance.map((tip, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-body text-muted-foreground leading-[1.6]"
                >
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Share Buttons */}
          <div className="flex gap-2 pt-6 pb-4">
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="flex-1 px-4 py-2 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2 className="w-4 h-4 mr-2 inline" />
              {isSharing ? 'Sharing...' : 'Share'}
            </button>
            <button
              onClick={handleDownloadImage}
              className="flex-1 px-4 py-2 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <Download className="w-4 h-4 mr-2 inline" />
              Image
            </button>
          </div>
        </div>
      </LiquidGlassDialogContent>
    </LiquidGlassDialog>
  );
};
