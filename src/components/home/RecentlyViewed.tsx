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
    <div className="space-y-4">
      <div className="px-6 flex items-center justify-between">
        <h3 className="text-xl font-title font-medium text-foreground">Recently Viewed</h3>
        <button className="text-sm font-body text-accent hover:text-accent/80 transition-colors">
          View All →
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pl-6 pr-6 pb-2 scrollbar-hide">
        {items.map((item) => (
          <div key={item.id} className="flex-shrink-0 w-[100px]">
            <div className="relative h-[120px] rounded-[8px] overflow-hidden cursor-pointer hover:scale-105 transition-transform">
              <img 
                src={item.image} 
                className="w-full h-full object-cover blur-sm" 
                alt={item.title}
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-2 left-2 right-2">
                <h4 className="text-[13px] font-body font-bold text-white leading-tight">{item.title}</h4>
                <p className="text-[12px] text-white/80 mt-1">{item.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
