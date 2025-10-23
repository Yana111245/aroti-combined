import { useState } from "react";
import { ArrowLeft, Star, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockSessions } from "@/data/specialists";
import { BottomNav } from "@/components/booking/BottomNav";
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
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/booking")}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/90 transition-smooth"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Sessions</h1>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="glass-card p-1 flex gap-1">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={cn(
              "flex-1 py-3 rounded-full text-sm font-medium transition-smooth",
              activeTab === "upcoming"
                ? "gold-gradient text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={cn(
              "flex-1 py-3 rounded-full text-sm font-medium transition-smooth",
              activeTab === "past"
                ? "gold-gradient text-white shadow-md"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Past
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="px-6">
        {activeTab === "upcoming" && (
          <div className="space-y-4 animate-fade-in">
            {upcomingSessions.length === 0 ? (
              <div className="glass-card p-12 text-center">
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
              </div>
            ) : (
              upcomingSessions.map((session) => (
                <div key={session.id} className="glass-card p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={session.specialistPhoto}
                      alt={session.specialistName}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg">
                        {session.specialistName}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {session.specialty}
                      </p>
                      <div className="text-sm text-foreground">
                        {new Date(session.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {session.time}
                      </div>
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 rounded-full gold-gradient text-white text-xs font-medium">
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
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "past" && (
          <div className="space-y-4 animate-fade-in">
            {pastSessions.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No past sessions yet.</p>
              </div>
            ) : (
              pastSessions.map((session) => (
                <div key={session.id} className="glass-card p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={session.specialistPhoto}
                      alt={session.specialistName}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg">
                        {session.specialistName}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {session.specialty}
                      </p>
                      <div className="text-sm text-muted-foreground">
                        {new Date(session.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {session.time}
                      </div>
                      <div className="mt-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
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
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      <Dialog
        open={!!ratingSession}
        onOpenChange={() => setRatingSession(null)}
      >
        <DialogContent className="glass-card border-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
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

      <BottomNav />
    </div>
  );
}
