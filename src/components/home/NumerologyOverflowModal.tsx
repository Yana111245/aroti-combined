import { useState } from "react";
import { Share2, Download, X } from "lucide-react";
import { LiquidGlassDialog, LiquidGlassDialogContent } from "@/components/ui/liquid-glass-dialog";
import { shareContent, downloadShareImage, ShareableContent } from "@/lib/shareUtils";

interface NumerologyContent {
  energyNumber: number;
  traits: string[];
  guidance: string;
  preview: string;
}

interface NumerologyOverflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: NumerologyContent;
}

export const NumerologyOverflowModal = ({ isOpen, onClose, content }: NumerologyOverflowModalProps) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    const shareableContent: ShareableContent = {
      title: `Numerology - Energy Number ${content.energyNumber}`,
      content: content.guidance,
      type: 'numerology',
      keywords: [`Number ${content.energyNumber}`, ...content.traits]
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

  const handleDownloadImage = async () => {
    const shareableContent: ShareableContent = {
      title: `Numerology - Energy Number ${content.energyNumber}`,
      content: content.guidance,
      type: 'numerology',
      keywords: [`Number ${content.energyNumber}`, ...content.traits]
    };

    await downloadShareImage(shareableContent);
  };

  return (
    <LiquidGlassDialog open={isOpen} onOpenChange={onClose}>
      <LiquidGlassDialogContent className="!max-w-sm mx-auto p-0 overflow-hidden">
        {/* Unified Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          {/* Hero Icon */}
          <div className="w-16 h-16 mx-auto mb-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 liquid-glass-glow">
            <span className="text-white font-bold text-2xl drop-shadow-lg">{content.energyNumber}</span>
          </div>
          
          {/* Title */}
          <h2 className="text-headline text-foreground font-semibold mb-2">Numerology</h2>
          
          {/* Chip */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
              Energy Number {content.energyNumber}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          {/* Your Traits Section */}
          <div className="mt-4 space-y-2">
            <h3 className="text-headline text-foreground font-semibold">Your Traits</h3>
            <div className="flex flex-wrap gap-2">
              {content.traits.map((trait, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          {/* Today's Guidance Section */}
          <div className="mt-4 space-y-2">
            <h3 className="text-headline text-foreground font-semibold">Today's Guidance</h3>
            <p className="text-body text-muted-foreground">{content.guidance}</p>
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
