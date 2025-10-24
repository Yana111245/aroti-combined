import { CategoryPill } from "./CategoryPill";
import { useState } from "react";

const categories = [
  { icon: "🔮", label: "Tarot" },
  { icon: "⭐", label: "Astrology" },
  { icon: "🔢", label: "Numerology" },
  { icon: "🌙", label: "Moon Phases" },
  { icon: "📿", label: "Meditation" },
  { icon: "✨", label: "Rituals" },
  { icon: "🌿", label: "Crystals" },
  { icon: "🕯️", label: "Candles" }
];

export const BrowseByCategory = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (label: string) => {
    setActiveCategory(activeCategory === label ? null : label);
  };

  return (
    <div className="px-6 space-y-4 stagger-fade-up">
      <h2 className="text-2xl font-title font-medium text-foreground">Browse by Category</h2>
      
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <CategoryPill
            key={category.label}
            icon={category.icon}
            label={category.label}
            isActive={activeCategory === category.label}
            onClick={() => handleCategoryClick(category.label)}
          />
        ))}
      </div>
      
      {activeCategory && (
        <div className="mt-4 p-3 rounded-[16px] bg-accent/5 border border-accent/20">
          <p className="text-sm font-body text-accent">
            Showing content for: <span className="font-medium">{activeCategory}</span>
          </p>
        </div>
      )}
    </div>
  );
};
