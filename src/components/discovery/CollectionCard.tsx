import { ChevronRight } from "lucide-react";

interface CollectionCardProps {
  id: string;
  title: string;
  items: number;
  image: string;
  description?: string;
  onClick?: () => void;
}

export const CollectionCard = ({ 
  id, 
  title, 
  items, 
  image, 
  description,
  onClick 
}: CollectionCardProps) => {
  return (
    <div 
      className="flex gap-3 p-4 rounded-[20px] bg-card border border-border hover:border-accent transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-[16px] overflow-hidden flex-shrink-0">
        <img src={image} className="w-full h-full object-cover" alt={title} />
      </div>
      <div className="flex-1">
        <h3 className="font-title text-base font-medium text-foreground mb-1">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mb-1">{description}</p>
        )}
        <p className="text-xs text-muted-foreground font-body">{items} items</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
    </div>
  );
};
