import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";

interface ForYouItem {
  id: string;
  title: string;
  subtitle: string;
  tag: "Daily Pick" | "Recommended" | "Trending" | "For You";
  category: string;
}

const forYouItems: ForYouItem[] = [
  {
    id: "1",
    title: "Celtic Cross Reading",
    subtitle: "A comprehensive 10-card spread for deep insights",
    tag: "Daily Pick",
    category: "Tarot"
  },
  {
    id: "2",
    title: "Love & Relationships",
    subtitle: "Explore connections and understand dynamics",
    tag: "Recommended",
    category: "Astrology"
  },
  {
    id: "3",
    title: "Moon Phase Meditation",
    subtitle: "Align with lunar cycles for inner peace",
    tag: "Trending",
    category: "Moon Phases"
  },
  {
    id: "4",
    title: "Birth Chart Basics",
    subtitle: "Discover your cosmic blueprint",
    tag: "For You",
    category: "Astrology"
  },
  {
    id: "5",
    title: "Three Card Spread",
    subtitle: "Quick insights for daily guidance",
    tag: "Recommended",
    category: "Tarot"
  },
  {
    id: "6",
    title: "Chakra Balancing Guide",
    subtitle: "Align your energy centers for harmony",
    tag: "Trending",
    category: "Energy Work"
  },
  {
    id: "7",
    title: "Numerology Life Path",
    subtitle: "Discover your life path number and its meaning",
    tag: "For You",
    category: "Numerology"
  },
  {
    id: "8",
    title: "Crystal Healing Basics",
    subtitle: "Learn to use crystals for energy healing",
    tag: "Recommended",
    category: "Crystals"
  },
  {
    id: "9",
    title: "Morning Intention Setting",
    subtitle: "Start your day with purpose and clarity",
    tag: "Daily Pick",
    category: "Meditation"
  },
  {
    id: "10",
    title: "Past Life Regression",
    subtitle: "Explore your soul's journey through time",
    tag: "Trending",
    category: "Spiritual Guides"
  },
  {
    id: "11",
    title: "Angel Number Meanings",
    subtitle: "Decode messages from the divine realm",
    tag: "For You",
    category: "Angel Numbers"
  },
  {
    id: "12",
    title: "Manifestation Rituals",
    subtitle: "Powerful practices to manifest your desires",
    tag: "Recommended",
    category: "Manifestation"
  }
];

const ForYouListingPage = () => {
  const navigate = useNavigate();

  const handleItemClick = (itemId: string) => {
    navigate(`/discovery/article/${itemId}`, { state: { referrer: "/discovery/for-you" } });
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="For You"
        subtitle="Personalized recommendations"
        leftAction={{
          icon: <ChevronLeft className="w-5 h-5" />,
          onClick: () => navigate("/discovery"),
          label: "Back to Discovery"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full">
        <main className="px-4 mt-4 pb-24 max-w-2xl mx-auto space-y-4">
          {forYouItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="relative flex flex-col apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-6 hover:border-glass-highlight"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Subtle liquid glass highlight */}
              <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10 inline-block">
                    {item.tag}
                  </span>
                  
                  <h3 className="text-headline font-title font-medium text-foreground leading-tight mt-4">{item.title}</h3>
                  <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">{item.subtitle}</p>
                  
                  <div className="mt-3">
                    <span className="text-caption-2 text-muted-foreground">{item.category}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-subhead text-muted-foreground">Tap to explore</div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
              
              {/* Decorative shimmer element */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full liquid-glass-shimmer" />
            </div>
          ))}
        </main>
      </div>
    </PageWrapper>
  );
};

export default ForYouListingPage;

