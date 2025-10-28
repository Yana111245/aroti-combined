import { BookOpen, Star, Calendar, Sparkles, ChevronRight } from "lucide-react";

const collections = [
  {
    id: "1",
    title: "Beginner's Guide",
    description: "Everything you need to start your spiritual journey",
    icon: <BookOpen className="w-6 h-6 text-accent" />
  },
  {
    id: "2",
    title: "Advanced Spreads",
    description: "Complex spreads for experienced readers",
    icon: <Star className="w-6 h-6 text-accent" />
  },
  {
    id: "3",
    title: "Daily Practices",
    description: "Rituals and practices for everyday spirituality",
    icon: <Calendar className="w-6 h-6 text-accent" />
  },
  {
    id: "4",
    title: "Seasonal Wisdom",
    description: "Guidance aligned with natural cycles",
    icon: <Sparkles className="w-6 h-6 text-accent" />
  }
];

export const Collections = () => {
  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-title-3 font-title font-medium text-foreground">Collections</h2>
        <button className="text-subhead font-body text-accent hover:text-accent/80 transition-colors">
          View All →
        </button>
      </div>
      
      <div className="space-y-3">
        {collections.map((collection) => (
          <div 
            key={collection.id}
            className="flex gap-4 p-5 rounded-[12px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:brightness-105 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex-shrink-0">
              {collection.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-base font-body font-medium text-foreground">{collection.title}</h3>
              <p className="text-[13px] text-muted-foreground mt-1">{collection.description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
};
