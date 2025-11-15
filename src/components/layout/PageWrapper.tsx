import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SafeArea } from "./SafeArea";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  showBottomNav?: boolean;
  showTabBar?: boolean;
  scrollable?: boolean;
}

export const PageWrapper = ({ 
  children, 
  className, 
  showBottomNav = true,
  showTabBar = false,
  scrollable = true 
}: PageWrapperProps) => {
  return (
    <SafeArea className="h-screen">
      <div 
        className={cn(
          "flex flex-col h-full relative",
          scrollable && "overflow-y-auto",
          className
        )}
        style={{
          paddingBottom: showBottomNav
            ? 'calc(5rem + env(safe-area-inset-bottom))'
            : showTabBar
              ? 'calc(4rem + env(safe-area-inset-bottom))'
              : 'env(safe-area-inset-bottom)',
        }}
      >
        {children}
      </div>
    </SafeArea>
  );
};
