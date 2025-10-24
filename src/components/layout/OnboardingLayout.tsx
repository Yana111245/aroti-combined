import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { ProgressBar } from "@/components/onboarding/ProgressBar";

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
      className={cn("relative flex flex-col overflow-hidden", className)}
      style={{ height: '100dvh' }}
    >
      {/* Full viewport background including safe areas */}
      <div 
        className="absolute -z-10"
        style={{
          top: 'calc(-1 * env(safe-area-inset-top))',
          bottom: 'calc(-1 * env(safe-area-inset-bottom))',
          left: 'calc(-1 * env(safe-area-inset-left))',
          right: 'calc(-1 * env(safe-area-inset-right))',
          background: 'linear-gradient(180deg, hsl(35 20% 96%) 0%, hsl(30 38% 90%) 100%)'
        }}
      />
      
      {/* Content with safe area padding using CSS classes */}
      <div 
        className="relative z-0 flex flex-col h-full safe-top safe-bottom"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Back Button */}
        {showBackButton && onBack && (
          <div className="flex-shrink-0 px-4 py-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
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
          <div className="flex-shrink-0 px-6 pb-4">
            {title && (
              <h1 className="font-title text-title-xl font-normal mb-2">{title}</h1>
            )}
            {subtitle && (
              <p className="text-muted-foreground text-body-lg">{subtitle}</p>
            )}
          </div>
        )}
        
        {/* Content - Flexible positioning, scrolls when needed */}
        <div className="flex-1 px-6 min-h-0 flex flex-col justify-start pt-4 overflow-y-auto">
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
