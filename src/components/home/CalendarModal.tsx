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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="liquid-glass-elevated w-full max-w-md p-6 space-y-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-title text-xl text-foreground">Select Date</h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-accent transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={(date) => date > today}
          initialFocus
          className="rounded-[10px]"
        />

        {/* Footer */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-[24px]"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
