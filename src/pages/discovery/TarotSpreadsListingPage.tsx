import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Filter } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { TarotCardBack } from "@/components/discovery/TarotCardBack";

interface TarotSpread {
  id: string;
  name: string;
  cardCount: number;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  bestFor: string;
}

const tarotSpreads: TarotSpread[] = [
  {
    id: "celtic-cross",
    name: "Celtic Cross",
    cardCount: 10,
    description: "Comprehensive 10-card spread",
    difficulty: "Intermediate",
    bestFor: "General guidance and deep insights"
  },
  {
    id: "three-card",
    name: "Three Card Spread",
    cardCount: 3,
    description: "Past, present, future",
    difficulty: "Beginner",
    bestFor: "Quick insights and daily guidance"
  },
  {
    id: "past-present-future",
    name: "Past Present Future",
    cardCount: 3,
    description: "Timeline insights",
    difficulty: "Beginner",
    bestFor: "Understanding your journey through time"
  },
  {
    id: "relationship",
    name: "Relationship Spread",
    cardCount: 7,
    description: "Connection dynamics",
    difficulty: "Intermediate",
    bestFor: "Understanding partnerships and connections"
  },
  {
    id: "moon-guidance",
    name: "Moon Guidance",
    cardCount: 5,
    description: "Lunar cycle wisdom",
    difficulty: "Beginner",
    bestFor: "Aligning with lunar energy and cycles"
  },
  {
    id: "career-path",
    name: "Career Path Spread",
    cardCount: 6,
    description: "Professional guidance and direction",
    difficulty: "Intermediate",
    bestFor: "Career decisions and professional growth"
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    cardCount: 8,
    description: "Life cycles and turning points",
    difficulty: "Advanced",
    bestFor: "Understanding life patterns and cycles"
  },
  {
    id: "horseshoe",
    name: "Horseshoe Spread",
    cardCount: 7,
    description: "Seven-card arc for comprehensive reading",
    difficulty: "Intermediate",
    bestFor: "Detailed situation analysis"
  },
  {
    id: "one-card",
    name: "Daily Card",
    cardCount: 1,
    description: "Single card for daily guidance",
    difficulty: "Beginner",
    bestFor: "Quick daily insights and reflection"
  },
  {
    id: "pentagram",
    name: "Pentagram Spread",
    cardCount: 5,
    description: "Five elements alignment",
    difficulty: "Intermediate",
    bestFor: "Balancing different aspects of life"
  },
  {
    id: "tree-of-life",
    name: "Tree of Life",
    cardCount: 10,
    description: "Kabbalistic wisdom spread",
    difficulty: "Advanced",
    bestFor: "Spiritual growth and enlightenment"
  },
  {
    id: "celtic-knot",
    name: "Celtic Knot",
    cardCount: 9,
    description: "Interconnected paths and choices",
    difficulty: "Advanced",
    bestFor: "Complex decision-making"
  }
];

type DifficultyFilter = "All" | "Beginner" | "Intermediate" | "Advanced";

const TarotSpreadsListingPage = () => {
  const navigate = useNavigate();
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("All");

  const handleSpreadClick = (spreadId: string) => {
    navigate(`/discovery/spread/${spreadId}`, { state: { referrer: "/discovery/spreads" } });
  };

  const filteredSpreads = difficultyFilter === "All" 
    ? tarotSpreads 
    : tarotSpreads.filter(spread => spread.difficulty === difficultyFilter);

  const difficultyOptions: DifficultyFilter[] = ["All", "Beginner", "Intermediate", "Advanced"];

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Tarot Spreads"
        subtitle="Explore different reading layouts"
        leftAction={{
          icon: <ChevronLeft className="w-5 h-5" />,
          onClick: () => navigate("/discovery"),
          label: "Back to Discovery"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full">
        <main className="px-4 mt-4 pb-24 max-w-2xl mx-auto space-y-4">
          {/* Filter Section */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {difficultyOptions.map((option) => (
              <button
                key={option}
                onClick={() => setDifficultyFilter(option)}
                className={`px-4 py-2 rounded-full text-footnote font-medium transition-all duration-300 flex-shrink-0 ${
                  difficultyFilter === option
                    ? "bg-accent/20 text-accent border border-accent/30"
                    : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Spreads Grid */}
          <div className="grid gap-4">
            {filteredSpreads.map((spread, index) => (
              <div
                key={spread.id}
                onClick={() => handleSpreadClick(spread.id)}
                className="relative liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group hover:border-glass-highlight"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Subtle liquid glass highlight */}
                <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                
                <div className="flex items-start gap-4 p-4">
                  {/* Card Back */}
                  <div className="flex-shrink-0">
                    <TarotCardBack className="w-20 h-32 cursor-pointer hover:scale-105 transition-all duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-headline font-medium text-foreground leading-tight">{spread.name}</h3>
                    </div>
                    
                    <p className="text-footnote text-muted-foreground leading-relaxed">{spread.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-caption-2 font-medium border border-accent/30">
                        {spread.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-caption-2 font-medium border border-white/10">
                        {spread.cardCount} {spread.cardCount === 1 ? 'Card' : 'Cards'}
                      </span>
                    </div>
                    
                    <p className="text-caption-2 text-muted-foreground pt-1">{spread.bestFor}</p>
                  </div>
                </div>
                
                {/* Decorative shimmer element */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full liquid-glass-shimmer" />
              </div>
            ))}
          </div>

          {filteredSpreads.length === 0 && (
            <div className="liquid-glass-card rounded-[12px] p-6 text-center border border-glass-border">
              <p className="text-body text-muted-foreground">No spreads found for this difficulty level.</p>
            </div>
          )}
        </main>
      </div>
    </PageWrapper>
  );
};

export default TarotSpreadsListingPage;

