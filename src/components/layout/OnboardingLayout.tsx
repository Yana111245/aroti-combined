import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { ChevronLeft } from "lucide-react";

interface OnboardingLayoutProps {
  children: ReactNode;
  className?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
  title?: string;
  subtitle?: string;
  ctaButton?: ReactNode;
}

export const OnboardingLayout = ({ 
  children, 
  className,
  showBackButton = false,
  onBack,
  currentStep,
  totalSteps,
  title,
  subtitle,
  ctaButton
}: OnboardingLayoutProps) => {
  const swipeRef = useSwipeGesture({ onSwipeRight: onBack });

  return (
    <div 
      ref={swipeRef}
      className={cn("relative flex flex-col overflow-hidden home-tab-celestial", className)}
      style={{ height: '100dvh' }}
    >
      {/* Full viewport background with dark celestial theme */}
      <div 
        className="absolute -z-10 home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)]"
        style={{
          top: 'calc(-1 * env(safe-area-inset-top))',
          bottom: 'calc(-1 * env(safe-area-inset-bottom))',
          left: 'calc(-1 * env(safe-area-inset-left))',
          right: 'calc(-1 * env(safe-area-inset-right))',
        }}
      />
      
      {/* Content with safe area padding using CSS classes */}
      <div 
        className="relative z-0 flex flex-col h-full safe-top safe-bottom"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Back Button */}
        {showBackButton && onBack && (
          <div className="flex-shrink-0 px-6 pt-6 pb-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors apple-touch-target-comfortable p-2 rounded-[16px] hover:bg-white/5"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-subhead font-medium">Back</span>
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {currentStep && totalSteps && (
          <div className="flex-shrink-0">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        )}

        {/* Title & Subtitle */}
        {(title || subtitle) && (
          <div className="flex-shrink-0 px-6 pb-6 pt-4">
            {title && (
              <h1 className="font-title text-title-1 text-foreground font-normal mb-3">{title}</h1>
            )}
            {subtitle && (
              <p className="text-body text-muted-foreground leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        
        {/* Content - Flexible positioning, scrolls when needed */}
        <div className="flex-1 px-6 min-h-0 flex flex-col justify-start pt-6 overflow-y-auto">
          {children}
        </div>
        
        {/* CTA Button */}
        {ctaButton && (
          <div className="flex-shrink-0">
            {ctaButton}
          </div>
        )}
      </div>
    </div>
  );
};
