import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { specialists } from "@/data/specialists";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateSession } from "@/utils/sessionUpdates";

const timeSlots = {
  morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
  afternoon: ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"],
  evening: ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30"],
};

export default function ScheduleSession() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const specialist = specialists.find((s) => s.id === id);
  
  // Check if this is a reschedule flow
  const { session, isReschedule } = location.state || {};
  
  // Initialize with existing session data if rescheduling
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    isReschedule && session?.date ? new Date(session.date) : null
  );
  const [selectedTime, setSelectedTime] = useState<string>(
    isReschedule && session?.time ? session.time : ""
  );
  const [animationsComplete, setAnimationsComplete] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  if (!specialist) {
    return <div>Specialist not found</div>;
  }

  // Generate next 14 days - memoized to prevent regeneration on every render
  const dates = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return date;
    });
  }, []);

  // Set animations as complete after a delay to ensure they've finished
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsComplete(true);
    }, 1000); // Wait 1 second for all animations to complete (longest animation is 0.8s + delays)
    return () => clearTimeout(timer);
  }, []);

  // Scroll to summary when time is selected
  useEffect(() => {
    if (selectedTime && selectedDate && summaryRef.current) {
      // Small delay to ensure the summary card has rendered
      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 300);
    }
  }, [selectedTime, selectedDate]);

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      if (isReschedule && session) {
        // Save the reschedule to localStorage
        updateSession(
          session.id, 
          selectedDate.toISOString().split('T')[0], 
          selectedTime
        );
        
        toast.success("Session rescheduled successfully!");
        navigate(`/booking/session/${session.id}`);
      } else {
        // For new booking, proceed to payment
        navigate(`/booking/payment/${specialist.id}`, {
          state: { date: selectedDate, time: selectedTime },
        });
      }
    }
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <BaseHeader 
        title={isReschedule ? "Reschedule Session" : "Pick Your Time"}
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate(-1),
          label: "Back"
        }}
      />
      
      {/* Main Content */}
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[64px] min-h-full pb-4">
        <main className="px-4 pb-32" role="main" aria-label="Schedule content">
          <section className="space-y-8" aria-labelledby="schedule-content">
            <h2 id="schedule-content" className="sr-only">Schedule Content</h2>

            {/* Specialist Hero */}
            <BaseCard 
              className={cn(
                "p-5 flex items-center gap-4 liquid-glass-card",
                !animationsComplete && "stagger-fade-up"
              )} 
              style={{ 
                animationDelay: "100ms",
                ...(animationsComplete && { opacity: 1 })
              }}
              onAnimationEnd={() => setAnimationsComplete(true)}
            >
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
                    <p className="text-footnote text-muted-foreground/70">Price</p>
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
            <div 
              className={cn(
                "animate-fade-in",
                !animationsComplete && "stagger-fade-up"
              )} 
              style={{ 
                animationDelay: "150ms",
                ...(animationsComplete && { opacity: 1 })
              }}
              onAnimationEnd={() => setAnimationsComplete(true)}
            >
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
                        "relative flex flex-col items-center min-w-[76px] px-4 py-3 rounded-2xl transition-all duration-300 overflow-hidden",
                        isSelected
                          ? "liquid-glass-card bg-accent/20 border border-accent/50 text-accent shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]"
                          : "liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
                      )}
                    >
                      {/* Liquid glass highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      
                      <span className="text-footnote font-medium mb-1 relative z-10">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      <span className="text-title-2 font-bold relative z-10">
                        {date.getDate()}
                      </span>
                      <span className="text-footnote mt-1 relative z-10">
                        {date.toLocaleDateString("en-US", { month: "short" })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

      {/* Time Selection */}
      {selectedDate && (
        <div 
          className={cn(
            "animate-fade-in",
            !animationsComplete && "stagger-fade-up"
          )} 
          style={{ 
            animationDelay: "200ms",
            ...(animationsComplete && { opacity: 1 })
          }}
          onAnimationEnd={() => setAnimationsComplete(true)}
        >
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
                      "relative py-3 rounded-full text-subhead font-medium transition-all duration-300 overflow-hidden",
                      selectedTime === time
                        ? "liquid-glass-card bg-accent/20 border border-accent/50 text-accent shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]"
                        : "liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
                    )}
                  >
                    {/* Liquid glass highlight */}
                    <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                    <span className="relative z-10">{time}</span>
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
                      "relative py-3 rounded-full text-subhead font-medium transition-all duration-300 overflow-hidden",
                      selectedTime === time
                        ? "liquid-glass-card bg-accent/20 border border-accent/50 text-accent shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]"
                        : "liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
                    )}
                  >
                    {/* Liquid glass highlight */}
                    <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                    <span className="relative z-10">{time}</span>
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
                      "relative py-3 rounded-full text-subhead font-medium transition-all duration-300 overflow-hidden",
                      selectedTime === time
                        ? "liquid-glass-card bg-accent/20 border border-accent/50 text-accent shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]"
                        : "liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
                    )}
                  >
                    {/* Liquid glass highlight */}
                    <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                    <span className="relative z-10">{time}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary */}
      {selectedDate && selectedTime && (
        <div 
          ref={summaryRef}
          className={cn(
            "animate-fade-in",
            !animationsComplete && "stagger-fade-up"
          )} 
          style={{ 
            animationDelay: "250ms",
            ...(animationsComplete && { opacity: 1 })
          }}
          onAnimationEnd={() => setAnimationsComplete(true)}
        >
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
      <div className="home-tab-celestial fixed bottom-0 left-0 right-0 z-40 pb-[80px] pt-[env(safe-area-inset-bottom)]">
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
                "px-5 py-2.5 rounded-[10px] text-subhead font-body font-medium transition-all duration-200",
                selectedDate && selectedTime
                  ? "bg-accent text-white hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                  : "bg-white/10 text-muted-foreground cursor-not-allowed"
              )}
            >
              {isReschedule ? "Confirm Reschedule" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
