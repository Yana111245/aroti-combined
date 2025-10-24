import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Calendar } from "lucide-react";

interface DaySelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onCalendarClick?: () => void;
}

export const DaySelector = ({ selectedDate, onDateChange, onCalendarClick }: DaySelectorProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  // Generate dates from 14 days ago to today
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 14; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const today = new Date();
  const todayIndex = dates.findIndex(date => 
    date.toDateString() === today.toDateString()
  );

  const formatDate = (date: Date) => {
    const isToday = date.toDateString() === today.toDateString();
    if (isToday) return 'TODAY';
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric' 
    }).toUpperCase();
  };

  const scrollToDate = (index: number) => {
    const container = scrollRef.current;
    if (container) {
      const dateContainer = container.children[0]; // The flex container
      const item = dateContainer?.children[index] as HTMLElement;
      if (item) {
        item.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    }
  };

  const scrollLeft = () => {
    const container = scrollRef.current;
    if (container) {
      const currentScroll = container.scrollLeft;
      const itemWidth = 80; // Approximate width of each date button
      container.scrollTo({
        left: currentScroll - itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleDateClick = (date: Date) => {
    onDateChange(date);
    const index = dates.findIndex(d => d.toDateString() === date.toDateString());
    scrollToDate(index);
  };

  const checkScrollPosition = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
    }
  };

  useEffect(() => {
    // Center TODAY on mount using scrollIntoView with center alignment
    const timer = setTimeout(() => {
      const container = scrollRef.current;
      if (container && todayIndex >= 0) {
        const dateContainer = container.children[0] as HTMLElement;
        if (dateContainer) {
          const todayButton = dateContainer.children[todayIndex] as HTMLElement;
          if (todayButton) {
            // Use scrollIntoView with center alignment
            todayButton.scrollIntoView({ 
              behavior: 'auto',
              block: 'nearest', 
              inline: 'center' 
            });
          }
        }
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [todayIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <button 
        onClick={scrollLeft}
        className={`p-2 transition-colors ${
          canScrollLeft 
            ? "text-muted-foreground hover:text-accent" 
            : "text-muted-foreground/30"
        }`}
        disabled={!canScrollLeft}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex-1 mx-4 overflow-hidden">
        <div 
          ref={scrollRef}
          className="scroll-x-only snap-x snap-mandatory scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            touchAction: 'pan-x',
            overscrollBehaviorX: 'contain',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div 
            className="flex gap-6"
            style={{ 
              paddingLeft: '1.5rem',  // Minimal left padding
              paddingRight: 'calc(50vw - 1rem)'  // More space to center TODAY
            }}
          >
            {dates.map((date, index) => {
              const isSelected = date.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateClick(date)}
                  className={`snap-center text-sm font-medium transition-colors relative whitespace-nowrap min-w-[80px] text-center ${
                    isSelected
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {formatDate(date)}
                  {isSelected && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button 
        onClick={onCalendarClick}
        className="p-2 text-accent hover:text-accent/80 transition-colors"
      >
        <Calendar className="w-5 h-5" />
      </button>
    </div>
  );
};
