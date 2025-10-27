import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const LiquidGlassDialog = DialogPrimitive.Root;

const LiquidGlassDialogTrigger = DialogPrimitive.Trigger;

const LiquidGlassDialogPortal = DialogPrimitive.Portal;

const LiquidGlassDialogClose = DialogPrimitive.Close;

const LiquidGlassDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
LiquidGlassDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const LiquidGlassDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <LiquidGlassDialogPortal>
    <LiquidGlassDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // Base positioning and layout
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4",
        // Apple HIG Liquid Glass Material - Elevated
        "bg-[rgba(23,20,31,0.85)] backdrop-blur-[40px] backdrop-saturate-[200%]",
        "[-webkit-backdrop-filter:blur(40px)_saturate(200%)]",
        // Borders and shadows following Apple HIG
        "border border-[rgba(255,255,255,0.12)]",
        "shadow-[0_16px_48px_rgba(0,0,0,0.55),0_4px_16px_rgba(0,0,0,0.45)]",
        // Apple HIG spacing and animations
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        // Apple HIG border radius
        "rounded-[12px]",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </LiquidGlassDialogPortal>
));
LiquidGlassDialogContent.displayName = DialogPrimitive.Content.displayName;

const LiquidGlassDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
LiquidGlassDialogHeader.displayName = "LiquidGlassDialogHeader";

const LiquidGlassDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
LiquidGlassDialogFooter.displayName = "LiquidGlassDialogFooter";

const LiquidGlassDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
LiquidGlassDialogTitle.displayName = DialogPrimitive.Title.displayName;

const LiquidGlassDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
LiquidGlassDialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  LiquidGlassDialog,
  LiquidGlassDialogPortal,
  LiquidGlassDialogOverlay,
  LiquidGlassDialogClose,
  LiquidGlassDialogTrigger,
  LiquidGlassDialogContent,
  LiquidGlassDialogHeader,
  LiquidGlassDialogFooter,
  LiquidGlassDialogTitle,
  LiquidGlassDialogDescription,
};
