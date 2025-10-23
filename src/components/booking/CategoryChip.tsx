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
        "px-4 py-2 rounded-full text-sm font-medium transition-smooth whitespace-nowrap",
        active
          ? "gold-gradient text-white shadow-md"
          : "bg-white/60 text-muted-foreground hover:bg-white/80"
      )}
    >
      {label}
    </button>
  );
};
