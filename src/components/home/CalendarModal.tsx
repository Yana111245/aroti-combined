import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export const CalendarModal = ({ isOpen, onClose, onDateSelect, selectedDate }: CalendarModalProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
  // Get past 14 days from today
  const getPastDates = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates.reverse(); // Show oldest first
  };

  const pastDates = getPastDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isSelectedDate = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = (date: Date) => {
    onDateSelect(date);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-6 space-y-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif text-foreground">Past Days</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date Grid */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Select a day to view its insights
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            {pastDates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                className={`p-4 rounded-xl text-left transition-all ${
                  isSelectedDate(date)
                    ? 'bg-accent text-accent-foreground shadow-glow'
                    : isToday(date)
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'bg-white/30 hover:bg-white/50 text-foreground'
                }`}
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {formatDate(date)}
                  </p>
                  {isToday(date) && (
                    <p className="text-xs opacity-80">Today</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
