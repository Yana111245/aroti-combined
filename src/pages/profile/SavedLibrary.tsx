import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Bookmark, Sparkles } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { TabPills } from "@/components/profile/TabPills";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function SavedLibrary() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Spreads");

  const savedSpreads = [
    { id: 1, title: "Celtic Cross", category: "Traditional" },
    { id: 2, title: "Three Card Spread", category: "Quick" },
    { id: 3, title: "Relationship Spread", category: "Love" },
  ];

  const savedArticles = [
    { id: 1, title: "Mercury Retrograde Survival Guide", category: "Astrology" },
    { id: 2, title: "Understanding Your Moon Sign", category: "Astrology" },
  ];

  const savedRituals = [
    { id: 1, title: "New Moon Intention Setting", category: "Lunar" },
    { id: 2, title: "Chakra Balancing Meditation", category: "Energy" },
  ];

  const getContent = () => {
    switch (activeTab) {
      case "Spreads":
        return savedSpreads;
      case "Articles":
        return savedArticles;
      case "Rituals":
        return savedRituals;
      default:
        return [];
    }
  };

  const getIcon = () => {
    switch (activeTab) {
      case "Spreads":
        return Sparkles;
      case "Articles":
        return Bookmark;
      case "Rituals":
        return Heart;
      default:
        return Bookmark;
    }
  };

  const content = getContent();
  const IconComponent = getIcon();

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Saved"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Saved library">
          {/* Tabs */}
          <TabPills
            tabs={["Spreads", "Articles", "Rituals"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-6"
          />

          {/* Content */}
          {content.length > 0 ? (
            <div className="space-y-3">
              {content.map((item) => (
                <BaseCard key={item.id} className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-headline mb-1">{item.title}</h4>
                    <p className="text-footnote text-muted-foreground">{item.category}</p>
                  </div>
                  <button className="text-accent hover:opacity-80">
                    <Heart className="h-5 w-5 fill-accent" />
                  </button>
                </BaseCard>
              ))}
            </div>
          ) : (
            <BaseCard className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4">
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-title text-headline font-semibold mb-2">Nothing saved yet</h3>
              <p className="text-subhead text-muted-foreground">Explore Discovery to find content to save</p>
            </BaseCard>
          )}
        </main>
      </div>
    </PageWrapper>
  );
}
