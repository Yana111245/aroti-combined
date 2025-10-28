import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Share2, BookOpen, Home } from "lucide-react";
import tarotFool from "@/assets/tarot-fool.png";
import { toast } from "sonner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

const DailyInsightPost = () => {
  const navigate = useNavigate();

  const handleShare = () => {
    toast.success("Card copied to share!");
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader 
        title="The Fool"
        subtitle="New beginnings • Innocence • Adventure"
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 pb-24 animate-fade-in" role="main" aria-label="Daily insight content">
          <section className="space-y-6" aria-labelledby="insight-content">
            <h2 id="insight-content" className="sr-only">Insight Content</h2>

            {/* Card Display */}
            <div className="flex justify-center animate-scale-in">
              <img
                src={tarotFool}
                alt="The Fool Tarot Card"
                className="w-64 rounded-3xl shadow-[var(--shadow-soft)]"
              />
            </div>

            {/* Interpretation */}
            <BaseCard className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-headline">Interpretation</h3>
              </div>
              
              <p className="text-body text-muted-foreground leading-relaxed">
                The Fool represents a fresh start and the courage to step into the unknown. Today, you&apos;re being called to trust your instincts and embrace spontaneity. Don&apos;t overthink—sometimes the best path is the one taken with childlike wonder.
              </p>
            </BaseCard>

            {/* Today's Guidance */}
            <BaseCard className="p-6 space-y-3">
              <h3 className="font-semibold text-headline">Today&apos;s Guidance</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-body text-muted-foreground">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Take a leap of faith in a new project or relationship</span>
                </li>
                <li className="flex items-start gap-2 text-body text-muted-foreground">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Release attachments to outcomes and enjoy the journey</span>
                </li>
                <li className="flex items-start gap-2 text-body text-muted-foreground">
                  <span className="text-accent mt-0.5">•</span>
                  <span>Trust your inner wisdom, even if the path seems unclear</span>
                </li>
              </ul>
            </BaseCard>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="glass"
                size="lg"
                onClick={handleShare}
                className="flex-1"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              
              <Button
                variant="pill"
                size="lg"
                onClick={() => navigate("/home")}
                className="flex-1"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
};

export default DailyInsightPost;
