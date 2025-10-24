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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-lg p-6 space-y-6 animate-scale-in rounded-[20px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-subtitle text-foreground">Your Reflection</h2>
          <button
            onClick={handleCancel}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Textarea */}
        <div className="space-y-2">
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What insights did you gain today? How are you feeling? What would you like to remember about this day?"
            className="w-full h-32 p-4 bg-white/50 border border-white/20 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm text-foreground placeholder:text-muted-foreground"
            maxLength={500}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Share your thoughts and feelings</span>
            <span>{reflection.length}/500</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1"
            disabled={isSaving || !reflection.trim()}
          >
            {isSaving ? "Saving..." : "Save Reflection"}
          </Button>
        </div>
      </div>
    </div>
  );
};
