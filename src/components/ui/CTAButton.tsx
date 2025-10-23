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
  variant = 'pill',
  size = 'lg',
  icon
}: CTAButtonProps) => {
  return (
    <div className="px-6 pt-4 pb-4">
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        disabled={disabled}
        className={cn("w-full group", className)}
      >
        {icon && <span className="group-hover:rotate-12 transition-transform">{icon}</span>}
        <span>{children}</span>
      </Button>
    </div>
  );
};
