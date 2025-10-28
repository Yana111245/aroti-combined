import { useState } from "react";
import { ArrowLeft, Star, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockSessions } from "@/data/specialists";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function BookingHistory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [ratingSession, setRatingSession] = useState<string | null>(null);
  const [rating, setRating] = useState(0);

  const upcomingSessions = mockSessions.filter((s) => s.status === "upcoming");
  const pastSessions = mockSessions.filter((s) => s.status === "completed");

  const handleRate = (sessionId: string) => {
    setRatingSession(sessionId);
    setRating(0);
  };

  const submitRating = () => {
    if (rating > 0) {
      toast.success("Thank you for sharing your experience 🌙");
      setRatingSession(null);
      setRating(0);
    }
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <BaseHeader 
        title="My Sessions"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/booking"),
          label: "Back to booking"
        }}
      />
      
      {/* Main Content */}
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 pb-24 mt-4" role="main" aria-label="Booking history content">
          <section className="space-y-6" aria-labelledby="history-content">
            <h2 id="history-content" className="sr-only">Booking History Content</h2>

            {/* Tabs */}
            <div>
              <div className="liquid-glass-card p-1 flex gap-1">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={cn(
                    "flex-1 py-3 rounded-full text-subhead font-medium transition-smooth",
                    activeTab === "upcoming"
                      ? "bg-gradient-gold text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveTab("past")}
                  className={cn(
                    "flex-1 py-3 rounded-full text-subhead font-medium transition-smooth",
                    activeTab === "past"
                      ? "bg-gradient-gold text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Past
                </button>
              </div>
            </div>

            {/* Sessions List */}
            <div>
              {activeTab === "upcoming" && (
                <div className="space-y-4 animate-fade-in">
                  {upcomingSessions.length === 0 ? (
                    <BaseCard className="p-12 text-center">
                      <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        No sessions yet — find your next guide.
                      </p>
                      <Button
                        onClick={() => navigate("/booking")}
                        className={buttonVariants({ variant: "gold" }) + " mt-4"}
                      >
                        Browse Specialists
                      </Button>
                    </BaseCard>
                  ) : (
                    upcomingSessions.map((session) => (
                      <BaseCard key={session.id} className="p-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={session.specialistPhoto}
                            alt={session.specialistName}
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground text-headline">
                              {session.specialistName}
                            </h3>
                            <p className="text-subhead text-muted-foreground mb-2">
                              {session.specialty}
                            </p>
                            <div className="text-subhead text-foreground">
                              {new Date(session.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}{" "}
                              at {session.time}
                            </div>
                            <div className="mt-3">
                              <span className="inline-block px-3 py-1 rounded-full bg-gradient-gold text-white text-footnote font-medium">
                                Confirmed
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button
                            onClick={() => window.open(session.meetingLink, "_blank")}
                            className={buttonVariants({ variant: "gold" })}
                          >
                            Join Session
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              navigate(`/booking/specialist/${session.specialistId}`)
                            }
                          >
                            View Profile
                          </Button>
                        </div>
                      </BaseCard>
                    ))
                  )}
                </div>
              )}

              {activeTab === "past" && (
                <div className="space-y-4 animate-fade-in">
                  {pastSessions.length === 0 ? (
                    <BaseCard className="p-12 text-center">
                      <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No past sessions yet.</p>
                    </BaseCard>
                  ) : (
                    pastSessions.map((session) => (
                      <BaseCard key={session.id} className="p-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={session.specialistPhoto}
                            alt={session.specialistName}
                            className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground text-headline">
                              {session.specialistName}
                            </h3>
                            <p className="text-subhead text-muted-foreground mb-2">
                              {session.specialty}
                            </p>
                            <div className="text-subhead text-muted-foreground">
                              {new Date(session.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}{" "}
                              at {session.time}
                            </div>
                            <div className="mt-3">
                              <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-footnote font-medium">
                                Completed
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button
                            onClick={() => handleRate(session.id)}
                            className={buttonVariants({ variant: "gold" })}
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Rate Session
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              navigate(`/booking/schedule/${session.specialistId}`)
                            }
                          >
                            Rebook
                          </Button>
                        </div>
                      </BaseCard>
                    ))
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Rating Modal */}
      <Dialog
        open={!!ratingSession}
        onOpenChange={() => setRatingSession(null)}
      >
        <DialogContent className="liquid-glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-title-2 font-bold text-foreground">
              How was your session?
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-smooth hover:scale-110"
                >
                  <Star
                    className={cn(
                      "w-10 h-10",
                      star <= rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
            <Button
              onClick={submitRating}
              disabled={rating === 0}
              className={buttonVariants({ variant: "gold", size: "lg" }) + " w-full"}
            >
              Submit Rating
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
