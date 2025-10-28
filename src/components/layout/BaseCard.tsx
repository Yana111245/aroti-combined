import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseCardProps {
  children: ReactNode;
  variant?: "interactive" | "standard" | "secondary";
  onClick?: () => void;
  className?: string;
  role?: string;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

export const BaseCard = ({ 
  children, 
  variant = "standard", 
  onClick, 
  className,
  role,
  tabIndex,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy
}: BaseCardProps) => {
  const isInteractive = variant === "interactive" || onClick;
  
  const baseClasses = cn(
    "liquid-glass-card rounded-[12px] border border-glass-border shadow-glass",
    variant === "secondary" && "liquid-glass-secondary",
    isInteractive && "apple-material-card-interactive cursor-pointer group",
    className
  );

  const interactiveProps = isInteractive ? {
    onClick,
    role: role || "button",
    tabIndex: tabIndex ?? 0,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
      }
    }
  } : {};

  return (
    <div className={baseClasses} {...interactiveProps}>
      {children}
      
      {/* Hover effects for interactive cards */}
      {isInteractive && (
        <>
          <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
          <div className="absolute top-3 right-3 w-2 h-2 bg-accent/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none tap-indicator" />
        </>
      )}
    </div>
  );
};
