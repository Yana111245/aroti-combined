import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { specialists } from "@/data/specialists";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
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
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-4">
        <main className="px-4 pb-32 mt-4" role="main" aria-label="Schedule content">
          <section className="space-y-8" aria-labelledby="schedule-content">
            <h2 id="schedule-content" className="sr-only">Schedule Content</h2>

            {/* Specialist Hero */}
            <BaseCard className="p-5 flex items-center gap-4 liquid-glass-card stagger-fade-up" style={{ animationDelay: "100ms" }}>
              <img
                src={specialist.photo}
                alt={specialist.name}
                className="w-16 h-16 rounded-[14px] object-cover ring-2 ring-primary/20"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-headline font-semibold text-foreground">{specialist.name}</h3>
                    <p className="text-subhead text-muted-foreground">{specialist.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-footnote text-muted-foreground/70">From</p>
                    <p className="text-headline font-semibold text-foreground">${specialist.price} <span className="text-subhead font-normal text-muted-foreground">/ session</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-body font-semibold text-foreground">{specialist.rating}</span>
                  </div>
                  <span className="text-subhead text-muted-foreground/70">{specialist.reviewCount} reviews</span>
                  <span className="text-subhead text-muted-foreground/70">• {specialist.sessionCount}+ sessions</span>
                </div>
              </div>
            </BaseCard>

            {/* Date Selection */}
            <div className="animate-fade-in stagger-fade-up" style={{ animationDelay: "150ms" }}>
              <BaseSectionHeader 
                title="Select Date"
              />
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mt-6">
                {dates.map((date) => {
                  const isSelected =
                    selectedDate?.toDateString() === date.toDateString();
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        "flex flex-col items-center min-w-[76px] px-4 py-3 rounded-2xl transition-smooth border border-transparent liquid-glass-card",
                        isSelected
                          ? "bg-accent/15 border-accent/60 text-foreground shadow-glass scale-105"
                          : "text-foreground/90 hover:border-white/10"
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
                      {isSelected && (
                        <span className="mt-2 text-footnote text-accent font-medium">Selected</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="animate-fade-in stagger-fade-up" style={{ animationDelay: "200ms" }}>
          <BaseSectionHeader 
            title="Select Time"
          />

          <div className="mt-6 space-y-6">
            {/* Morning */}
            <div>
              <h3 className="text-subhead text-muted-foreground mb-3">Morning</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.morning.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-3 rounded-full text-subhead font-medium transition-smooth border border-transparent liquid-glass-card",
                      selectedTime === time
                        ? "bg-accent text-white shadow-glass border-accent/60"
                        : "text-foreground hover:border-white/10"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Afternoon */}
            <div>
              <h3 className="text-subhead text-muted-foreground mb-3">Afternoon</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.afternoon.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-3 rounded-full text-subhead font-medium transition-smooth border border-transparent liquid-glass-card",
                      selectedTime === time
                        ? "bg-accent text-white shadow-glass border-accent/60"
                        : "text-foreground hover:border-white/10"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Evening */}
            <div>
              <h3 className="text-subhead text-muted-foreground mb-3">Evening</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.evening.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-3 rounded-full text-subhead font-medium transition-smooth border border-transparent liquid-glass-card",
                      selectedTime === time
                        ? "bg-accent text-white shadow-glass border-accent/60"
                        : "text-foreground hover:border-white/10"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {selectedDate && selectedTime && (
        <div className="animate-fade-in stagger-fade-up" style={{ animationDelay: "250ms" }}>
          <BaseCard className="p-6 liquid-glass-card border border-glass-border/70 shadow-glass">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={specialist.photo}
                alt={specialist.name}
                className="w-16 h-16 rounded-[12px] object-cover ring-2 ring-primary/20"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-headline">
                  {specialist.name}
                </h3>
                <p className="text-subhead text-muted-foreground">
                  {specialist.specialty}
                </p>
                <div className="flex items-center gap-2 mt-2 text-footnote text-muted-foreground/70">
                  <span>${specialist.price} / session</span>
                  <span>•</span>
                  <span>50 min</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-footnote text-muted-foreground/70">Date</span>
                <span className="text-body text-foreground">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-footnote text-muted-foreground/70">Time</span>
                <span className="text-body text-foreground">{selectedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-footnote text-muted-foreground/70">Platform</span>
                <span className="text-body text-foreground">Video call (Zoom)</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-headline font-semibold">
                <span>Total</span>
                <span className="text-accent">${specialist.price}</span>
              </div>
              <p className="text-footnote text-muted-foreground/70">
                Session will be hosted in your timezone. Confirmation and call link arrive via email.
              </p>
            </div>
          </BaseCard>
        </div>
      )}
          </section>
        </main>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pb-[80px] pt-[env(safe-area-inset-bottom)]">
        <div
          className="liquid-glass-elevated border-t border-glass-highlight"
          style={{
            background: 'rgba(12, 10, 18, 0.92)',
            backdropFilter: 'blur(60px) saturate(180%)',
            WebkitBackdropFilter: 'blur(60px) saturate(180%)',
          }}
        >
          <div className="px-4 py-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-subhead font-medium text-foreground">
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  : "Select a date"}
                {selectedTime ? ` • ${selectedTime}` : selectedDate ? " • Select a time" : ""}
              </p>
              <p className="text-footnote text-muted-foreground">
                All times shown in your timezone
              </p>
            </div>
            <button
              onClick={handleContinue}
              disabled={!selectedDate || !selectedTime}
              className={cn(
                "px-5 py-2.5 rounded-[12px] text-subhead font-medium transition-all duration-200",
                selectedDate && selectedTime
                  ? "bg-accent text-white hover:bg-accent/90 hover:shadow-lg"
                  : "bg-white/10 text-muted-foreground cursor-not-allowed"
              )}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
