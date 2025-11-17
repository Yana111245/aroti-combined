import { useParams, useNavigate, useLocation } from "react-router-dom";
import { X, CheckCircle, Star } from "lucide-react";
import { specialists } from "@/data/specialists";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function BookingConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const specialist = specialists.find((s) => s.id === id);
  const { date, time } = location.state || {};

  if (!specialist || !date || !time) {
    navigate("/booking");
    return null;
  }

  return (
    <PageWrapper showBottomNav={false} showTabBar={false}>
      {/* Header with Close Button */}
      <BaseHeader 
        title=""
        rightActions={
          <button
            onClick={() => navigate("/home")}
            className="apple-touch-target-comfortable p-2 rounded-[16px] transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        }
      />
      
      {/* Main Content */}
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen">
        <main className="px-4 pt-8 pb-32">
          {/* Success Message */}
          <div className="text-center mb-8 space-y-2 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-title-1 font-title text-foreground">
              Session Confirmed!
            </h1>
            <p className="text-subhead text-muted-foreground">
              Your time for self-reflection is reserved
            </p>
          </div>

          {/* Session Summary Card */}
          <BaseCard className="p-6 liquid-glass-card border border-glass-border/70 shadow-glass animate-fade-in">
            <div className="flex items-start gap-4 mb-4">
              <img
                src={specialist.photo}
                alt={specialist.name}
                className="w-20 h-20 rounded-[14px] object-cover ring-2 ring-primary/20"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-headline font-semibold text-foreground">{specialist.name}</h3>
                    <p className="text-subhead text-muted-foreground">{specialist.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-footnote text-muted-foreground/70">Paid</p>
                    <p className="text-headline font-semibold text-accent">${specialist.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-body font-semibold text-foreground">{specialist.rating}</span>
                  </div>
                  <span className="text-subhead text-muted-foreground/70">{specialist.reviewCount} reviews</span>
                </div>
              </div>
            </div>
            
            <div className="grid gap-3 text-subhead border-t border-white/5 pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground/70">Date</span>
                <span className="font-medium text-foreground">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/70">Time</span>
                <span className="font-medium text-foreground">{time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/70">Duration</span>
                <span className="font-medium text-foreground">50 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground/70">Platform</span>
                <span className="font-medium text-foreground">Secure video call</span>
              </div>
              
              <div className="mt-2 pt-3 border-t border-white/5">
                <p className="text-footnote text-muted-foreground/70 text-center">
                  Check your email for meeting details and calendar invite
                </p>
              </div>
            </div>
          </BaseCard>
        </main>
      </div>
    </PageWrapper>
  );
}

