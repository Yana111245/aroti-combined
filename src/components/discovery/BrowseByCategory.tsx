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
      <h2 className="text-title-2 font-title font-medium text-foreground">Browse by Category</h2>
      
      <div className="overflow-x-auto scrollbar-hide" style={{ maxHeight: '100px' }}>
        <div className="flex flex-col gap-2" style={{ width: 'max-content' }}>
          {/* First row */}
          <div className="flex gap-2">
            {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
              <CategoryPill
                key={category.label}
                label={category.label}
                isActive={selectedCategory === category.label}
                onClick={() => handleCategoryClick(category.label)}
              />
            ))}
          </div>
          {/* Second row */}
          <div className="flex gap-2">
            {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
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
      
    </div>
  );
};
