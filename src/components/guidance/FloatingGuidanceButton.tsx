import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Position {
  x: number;
  y: number;
}

type FabPosition =
  | 'left-top'
  | 'left-middle'
  | 'left-bottom'
  | 'right-top'
  | 'right-middle'
  | 'right-bottom';

const DEFAULT_FAB_POSITION: FabPosition = 'right-bottom';

const getSafeInset = (name: string): number => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name) || '0';
  const parsed = parseInt(raw);
  return Number.isFinite(parsed) ? parsed : 0;
};

const positionToStyle = (key: FabPosition, fabSize: number) => {
  const margin = 16;
  const navHeight = 80; // bottom nav approx
  const safeTop = getSafeInset('--safe-area-inset-top');
  const safeBottom = getSafeInset('--safe-area-inset-bottom');

  const isLeft = key.startsWith('left');
  const vert = key.endsWith('top')
    ? { top: `${margin + safeTop}px` }
    : key.endsWith('middle')
      ? { top: `${Math.max(margin + safeTop, (window.innerHeight - fabSize - navHeight - safeBottom) / 2)}px` }
      : { top: `${window.innerHeight - fabSize - navHeight - safeBottom - margin}px` };

  const horiz = isLeft
    ? { left: `${margin}px` }
    : { left: `${window.innerWidth - fabSize - margin}px` };

  return { ...horiz, ...vert } as const;
};

const snapFromPoint = (x: number, y: number): FabPosition => {
  const side: 'left' | 'right' = x < window.innerWidth / 2 ? 'left' : 'right';
  const third = y < window.innerHeight / 3
    ? 'top'
    : y < (2 * window.innerHeight) / 3
      ? 'middle'
      : 'bottom';
  return `${side}-${third}` as FabPosition;
};

const readFabPosition = async (): Promise<FabPosition | null> => {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    const meta = data.user.user_metadata as Record<string, unknown> | undefined;
    const key = (meta?.fab_position as string) || '';
    if (key && [
      'left-top','left-middle','left-bottom',
      'right-top','right-middle','right-bottom'
    ].includes(key)) return key as FabPosition;
    return null;
  }
  const local = localStorage.getItem('guidance-fab-position-key');
  return (local as FabPosition) || null;
};

const writeFabPosition = async (key: FabPosition) => {
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    // In mock mode this is a no-op; in real mode this would update user metadata or a table
    // Keep a local mirror to survive refreshes in UI-only mode
    localStorage.setItem('guidance-fab-position-key', key);
    return;
  }
  localStorage.setItem('guidance-fab-position-key', key);
};

export const FloatingGuidanceButton = () => {
  const navigate = useNavigate();
  // Pixel position while dragging
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [fabKey, setFabKey] = useState<FabPosition>(DEFAULT_FAB_POSITION);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const FAB_SIZE = 56; // 14rem = 56px

  // Load saved fixed position on mount
  useEffect(() => {
    (async () => {
      const key = await readFabPosition();
      if (key) {
        setFabKey(key);
      } else {
        setFabKey(DEFAULT_FAB_POSITION);
      }
      // Initialize pixel position to current fixed style for smooth pick-up when dragging
      const style = positionToStyle(key ?? DEFAULT_FAB_POSITION, FAB_SIZE);
      setPosition({
        x: parseFloat((style as any).left.replace('px','')),
        y: parseFloat((style as any).top.replace('px','')),
      });
    })();
  }, []);

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
      const key = snapFromPoint(position.x + FAB_SIZE / 2, position.y + FAB_SIZE / 2);
      setFabKey(key);
      // Snap pixel position to the fixed slot for visual consistency
      const style = positionToStyle(key, FAB_SIZE);
      setPosition({
        x: parseFloat((style as any).left.replace('px','')),
        y: parseFloat((style as any).top.replace('px','')),
      });
      void writeFabPosition(key);
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
      const key = snapFromPoint(position.x + FAB_SIZE / 2, position.y + FAB_SIZE / 2);
      setFabKey(key);
      const style = positionToStyle(key, FAB_SIZE);
      setPosition({
        x: parseFloat((style as any).left.replace('px','')),
        y: parseFloat((style as any).top.replace('px','')),
      });
      void writeFabPosition(key);
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
      // Recompute pixel position from current fixed key
      const style = positionToStyle(fabKey, FAB_SIZE);
      setPosition({
        x: parseFloat((style as any).left.replace('px','')),
        y: parseFloat((style as any).top.replace('px','')),
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fabKey]);

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
        // While dragging, use pixel coordinates; otherwise, snap to fixed slot
        left: isDragging ? `${position.x}px` : positionToStyle(fabKey, FAB_SIZE).left,
        top: isDragging ? `${position.y}px` : positionToStyle(fabKey, FAB_SIZE).top,
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
