import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

export const FloatingGuidanceButton = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const FAB_SIZE = 56; // 14rem = 56px

  // Load saved position on mount
  useEffect(() => {
    const savedPosition = localStorage.getItem('guidance-fab-position');
    if (savedPosition) {
      try {
        const parsed = JSON.parse(savedPosition);
        setPosition(parsed);
      } catch (error) {
        console.error('Error parsing saved FAB position:', error);
        setDefaultPosition();
      }
    } else {
      setDefaultPosition();
    }
  }, []);

  const setDefaultPosition = () => {
    // Default position: bottom-right with safe margins
    const margin = 20;
    const navHeight = 80; // Approximate navigation bar height
    const safeAreaBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') || '0');
    
    setPosition({
      x: window.innerWidth - FAB_SIZE - margin,
      y: window.innerHeight - FAB_SIZE - navHeight - safeAreaBottom - margin
    });
  };

  // Save position to localStorage
  const savePosition = (pos: Position) => {
    localStorage.setItem('guidance-fab-position', JSON.stringify(pos));
  };

  // Constrain position to viewport bounds
  const constrainPosition = (pos: Position): Position => {
    const margin = 10;
    const navHeight = 80;
    const safeAreaBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') || '0');
    
    return {
      x: Math.max(margin, Math.min(pos.x, window.innerWidth - FAB_SIZE - margin)),
      y: Math.max(margin, Math.min(pos.y, window.innerHeight - FAB_SIZE - navHeight - safeAreaBottom - margin))
    };
  };

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    };
    
    const constrainedPosition = constrainPosition(newPosition);
    setPosition(constrainedPosition);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      savePosition(position);
    }
  };

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      setDragOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      });
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    
    if (e.touches[0]) {
      const newPosition = {
        x: e.touches[0].clientX - dragOffset.x,
        y: e.touches[0].clientY - dragOffset.y
      };
      
      const constrainedPosition = constrainPosition(newPosition);
      setPosition(constrainedPosition);
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      savePosition(position);
    }
  };

  // Add global event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, dragOffset, position]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const constrainedPosition = constrainPosition(position);
      setPosition(constrainedPosition);
      savePosition(constrainedPosition);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position]);

  const handleClick = () => {
    if (!isDragging) {
      navigate('/guidance');
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={`
        fixed z-50 w-14 h-14 rounded-full
        apple-material-card-elevated liquid-glass-card
        backdrop-blur-xl shadow-elevated border border-glass-border
        flex items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-glow
        active:scale-95
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        ${isDragging ? 'transition-none' : 'transition-all'}
        apple-touch-target-comfortable
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: isDragging ? 'none' : undefined,
      }}
      aria-label="Open Guidance"
    >
      <MessageCircle 
        className="w-6 h-6 text-accent drop-shadow-sm" 
        style={{
          filter: isDragging ? 'none' : 'drop-shadow(0 0 8px rgba(255, 140, 0, 0.3))'
        }}
      />
    </button>
  );
};
