import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reflection: string) => void;
  initialReflection?: string;
}

export const ReflectionModal = ({ isOpen, onClose, onSave, initialReflection = "" }: ReflectionModalProps) => {
  const [reflection, setReflection] = useState(initialReflection);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate save
    onSave(reflection);
    setIsSaving(false);
    onClose();
  };

  const handleCancel = () => {
    setReflection(initialReflection);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div 
        className="liquid-glass-elevated w-full max-w-lg p-6 space-y-6 animate-scale-in"
        style={{
          background: 'rgba(23, 20, 31, 0.85)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.55), 0 4px 16px rgba(0, 0, 0, 0.45)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-title-2 text-foreground font-apple-display">Your Reflection</h2>
          <button
            onClick={handleCancel}
            className="apple-touch-target-comfortable p-2 text-muted-foreground hover:text-accent transition-all duration-300 rounded-[16px] hover:bg-white/5"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Textarea */}
        <div className="space-y-3">
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What insights did you gain today? How are you feeling? What would you like to remember about this day?"
            className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
            maxLength={500}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Share your thoughts and feelings</span>
            <span className="text-accent/80">{reflection.length}/500</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 h-12 text-subhead border-white/20 text-foreground hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 rounded-[24px] apple-touch-target"
            disabled={isSaving}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 h-12 text-subhead bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 rounded-[24px] apple-touch-target"
            disabled={isSaving || !reflection.trim()}
            style={{
              background: 'linear-gradient(135deg, hsl(42 38% 63%) 0%, hsl(42 38% 57%) 100%)',
              boxShadow: '0 4px 16px rgba(199, 176, 126, 0.3)'
            }}
          >
            {isSaving ? "Saving..." : "Save Reflection"}
          </Button>
        </div>
      </div>
    </div>
  );
};
