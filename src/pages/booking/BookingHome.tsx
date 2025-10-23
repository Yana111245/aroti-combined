import { useState } from "react";
import { Search } from "lucide-react";
import { specialists } from "@/data/specialists";
import { SpecialistCard } from "@/components/booking/SpecialistCard";
import { CategoryChip } from "@/components/booking/CategoryChip";
import { BottomNav } from "@/components/booking/BottomNav";
import { Input } from "@/components/ui/input";

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
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Find Your Specialist
        </h1>
        <p className="text-muted-foreground">
          Personal guidance starts with the right connection.
        </p>
      </header>

      {/* Search */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or focus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full glass-card border-0"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-6 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((category) => (
            <CategoryChip
              key={category}
              label={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Recommended for You
        </h2>
        <div className="space-y-4 animate-fade-in">
          {filteredSpecialists.slice(0, 2).map((specialist) => (
            <SpecialistCard key={specialist.id} specialist={specialist} />
          ))}
        </div>
      </div>

      {/* All Specialists */}
      <div className="px-6 mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          All Specialists
        </h2>
        <div className="space-y-4 animate-fade-in">
          {filteredSpecialists.map((specialist) => (
            <SpecialistCard key={specialist.id} specialist={specialist} />
          ))}
        </div>
      </div>

      <BottomNav />

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
