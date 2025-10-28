import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { specialists } from "@/data/specialists";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
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
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <BaseHeader 
        title="Choose Your Session Time"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate(-1),
          label: "Back"
        }}
      />
      
      {/* Main Content */}
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 pb-24 mt-4" role="main" aria-label="Schedule content">
          <section className="space-y-6" aria-labelledby="schedule-content">
            <h2 id="schedule-content" className="sr-only">Schedule Content</h2>

            {/* Date Selection */}
            <div>
              <h2 className="text-headline font-semibold text-foreground mb-4">
                Select Date
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
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
                    ? "bg-gradient-gold text-white shadow-lg scale-105"
                    : "liquid-glass-card text-foreground"
                )}
              >
                <span className="text-footnote font-medium mb-1">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="text-title-2 font-bold">
                  {date.getDate()}
                </span>
                <span className="text-footnote mt-1">
                  {date.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="px-4 mb-8 animate-fade-in">
          <h2 className="text-headline font-semibold text-foreground mb-4">
            Select Time
          </h2>

          {/* Morning */}
          <div className="mb-6">
            <h3 className="text-subhead text-muted-foreground mb-3">Morning</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.morning.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-3 rounded-full text-subhead font-medium transition-smooth",
                  selectedTime === time
                    ? "bg-gradient-gold text-white shadow-md"
                    : "liquid-glass-card text-foreground"
                )}
              >
                {time}
              </button>
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div className="mb-6">
            <h3 className="text-subhead text-muted-foreground mb-3">Afternoon</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.afternoon.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-3 rounded-full text-subhead font-medium transition-smooth",
                  selectedTime === time
                    ? "bg-gradient-gold text-white shadow-md"
                    : "liquid-glass-card text-foreground"
                )}
              >
                {time}
              </button>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div className="mb-6">
            <h3 className="text-subhead text-muted-foreground mb-3">Evening</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.evening.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "py-3 rounded-full text-subhead font-medium transition-smooth",
                  selectedTime === time
                    ? "bg-gradient-gold text-white shadow-md"
                    : "liquid-glass-card text-foreground"
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
              <div className="animate-slide-up">
                <BaseCard className="p-6">
                  <div className="flex items-start gap-4 mb-4">
              <img
                src={specialist.photo}
                alt={specialist.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
              />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-headline">
                        {specialist.name}
                      </h3>
                      <p className="text-muted-foreground text-subhead">
                        {specialist.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-subhead">
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
                    <div className="flex justify-between text-headline font-semibold pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-gradient-gold">${specialist.price}</span>
                    </div>
                  </div>
                </BaseCard>
                
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
          </section>
        </main>
      </div>
    </PageWrapper>
  );
}
