import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { ForYouCarousel } from "@/components/discovery/ForYouCarousel";
import { TarotSpreadsCarousel } from "@/components/discovery/TarotSpreadsCarousel";
import { BrowseByCategory } from "@/components/discovery/BrowseByCategory";
import { CategoryGrid } from "@/components/discovery/CategoryGrid";
import { DailyPractice } from "@/components/discovery/DailyPractice";
import { DailyQuiz } from "@/components/discovery/DailyQuiz";
import { Collections } from "@/components/discovery/Collections";
import { YourJourney } from "@/components/discovery/YourJourney";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { MessageCircle, Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { useState } from "react";

const DiscoveryHub = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <DiscoveryHeader />

      {/* Main Content */}
      <div className="discovery-page bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 pb-24 mt-4 max-w-full overflow-x-hidden" role="main" aria-label="Discovery content">
          <section className="space-y-8" aria-labelledby="discovery-content">
            <h2 id="discovery-content" className="sr-only">Discovery Content</h2>
            
            {/* 1. For You */}
            <ForYouCarousel />
            
            {/* 1.5 Tarot Spreads */}
            <TarotSpreadsCarousel />
            
            {/* 2. Categories (Filter Row) */}
            <BrowseByCategory 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            {/* 3. Category Results / Featured Cards */}
            <CategoryGrid selectedCategory={selectedCategory} />
            
            {/* 4. Daily Practice & Quiz */}
            <div className="space-y-4">
              <DailyPractice />
              <DailyQuiz />
            </div>
            
            {/* 5. Collections */}
            <Collections />
            
            {/* 6. Your Journey */}
            <YourJourney />
            
            {/* 8. Recently Viewed */}
            <div className="apple-material-section-header">
              <h2 id="recently-viewed-section" className="text-headline text-foreground">Recently Viewed</h2>
            </div>
            <RecentlyViewed 
              items={[
                {
                  id: "1",
                  title: "Moon Guidance",
                  type: "Spread",
                  image: "/placeholder.svg",
                },
                {
                  id: "2",
                  title: "The Fool",
                  type: "Card",
                  image: "/placeholder.svg",
                },
                {
                  id: "3",
                  title: "Celtic Cross",
                  type: "Spread",
                  image: "/placeholder.svg",
                },
                {
                  id: "4",
                  title: "Past Present Future",
                  type: "Spread",
                  image: "/placeholder.svg",
                },
                {
                  id: "5",
                  title: "Astrology Basics",
                  type: "Learn",
                  image: "/placeholder.svg",
                },
                {
                  id: "6",
                  title: "Meditation Guide",
                  type: "Learn",
                  image: "/placeholder.svg",
                },
              ]}
            />
            
            {/* Quick Actions */}
            <div className="mt-6">
              <div className="liquid-glass-card p-6 space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-title-2 font-title font-medium text-foreground">Ready to Explore?</h3>
                  <p className="text-body text-muted-foreground">
                    Choose your path to deeper insights
                  </p>
                </div>
                
                {/* Buttons */}
                <div className="space-y-3">
                  {/* Primary: Get Personal Guidance */}
                  <button 
                    onClick={() => navigate("/guidance")}
                    className="w-full py-5 px-6 rounded-full bg-gradient-gold text-foreground font-semibold shadow-glow hover:shadow-soft transition-all hover:scale-[1.02] flex flex-col items-center justify-center gap-1 group"
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="text-body">Get Personal Guidance</span>
                    </div>
                    <span className="text-footnote font-normal text-muted-foreground">
                      Chat with AI guides tailored to your journey
                    </span>
                  </button>
                  
                  {/* Optional divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-accent/20"></div>
                    </div>
                    <div className="relative flex justify-center text-footnote">
                      <span className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] px-2 text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  {/* Secondary: Surprise Me */}
                  <button 
                    className="w-full py-5 px-6 rounded-full bg-card border-2 border-accent/30 text-foreground font-semibold hover:bg-accent/5 hover:border-accent/50 transition-all hover:scale-[1.02] flex flex-col items-center justify-center gap-1 group"
                  >
                    <div className="flex items-center gap-2">
                      <Shuffle className="w-5 h-5 group-hover:rotate-12 transition-transform text-accent" />
                      <span className="text-body">Surprise Me</span>
                    </div>
                    <span className="text-footnote font-normal text-muted-foreground">
                      Discover something unexpected
                    </span>
                  </button>
                </div>
                
                {/* Footer text */}
                <p className="text-center text-footnote text-muted-foreground pt-2">
                  Your journey expands every time you explore something new
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
};

export default DiscoveryHub;
