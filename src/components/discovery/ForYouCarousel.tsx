import { Star, Heart, Sparkles, Circle, Moon, Zap } from "lucide-react";

const forYouItems = [
  {
    id: "1",
    title: "Celtic Cross Reading",
    subtitle: "A comprehensive 10-card spread for deep insights",
    tag: "Daily Pick",
    category: "Tarot"
  },
  {
    id: "2",
    title: "Love & Relationships",
    subtitle: "Explore connections and understand dynamics",
    tag: "Recommended",
    category: "Astrology"
  },
  {
    id: "3",
    title: "Moon Phase Meditation",
    subtitle: "Align with lunar cycles for inner peace",
    tag: "Trending",
    category: "Moon Phases"
  },
  {
    id: "4",
    title: "Birth Chart Basics",
    subtitle: "Discover your cosmic blueprint",
    tag: "For You",
    category: "Astrology"
  }
];

export const ForYouCarousel = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-title-3 font-title font-medium text-foreground">For You</h2>
          <p className="text-footnote text-muted-foreground mt-1">Personalized recommendations</p>
        </div>
        <button className="text-subhead font-body text-muted-foreground hover:text-foreground transition-colors">
          View All →
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-0 pr-4">
        {forYouItems.map((item) => (
          <div 
            key={item.id}
            className="flex-shrink-0 w-[320px] h-[200px] flex apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-6"
          >
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Subtle liquid glass highlight */}
              <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
              
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                  {item.tag}
                </span>
                
                <h3 className="text-[22px] font-title font-medium text-foreground leading-tight mt-4">{item.title}</h3>
                <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">{item.subtitle}</p>
              </div>
              
              {/* Decorative shimmer element */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full liquid-glass-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
