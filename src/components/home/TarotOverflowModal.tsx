import { useState } from "react";
import { Share2, Download, X } from "lucide-react";
import { LiquidGlassDialog, LiquidGlassDialogContent } from "@/components/ui/liquid-glass-dialog";
import { Button } from "@/components/ui/button";
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
      <LiquidGlassDialogContent className="!max-w-sm mx-auto p-0 overflow-hidden">
        {/* Shareable Header */}
        <div className="px-6 pt-8 pb-4 text-center space-y-4">
          <div className="w-20 h-30 mx-auto">
            <img 
              src="/src/assets/tarot-fool.png" 
              alt={card.name}
              className="w-full h-full object-cover rounded-[1px] shadow-lg"
            />
          </div>
          <h2 className="text-title-2 text-gray-200">{card.name}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {card.keywords.map((keyword, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-accent/20 text-accent text-footnote rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-4 space-y-3">
          <div className="space-y-2">
            <h3 className="text-headline text-gray-200">Interpretation</h3>
            <p className="text-body text-gray-400">{card.interpretation}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-headline text-gray-200">Today's Guidance</h3>
            <ul className="space-y-2">
              {card.guidance.map((tip, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-body text-gray-400"
                >
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Share Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              className="flex-1 bg-[rgba(30,26,40,0.8)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.1)] text-gray-100 hover:bg-[rgba(30,26,40,0.9)] hover:border-[rgba(255,255,255,0.2)]" 
              onClick={handleShare}
              disabled={isSharing}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isSharing ? 'Sharing...' : 'Share'}
            </Button>
            <Button 
              className="flex-1 bg-[rgba(30,26,40,0.6)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] text-gray-200 hover:bg-[rgba(30,26,40,0.8)] hover:border-[rgba(255,255,255,0.15)]" 
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
