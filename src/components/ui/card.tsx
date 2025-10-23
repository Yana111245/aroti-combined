import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
}

export const Card = ({ 
  children, 
  className, 
  padding = 'md',
  hover = false,
  clickable = false
}: CardProps) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div 
      className={cn(
        "glass-card transition-all duration-300",
        paddingClasses[padding],
        hover && "hover:scale-[1.01] hover:bg-white/80",
        clickable && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};