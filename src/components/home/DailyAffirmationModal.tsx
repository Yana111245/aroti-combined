import { useState, useEffect } from "react";
import { Share2, Download, Bookmark, Sparkles } from "lucide-react";
import { LiquidGlassDialog, LiquidGlassDialogContent } from "@/components/ui/liquid-glass-dialog";
import { shareContent, downloadShareImage, ShareableContent } from "@/lib/shareUtils";
import { Affirmation } from "@/utils/dailyAffirmations";
import { isAffirmationSaved, toggleSavedAffirmation, SavedAffirmation } from "@/utils/savedAffirmations";

interface DailyAffirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  affirmation: Affirmation;
}

export const DailyAffirmationModal = ({ isOpen, onClose, affirmation }: DailyAffirmationModalProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Check saved status when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSaved(isAffirmationSaved(affirmation.id));
    }
  }, [isOpen, affirmation.id]);

  const handleShare = async () => {
    setIsSharing(true);
    
    const shareableContent: ShareableContent = {
      title: "Daily Affirmation",
      content: affirmation.text,
      type: 'affirmation',
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
      title: "Daily Affirmation",
      content: affirmation.text,
      type: 'ritual',
    };

    await downloadShareImage(shareableContent);
  };

  const handleSave = () => {
    const savedAffirmation: SavedAffirmation = {
      id: affirmation.id,
      text: affirmation.text,
      meaning: affirmation.meaning,
      date: new Date().toISOString().split('T')[0]
    };
    
    const newSavedState = toggleSavedAffirmation(savedAffirmation);
    setIsSaved(newSavedState);
  };

  return (
    <LiquidGlassDialog open={isOpen} onOpenChange={onClose}>
      <LiquidGlassDialogContent className="!max-w-sm mx-auto p-0 overflow-hidden rounded-[16px] shadow-[0_16px_48px_rgba(0,0,0,0.55),0_4px_16px_rgba(0,0,0,0.45),0_0_60px_rgba(209,122,82,0.15)]">
        {/* Unified Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          {/* Hero Icon with glow */}
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="absolute inset-0 -z-10 blur-xl opacity-30" style={{ 
              background: 'radial-gradient(circle, rgba(209, 122, 82, 0.4) 0%, transparent 70%)' 
            }} />
            <div className="w-full h-full bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 liquid-glass-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-headline text-foreground mb-4">Daily Affirmation</h2>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          {/* Large Affirmation Text */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 blur-md opacity-20" style={{
              background: 'radial-gradient(circle, rgba(209, 122, 82, 0.4) 0%, transparent 70%)'
            }} />
            <p className="text-title-2 text-foreground text-center leading-relaxed relative z-10 px-2">
              "{affirmation.text}"
            </p>
          </div>
          
          {/* Meaning Section */}
          <div className="mb-6 space-y-2">
            <h3 className="text-headline text-foreground font-semibold opacity-90">Meaning</h3>
            <p className="text-body text-muted-foreground leading-[1.6]">{affirmation.meaning}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-2">
            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full px-4 py-3 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 flex items-center justify-center"
            >
              <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-accent text-accent' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            
            {/* Share and Image Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                disabled={isSharing}
                className="flex-1 px-4 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {isSharing ? 'Sharing...' : 'Share'}
              </button>
              <button
                onClick={handleDownloadImage}
                className="flex-1 px-4 py-3 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Image
              </button>
            </div>
          </div>
        </div>
      </LiquidGlassDialogContent>
    </LiquidGlassDialog>
  );
};

