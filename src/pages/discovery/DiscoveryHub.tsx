import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { ForYouCarousel } from "@/components/discovery/ForYouCarousel";
import { TarotSpreadsCarousel } from "@/components/discovery/TarotSpreadsCarousel";
import { BrowseByCategory } from "@/components/discovery/BrowseByCategory";
import { CategoryGrid } from "@/components/discovery/CategoryGrid";
import { DailyPractice } from "@/components/discovery/DailyPractice";
import { DailyQuiz } from "@/components/discovery/DailyQuiz";
import { Courses } from "@/components/discovery/Courses";
import { YourJourney } from "@/components/discovery/YourJourney";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useState } from "react";

const DiscoveryHub = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <DiscoveryHeader />

      {/* Main Content */}
      <div className="discovery-page home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-nav pb-safe">
        <main className="px-4 mt-4 max-w-full overflow-x-hidden pb-nav pb-safe" role="main" aria-label="Discovery content">
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
            
            {/* 5. Courses */}
            <Courses />
            
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
          </section>
        </main>
      </div>
    </PageWrapper>
  );
};

export default DiscoveryHub;
