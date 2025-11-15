import { Compass, Sparkles, Star, BookOpen, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

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
  // Use placeholder for all images
  return <ImagePlaceholder width={120} height={120} category={type} />;
};

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
      <div className="flex gap-4 overflow-x-auto pr-6 pb-2 scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-[280px]">
            <div 
              onClick={() => handleItemClick(item)}
              className="flex liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group h-[120px]"
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
