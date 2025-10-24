import { FrostedCard } from "@/components/ui/frosted-card";

interface RecentlyViewedProps {
  items: Array<{
    id: string;
    title: string;
    type: string;
    image: string;
  }>;
}

export const RecentlyViewed = ({ items }: RecentlyViewedProps) => {
  return (
    <div className="space-y-4 stagger-fade-up">
      <h3 className="text-xl font-subtitle text-foreground px-6">Recently Viewed</h3>
      <div className="flex gap-4 overflow-x-auto px-6 pb-2 scrollbar-hide">
        {items.map((item) => (
          <FrostedCard
            key={item.id}
            className="flex-shrink-0 w-32 cursor-pointer hover:shadow-glow transition-all hover:scale-105"
          >
            <div className="relative h-20 -mx-4 -mt-4 mb-3 overflow-hidden rounded-t-[24px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-primary font-medium mb-1">{item.type}</p>
            <h4 className="text-sm font-semibold text-foreground line-clamp-2">
              {item.title}
            </h4>
          </FrostedCard>
        ))}
      </div>
    </div>
  );
};
