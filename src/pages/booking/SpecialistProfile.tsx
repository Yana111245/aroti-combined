import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Bookmark, ChevronRight } from "lucide-react";
import { specialists, reviews } from "@/data/specialists";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { cn } from "@/lib/utils";
import { isFavorited, toggleFavorite } from "@/utils/favorites";
import { toast } from "sonner";

export default function SpecialistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const specialist = specialists.find((s) => s.id === id);
  const specialistReviews = reviews.filter((r) => r.specialistId === id);
  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSessionPrice, setSelectedSessionPrice] = useState<number | null>(null);
  const [selectedSessionDuration, setSelectedSessionDuration] = useState<string | null>(null);

  // Load favorite status on mount
  useEffect(() => {
    if (specialist) {
      setIsFavorite(isFavorited(specialist.id));
      setSelectedSessionPrice(specialist.price);
      setSelectedSessionDuration("60 min");
    }
  }, [specialist]);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!specialist) return;

    const previousState = isFavorite;
    const newState = !previousState;
    
    // Optimistic update
    setIsFavorite(newState);
    
    try {
      // Toggle favorite (localStorage operation)
      toggleFavorite(specialist.id);
      
      // Show toast
      toast.success(newState ? "Added to your favorites." : "Removed from favorites.");
    } catch (err) {
      // Revert on error
      setIsFavorite(previousState);
      toast.error("Couldn't update favorites. Try again.");
    }
  };

  const scrollToReviews = () => {
    reviewsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleTextClick = () => {
    navigate(`/profile/messages`);
  };

  if (!specialist) {
    return (
      <PageWrapper showBottomNav={true} showTabBar={false}>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <p className="text-body text-muted-foreground mb-4 text-center">
            We couldn't load this specialist. Please try again.
          </p>
          <Button onClick={() => navigate("/booking")}>
            Go Back
          </Button>
        </div>
      </PageWrapper>
    );
  }

  const displayPrice = selectedSessionPrice ?? specialist.price;
  const displayDuration = selectedSessionDuration ?? "60 min";

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <BaseHeader 
        title="Specialist Profile"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/booking"),
          label: "Back to booking"
        }}
        rightActions={
          <button
            onClick={handleFavoriteClick}
            className="apple-touch-target-comfortable p-2 rounded-[16px] transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95 flex items-center"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Bookmark 
              className={cn(
                "w-5 h-5 transition-all duration-200",
                isFavorite 
                  ? 'fill-accent text-accent' 
                  : 'text-accent hover:text-accent/80'
              )}
            />
          </button>
        }
      />
      
      {/* Main Content */}
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        {/* Hero Section */}
        <div className="relative h-[320px] overflow-hidden animate-fade-in">
          <img
            src={specialist.photo}
            alt={specialist.name}
            className="w-full h-full object-cover animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Status Badge (top-right) */}
          <div className="absolute top-4 right-4">
            <button
              className="relative px-4 py-2 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
              aria-label={`Status: ${specialist.available ? "Available" : "Offline"}`}
            >
              {/* Liquid glass highlight */}
              <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
              <span className="text-footnote font-medium relative z-10 flex items-center gap-2">
                {specialist.available && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                )}
                {specialist.available ? "Available" : "Offline"}
              </span>
            </button>
          </div>

          {/* Overlay Content (bottom-left) */}
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-title-2 text-foreground font-normal mb-1">{specialist.name}</h2>
            <div className="flex items-center justify-between gap-4">
              <p className="text-subhead text-foreground/90">{specialist.specialty}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary flex-shrink-0" />
                  <span className="text-body font-semibold text-foreground">
                    {specialist.rating}
                  </span>
                </div>
                <button
                  onClick={scrollToReviews}
                  className="text-subhead text-accent underline underline-offset-2 hover:text-accent/80 active:text-accent transition-colors"
                >
                  {specialist.reviewCount} reviews
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="px-4 pb-4 mt-4" role="main" aria-label="Specialist profile">
          <section className="space-y-8" aria-labelledby="profile-content">
            <h2 id="profile-content" className="sr-only">Profile Content</h2>
            
            {/* About Section */}
            <div className="stagger-fade-up" style={{ animationDelay: "150ms" }}>
              <div className="mb-4">
                <h2 className="text-subhead font-semibold text-foreground mb-2">About {specialist.name}</h2>
                <div className="h-px bg-white/10 mb-4"></div>
              </div>
              <div className="liquid-glass-card rounded-[12px] p-4 border border-glass-border/50">
                <p className="text-body text-foreground/80 leading-relaxed">
                  {(() => {
                    const sentences = specialist.bio.split('.').filter(s => s.trim());
                    return sentences.slice(0, 2).join('.') + (sentences.length > 0 ? '.' : '');
                  })()}
                </p>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="stagger-fade-up" style={{ animationDelay: "200ms" }}>
              <div>
                <h2 className="text-subhead font-semibold text-foreground mb-2">Areas of expertise</h2>
                <div className="h-px bg-white/10 mb-4"></div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {specialist.categories.map((category) => (
                  <button
                    key={category}
                    className="relative px-4 py-2 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden flex-shrink-0 liquid-glass-card bg-accent/20 border border-accent/50 text-accent backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]"
                    aria-label={`Category: ${category}`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                    <span className="text-footnote font-medium relative z-10">{category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Summary Card */}
            <BaseCard className="p-6 stagger-fade-up" style={{ animationDelay: "250ms" }}>
              {/* Row 1 - Social Proof (Top Priority) */}
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary flex-shrink-0" />
                    <span className="text-body font-semibold text-foreground">
                      {specialist.rating}
                    </span>
                  </div>
                  <button
                    onClick={scrollToReviews}
                    className="text-subhead text-accent underline underline-offset-2 hover:text-accent/80 active:text-accent transition-colors"
                  >
                    {specialist.reviewCount} reviews
                  </button>
                </div>
              </div>

              {/* Row 2 - Experience Stats */}
              <div className="mb-3">
                <div className="text-subhead text-muted-foreground/60">
                  {specialist.sessionCount}+ sessions completed • {specialist.yearsOfPractice} years of experience
                </div>
              </div>

              {/* Row 3 - Price & Duration (Decision Row) */}
              <div className="mb-3">
                <div className="text-body">
                  <span className="text-subhead text-muted-foreground/70">From </span>
                  <span className="font-semibold text-foreground">
                    ${displayPrice}
                  </span>
                  <span className="text-subhead text-muted-foreground/70"> / session</span>
                  <span className="text-subhead text-muted-foreground/70"> · </span>
                  <span className="text-subhead text-foreground">
                    {displayDuration}
                  </span>
                </div>
              </div>

              {/* Row 4 - Languages */}
              {specialist.languages && specialist.languages.length > 0 && (
                <div>
                  <div className="text-subhead text-muted-foreground/70 mb-2">Languages</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {specialist.languages.map((lang) => (
                      <span
                        key={lang}
                        className="relative px-3 py-1.5 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden flex-shrink-0 liquid-glass-card bg-white/5 border border-glass-border text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]"
                      >
                        <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                        <span className="text-footnote font-medium relative z-10">
                          {lang}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </BaseCard>

            {/* Client Experiences (Reviews) */}
            <div 
              ref={reviewsSectionRef}
              className="stagger-fade-up" 
              style={{ animationDelay: "300ms" }}
            >
              <BaseSectionHeader title="Client experiences" />
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide mt-6 -mx-4 px-4">
                {specialistReviews.length > 0 ? (
                  <>
                    {specialistReviews.map((review) => (
                      <BaseCard 
                        key={review.id} 
                        className="pt-4 px-4 pb-4 w-[calc(100vw-2rem)] sm:w-[calc(100vw-8rem)] md:w-[500px] flex-shrink-0 hover:shadow-elevated transition-all flex flex-col"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3 flex-shrink-0">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <span className="text-headline font-semibold text-foreground truncate">
                              {review.userName}
                            </span>
                            <div className="flex items-center gap-0.5 flex-shrink-0">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-4 h-4",
                                    i < review.rating
                                      ? "fill-accent text-accent"
                                      : "fill-transparent text-muted-foreground/30"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          {review.date && (
                            <span className="text-footnote text-muted-foreground flex-shrink-0 ml-2">
                              {new Date(review.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </span>
                          )}
                        </div>
                        <p className="text-body text-foreground/80 leading-relaxed line-clamp-3 overflow-hidden">
                          {review.comment}
                        </p>
                      </BaseCard>
                    ))}
                  </>
                ) : (
                  <BaseCard className="p-4 text-center w-[calc(100vw-2rem)] sm:w-[calc(100vw-8rem)] md:w-[500px] flex-shrink-0 flex items-center justify-center">
                    <p className="text-body text-muted-foreground">
                      No reviews yet. Be the first to share your experience!
                    </p>
                  </BaseCard>
                )}
              </div>
            </div>

            {/* You Might Also Like */}
            <div className="stagger-fade-up" style={{ animationDelay: "450ms" }}>
              <BaseSectionHeader title="You Might Also Like" />
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide mt-6">
                {specialists
                  .filter((s) => s.id !== specialist.id)
                  .slice(0, 3)
                  .map((s) => (
                    <BaseCard
                      key={s.id}
                      variant="interactive"
                      onClick={() => navigate(`/booking/specialist/${s.id}`)}
                      className="p-4 min-w-[220px] hover:scale-[1.02] transition-smooth"
                    >
                      {/* Row 1 - Avatar & Price */}
                      <div className="flex items-start justify-between mb-3">
                        <img
                          src={s.photo}
                          alt={s.name}
                          className="w-16 h-16 rounded-[12px] object-cover ring-2 ring-primary/20 flex-shrink-0"
                        />
                        <div className="text-right">
                          <div className="text-body">
                            <span className="text-subhead text-muted-foreground/70">From </span>
                            <span className="font-semibold text-foreground">
                              ${s.price}
                            </span>
                            <span className="text-subhead text-muted-foreground/70"> / session</span>
                          </div>
                        </div>
                      </div>

                      {/* Row 2 - Name */}
                      <h3 className="text-headline font-semibold text-foreground mb-1">{s.name}</h3>

                      {/* Row 3 - Title/Specialty */}
                      <p className="text-subhead text-muted-foreground mb-3">{s.specialty}</p>

                      {/* Row 4 - Rating & Reviews */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primary text-primary flex-shrink-0" />
                          <span className="text-body font-semibold text-foreground">
                            {s.rating}
                          </span>
                        </div>
                        <span className="text-subhead text-accent underline underline-offset-2">
                          {s.reviewCount} reviews
                        </span>
                      </div>
                    </BaseCard>
                  ))}
              </div>
            </div>
          </section>
        </main>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 pb-[80px] pt-[env(safe-area-inset-bottom)]">
          <div 
            className="liquid-glass-elevated border-t border-glass-highlight"
            style={{
              background: 'rgba(23, 20, 31, 0.92)',
              backdropFilter: 'blur(60px) saturate(180%)',
              WebkitBackdropFilter: 'blur(60px) saturate(180%)',
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {/* Text Content on Top */}
              <div>
                <p className="text-subhead font-medium text-foreground">
                  Book a session with {specialist.name}
                </p>
                <p className="text-footnote text-muted-foreground">
                  ${displayPrice} • {displayDuration}
                </p>
              </div>
              {/* Buttons in a Row Below */}
              <div className="flex gap-2">
                <button
                  onClick={handleTextClick}
                  className="flex-1 px-5 py-2.5 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  Text
                </button>
                <button
                  onClick={() => navigate(`/booking/schedule/${specialist.id}`)}
                  className="flex-1 px-5 py-2.5 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                >
                  Book session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
