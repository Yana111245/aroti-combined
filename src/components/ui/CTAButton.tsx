import { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'pill' | 'default';
  size?: 'sm' | 'default' | 'lg';
  icon?: ReactNode;
}

export const CTAButton = ({ 
  children, 
  onClick, 
  disabled = false,
  className,
  variant = 'default',
  size = 'lg',
  icon
}: CTAButtonProps) => {
  return (
    <div className="px-6 pt-6 pb-6">
      <Button
        variant={variant === 'pill' ? 'default' : variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "w-full group rounded-[10px]",
          "bg-gradient-to-r from-accent/90 to-accent text-white",
          "shadow-[0_4px_20px_rgba(209,122,82,0.4)] hover:shadow-[0_6px_28px_rgba(209,122,82,0.5)]",
          "hover:scale-[1.02] active:scale-[0.98]",
          "transition-all duration-300",
          "disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed",
          className
        )}
      >
        {icon && <span className="group-hover:rotate-12 transition-transform duration-300">{icon}</span>}
        <span className="font-semibold">{children}</span>
      </Button>
    </div>
  );
};
