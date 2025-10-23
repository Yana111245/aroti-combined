import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface DaySelectorProps {
  selectedDay: "yesterday" | "today";
  onDayChange: (day: "yesterday" | "today") => void;
  onCalendarClick?: () => void;
}

export const DaySelector = ({ selectedDay, onDayChange, onCalendarClick }: DaySelectorProps) => {
  const days = [
    { id: "yesterday" as const, label: "YESTERDAY" },
    { id: "today" as const, label: "TODAY" },
  ];

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <button className="p-2 text-muted-foreground hover:text-accent transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex gap-6">
        {days.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onDayChange(id)}
            className={`text-sm font-medium transition-colors relative ${
              selectedDay === id
                ? "text-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
            {selectedDay === id && (
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
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
