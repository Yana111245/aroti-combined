import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface BaseSectionHeaderProps {
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
  viewAllLabel?: string;
  className?: string;
}

export const BaseSectionHeader = ({ 
  title, 
  subtitle, 
  onViewAll, 
  viewAllLabel = "View All",
  className 
}: BaseSectionHeaderProps) => {
  return (
    <div className={cn("apple-material-section-header", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-headline text-foreground">{title}</h2>
          {subtitle && (
            <p className="text-footnote text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-accent hover:text-accent/80 transition-colors apple-touch-target-comfortable px-2 py-1 rounded-[8px]"
            aria-label={`${viewAllLabel} for ${title}`}
          >
            <span className="text-subhead font-medium">{viewAllLabel}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
