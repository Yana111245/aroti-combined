import { SpreadCard } from "./SpreadCard";

const learningContent = [
  {
    id: "1",
    title: "Tarot Basics",
    description: "Learn the fundamentals of tarot reading and card meanings",
    image: "/src/assets/learn-astrology.jpg",
    cardCount: 8,
    difficulty: "Beginner" as const,
    timeEstimate: "30 min"
  },
  {
    id: "2",
    title: "Meditation Guide",
    description: "Deepen your practice with guided meditation techniques",
    image: "/src/assets/learn-meditation.jpg", 
    cardCount: 5,
    difficulty: "Beginner" as const,
    timeEstimate: "25 min"
  },
  {
    id: "3",
    title: "Astrology Fundamentals",
    description: "Understand your birth chart and planetary influences",
    image: "/src/assets/tarot-star.jpg",
    cardCount: 12,
    difficulty: "Intermediate" as const,
    timeEstimate: "45 min"
  },
  {
    id: "4",
    title: "Crystal Healing",
    description: "Discover the power of crystals and their healing properties",
    image: "/src/assets/tarot-moon.jpg",
    cardCount: 6,
    difficulty: "Beginner" as const,
    timeEstimate: "20 min"
  }
];

export const ContinueLearning = () => {
  return (
    <div className="space-y-4 stagger-fade-up">
      <div className="px-6 flex items-center justify-between">
        <h2 className="text-2xl font-title font-medium text-foreground">Continue Learning</h2>
        <button className="text-sm font-body text-accent hover:text-accent/80 transition-colors">
          View All →
        </button>
      </div>
      
      {/* Horizontal scroll pattern from RecentlyViewed */}
      <div className="flex gap-4 overflow-x-auto pl-6 pr-6 pb-2 scrollbar-hide">
        {learningContent.map((content) => (
          <SpreadCard key={content.id} {...content} />
        ))}
      </div>
    </div>
  );
};
