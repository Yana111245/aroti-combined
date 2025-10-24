import { CollectionCard } from "./CollectionCard";

const collections = [
  {
    id: "1",
    title: "Beginner's Guide",
    items: 8,
    image: "/src/assets/learn-astrology.jpg",
    description: "Everything you need to start your spiritual journey"
  },
  {
    id: "2",
    title: "Advanced Spreads",
    items: 12,
    image: "/src/assets/tarot-fool.png",
    description: "Complex spreads for experienced readers"
  },
  {
    id: "3",
    title: "Daily Practices",
    items: 15,
    image: "/src/assets/learn-meditation.jpg",
    description: "Rituals and practices for everyday spirituality"
  },
  {
    id: "4",
    title: "Seasonal Wisdom",
    items: 6,
    image: "/src/assets/tarot-star.jpg",
    description: "Guidance aligned with natural cycles"
  }
];

export const Collections = () => {
  return (
    <div className="px-6 space-y-4 stagger-fade-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-title font-medium text-foreground">Collections</h2>
        <button className="text-sm font-body text-accent hover:text-accent/80 transition-colors">
          View All →
        </button>
      </div>
      
      <div className="space-y-3">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} {...collection} />
        ))}
      </div>
    </div>
  );
};
