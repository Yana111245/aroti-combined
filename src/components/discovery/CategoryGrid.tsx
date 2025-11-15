import { useNavigate } from "react-router-dom";

const featuredItems = [
  {
    id: "1",
    title: "Three Card Spread",
    subtitle: "Past, present, future insights",
    tag: "Tarot",
    category: "Tarot"
  },
  {
    id: "2",
    title: "Birth Chart Basics",
    subtitle: "Discover your cosmic blueprint",
    tag: "Astrology",
    category: "Astrology"
  },
  {
    id: "3",
    title: "Life Path Number",
    subtitle: "Numerology insights for guidance",
    tag: "Numerology",
    category: "Numerology"
  },
  {
    id: "4",
    title: "Moon Phase Rituals",
    subtitle: "Align with lunar cycles",
    tag: "Moon Phases",
    category: "Moon Phases"
  },
  {
    id: "5",
    title: "Mindful Breathing",
    subtitle: "Meditation practice for peace",
    tag: "Meditation",
    category: "Meditation"
  },
  {
    id: "6",
    title: "Crystal Healing",
    subtitle: "Energy cleansing and balance",
    tag: "Crystals",
    category: "Crystals"
  },
  {
    id: "7",
    title: "Celtic Cross",
    subtitle: "Comprehensive tarot reading",
    tag: "Tarot",
    category: "Tarot"
  },
  {
    id: "8",
    title: "Chakra Balancing",
    subtitle: "Energy centers alignment",
    tag: "Chakras",
    category: "Chakras"
  }
];

interface CategoryGridProps {
  selectedCategory: string | null;
}

export const CategoryGrid = ({ selectedCategory }: CategoryGridProps) => {
  const navigate = useNavigate();
  
  // Filter items based on selected category
  const displayItems = selectedCategory 
    ? featuredItems.filter(item => item.category === selectedCategory)
    : featuredItems;

  const handleItemClick = (itemId: string) => {
    navigate(`/discovery/article/${itemId}`, { state: { referrer: "/discovery" } });
  };

  return (
    <div>
      {/* Horizontal scroll layout - matching For You format */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-0 pr-4">
        {displayItems.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleItemClick(item.id)}
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
                
                <h3 className="text-headline font-title font-medium text-foreground leading-tight mt-4">{item.title}</h3>
                <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">{item.subtitle}</p>
              </div>
              
              {/* Decorative shimmer element */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full liquid-glass-shimmer" />
            </div>
          </div>
        ))}
        
        {/* Enhanced View All Card */}
        <div className="flex-shrink-0 w-[320px] h-[200px] flex apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border-2 border-dashed border-glass-border cursor-pointer hover:border-glass-highlight transition-all duration-300 group items-center justify-center">
          <div className="text-center">
            <p className="text-headline font-body font-medium text-muted-foreground">View All</p>
            <p className="text-subhead text-muted-foreground mt-1">Explore more</p>
          </div>
        </div>
      </div>
    </div>
  );
};
