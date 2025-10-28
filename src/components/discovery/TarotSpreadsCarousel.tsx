import { TarotSpreadCard } from "./TarotSpreadCard";
import { TarotCardBack } from "./TarotCardBack";
import { useNavigate } from "react-router-dom";

const tarotSpreads = [
  {
    id: "celtic-cross",
    name: "Celtic Cross",
    cardCount: 10,
    description: "Comprehensive 10-card spread"
  },
  {
    id: "three-card",
    name: "Three Card Spread",
    cardCount: 3,
    description: "Past, present, future"
  },
  {
    id: "past-present-future",
    name: "Past Present Future",
    cardCount: 3,
    description: "Timeline insights"
  },
  {
    id: "relationship",
    name: "Relationship Spread",
    cardCount: 7,
    description: "Connection dynamics"
  },
  {
    id: "moon-guidance",
    name: "Moon Guidance",
    cardCount: 5,
    description: "Lunar cycle wisdom"
  }
];

export const TarotSpreadsCarousel = () => {
  const navigate = useNavigate();

  const handleSpreadClick = (spreadId: string) => {
    navigate(`/discovery/spreads/${spreadId}`);
  };

  const handleViewAll = () => {
    navigate("/discovery/spreads");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-title-3 font-title font-medium text-foreground">Tarot Spreads</h2>
          <p className="text-footnote text-muted-foreground mt-1">Explore different reading layouts</p>
        </div>
        <button 
          className="text-subhead font-body text-muted-foreground hover:text-foreground transition-colors"
          onClick={handleViewAll}
        >
          View All →
        </button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-4">
        {tarotSpreads.map((spread) => (
          <div key={spread.id} className="flex-shrink-0" onClick={() => handleSpreadClick(spread.id)}>
            <TarotCardBack
              className="cursor-pointer hover:scale-105 transition-all duration-300"
            />
          </div>
        ))}
        
        {/* View All Card */}
        <div className="flex-shrink-0 w-[180px] h-[300px] flex apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border-2 border-dashed border-glass-border cursor-pointer hover:border-glass-highlight transition-all duration-300 group items-center justify-center">
          <div className="text-center">
            <p className="text-headline font-body font-medium text-muted-foreground">View All</p>
            <p className="text-subhead text-muted-foreground mt-1">Explore more</p>
          </div>
        </div>
      </div>
    </div>
  );
};
