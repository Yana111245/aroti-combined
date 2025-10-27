import { useState } from "react";
import { Share2, Download, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="home-tab-celestial liquid-glass-elevated max-w-sm mx-auto p-0 overflow-hidden rounded-[12px]">
        {/* Shareable Header */}
        <div className="px-6 pt-14 pb-4 text-center space-y-4">
          <div className="w-24 h-36 mx-auto">
            <img 
              src={card.image} 
              alt={card.name} 
              className="w-full h-full object-cover rounded-[12px] breathing-glow" 
            />
          </div>
          <h2 className="text-title-2 text-foreground">{card.name}</h2>
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
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-3">
            <h3 className="text-headline text-foreground">Interpretation</h3>
            <p className="text-body text-muted-foreground">{card.interpretation}</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-headline text-foreground">Today's Guidance</h3>
            <ul className="space-y-2">
              {card.guidance.map((tip, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-body text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
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
