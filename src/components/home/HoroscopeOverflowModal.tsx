import { useState } from "react";
import { Share2, Download, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="home-tab-celestial liquid-glass-elevated max-w-sm mx-auto p-0 overflow-hidden rounded-[12px]">
        {/* Header */}
        <div className="px-6 pt-14 pb-4 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-accent/60 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">♓</span>
          </div>
          <h2 className="text-title-2 text-foreground">Daily Horoscope</h2>
          <div className="px-4 py-2 bg-accent/20 text-accent text-callout rounded-full inline-block">
            {content.sign}
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-3">
            <h3 className="text-headline text-foreground">Today's Forecast</h3>
            <p className="text-body text-muted-foreground">{content.forecast}</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-headline text-foreground">Advice</h3>
            <p className="text-body text-muted-foreground">{content.advice}</p>
          </div>
          
          {/* Share Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              className="flex-1 glass-button" 
              onClick={handleShare}
              disabled={isSharing}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isSharing ? 'Sharing...' : 'Share'}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleDownloadImage}
            >
              <Download className="w-4 h-4 mr-2" />
              Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
