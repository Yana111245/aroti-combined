const featuredItems = [
  {
    id: "1",
    title: "Three Card Spread",
    subtitle: "Past, present, future insights",
    tag: "Tarot",
    bgImage: "/src/assets/tarot-star.jpg",
    gradient: "from-[#FFFDF8] to-[#F6F2EB]",
    category: "Tarot"
  },
  {
    id: "2",
    title: "Birth Chart Basics",
    subtitle: "Discover your cosmic blueprint",
    tag: "Astrology",
    bgImage: "/src/assets/learn-astrology.jpg",
    gradient: "from-[#F8F7F4] to-[#F0EDE8]",
    category: "Astrology"
  },
  {
    id: "3",
    title: "Life Path Number",
    subtitle: "Numerology insights for guidance",
    tag: "Numerology",
    bgImage: "/src/assets/tarot-fool.png",
    gradient: "from-[#F5F3F0] to-[#F0EDE8]",
    category: "Numerology"
  },
  {
    id: "4",
    title: "Moon Phase Rituals",
    subtitle: "Align with lunar cycles",
    tag: "Moon Phases",
    bgImage: "/src/assets/tarot-moon.jpg",
    gradient: "from-[#F8F7F4] to-[#F3F1ED]",
    category: "Moon Phases"
  },
  {
    id: "5",
    title: "Mindful Breathing",
    subtitle: "Meditation practice for peace",
    tag: "Meditation",
    bgImage: "/src/assets/learn-meditation.jpg",
    gradient: "from-[#F0F8F0] to-[#E8F2E8]",
    category: "Meditation"
  },
  {
    id: "6",
    title: "Crystal Healing",
    subtitle: "Energy cleansing and balance",
    tag: "Crystals",
    bgImage: "/src/assets/tarot-sun.jpg",
    gradient: "from-[#F5F0F8] to-[#EEE8F2]",
    category: "Crystals"
  },
  {
    id: "7",
    title: "Celtic Cross",
    subtitle: "Comprehensive tarot reading",
    tag: "Tarot",
    bgImage: "/src/assets/tarot-star.jpg",
    gradient: "from-[#FFFDF8] to-[#F6F2EB]",
    category: "Tarot"
  },
  {
    id: "8",
    title: "Chakra Balancing",
    subtitle: "Energy centers alignment",
    tag: "Chakras",
    bgImage: "/src/assets/learn-astrology.jpg",
    gradient: "from-[#F8F3E6] to-[#FFF]",
    category: "Chakras"
  }
];

interface CategoryGridProps {
  selectedCategory: string | null;
}

export const CategoryGrid = ({ selectedCategory }: CategoryGridProps) => {
  // Filter items based on selected category
  const displayItems = selectedCategory 
    ? featuredItems.filter(item => item.category === selectedCategory)
    : featuredItems;

  return (
    <div>
      {/* Horizontal scroll layout - matching For You format */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {displayItems.map((item) => (
          <div 
            key={item.id}
            className={`flex-shrink-0 w-[320px] h-[200px] rounded-[16px] bg-gradient-to-br ${item.gradient} p-6 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
          >
            {/* Ethereal background image */}
            <div className="absolute inset-0 opacity-20">
              <img src={item.bgImage} className="w-full h-full object-cover" alt={item.title} />
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-footnote font-body font-medium">
                  {item.tag}
                </span>
                <h3 className="text-[22px] font-title text-foreground mt-4 leading-tight">{item.title}</h3>
                <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* View All Card */}
        <div className="flex-shrink-0 w-[320px] h-[200px] rounded-[16px] bg-accent/10 border-2 border-dashed border-accent/30 flex items-center justify-center cursor-pointer hover:bg-accent/20 transition-all">
          <div className="text-center">
            <p className="text-headline font-body font-medium text-accent">View All</p>
            <p className="text-subhead text-accent/70 mt-2">→</p>
          </div>
        </div>
      </div>
    </div>
  );
};
