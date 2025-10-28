import { Star, Heart, Sparkles } from "lucide-react";

const forYouItems = [
  {
    id: "1",
    title: "Celtic Cross Reading",
    subtitle: "A comprehensive 10-card spread for deep insights",
    tag: "Daily Pick",
    bgImage: "/src/assets/tarot-fool.png",
    gradient: "from-[#FFFDF8] to-[#F6F2EB]"
  },
  {
    id: "2",
    title: "Love & Relationships",
    subtitle: "Explore connections and understand dynamics",
    tag: "Recommended",
    bgImage: "/src/assets/tarot-star.jpg",
    gradient: "from-[#F8F7F4] to-[#F0EDE8]"
  },
  {
    id: "3",
    title: "Moon Phase Meditation",
    subtitle: "Align with lunar cycles for inner peace",
    tag: "Trending",
    bgImage: "/src/assets/tarot-moon.jpg",
    gradient: "from-[#F5F3F0] to-[#F0EDE8]"
  },
  {
    id: "4",
    title: "Birth Chart Basics",
    subtitle: "Discover your cosmic blueprint",
    tag: "For You",
    bgImage: "/src/assets/learn-astrology.jpg",
    gradient: "from-[#F8F7F4] to-[#F3F1ED]"
  }
];

export const ForYouCarousel = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-title-3 font-title font-medium text-foreground">For You</h2>
        <button className="text-subhead font-body text-accent hover:text-accent/80 transition-colors">
          View All →
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {forYouItems.map((item) => (
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
              
              {/* Decorative icon */}
              <div className="flex justify-end">
                {item.tag === "Daily Pick" && <Star className="w-6 h-6 text-accent/60" />}
                {item.tag === "Recommended" && <Heart className="w-6 h-6 text-accent/60" />}
                {item.tag === "Trending" && <Sparkles className="w-6 h-6 text-accent/60" />}
                {item.tag === "For You" && <Sparkles className="w-6 h-6 text-accent/60" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
