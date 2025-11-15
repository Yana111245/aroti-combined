import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Play, Sparkles } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { TarotCardBack } from "@/components/discovery/TarotCardBack";

// Mock data - in production, this would come from an API
const spreads: Record<string, {
  id: string;
  name: string;
  cardCount: number;
  description: string;
  instructions: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  bestFor: string;
}> = {
  "celtic-cross": {
    id: "celtic-cross",
    name: "Celtic Cross",
    cardCount: 10,
    description: "Comprehensive 10-card spread",
    difficulty: "Intermediate",
    bestFor: "General guidance and deep insights",
    instructions: [
      "Shuffle your deck while focusing on your question or situation.",
      "Place Card 1 (Current Situation) in the center, horizontal.",
      "Place Card 2 (Challenge/Opportunity) across Card 1, vertical.",
      "Place Card 3 (Distant Past) below the cross.",
      "Place Card 4 (Recent Past) to the left of the cross.",
      "Place Card 5 (Possible Future) above the cross.",
      "Place Card 6 (Near Future) to the right of the cross.",
      "Place Card 7 (Your Approach) below the staff.",
      "Place Card 8 (External Influences) to the left of the staff.",
      "Place Card 9 (Hopes and Fears) above the staff.",
      "Place Card 10 (Outcome) at the top of the staff."
    ]
  },
  "three-card": {
    id: "three-card",
    name: "Three Card Spread",
    cardCount: 3,
    description: "Past, present, future",
    difficulty: "Beginner",
    bestFor: "Quick insights and daily guidance",
    instructions: [
      "Shuffle your deck while thinking about your question.",
      "Place Card 1 (Past) on the left.",
      "Place Card 2 (Present) in the center.",
      "Place Card 3 (Future) on the right.",
      "Read the cards from left to right, seeing how they tell a story."
    ]
  },
  "past-present-future": {
    id: "past-present-future",
    name: "Past Present Future",
    cardCount: 3,
    description: "Timeline insights",
    difficulty: "Beginner",
    bestFor: "Understanding your journey through time",
    instructions: [
      "Focus on a specific area of your life.",
      "Shuffle and place three cards in a row.",
      "Card 1 represents influences from your past affecting the present.",
      "Card 2 shows your current situation and energies.",
      "Card 3 reveals potential outcomes based on current trajectory."
    ]
  },
  "relationship": {
    id: "relationship",
    name: "Relationship Spread",
    cardCount: 7,
    description: "Connection dynamics",
    difficulty: "Intermediate",
    bestFor: "Understanding partnerships and connections",
    instructions: [
      "Shuffle while thinking about the relationship.",
      "Card 1: You in this relationship.",
      "Card 2: The other person in this relationship.",
      "Card 3: The connection between you.",
      "Card 4: Strengths of the relationship.",
      "Card 5: Challenges to work through.",
      "Card 6: Advice for moving forward.",
      "Card 7: Potential future of the relationship."
    ]
  },
  "moon-guidance": {
    id: "moon-guidance",
    name: "Moon Guidance",
    cardCount: 5,
    description: "Lunar cycle wisdom",
    difficulty: "Beginner",
    bestFor: "Aligning with lunar energy and cycles",
    instructions: [
      "Connect with the current moon phase.",
      "Card 1: What to release during the waning moon.",
      "Card 2: What to set during the new moon.",
      "Card 3: What to nurture during the waxing moon.",
      "Card 4: What to celebrate during the full moon.",
      "Card 5: Overall lunar guidance for this cycle."
    ]
  }
};

const TarotSpreadDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const spread = id ? spreads[id] : null;

  if (!spread) {
    return (
      <PageWrapper showBottomNav={true} showTabBar={false}>
        <BaseHeader
          title="Spread Not Found"
          leftAction={{
            icon: <ChevronLeft className="w-5 h-5" />,
            onClick: () => navigate("/discovery"),
            label: "Back to Discovery"
          }}
        />
        <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen pb-24">
          <main className="px-4 mt-4 pb-6 max-w-2xl mx-auto">
            <div className="liquid-glass-card rounded-[12px] p-6 text-center">
              <p className="text-body text-muted-foreground">This spread could not be found.</p>
            </div>
          </main>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title={spread.name}
        subtitle={`${spread.cardCount} Card Spread`}
        leftAction={{
          icon: <ChevronLeft className="w-5 h-5" />,
          onClick: () => navigate("/discovery"),
          label: "Back to Discovery"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen pb-24">
        <main className="px-4 mt-4 pb-6 max-w-2xl mx-auto space-y-4">
          {/* Hero Section */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <TarotCardBack className="w-24 h-40" />
              </div>
              <div className="flex-1 space-y-3">
                <h1 className="text-title-1 font-title font-medium text-foreground leading-tight">
                  {spread.name}
                </h1>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {spread.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-footnote font-medium border border-accent/30">
                    {spread.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-medium border border-white/10">
                    {spread.cardCount} Cards
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Best For */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-headline font-medium text-foreground mb-1">Best For</h3>
                <p className="text-body text-muted-foreground">{spread.bestFor}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5 space-y-4">
            <h2 className="text-title-3 font-title font-medium text-foreground">How to Perform This Spread</h2>
            <ol className="space-y-3">
              {spread.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-footnote font-medium">
                    {index + 1}
                  </span>
                  <p className="text-body text-foreground leading-relaxed flex-1 pt-0.5">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Start Reading Button */}
          <button
            onClick={() => {
              // Navigate to reading interface
              navigate(`/discovery/spread/${spread.id}/reading`);
            }}
            className="w-full liquid-glass-card rounded-[12px] overflow-hidden border border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all duration-300 p-5 flex items-center justify-center gap-3 group"
          >
            <Play className="w-5 h-5 text-accent" />
            <span className="text-subhead font-medium text-accent">Start Reading</span>
            <ChevronLeft className="w-5 h-5 text-accent transform rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Similar Spreads */}
          <div className="space-y-3 pt-2">
            <h2 className="text-title-3 font-title font-medium text-foreground px-1">Similar Spreads</h2>
            <div className="grid gap-3">
              {Object.values(spreads)
                .filter(s => s.id !== spread.id && s.difficulty === spread.difficulty)
                .slice(0, 2)
                .map((similar) => (
                  <div
                    key={similar.id}
                    onClick={() => navigate(`/discovery/spread/${similar.id}`)}
                    className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer p-4 hover:border-glass-highlight"
                  >
                    <div className="flex items-center gap-4">
                      <TarotCardBack className="w-16 h-24 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-headline font-medium text-foreground mb-1">{similar.name}</h3>
                        <p className="text-footnote text-muted-foreground mb-2">{similar.description}</p>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-caption-2 font-medium border border-white/10">
                          {similar.cardCount} cards
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default TarotSpreadDetailPage;

