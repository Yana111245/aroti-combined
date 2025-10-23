import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
}

export const GradientButton = ({ children, onClick, className, variant = "primary" }: GradientButtonProps) => {
  if (variant === "outline") {
    return (
      <Button
        onClick={onClick}
        className={cn(
          "rounded-full border-2 border-accent-gold bg-transparent text-foreground hover:bg-accent-gold/10 active:scale-[0.98] transition-all",
          className
        )}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      className={cn(
        "gradient-accent rounded-full text-white hover:opacity-90 active:scale-[0.98] transition-all shadow-md",
        className
      )}
    >
      {children}
    </Button>
  );
};
