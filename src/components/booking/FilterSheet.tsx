import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Specialist } from "@/data/specialists";

export interface FilterState {
  availability?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: string;
  languages?: string[];
  yearsOfExperience?: string;
}

interface FilterSheetProps {
  specialists: Specialist[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  activeFilterCount: number;
}

const availabilityOptions = [
  { value: "today", label: "Available today" },
  { value: "week", label: "Available this week" },
] as const;

const PRICE_MIN_DEFAULT = 20;
const PRICE_MAX_DEFAULT = 80;
const PRICE_MIN = 0;
const PRICE_MAX = 120;
const PRICE_STEP = 10;

const ratingOptions = [
  { value: "4.0", label: "4.0+" },
  { value: "4.5", label: "4.5+" },
] as const;

const yearsOfExperienceOptions = [
  { value: "1", label: "1+ years" },
  { value: "3", label: "3+ years" },
  { value: "5", label: "5+ years" },
  { value: "10", label: "10+ years" },
  { value: "15", label: "15+ years" },
] as const;

export const FilterSheet = ({
  specialists,
  filters,
  onFiltersChange,
  activeFilterCount,
}: FilterSheetProps) => {
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterState>(() => ({
    ...filters,
    priceMin: filters.priceMin ?? PRICE_MIN_DEFAULT,
    priceMax: filters.priceMax ?? PRICE_MAX_DEFAULT,
  }));

  // Extract unique languages from specialists
  const availableLanguages = Array.from(
    new Set(specialists.flatMap(s => s.languages || []))
  ).sort();

  // Reset local filters when sheet opens
  useEffect(() => {
    if (open) {
      setLocalFilters({
        ...filters,
        priceMin: filters.priceMin ?? PRICE_MIN_DEFAULT,
        priceMax: filters.priceMax ?? PRICE_MAX_DEFAULT,
      });
    }
  }, [open, filters]);

  const handleApply = () => {
    onFiltersChange(localFilters);
    setOpen(false);
  };

  const handleClearAll = () => {
    const cleared: FilterState = {
      priceMin: PRICE_MIN_DEFAULT,
      priceMax: PRICE_MAX_DEFAULT,
      // availability, rating, languages will be undefined (cleared)
    };
    setLocalFilters(cleared);
    // Don't apply, just reset local state - keep modal open
  };

  const handlePriceRangeChange = (values: number[]) => {
    setLocalFilters(prev => ({
      ...prev,
      priceMin: values[0],
      priceMax: values[1],
    }));
  };

  const getPriceDisplayText = () => {
    const min = localFilters.priceMin ?? PRICE_MIN_DEFAULT;
    const max = localFilters.priceMax ?? PRICE_MAX_DEFAULT;
    const maxText = max === PRICE_MAX ? "$120+" : `$${max}`;
    return `$${min} – ${maxText}`;
  };

  const setRating = (value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      rating: prev.rating === value ? undefined : value,
    }));
  };

  const toggleLanguage = (value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      languages: prev.languages?.includes(value)
        ? prev.languages.filter(v => v !== value)
        : [...(prev.languages || []), value],
    }));
  };

  const setAvailability = (value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      availability: prev.availability === value ? undefined : value,
    }));
  };

  const setYearsOfExperience = (value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      yearsOfExperience: prev.yearsOfExperience === value ? undefined : value,
    }));
  };

  const hasActiveFilters = Object.entries(localFilters).some(([key, value]) => {
    if (key === 'priceMin' || key === 'priceMax') {
      // Check if price differs from default
      if (key === 'priceMin') return value !== undefined && value !== PRICE_MIN_DEFAULT;
      if (key === 'priceMax') return value !== undefined && value !== PRICE_MAX_DEFAULT;
    }
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined;
  });

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="relative px-4 py-2 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
            aria-label="Filter specialists"
          >
            {/* Liquid glass highlight */}
            <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
            <span className="text-footnote font-medium relative z-10 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-semibold min-w-[18px] text-center">
                  {activeFilterCount}
                </span>
              )}
            </span>
          </button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="home-tab-celestial liquid-glass-elevated bg-[rgba(23,20,31,0.92)] backdrop-filter backdrop-blur-[40px] backdrop-saturate-[200%] border-t border-glass-highlight rounded-t-[24px] max-h-[85vh] overflow-y-auto [&>button]:hidden p-0"
        >
          <SheetHeader className="sticky top-0 z-10 flex flex-row items-center justify-between bg-[rgba(23,20,31,0.92)] backdrop-blur-[40px] backdrop-saturate-[200%] pb-4 pt-6 mb-6 px-6 border-b border-glass-border rounded-t-[24px]">
            <SheetTitle className="text-headline font-semibold text-foreground text-[17px]">
              Filter Specialists
            </SheetTitle>
            <button
              onClick={() => setOpen(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-2"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </SheetHeader>

          <div className="space-y-8 pb-4 px-6">
            {/* Availability Section */}
            <div>
              <h3 className="text-headline font-semibold text-foreground mb-4">
                Availability
              </h3>
              <div className="flex flex-wrap gap-2">
                {availabilityOptions.map((option) => {
                  const isSelected = localFilters.availability === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setAvailability(option.value)}
                      className={cn(
                        "relative px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap transition-all duration-300 overflow-hidden",
                        "liquid-glass-card backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                        isSelected
                          ? "bg-accent/20 border border-accent/50 text-accent shadow-glow"
                          : "bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass"
                      )}
                      aria-pressed={isSelected}
                    >
                      {/* Liquid glass highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      {isSelected && (
                        <Check className="w-4 h-4 text-accent relative z-10" />
                      )}
                      <span className="text-footnote font-medium relative z-10">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-headline font-semibold text-foreground">
                  Price Range
                </h3>
                <span className="text-body font-medium text-accent">
                  {getPriceDisplayText()}
                </span>
              </div>
              <div className="px-2 py-4">
                <Slider
                  value={[localFilters.priceMin ?? PRICE_MIN_DEFAULT, localFilters.priceMax ?? PRICE_MAX_DEFAULT]}
                  onValueChange={handlePriceRangeChange}
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={PRICE_STEP}
                  className="w-full"
                />
              </div>
            </div>

            {/* Rating Section */}
            <div>
              <h3 className="text-headline font-semibold text-foreground mb-4">
                Rating
              </h3>
              <div className="flex flex-wrap gap-2">
                {ratingOptions.map((option) => {
                  const isSelected = localFilters.rating === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setRating(option.value)}
                      className={cn(
                        "relative px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap transition-all duration-300 overflow-hidden",
                        "liquid-glass-card backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                        isSelected
                          ? "bg-accent/20 border border-accent/50 text-accent shadow-glow"
                          : "bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass"
                      )}
                      aria-pressed={isSelected}
                    >
                      {/* Liquid glass highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      {isSelected && (
                        <Check className="w-4 h-4 text-accent relative z-10" />
                      )}
                      <span className="text-footnote font-medium relative z-10">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Years of Experience Section */}
            <div>
              <h3 className="text-headline font-semibold text-foreground mb-4">
                Years of Experience
              </h3>
              <div className="flex flex-wrap gap-2">
                {yearsOfExperienceOptions.map((option) => {
                  const isSelected = localFilters.yearsOfExperience === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setYearsOfExperience(option.value)}
                      className={cn(
                        "relative px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap transition-all duration-300 overflow-hidden",
                        "liquid-glass-card backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                        isSelected
                          ? "bg-accent/20 border border-accent/50 text-accent shadow-glow"
                          : "bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass"
                      )}
                      aria-pressed={isSelected}
                    >
                      {/* Liquid glass highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      {isSelected && (
                        <Check className="w-4 h-4 text-accent relative z-10" />
                      )}
                      <span className="text-footnote font-medium relative z-10">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language Section */}
            <div>
              <h3 className="text-headline font-semibold text-foreground mb-4">
                Language
              </h3>
              <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto">
                {availableLanguages.map((language) => {
                  const isSelected = localFilters.languages?.includes(language);
                  return (
                    <button
                      key={language}
                      onClick={() => toggleLanguage(language)}
                      className={cn(
                        "relative px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap transition-all duration-300 overflow-hidden",
                        "liquid-glass-card backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                        isSelected
                          ? "bg-accent/20 border border-accent/50 text-accent shadow-glow"
                          : "bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass"
                      )}
                      aria-pressed={isSelected}
                    >
                      {/* Liquid glass highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      {isSelected && (
                        <Check className="w-4 h-4 text-accent relative z-10" />
                      )}
                      <span className="text-footnote font-medium relative z-10">{language}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons - Sticky */}
          <div 
            className="sticky bottom-0 left-0 right-0 pt-5 px-6 bg-gradient-to-t from-[rgba(23,20,31,0.98)] via-[rgba(23,20,31,0.95)] to-transparent backdrop-blur-[20px] border-t border-glass-border mt-5"
            style={{
              paddingBottom: 'calc(1rem + 5rem + env(safe-area-inset-bottom))', // 1rem (16px) spacing below buttons + 5rem (nav height) + safe area
            }}
          >
            <div className="flex gap-3 max-w-md mx-auto">
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="flex-1 liquid-glass-card bg-white/5 border-glass-border text-foreground hover:bg-white/10 hover:border-glass-highlight"
              >
                Clear
              </Button>
              <Button
                variant="default"
                onClick={handleApply}
                className="flex-1 liquid-glass-card bg-gradient-accent text-accent-foreground hover:shadow-[var(--shadow-copper-glow)]"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

