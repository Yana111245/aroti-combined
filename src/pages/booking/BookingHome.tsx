import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { specialists, Specialist, mockSessions } from "@/data/specialists";
import { SpecialistCard } from "@/components/booking/SpecialistCard";
import { CategoryChip } from "@/components/booking/CategoryChip";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { SortDropdown, SortOption } from "@/components/booking/SortDropdown";
import { FilterSheet, FilterState } from "@/components/booking/FilterSheet";
import { getFavorites } from "@/utils/favorites";
import { getSessionsWithUpdates } from "@/utils/sessionHelpers";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Astrology",
  "Therapy",
  "Numerology",
  "Reiki",
  "Coaching",
];

export default function BookingHome() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>(null);
  const [filters, setFilters] = useState<FilterState>({});
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Filter upcoming sessions with updates
  const upcomingSessions = useMemo(() => {
    const upcoming = mockSessions.filter(s => s.status === "upcoming");
    return getSessionsWithUpdates(upcoming);
  }, []);

  // Filter specialists
  const filteredSpecialists = useMemo(() => {
    let result = specialists.filter((specialist) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All" ||
        specialist.categories.some((cat) =>
          cat.toLowerCase().includes(activeCategory.toLowerCase())
        );
      
      // Search filter
      const matchesSearch =
        specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesCategory || !matchesSearch) return false;

      // Saved filter
      if (showSavedOnly) {
        const savedIds = getFavorites();
        if (!savedIds.includes(specialist.id)) {
          return false;
        }
      }

      // Availability filter
      if (filters.availability) {
        if (filters.availability === "today" && !specialist.available) {
          return false;
        }
        // For "week", we assume all available specialists are available this week
        if (filters.availability === "week" && !specialist.available) {
          return false;
        }
      }

      // Price range filter - only apply if explicitly set
      if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
        const priceMin = filters.priceMin ?? 0;
        const priceMax = filters.priceMax ?? 120;
        if (specialist.price < priceMin || specialist.price > priceMax) {
          return false;
        }
      }

      // Rating filter
      if (filters.rating) {
        const threshold = parseFloat(filters.rating);
        if (specialist.rating < threshold) {
          return false;
        }
      }

      // Language filter
      if (filters.languages && filters.languages.length > 0) {
        const matchesLanguage = specialist.languages?.some(lang =>
          filters.languages!.includes(lang)
        );
        if (!matchesLanguage) return false;
      }

      // Years of experience filter
      if (filters.yearsOfExperience) {
        const threshold = parseInt(filters.yearsOfExperience);
        if (specialist.yearsOfPractice < threshold) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    if (sortOption) {
      result = [...result].sort((a, b) => {
        switch (sortOption) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "sessions":
            return b.sessionCount - a.sessionCount;
          case "newest":
            // Sort by addedDate (newest first) or yearsOfPractice (fewer years = newer)
            if (a.addedDate && b.addedDate) {
              return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
            }
            // Fallback: fewer years of practice = newer
            return (a.yearsOfPractice || 0) - (b.yearsOfPractice || 0);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [activeCategory, searchQuery, sortOption, filters, showSavedOnly]);

  // Get recommended specialists (first 2)
  const recommendedSpecialists = filteredSpecialists.slice(0, 2);
  const recommendedIds = recommendedSpecialists.map(s => s.id);
  
  // All specialists excluding recommended ones
  const allSpecialists = filteredSpecialists.filter(
    specialist => !recommendedIds.includes(specialist.id)
  );

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.availability) count++;
    // Count price filter if min or max differs from default (20-80)
    if ((filters.priceMin !== undefined && filters.priceMin !== 20) || 
        (filters.priceMax !== undefined && filters.priceMax !== 80)) {
      count++;
    }
    if (filters.rating) count++;
    if (filters.yearsOfExperience) count++;
    if (filters.languages && filters.languages.length > 0) count += filters.languages.length;
    return count;
  }, [filters]);

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <BaseHeader 
        title="Find Your Specialist"
        subtitle="Personal guidance starts with the right connection"
      />

      {/* Main Content */}
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-4">
        <main 
          className="px-4 pb-4 mt-4" 
          role="main" 
          aria-label="Booking content"
        >
          {/* Category Filters - First */}
          <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide animate-fade-in mb-3">
            {categories.map((category) => (
              <CategoryChip
                key={category}
                label={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>

          {/* Sort + Filter + Saved Bar - Second */}
          <div className="home-tab-celestial">
            <div className="px-0 py-3 flex items-center gap-3">
              <SortDropdown
                value={sortOption}
                onValueChange={setSortOption}
              />
              <FilterSheet
                specialists={specialists}
                filters={filters}
                onFiltersChange={setFilters}
                activeFilterCount={activeFilterCount}
              />
              
              {/* Saved Filter Chip */}
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={cn(
                  "relative px-4 py-2 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden",
                  showSavedOnly
                    ? "liquid-glass-card bg-accent/20 border border-accent/50 text-accent shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]"
                    : "liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
                )}
              >
                <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                <span className="text-footnote font-medium relative z-10 flex items-center gap-2">
                  <Bookmark className={cn("w-4 h-4", showSavedOnly && "fill-accent")} />
                  <span>Saved</span>
                </span>
              </button>
            </div>
          </div>
          
          <section className="space-y-2" aria-labelledby="booking-content">
            <h2 id="booking-content" className="sr-only">Booking Content</h2>

            {/* Upcoming Sessions - Only show if there are any */}
            {upcomingSessions.length > 0 && (
              <div className="pt-2 animate-fade-in">
                <BaseSectionHeader 
                  title="Upcoming Sessions"
                  subtitle="Your scheduled appointments"
                />
                <div className="space-y-3 mt-6">
                  {upcomingSessions.map((session) => (
                    <BaseCard 
                      key={session.id}
                      className="p-3 sm:p-4 liquid-glass-card border border-glass-border/70 shadow-glass"
                    >
                      <div className="flex flex-col gap-2">
                        {/* Avatar + Session Info - Clickable Area */}
                        <div 
                          className="flex items-start gap-3 sm:gap-4 cursor-pointer hover:opacity-90 transition-opacity duration-200 active:scale-[0.99]"
                          onClick={() => navigate(`/booking/session/${session.id}`)}
                        >
                          {/* Avatar - Same size as SpecialistCard */}
                          <img
                            src={session.specialistPhoto}
                            alt={session.specialistName}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-[12px] object-cover ring-2 ring-primary/20 flex-shrink-0"
                          />
                          
                          {/* Session Info */}
                          <div className="flex-1 min-w-0 flex flex-col gap-2">
                            {/* Row 1: Name */}
                            <h3 className="font-bold text-foreground text-title-3 leading-tight">
                              {session.specialistName}
                            </h3>
                            
                            {/* Row 2: Specialty */}
                            <span className="font-medium text-body text-muted-foreground">
                              {session.specialty}
                            </span>
                            
                            {/* Row 3: Session Details - Clear format */}
                            <div className="flex items-center gap-1 flex-wrap text-subhead text-muted-foreground">
                              {(() => {
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
                                
                                let dateLabel: string;
                                if (sessionDay.getTime() === todayDay.getTime()) {
                                  dateLabel = "Today";
                                } else if (sessionDay.getTime() === tomorrowDay.getTime()) {
                                  dateLabel = "Tomorrow";
                                } else {
                                  dateLabel = sessionDate.toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric"
                                  });
                                }
                                
                                // Convert to 12-hour format
                                const [hours, minutes] = session.time.split(':');
                                const hour = parseInt(hours);
                                const ampm = hour >= 12 ? 'PM' : 'AM';
                                const hour12 = hour % 12 || 12;
                                const timeLabel = `${hour12}:${minutes} ${ampm}`;
                                
                                return (
                                  <>
                                    <span className="whitespace-nowrap font-medium">{dateLabel}</span>
                                    <span className="mx-1">at</span>
                                    <span className="whitespace-nowrap font-medium">{timeLabel}</span>
                                    <span className="mx-1">•</span>
                                    <span className="whitespace-nowrap">{session.duration} min</span>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons - Same spacing as SpecialistCard */}
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/booking/schedule/${session.specialistId}`, {
                                state: { session, isReschedule: true }
                              });
                            }}
                            className="flex-1 px-4 py-2 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle join - open meeting link
                              if (session.meetingLink) {
                                window.open(session.meetingLink, '_blank');
                              }
                            }}
                            className="flex-1 px-4 py-2 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                          >
                            Join
                          </button>
                        </div>
                      </div>
                    </BaseCard>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Section */}
            <div className="pt-2">
              <BaseSectionHeader 
                title="Recommended for You"
                subtitle="Based on your interests and preferences"
              />
              <div className="space-y-4 mt-6 animate-fade-in">
                {recommendedSpecialists.length > 0 ? (
                  recommendedSpecialists.map((specialist) => (
                    <SpecialistCard key={specialist.id} specialist={specialist} />
                  ))
                ) : (
                  <p className="text-body text-muted-foreground">No recommendations available</p>
                )}
              </div>
            </div>

            {/* All Specialists - Spacing and no duplicates */}
            <div className="pt-2">
              <BaseSectionHeader 
                title="All Specialists"
                subtitle="Browse our complete directory"
              />
              <div className="space-y-4 mt-6 animate-fade-in">
                {allSpecialists.length > 0 ? (
                  allSpecialists.map((specialist) => (
                    <SpecialistCard key={specialist.id} specialist={specialist} />
                  ))
                ) : (
                  <p className="text-body text-muted-foreground">No specialists found</p>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
}
