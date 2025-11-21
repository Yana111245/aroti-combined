import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const UnifiedModalRoot = DialogPrimitive.Root;
const UnifiedModalPortal = DialogPrimitive.Portal;

const UnifiedModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/70 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
UnifiedModalOverlay.displayName = "UnifiedModalOverlay";

interface UnifiedModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showOverlayClose?: boolean;
}

const UnifiedModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  UnifiedModalContentProps
>(({ className, showOverlayClose = true, children, ...props }, ref) => (
  <UnifiedModalPortal>
    <UnifiedModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      onInteractOutside={(e) => {
        if (!showOverlayClose) {
          e.preventDefault();
        }
      }}
      onEscapeKeyDown={(e) => {
        if (!showOverlayClose) {
          e.preventDefault();
        }
      }}
      className={cn(
        // Base positioning and layout
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[80vw] translate-x-[-50%] translate-y-[-50%]",
        // Background matching tarot cards and Home/Discovery cards
        "bg-gradient-to-br from-[hsl(235,30%,11%)] to-[hsl(240,28%,13%)]",
        // Border and shadow
        "border border-[rgba(255,255,255,0.08)]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.35)]",
        // Corner radius and padding
        "rounded-[24px]",
        "px-5 py-6",
        // Animation: fade-in + scale (102% → 100%, 180ms)
        "duration-[180ms]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </UnifiedModalPortal>
));
UnifiedModalContent.displayName = "UnifiedModalContent";

interface UnifiedModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  primaryButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    isLoading?: boolean;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
  showOverlayClose?: boolean; // Default: true for info modals, false for purchase/paywall
  icon?: React.ReactNode; // Optional small 24px icon to left of title
}

export const UnifiedModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  primaryButton,
  secondaryButton,
  showOverlayClose = true,
  icon,
}: UnifiedModalProps) => {
  return (
    <UnifiedModalRoot open={isOpen} onOpenChange={showOverlayClose ? onClose : undefined}>
      <UnifiedModalContent showOverlayClose={showOverlayClose}>
        {/* Header Row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {icon && <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">{icon}</div>}
            <div className="flex-1 min-w-0">
              <DialogPrimitive.Title className="text-headline font-semibold text-left text-foreground">
                {title}
              </DialogPrimitive.Title>
              {subtitle && (
                <p className="text-footnote text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          <DialogPrimitive.Close
            onClick={onClose}
            className="rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-[12px] bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:pointer-events-none flex-shrink-0"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-foreground" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </div>

        {/* Body Section */}
        <div className="space-y-5">
          {children}
        </div>

        {/* Buttons Section */}
        {(primaryButton || secondaryButton) && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {primaryButton && (
              <button
                onClick={primaryButton.onClick}
                disabled={primaryButton.isLoading}
                className="w-full px-4 py-3 rounded-[10px] bg-accent text-white text-subhead font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {primaryButton.isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    {primaryButton.icon && <span>{primaryButton.icon}</span>}
                    {primaryButton.label}
                  </>
                )}
              </button>
            )}
            {secondaryButton && (
              <button
                onClick={secondaryButton.onClick}
                className="w-full px-4 py-3 rounded-[10px] backdrop-blur-[12px] bg-white/5 border border-white/10 text-subhead font-medium text-foreground hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                {secondaryButton.label}
              </button>
            )}
          </div>
        )}
      </UnifiedModalContent>
    </UnifiedModalRoot>
  );
};

