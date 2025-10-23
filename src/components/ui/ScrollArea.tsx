import { ReactNode, useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollAreaProps {
  children: ReactNode;
  className?: string;
  showShadows?: boolean;
  maxHeight?: string;
}

export const ScrollArea = ({ 
  children, 
  className, 
  showShadows = true,
  maxHeight = "100vh"
}: ScrollAreaProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      
      setShowTopShadow(scrollTop > 0);
      setShowBottomShadow(scrollTop < scrollHeight - clientHeight - 1);
    };

    // Initial check
    handleScroll();

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn("relative", className)}>
      {showShadows && showTopShadow && (
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background/80 to-transparent z-10 pointer-events-none" />
      )}
      
      <div
        ref={scrollRef}
        className={cn(
          "overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent",
          showShadows && showBottomShadow && "scroll-shadow-bottom"
        )}
        style={{ maxHeight }}
      >
        {children}
      </div>
      
      {showShadows && showBottomShadow && (
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
      )}
    </div>
  );
};
