import { useState } from "react";
import { Share2, Download, X } from "lucide-react";
import { LiquidGlassDialog, LiquidGlassDialogContent } from "@/components/ui/liquid-glass-dialog";
import { shareContent, downloadShareImage, ShareableContent } from "@/lib/shareUtils";

interface HoroscopeContent {
  sign: string;
  forecast: string;
  advice: string;
  preview: string;
}

interface HoroscopeOverflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: HoroscopeContent;
}

export const HoroscopeOverflowModal = ({ isOpen, onClose, content }: HoroscopeOverflowModalProps) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    const shareableContent: ShareableContent = {
      title: `Daily Horoscope - ${content.sign}`,
      content: content.forecast,
      type: 'horoscope',
      keywords: [content.sign, 'Daily Forecast']
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
      title: `Daily Horoscope - ${content.sign}`,
      content: content.forecast,
      type: 'horoscope',
      keywords: [content.sign, 'Daily Forecast']
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
            <span className="text-white font-bold text-2xl drop-shadow-lg">♓</span>
          </div>
          
          {/* Title */}
          <h2 className="text-headline text-foreground font-semibold mb-2">Daily Horoscope</h2>
          
          {/* Chip */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
              {content.sign}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          {/* Today's Forecast Section */}
          <div className="mt-4 space-y-2">
            <h3 className="text-headline text-foreground font-semibold">Today's Forecast</h3>
            <p className="text-body text-muted-foreground">{content.forecast}</p>
          </div>
          
          {/* Advice Section */}
          <div className="mt-4 space-y-2">
            <h3 className="text-headline text-foreground font-semibold">Advice</h3>
            <p className="text-body text-muted-foreground">{content.advice}</p>
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
