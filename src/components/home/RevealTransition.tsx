import { useState, useEffect } from "react";

interface RevealTransitionProps {
  isRevealed: boolean;
  isRevealing: boolean;
  children: React.ReactNode;
}

export const RevealTransition = ({ isRevealed, isRevealing, children }: RevealTransitionProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      // Delay showing content for smooth transition
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isRevealed]);

  return (
    <div className={`transition-all duration-500 ${isRevealing ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
      {showContent && (
        <div className="animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};
