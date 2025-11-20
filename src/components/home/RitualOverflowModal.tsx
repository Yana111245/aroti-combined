import { useState } from "react";
import { Share2, Download, Sparkles } from "lucide-react";
import { LiquidGlassDialog, LiquidGlassDialogContent } from "@/components/ui/liquid-glass-dialog";
import { Button } from "@/components/ui/button";
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
}

export const RitualOverflowModal = ({ isOpen, onClose, ritual }: RitualOverflowModalProps) => {
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

  const handleDownloadImage = async () => {
    const shareableContent: ShareableContent = {
      title: `Today's Ritual: ${ritual.title}`,
      content: `${ritual.intention}\n\n${ritual.steps.join('\n')}${ritual.affirmation ? `\n\n${ritual.affirmation}` : ''}`,
      type: 'ritual',
      keywords: [ritual.duration, ritual.type]
    };

    await downloadShareImage(shareableContent);
  };

  return (
    <LiquidGlassDialog open={isOpen} onOpenChange={onClose}>
      <LiquidGlassDialogContent className="!max-w-sm mx-auto p-0 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-14 pb-4 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-accent/60 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-title-2 text-gray-200">Today's Ritual</h2>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-4 py-2 bg-accent/20 text-accent text-callout rounded-full">
              {ritual.duration}
            </span>
            <span className="px-4 py-2 bg-accent/20 text-accent text-callout rounded-full">
              {ritual.type}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Intention */}
          <div className="space-y-3">
            <h3 className="text-headline text-gray-200">Intention</h3>
            <p className="text-body text-gray-400">{ritual.intention}</p>
          </div>
          
          {/* Today's Practice */}
          <div className="space-y-3">
            <h3 className="text-headline text-gray-200">Today's Practice</h3>
            <ul className="space-y-2">
              {ritual.steps.map((step, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-body text-gray-400"
                >
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Affirmation (optional) */}
          {ritual.affirmation && (
            <div className="space-y-3">
              <h3 className="text-headline text-gray-200">Affirmation</h3>
              <p className="text-body text-gray-400 italic">"{ritual.affirmation}"</p>
            </div>
          )}
          
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

