import { useNavigate } from "react-router-dom";

interface RecentlyViewedProps {
  items: Array<{
    id: string;
    title: string;
    type: string;
    image: string;
  }>;
}

export const RecentlyViewed = ({ items }: RecentlyViewedProps) => {
  const navigate = useNavigate();

  const handleItemClick = (item: { id: string; type: string }) => {
    // Navigate based on item type
    const typeMap: Record<string, string> = {
      "Spread": "spread",
      "Card": "article",
      "Learn": "article",
      "Practice": "practice"
    };
    
    const routeType = typeMap[item.type] || "article";
    navigate(`/discovery/${routeType}/${item.id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-0 pr-4">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="flex-shrink-0 w-[320px] h-[200px] flex apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-6"
            role="button"
            tabIndex={0}
            aria-label={`View ${item.title} ${item.type}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleItemClick(item);
              }
            }}
          >
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Subtle liquid glass highlight */}
              <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
              
              <div>
                <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                  {item.type}
                </span>
                
                <h3 className="text-headline font-title font-medium text-foreground leading-tight mt-4">{item.title}</h3>
                <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">Tap to explore</p>
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
