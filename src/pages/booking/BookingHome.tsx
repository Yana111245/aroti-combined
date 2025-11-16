import { useState } from "react";
import { specialists } from "@/data/specialists";
import { SpecialistCard } from "@/components/booking/SpecialistCard";
import { CategoryChip } from "@/components/booking/CategoryChip";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { ChevronDown, Filter } from "lucide-react";
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
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpecialists = specialists.filter((specialist) => {
    const matchesCategory =
      activeCategory === "All" ||
      specialist.categories.some((cat) =>
        cat.toLowerCase().includes(activeCategory.toLowerCase())
      );
    const matchesSearch =
      specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get recommended specialists (first 2)
  const recommendedSpecialists = filteredSpecialists.slice(0, 2);
  const recommendedIds = recommendedSpecialists.map(s => s.id);
  
  // All specialists excluding recommended ones
  const allSpecialists = filteredSpecialists.filter(
    specialist => !recommendedIds.includes(specialist.id)
  );

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
              <button
                className="relative px-4 py-2 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
                aria-label="Sort specialists"
              >
                {/* Liquid glass highlight */}
                <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                <span className="text-footnote font-medium relative z-10 flex items-center gap-2">
                  <span>Sort</span>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              <button
                className="relative px-4 py-2 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
                aria-label="Filter specialists"
              >
                {/* Liquid glass highlight */}
                <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                <span className="text-footnote font-medium relative z-10 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </span>
              </button>
            </div>
          </div>
          <section className="space-y-" aria-labelledby="booking-content">
            <h2 id="booking-content" className="sr-only">Booking Content</h2>

            {/* Category Filters - Below Sort/Filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide animate-fade-in">
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
