import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { ForYouCarousel } from "@/components/discovery/ForYouCarousel";
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
import { useState } from "react";

const DiscoveryHub = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <div className="bg-gradient-warm">
        {/* Sticky Header - Reuse Home pattern */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background pt-[env(safe-area-inset-top)]">
          <DiscoveryHeader />
        </div>

        {/* Scrollable Content */}
        <div className="animate-fade-in pt-[120px] space-y-6">
          {/* 1. For You */}
          <ForYouCarousel />
          
          {/* 2. Categories (Filter Row) */}
          <BrowseByCategory 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          {/* 3. Category Results / Featured Cards */}
          <CategoryGrid selectedCategory={selectedCategory} />
          
          {/* 4. Daily Practice */}
          <DailyPractice />
          
          {/* 5. Daily Quiz */}
          <DailyQuiz />
          
          {/* 6. Collections */}
          <Collections />
          
          {/* 7. Your Journey */}
          <YourJourney />
          
          {/* 8. Recently Viewed */}
          <RecentlyViewed 
            items={[
              {
                id: "1",
                title: "Celtic Cross Reading",
                type: "Tarot Spread",
                image: "/src/assets/tarot-fool.png"
              },
              {
                id: "2", 
                title: "Love & Relationships",
                type: "Guide",
                image: "/src/assets/tarot-star.jpg"
              },
              {
                id: "3",
                title: "Moon Phase Meditation",
                type: "Practice",
                image: "/src/assets/tarot-moon.jpg"
              },
              {
                id: "4",
                title: "Birth Chart Basics",
                type: "Astrology",
                image: "/src/assets/learn-astrology.jpg"
              },
              {
                id: "5",
                title: "Crystal Healing",
                type: "Guide",
                image: "/src/assets/learn-meditation.jpg"
              },
              {
                id: "6",
                title: "Daily Tarot",
                type: "Reading",
                image: "/src/assets/tarot-sun.jpg"
              }
            ]}
          />
          
          {/* Quick Actions */}
          <div className="px-6 pb-8 mt-6">
            <div className="rounded-[16px] bg-gradient-to-br from-[#F8F7F4] to-[#F3F1ED] p-6 space-y-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              {/* Header */}
              <div className="text-center space-y-2">
                <h3 className="text-xl font-title font-medium text-foreground">Ready to Explore?</h3>
                <p className="text-sm font-body text-muted-foreground">
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
                    <span className="text-base">Get Personal Guidance</span>
                  </div>
                  <span className="text-xs font-normal text-muted-foreground">
                    Chat with AI guides tailored to your journey
                  </span>
                </button>
                
                {/* Optional divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-accent/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-gradient-to-br from-[#F8F7F4] to-[#F3F1ED] px-2 text-muted-foreground">or</span>
                  </div>
                </div>
                
                {/* Secondary: Surprise Me */}
                <button 
                  className="w-full py-5 px-6 rounded-full bg-white border-2 border-accent/30 text-foreground font-semibold hover:bg-accent/5 hover:border-accent/50 transition-all hover:scale-[1.02] flex flex-col items-center justify-center gap-1 group"
                >
                  <div className="flex items-center gap-2">
                    <Shuffle className="w-5 h-5 group-hover:rotate-12 transition-transform text-accent" />
                    <span className="text-base">Surprise Me</span>
                  </div>
                  <span className="text-xs font-normal text-muted-foreground">
                    Discover something unexpected
                  </span>
                </button>
              </div>
              
              {/* Footer text */}
              <p className="text-center text-xs text-muted-foreground pt-2">
                Your journey expands every time you explore something new
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DiscoveryHub;
