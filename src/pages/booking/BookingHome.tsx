import { useState, useMemo } from "react";
import { specialists, Specialist } from "@/data/specialists";
import { SpecialistCard } from "@/components/booking/SpecialistCard";
import { CategoryChip } from "@/components/booking/CategoryChip";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { SortDropdown, SortOption } from "@/components/booking/SortDropdown";
import { FilterSheet, FilterState } from "@/components/booking/FilterSheet";

const categories = [
  "All",
  "Astrology",
  "Therapy",
  "Numerology",
  "Reiki",
  "Coaching",
];

export default function BookingHome() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>(null);
  const [filters, setFilters] = useState<FilterState>({});

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
  }, [activeCategory, searchQuery, sortOption, filters]);

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
          {/* Sort + Filter Bar */}
          <div className="home-tab-celestial mb-1">
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
            </div>
          </div>
          <section className="space-y-6" aria-labelledby="booking-content">
            <h2 id="booking-content" className="sr-only">Booking Content</h2>

            {/* Category Filters - Below Sort/Filter */}
            <div className="flex flex-nowrap gap-2 overflow-x-auto scrollbar-hide animate-fade-in">
              {categories.map((category) => (
                <CategoryChip
                  key={category}
                  label={category}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                />
              ))}
            </div>

            {/* Recommended Section */}
            <div className="pt-8">
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
            <div className="pt-8">
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
