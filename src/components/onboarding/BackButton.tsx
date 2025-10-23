import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  onClick: () => void;
  className?: string;
  showLabel?: boolean;
}

export const BackButton = ({ onClick, className, showLabel = true }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors",
        className
      )}
    >
      <ArrowLeft className="w-5 h-5" />
      {showLabel && <span className="text-sm font-medium">Back</span>}
    </button>
  );
};
