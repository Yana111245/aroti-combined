import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  onViewAll?: () => void;
  className?: string;
}

export const SectionHeader = ({ title, description, onViewAll, className }: SectionHeaderProps) => {
  return (
    <div className={cn("mb-4 flex items-start justify-between", className)}>
      <div>
        <h2 className="font-serif text-xl font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="flex items-center text-sm font-medium text-accent-gold hover:opacity-80 transition-opacity"
        >
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      )}
    </div>
  );
};
