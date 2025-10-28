import { BookOpen, Star, Calendar, Sparkles, ChevronRight } from "lucide-react";

const collections = [
  {
    id: "1",
    title: "Beginner's Guide",
    description: "Everything you need to start your spiritual journey"
  },
  {
    id: "2",
    title: "Advanced Spreads",
    description: "Complex spreads for experienced readers"
  },
  {
    id: "3",
    title: "Daily Practices",
    description: "Rituals and practices for everyday spirituality"
  },
  {
    id: "4",
    title: "Seasonal Wisdom",
    description: "Guidance aligned with natural cycles"
  }
];

export const Collections = () => {
  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-title-3 font-title font-medium text-foreground">Collections</h2>
          <p className="text-footnote text-muted-foreground mt-1">Curated guides and spreads</p>
        </div>
        <button className="text-subhead font-body text-muted-foreground hover:text-foreground transition-colors">
          View All →
        </button>
      </div>
      
      <div className="grid gap-3">
        {collections.map((collection, index) => (
          <div 
            key={collection.id}
            className="flex apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-4 hover:border-glass-highlight"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              {/* Subtle liquid glass highlight */}
              <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
              
              <div className="flex-1 min-w-0">
                <h3 className="text-headline font-medium text-foreground truncate">{collection.title}</h3>
                <p className="text-footnote text-muted-foreground truncate">{collection.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Decorative shimmer element */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full liquid-glass-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
