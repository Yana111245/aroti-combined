import { useRef, useEffect, useState } from "react";

export const useScrollToBottom = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const checkScrollPosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const threshold = 5; // 5px threshold for "at bottom"
      const atBottom = scrollTop + clientHeight >= scrollHeight - threshold;
      setIsAtBottom(atBottom);
    };

    // Initial check
    checkScrollPosition();

    scrollElement.addEventListener('scroll', checkScrollPosition);
    return () => scrollElement.removeEventListener('scroll', checkScrollPosition);
  }, []);

  return { scrollRef, isAtBottom };
};
