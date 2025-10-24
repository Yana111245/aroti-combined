import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ReflectionSectionProps {
  hasReflection: boolean;
  reflection?: string;
  onAddReflection: () => void;
}

export const ReflectionSection = ({ hasReflection, reflection, onAddReflection }: ReflectionSectionProps) => {
  return (
    <div className="p-6 space-y-4 stagger-fade-up relative overflow-hidden rounded-[20px]">
      <h3 className="font-subtitle text-lg text-foreground text-left">
        Your Reflection
      </h3>
      
      {hasReflection && reflection ? (
        <div className="space-y-4">
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            {reflection}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddReflection}
            className="w-full font-ui text-[15px] border-accent/30 text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 rounded-[24px]"
          >
            Edit Reflection
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={onAddReflection}
          className="w-full h-12 font-ui text-[15px] border-accent/50 text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 rounded-[24px]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Reflection
        </Button>
      )}
    </div>
  );
};
