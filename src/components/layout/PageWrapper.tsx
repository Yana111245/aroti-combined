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
    <SafeArea className="min-h-screen">
      <div 
        className={cn(
          "flex flex-col min-h-screen",
          scrollable && "overflow-y-auto",
          className
        )}
        style={{
          paddingBottom: showBottomNav ? '5rem' : showTabBar ? '4rem' : '0',
        }}
      >
        {children}
      </div>
    </SafeArea>
  );
};
