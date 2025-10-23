import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { specialists } from "@/data/specialists";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/booking/BottomNav";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const timeSlots = {
  morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  afternoon: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
  evening: ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30"],
};

export default function ScheduleSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const specialist = specialists.find((s) => s.id === id);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  if (!specialist) {
    return <div>Specialist not found</div>;
  }

  // Generate next 14 days
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      navigate(`/booking/payment/${specialist.id}`, {
        state: { date: selectedDate, time: selectedTime },
      });
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/90 transition-smooth"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Choose Your Session Time
          </h1>
        </div>
      </header>

      {/* Date Selection */}
      <div className="px-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Select Date
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {dates.map((date) => {
            const isSelected =
              selectedDate?.toDateString() === date.toDateString();
            return (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={cn(
                  "flex flex-col items-center min-w-[70px] px-4 py-3 rounded-2xl transition-smooth",
                  isSelected
                    ? "gold-gradient text-white shadow-lg scale-105"
                    : "glass-card text-foreground hover:bg-white/90"
                )}
              >
                <span className="text-xs font-medium mb-1">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-2xl font-bold">
                  {date.getDate()}
                </span>
                <span className="text-xs mt-1">
                  {date.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="px-6 mb-8 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Select Time
          </h2>

          {/* Morning */}
          <div className="mb-6">
            <h3 className="text-sm text-muted-foreground mb-3">Morning</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.morning.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "py-3 rounded-full text-sm font-medium transition-smooth",
                    selectedTime === time
                      ? "gold-gradient text-white shadow-md"
                      : "glass-card text-foreground hover:bg-white/90"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div className="mb-6">
            <h3 className="text-sm text-muted-foreground mb-3">Afternoon</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.afternoon.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "py-3 rounded-full text-sm font-medium transition-smooth",
                    selectedTime === time
                      ? "gold-gradient text-white shadow-md"
                      : "glass-card text-foreground hover:bg-white/90"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div className="mb-6">
            <h3 className="text-sm text-muted-foreground mb-3">Evening</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.evening.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    "py-3 rounded-full text-sm font-medium transition-smooth",
                    selectedTime === time
                      ? "gold-gradient text-white shadow-md"
                      : "glass-card text-foreground hover:bg-white/90"
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {selectedDate && selectedTime && (
        <div className="px-6 mb-8 animate-slide-up">
          <div className="glass-card p-6">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={specialist.photo}
                alt={specialist.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg">
                  {specialist.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {specialist.specialty}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium text-foreground">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium text-foreground">50 min</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-gradient-gold">${specialist.price}</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedDate || !selectedTime}
            className={cn(
              buttonVariants({ variant: "gold", size: "lg" }),
              "w-full mt-4"
            )}
          >
            Continue to Payment
          </Button>
        </div>
      )}

      <BottomNav />

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
