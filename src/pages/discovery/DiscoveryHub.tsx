import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { FeaturedSpreads } from "@/components/discovery/FeaturedSpreads";
import { BrowseByCategory } from "@/components/discovery/BrowseByCategory";
import { ContinueLearning } from "@/components/discovery/ContinueLearning";
import { Collections } from "@/components/discovery/Collections";
import { DailyQuote } from "@/components/home/DailyQuote";
import { JourneyProgress } from "@/components/home/JourneyProgress";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { Sparkles, MessageCircle, Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";

const DiscoveryHub = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <div className="bg-gradient-warm">
        {/* Sticky Header - Reuse Home pattern */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background pt-[env(safe-area-inset-top)]">
          <DiscoveryHeader />
        </div>

        {/* Scrollable Content */}
        <div className="animate-fade-in pt-[120px] space-y-8">
          {/* Featured Spreads */}
          <FeaturedSpreads />
          
          {/* Browse by Category */}
          <BrowseByCategory />
          
          {/* Today's Wisdom - Reuse from Home */}
          <div className="px-6">
            <DailyQuote quote="Your journey begins with self-discovery" />
          </div>
          
          {/* Continue Learning */}
          <ContinueLearning />
          
          {/* Your Progress - Reuse from Home */}
          <div className="px-6">
            <JourneyProgress 
              streak={7}
              totalReadings={24}
              nextMilestone={30}
              milestones={[
                { id: 1, title: "First Reading", completed: true },
                { id: 2, title: "Week Streak", completed: true },
                { id: 3, title: "Month Journey", completed: false },
                { id: 4, title: "Master Reader", completed: false }
              ]}
            />
          </div>
          
          {/* Collections */}
          <Collections />
          
          {/* Recently Viewed - Reuse from Home */}
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
