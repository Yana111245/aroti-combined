import { useState } from "react";
import { Share2, Download } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="home-tab-celestial liquid-glass-elevated max-w-md mx-4 p-0 overflow-hidden rounded-[12px]">
        {/* Header */}
        <div className="p-6 pb-4 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">{content.energyNumber}</span>
          </div>
          <h2 className="text-title-2 text-foreground">Numerology</h2>
          <div className="px-4 py-2 bg-primary/20 text-primary text-callout rounded-full inline-block">
            Energy Number {content.energyNumber}
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-3">
            <h3 className="text-headline text-foreground">Your Traits</h3>
            <div className="flex flex-wrap gap-2">
              {content.traits.map((trait, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-primary/20 text-primary text-footnote rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-headline text-foreground">Today's Guidance</h3>
            <p className="text-body text-muted-foreground">{content.guidance}</p>
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
