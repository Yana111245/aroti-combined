import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Calendar, Clock, Video, X } from "lucide-react";
import { mockSessions } from "@/data/specialists";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { getSessionsWithUpdates } from "@/utils/sessionHelpers";
import { cancelSession } from "@/utils/sessionUpdates";
import { toast } from "sonner";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function UpcomingSessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  // Load session with any localStorage updates
  const session = useMemo(() => {
    // Get all sessions (mock + booked) with updates applied
    const allSessions = getSessionsWithUpdates(mockSessions);
    const foundSession = allSessions.find((s) => s.id === id);
    return foundSession || null;
  }, [id]);

  if (!session) {
    navigate("/booking");
    return null;
  }

  // Format date with Today/Tomorrow logic
  const formatSessionDate = () => {
    const sessionDate = new Date(session.date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const resetTime = (date: Date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    };
    
    const sessionDay = resetTime(sessionDate);
    const todayDay = resetTime(today);
    const tomorrowDay = resetTime(tomorrow);
    
    if (sessionDay.getTime() === todayDay.getTime()) {
      return "Today";
    } else if (sessionDay.getTime() === tomorrowDay.getTime()) {
      return "Tomorrow";
    } else {
      return sessionDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
      });
    }
  };

  // Convert to 12-hour format
  const formatSessionTime = () => {
    const [hours, minutes] = session.time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleCancelSession = () => {
    if (session) {
      cancelSession(session.id);
      toast.success("Session canceled. Credit added to your account ✨");
      setShowCancelDialog(false);
      navigate("/booking");
    }
  };

  return (
    <PageWrapper showBottomNav={false} showTabBar={false}>
      <BaseHeader 
        title="Session Details"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/booking"),
          label: "Back"
        }}
      />
      
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen">
        <main className="px-4 pt-2 pb-32">
          {/* Session Card */}
          <BaseCard className="p-6 liquid-glass-card border border-glass-border/70 shadow-glass animate-fade-in">
            {/* Specialist Info */}
            <div className="flex items-start gap-4 mb-6">
              <img
                src={session.specialistPhoto}
                alt={session.specialistName}
                className="w-20 h-20 rounded-[14px] object-cover ring-2 ring-primary/20"
              />
              <div className="flex-1">
                <h3 className="text-headline font-semibold text-foreground">{session.specialistName}</h3>
                <p className="text-subhead text-muted-foreground">{session.specialty}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-body font-semibold text-foreground">4.9</span>
                  <span className="text-subhead text-muted-foreground/70 ml-1">128 reviews</span>
                </div>
              </div>
            </div>
            
            {/* Session Details */}
            <div className="space-y-4 border-t border-white/5 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-footnote text-muted-foreground/70">Date</p>
                  <p className="text-subhead font-medium text-foreground">{formatSessionDate()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-footnote text-muted-foreground/70">Time</p>
                  <p className="text-subhead font-medium text-foreground">{formatSessionTime()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Video className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-footnote text-muted-foreground/70">Platform</p>
                  <p className="text-subhead font-medium text-foreground">Secure video call • {session.duration} min</p>
                </div>
              </div>
            </div>

            {/* Preparation Notes - if available */}
            {session.preparationNotes && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <h4 className="text-subhead font-medium text-foreground mb-2">
                  Preparation Notes
                </h4>
                <p className="text-body text-muted-foreground/80 leading-relaxed">
                  {session.preparationNotes}
                </p>
              </div>
            )}

            {/* Total Paid */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-subhead text-muted-foreground/70">Total paid</span>
                <span className="text-headline font-semibold text-accent">${session.price}</span>
              </div>
            </div>
          </BaseCard>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {/* Join Button (Primary) */}
            <button
              onClick={() => {
                if (session.meetingLink) {
                  window.open(session.meetingLink, '_blank');
                }
              }}
              className="w-full px-5 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Join Session
            </button>

            {/* Reschedule Button (Secondary) */}
            <button
              onClick={() => {
                navigate(`/booking/schedule/${session.specialistId}`, {
                  state: { session, isReschedule: true }
                });
              }}
              className="w-full px-5 py-3 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Reschedule
            </button>

            {/* Text Button (Tertiary) */}
            <button
              onClick={() => {
                navigate(`/profile/messages/${session.specialistId}`);
              }}
              className="w-full px-5 py-3 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Text {session.specialistName}
            </button>
          </div>

          {/* Cancel Link at Bottom */}
          <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
            <button
              onClick={() => setShowCancelDialog(true)}
              className="text-footnote text-muted-foreground/50 hover:text-muted-foreground/70 transition-colors duration-200 underline underline-offset-2"
            >
              Cancel session
            </button>
          </div>
        </main>
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="liquid-glass-card border border-glass-border/70 shadow-glass backdrop-blur-xl bg-[rgba(23,20,31,0.95)] max-w-[calc(100vw-2rem)] sm:max-w-lg p-6 rounded-[12px]">
          <AlertDialogHeader className="relative pr-8">
            {/* Close button */}
            <button
              onClick={() => setShowCancelDialog(false)}
              className="absolute -top-2 right-0 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <AlertDialogTitle>Cancel Session?</AlertDialogTitle>
            <AlertDialogDescription className="text-body text-foreground/90 leading-relaxed">
              Cancelling gives you app credit that you can use for future sessions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-2 mt-6 sm:flex-row sm:space-x-0">
            <AlertDialogPrimitive.Cancel
              onClick={handleCancelSession}
              className="flex-1 px-5 py-3 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Cancel Session
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action
              onClick={() => setShowCancelDialog(false)}
              className="flex-1 px-5 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              Keep Session
            </AlertDialogPrimitive.Action>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageWrapper>
  );
}

