import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { TarotSpreadsCarousel } from "@/components/discovery/TarotSpreadsCarousel";
import { LearnCarousel } from "@/components/discovery/LearnCarousel";
import { QuizzesSection } from "@/components/discovery/QuizzesSection";
import { UnlocksSection } from "@/components/discovery/UnlocksSection";
import { FavoritesSection } from "@/components/discovery/FavoritesSection";
import { Sparkles, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "@/components/layout/PageWrapper";

const DiscoveryHub = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <div className="bg-gradient-warm">
        <DiscoveryHeader />
        <TarotSpreadsCarousel />
        <LearnCarousel />
        <QuizzesSection />
        <UnlocksSection />
        <FavoritesSection />
        
        <div className="px-6 pb-8 space-y-4">
          <button 
            onClick={() => navigate("/guidance")}
            className="w-full py-4 px-6 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group"
          >
            <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Get Personal Guidance
          </button>
          
          <button className="w-full py-4 px-6 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group">
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Explore More Journeys
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Your journey expands every time you explore something new
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DiscoveryHub;
