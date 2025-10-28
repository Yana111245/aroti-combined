import { Compass, Sparkles, Star, BookOpen, Moon, Sun } from "lucide-react";

interface RecentlyViewedProps {
  items: Array<{
    id: string;
    title: string;
    type: string;
    image: string;
  }>;
}

// Visual element generator based on type and image
const getVisualElement = (type: string, title: string, image: string) => {
  const getIconForType = (type: string) => {
    switch(type) {
      case 'Spread': return <Compass className="w-6 h-6 text-white/80 drop-shadow-lg" />;
      case 'Card': return <Sparkles className="w-6 h-6 text-white/80 drop-shadow-lg" />;
      case 'Learn': return <BookOpen className="w-6 h-6 text-white/80 drop-shadow-lg" />;
      default: return <Star className="w-6 h-6 text-white/80 drop-shadow-lg" />;
    }
  };

  const getOverlayGradient = (type: string) => {
    switch(type) {
      case 'Spread': return 'from-purple-900/60 to-indigo-900/60';
      case 'Card': return 'from-amber-900/60 to-orange-900/60';
      case 'Learn': return 'from-emerald-900/60 to-teal-900/60';
      default: return 'from-slate-900/60 to-gray-900/60';
    }
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center relative overflow-hidden liquid-glass-secondary"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getOverlayGradient(type)}`} />
      
      {/* Liquid glass highlight */}
      <div className="absolute inset-0 liquid-glass-highlight opacity-30" />
      
      {/* Subtle icon overlay */}
      <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 liquid-glass-glow">
        {getIconForType(type)}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full liquid-glass-shimmer" />
      <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/20 rounded-full" />
    </div>
  );
};

export const RecentlyViewed = ({ items }: RecentlyViewedProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-x-auto pr-6 pb-2 scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-[280px]">
            <div 
              className="flex liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group h-[120px]"
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title} ${item.type}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  // Add navigation logic here
                }
              }}
            >
              {/* Text Content - Left Side */}
              <div className="flex-1 p-4 flex flex-col justify-center relative">
                {/* Subtle liquid glass highlight */}
                <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                
                {/* Category and Title - Centered vertically */}
                <div className="space-y-2">
                  <p className="text-caption-2 text-muted-foreground uppercase tracking-wider">
                    {item.type.toUpperCase()}
                  </p>
                  <p className="text-caption-2 text-muted-foreground">
                    5 MIN
                  </p>
                  <h4 className="text-headline text-foreground font-semibold leading-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
              
              {/* Visual Element - Right Side */}
              <div className="w-[120px] h-[120px] relative">
                {getVisualElement(item.type, item.title, item.image)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
