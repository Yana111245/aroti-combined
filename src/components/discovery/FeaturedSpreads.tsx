import { SpreadCard } from "./SpreadCard";

const featuredSpreads = [
  {
    id: "1",
    title: "Celtic Cross",
    description: "A comprehensive 10-card spread for deep insights into any situation",
    image: "/src/assets/tarot-fool.png",
    cardCount: 10,
    difficulty: "Intermediate" as const,
    timeEstimate: "20 min"
  },
  {
    id: "2", 
    title: "Three Card Spread",
    description: "Past, present, and future guidance in a simple format",
    image: "/src/assets/tarot-star.jpg",
    cardCount: 3,
    difficulty: "Beginner" as const,
    timeEstimate: "10 min"
  },
  {
    id: "3",
    title: "Relationship Spread",
    description: "Explore connections and understand relationship dynamics",
    image: "/src/assets/tarot-moon.jpg",
    cardCount: 7,
    difficulty: "Intermediate" as const,
    timeEstimate: "15 min"
  },
  {
    id: "4",
    title: "Decision Making",
    description: "Clarity for important life choices and crossroads",
    image: "/src/assets/tarot-sun.jpg",
    cardCount: 5,
    difficulty: "Beginner" as const,
    timeEstimate: "12 min"
  }
];

export const FeaturedSpreads = () => {
  return (
    <div className="space-y-4 stagger-fade-up">
      <div className="px-6 flex items-center justify-between">
        <h2 className="text-2xl font-title font-medium text-foreground">Featured Spreads</h2>
        <button className="text-sm font-body text-accent hover:text-accent/80 transition-colors">
          View All →
        </button>
      </div>
      
      {/* Horizontal scroll pattern from RecentlyViewed */}
      <div className="flex gap-4 overflow-x-auto pl-6 pr-6 pb-2 scrollbar-hide">
        {featuredSpreads.map((spread) => (
          <SpreadCard key={spread.id} {...spread} />
        ))}
      </div>
    </div>
  );
};
