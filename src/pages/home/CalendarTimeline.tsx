import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";

const CalendarTimeline = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const today = new Date();

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // In the future, this will load that day's insights
    }
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={true} className="home-tab-celestial">
      <BaseHeader
        title="Your Cosmic Timeline"
        className="[&_h1]:!text-[22px] [&_h1]:!font-medium [&_h1]:!tracking-normal [&_h1]:!leading-tight"
        leftAction={{
          icon: <ChevronLeft className="w-5 h-5" />,
          onClick: () => navigate('/home'),
          label: "Back to Home"
        }}
      />

      {/* Main content with background */}
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-nav pb-safe">
        <main className="px-4 py-6 space-y-6 max-w-2xl mx-auto" role="main" aria-label="Calendar timeline content">
          {/* Placeholder text */}
          <div className="text-center space-y-2 px-4 py-2">
            <p className="text-callout text-muted-foreground leading-relaxed" style={{ opacity: 0.85 }}>
              Soon you'll be able to view your past cards, horoscopes, and energy days here.
            </p>
          </div>

          {/* Calendar */}
          <div 
            className="liquid-glass-card mx-auto w-full"
            style={{ 
              background: 'rgba(23, 20, 31, 0.85)',
              backdropFilter: 'blur(40px) saturate(200%)',
              WebkitBackdropFilter: 'blur(40px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)'
            }}
          >
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

          {/* Future: Timeline view of past insights will appear here */}
        </main>
      </div>
    </PageWrapper>
  );
};

export default CalendarTimeline;

