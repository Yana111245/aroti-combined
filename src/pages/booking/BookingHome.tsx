import { useState } from "react";
import { Search } from "lucide-react";
import { specialists } from "@/data/specialists";
import { SpecialistCard } from "@/components/booking/SpecialistCard";
import { CategoryChip } from "@/components/booking/CategoryChip";
import { Input } from "@/components/ui/input";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";

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

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <BaseHeader 
        title="Find Your Specialist"
        subtitle="Personal guidance starts with the right connection"
        rightActions={
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or focus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-full liquid-glass-card border-0 w-64"
            />
          </div>
        }
      />

      {/* Main Content */}
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 pb-24 mt-4" role="main" aria-label="Booking content">
          <section className="space-y-6" aria-labelledby="booking-content">
            <h2 id="booking-content" className="sr-only">Booking Content</h2>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
            <div>
              <BaseSectionHeader 
                title="Recommended for You"
                subtitle="Based on your interests and preferences"
              />
              <div className="space-y-4 animate-fade-in">
                {filteredSpecialists.slice(0, 2).map((specialist) => (
                  <SpecialistCard key={specialist.id} specialist={specialist} />
                ))}
              </div>
            </div>

            {/* All Specialists */}
            <div>
              <BaseSectionHeader 
                title="All Specialists"
                subtitle="Browse our complete directory"
              />
              <div className="space-y-4 animate-fade-in">
                {filteredSpecialists.map((specialist) => (
                  <SpecialistCard key={specialist.id} specialist={specialist} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
}
