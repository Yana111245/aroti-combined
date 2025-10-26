import { cn } from "@/lib/utils";

interface SafeAreaProps {
  children: React.ReactNode;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

export const SafeArea = ({ 
  children, 
  className, 
  top = true, 
  bottom = true, 
  left = true, 
  right = true 
}: SafeAreaProps) => {
  return (
    <div 
      className={cn(
        "w-full",
        // Only add background if not using celestial theme
        !className?.includes('home-tab-celestial') && "bg-gradient-to-b from-background to-background-end",
        top && "pt-[env(safe-area-inset-top)]",
        bottom && "pb-[env(safe-area-inset-bottom)]",
        left && "pl-[env(safe-area-inset-left)]",
        right && "pr-[env(safe-area-inset-right)]",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * Safe area utilities for common use cases
 */
export const SafeAreaTop = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <SafeArea top bottom={false} left={false} right={false} className={className}>
    {children}
  </SafeArea>
);

export const SafeAreaBottom = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <SafeArea top={false} bottom left={false} right={false} className={className}>
    {children}
  </SafeArea>
);

export const SafeAreaHorizontal = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <SafeArea top={false} bottom={false} className={className}>
    {children}
  </SafeArea>
);
