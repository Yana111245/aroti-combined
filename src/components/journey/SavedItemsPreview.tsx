import { useNavigate } from "react-router-dom";
import { Bookmark, Sparkles, BookOpen, Heart, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSavedAffirmations } from "@/utils/savedAffirmations";

interface SavedItemsPreviewProps {
  className?: string;
}

export const SavedItemsPreview = ({ className }: SavedItemsPreviewProps) => {
  const navigate = useNavigate();
  const savedAffirmations = getSavedAffirmations();
  
  // Mock data for saved items counts
  const savedItems = {
    affirmations: savedAffirmations.length || 3,
    spreadCards: 5,
    reflections: 8
  };

  const items = [
    {
      id: "affirmations",
      label: "Saved Affirmations",
      count: savedItems.affirmations,
      icon: Sparkles,
      color: "text-purple-300",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      id: "spreads",
      label: "Saved Spread Cards",
      count: savedItems.spreadCards,
      icon: BookOpen,
      color: "text-amber-300",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30"
    },
    {
      id: "reflections",
      label: "Saved Reflections",
      count: savedItems.reflections,
      icon: Heart,
      color: "text-rose-300",
      bgColor: "bg-rose-500/20",
      borderColor: "border-rose-500/30"
    }
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-headline font-medium text-foreground mb-2">Saved Items</h3>
      <div className="grid grid-cols-1 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate("/profile/saved")}
              className="flex items-center justify-between p-3 rounded-[10px] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-[8px] flex items-center justify-center",
                  item.bgColor,
                  item.borderColor,
                  "border"
                )}>
                  <Icon className={cn("w-5 h-5", item.color)} />
                </div>
                <div className="text-left">
                  <p className="text-body font-medium text-foreground">{item.label}</p>
                  <p className="text-caption-2 text-muted-foreground">{item.count} saved</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

