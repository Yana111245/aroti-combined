import { cn } from "@/lib/utils";

interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const CategoryChip = ({ label, active, onClick }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-[24px] text-body font-medium transition-smooth whitespace-nowrap apple-touch-target-comfortable",
        active
          ? "bg-gradient-gold text-primary-foreground shadow-glow"
          : "bg-card/60 text-muted-foreground hover:bg-card/80 hover:text-foreground"
      )}
      aria-pressed={active}
      aria-label={`Filter by ${label}`}
    >
      {label}
    </button>
  );
};
