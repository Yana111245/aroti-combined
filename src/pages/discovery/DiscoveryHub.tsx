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
          <div className="px-6 pb-8 space-y-4">
            <button 
              onClick={() => navigate("/guidance")}
              className="w-full py-4 px-6 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Get Personal Guidance
            </button>
            
            <button className="w-full py-4 px-6 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group">
              <Shuffle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Surprise Me
            </button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              Your journey expands every time you explore something new
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DiscoveryHub;
