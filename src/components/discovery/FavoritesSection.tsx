import { FrostedCard } from "@/components/ui/frosted-card";
import { Heart } from "lucide-react";
import tarotMoon from "@/assets/tarot-moon.jpg";
import learnMeditation from "@/assets/learn-meditation.jpg";

const favorites = [
  {
    id: 1,
    title: "Moon Guidance",
    type: "Spread",
    image: tarotMoon,
  },
  {
    id: 2,
    title: "Daily Meditation",
    type: "Article",
    image: learnMeditation,
  },
];

export const FavoritesSection = () => {
  return (
    <section className="px-6 mb-8">
      <h2 className="text-2xl font-display font-bold text-foreground mb-4">
        Recently Saved
      </h2>
      
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {favorites.map((favorite) => (
          <FrostedCard
            key={favorite.id}
            variant="minimal"
            className="flex-shrink-0 w-36 cursor-pointer hover:shadow-glow transition-all relative hover:scale-[1.02] group"
          >
            <Heart className="absolute top-2 right-2 w-5 h-5 text-accent fill-accent z-10 group-hover:scale-110 transition-transform" />
            <div className="relative h-24 -mx-4 -mt-4 mb-3 overflow-hidden rounded-t-[24px]">
              <img
                src={favorite.image}
                alt={favorite.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-primary font-medium mb-1">
              {favorite.type}
            </p>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2">
              {favorite.title}
            </h3>
          </FrostedCard>
        ))}
        
        <FrostedCard
          variant="minimal"
          className="flex-shrink-0 w-36 cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all flex items-center justify-center min-h-[152px]"
        >
          <div className="text-center px-3">
            <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-xs text-primary font-medium">Add Favorite</p>
          </div>
        </FrostedCard>
      </div>
    </section>
  );
};
