import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ReflectionSectionProps {
  hasReflection: boolean;
  reflection?: string;
  onAddReflection: () => void;
}

export const ReflectionSection = ({ hasReflection, reflection, onAddReflection }: ReflectionSectionProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleInteraction = () => {
    // Simulate haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    onAddReflection();
  };

  return (
    <div 
      className={`apple-material-card-interactive p-6 space-y-4 stagger-fade-up relative overflow-hidden ${isPressed ? 'scale-98' : ''}`}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onTouchCancel={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      <h3 className="text-headline text-foreground text-left">
        Your Reflection
      </h3>
      
      {hasReflection && reflection ? (
        <div className="space-y-4">
          <p className="text-body text-muted-foreground">
            {reflection}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleInteraction}
            className="w-full text-subhead border-accent/30 text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 rounded-[24px]"
          >
            Edit Reflection
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={handleInteraction}
          className="w-full h-12 text-subhead border-accent/50 text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 rounded-[24px]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Reflection
        </Button>
      )}
    </div>
  );
};
