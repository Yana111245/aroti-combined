import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface BaseHeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: {
    icon: ReactNode;
    onClick: () => void;
    label: string;
  };
  rightActions?: ReactNode;
  className?: string;
}

export const BaseHeader = ({ 
  title, 
  subtitle, 
  leftAction, 
  rightActions, 
  className 
}: BaseHeaderProps) => {
  return (
    <div 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)]",
        className
      )}
      style={{
        background: 'rgba(12, 10, 18, 0.92)',
        backdropFilter: 'blur(60px) saturate(180%)',
        WebkitBackdropFilter: 'blur(60px) saturate(180%)',
        borderBottomColor: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 -1px 0 rgba(255, 255, 255, 0.08), 0 -8px 32px rgba(0, 0, 0, 0.4)'
      }}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {leftAction && (
              <button
                onClick={leftAction.onClick}
                className="apple-touch-target-comfortable p-2 rounded-[16px] transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                aria-label={leftAction.label}
              >
                {leftAction.icon}
              </button>
            )}
            <div>
              <h1 className="text-large-title text-foreground font-normal">{title}</h1>
              {subtitle && (
                <p className="text-subhead text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          
          {/* Right side */}
          {rightActions && (
            <div className="flex items-center gap-2">
              {rightActions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
