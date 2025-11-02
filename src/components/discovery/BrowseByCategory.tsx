import { CategoryPill } from "./CategoryPill";

const categories = [
  { label: "Tarot" },
  { label: "Astrology" },
  { label: "Numerology" },
  { label: "Moon Phases" },
  { label: "Meditation" },
  { label: "Rituals" },
  { label: "Crystals" },
  { label: "Candles" },
  { label: "Energy Work" },
  { label: "Divination" },
  { label: "Chakras" },
  { label: "Manifestation" },
  { label: "Spiritual Guides" },
  { label: "Angel Numbers" }
];

interface BrowseByCategoryProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const BrowseByCategory = ({ selectedCategory, onCategoryChange }: BrowseByCategoryProps) => {
  const handleCategoryClick = (label: string) => {
    onCategoryChange(selectedCategory === label ? null : label);
  };

  return (
    <div className="space-y-4 stagger-fade-up">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-title-2 font-title font-medium text-foreground">Browse by Category</h2>
          <p className="text-footnote text-muted-foreground mt-1">Explore your interests</p>
        </div>
      </div>
      
      <div className="overflow-x-auto scrollbar-hide pl-0 pr-4 snap-x snap-mandatory">
        <div className="grid grid-rows-2 grid-flow-col gap-2 py-2 auto-cols-max">
          {categories.map((category) => (
            <CategoryPill
              key={category.label}
              label={category.label}
              isActive={selectedCategory === category.label}
              onClick={() => handleCategoryClick(category.label)}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};
