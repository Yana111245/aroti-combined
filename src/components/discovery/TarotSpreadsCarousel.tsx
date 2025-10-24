import { FrostedCard } from "@/components/ui/frosted-card";
import { ArrowRight } from "lucide-react";
import tarotMoon from "@/assets/tarot-moon.jpg";
import tarotStar from "@/assets/tarot-star.jpg";
import tarotSun from "@/assets/tarot-sun.jpg";

const spreads = [
  {
    id: 1,
    title: "Moon Guidance",
    description: "3-Card Insight • Past • Present • Future",
    image: tarotMoon,
  },
  {
    id: 2,
    title: "Star Alignment",
    description: "5-Card Spread • Life Purpose & Direction",
    image: tarotStar,
  },
  {
    id: 3,
    title: "Solar Clarity",
    description: "Daily Draw • Single Card Wisdom",
    image: tarotSun,
  },
];

export const TarotSpreadsCarousel = () => {
  return (
    <section className="px-6 mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-display font-bold text-foreground">Tarot Spreads</h2>
        <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-6 px-6">
        {spreads.map((spread) => (
          <FrostedCard
            key={spread.id}
            className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center cursor-pointer hover:shadow-glow transition-all hover:scale-[1.02] group rounded-[20px]"
          >
            <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-[20px]">
              <img
                src={spread.image}
                alt={spread.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              {spread.title}
            </h3>
            <p className="text-muted-foreground text-sm">
              {spread.description}
            </p>
          </FrostedCard>
        ))}
        
        <FrostedCard
          variant="minimal"
          className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center cursor-pointer border-2 border-primary/30 hover:border-primary/50 transition-all flex items-center justify-center min-h-[280px] hover:scale-[1.02]"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-gradient-gold mx-auto mb-3 flex items-center justify-center shadow-glow">
              <ArrowRight className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-primary font-semibold">View All Spreads</p>
          </div>
        </FrostedCard>
      </div>
    </section>
  );
};
