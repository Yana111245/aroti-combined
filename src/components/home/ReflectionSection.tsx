import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ReflectionSectionProps {
  hasReflection: boolean;
  reflection?: string;
  onAddReflection: () => void;
}

export const ReflectionSection = ({ hasReflection, reflection, onAddReflection }: ReflectionSectionProps) => {
  return (
    <div className="glass-card p-6 space-y-4 stagger-fade-up relative overflow-hidden">
      {/* Reflection symbols */}
      <div className="absolute top-2 right-2 text-accent/30 text-lg">💭</div>
      <div className="absolute bottom-2 left-2 text-accent/30 text-sm">📝</div>
      
      <h3 className="text-xl font-serif text-foreground flex items-center gap-2">
        <span className="text-accent">💫</span>
        Your Reflection
      </h3>
      
      {hasReflection && reflection ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {reflection}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddReflection}
            className="w-full hover:bg-accent/10 transition-colors"
          >
            Edit Reflection
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={onAddReflection}
          className="w-full h-12 border-dashed border-2 border-muted-foreground/30 hover:border-accent/50 transition-colors hover:bg-accent/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Reflection
        </Button>
      )}
    </div>
  );
};
