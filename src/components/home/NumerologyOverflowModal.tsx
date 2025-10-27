import { useState } from "react";
import { Share2, Download, X } from "lucide-react";
import { LiquidGlassDialog, LiquidGlassDialogContent } from "@/components/ui/liquid-glass-dialog";
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
    <LiquidGlassDialog open={isOpen} onOpenChange={onClose}>
      <LiquidGlassDialogContent className="!max-w-sm mx-auto p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-14 pb-4 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">{content.energyNumber}</span>
          </div>
          <h2 className="text-title-2 text-gray-200">Numerology</h2>
          <div className="px-4 py-2 bg-primary/20 text-primary text-callout rounded-full inline-block">
            Energy Number {content.energyNumber}
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-3">
            <h3 className="text-headline text-gray-200">Your Traits</h3>
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
            <h3 className="text-headline text-gray-200">Today's Guidance</h3>
            <p className="text-body text-gray-400">{content.guidance}</p>
          </div>
          
          {/* Share Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              className="flex-1 bg-[rgba(30,26,40,0.8)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] text-gray-200 hover:bg-[rgba(30,26,40,0.9)] hover:border-[rgba(255,255,255,0.2)]" 
              onClick={handleShare}
              disabled={isSharing}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isSharing ? 'Sharing...' : 'Share'}
            </Button>
            <Button 
              className="flex-1 bg-[rgba(30,26,40,0.6)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] text-gray-300 hover:bg-[rgba(30,26,40,0.8)] hover:border-[rgba(255,255,255,0.15)]" 
              onClick={handleDownloadImage}
            >
              <Download className="w-4 h-4 mr-2" />
              Image
            </Button>
          </div>
        </div>
      </LiquidGlassDialogContent>
    </LiquidGlassDialog>
  );
};
