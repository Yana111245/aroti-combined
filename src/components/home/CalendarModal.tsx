import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export const CalendarModal = ({ isOpen, onClose, onDateSelect, selectedDate }: CalendarModalProps) => {
  const today = new Date();
  
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-[20px] z-50 flex items-center justify-center p-4">
      <div 
        className="liquid-glass-elevated w-full max-w-md p-6 space-y-6 animate-scale-in"
        style={{
          background: 'rgba(23, 20, 31, 0.85)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.55), 0 4px 16px rgba(0, 0, 0, 0.45)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-title-2 text-foreground font-apple-display">Select Date</h2>
          <button 
            onClick={onClose} 
            className="apple-touch-target-comfortable p-2 text-muted-foreground hover:text-accent transition-all duration-300 rounded-[16px] hover:bg-white/5"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar */}
        <div className="glass-card" style={{ 
          background: 'rgba(30, 26, 40, 0.75)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)'
        }}>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={(date) => date > today}
            initialFocus
            className="rounded-[12px] p-4"
            style={{
              background: 'transparent',
              color: 'hsl(var(--foreground))'
            }}
          />
        </div>

        {/* Footer */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-[24px] apple-touch-target-comfortable glass-button"
            style={{
              background: 'rgba(30, 26, 40, 0.75)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.9)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(30, 26, 40, 0.85)';
              e.currentTarget.style.borderColor = 'hsl(var(--accent))';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(209, 122, 82, 0.15)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(30, 26, 40, 0.75)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
