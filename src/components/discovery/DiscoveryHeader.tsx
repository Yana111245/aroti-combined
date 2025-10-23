import { Search, Sparkles } from "lucide-react";

export const DiscoveryHeader = () => {
  return (
    <header className="px-6 pt-8 pb-6">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h1 className="text-[32px] font-display font-bold text-foreground mb-2">
            Discover Your Path
          </h1>
          <p className="text-muted-foreground text-base">
            Explore tarot spreads, rituals, and mindful learning.
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Updated daily • Personalized for you
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <button className="w-10 h-10 rounded-full bg-card/70 backdrop-blur-frosted shadow-soft flex items-center justify-center hover:shadow-glow transition-all">
            <Search className="w-5 h-5 text-primary" />
          </button>
          <button className="w-10 h-10 rounded-full bg-card/70 backdrop-blur-frosted shadow-soft flex items-center justify-center hover:shadow-glow transition-all">
            <Sparkles className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>
    </header>
  );
};
