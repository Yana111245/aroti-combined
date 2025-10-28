import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function NumerologyDetail() {
  const navigate = useNavigate();

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Your Numerology"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Numerology details">
          {/* Life Path */}
          <BaseCard className="mb-4">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-gold flex items-center justify-center text-white font-title text-large-title">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-headline">Life Path 3</h4>
                  <button className="text-accent">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-footnote font-medium text-accent mb-2">Connector • Creative</p>
                <p className="text-subhead text-muted-foreground">
                  You're here to express, inspire, and bring people together through creativity and communication. Joy is your natural state.
                </p>
              </div>
            </div>
          </BaseCard>

          {/* Destiny Number */}
          <BaseCard className="mb-4">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-gold flex items-center justify-center text-white font-title text-large-title">
                8
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-headline">Destiny 8</h4>
                  <button className="text-accent">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-footnote font-medium text-accent mb-2">Builder • Leader</p>
                <p className="text-subhead text-muted-foreground">
                  Your life purpose revolves around achievement and material mastery. You're meant to build something lasting.
                </p>
              </div>
            </div>
          </BaseCard>

          {/* Soul Urge */}
          <BaseCard className="mb-4">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-gold flex items-center justify-center text-white font-title text-large-title">
                6
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-headline">Soul Urge 6</h4>
                  <button className="text-accent">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-footnote font-medium text-accent mb-2">Nurturer • Harmonizer</p>
                <p className="text-subhead text-muted-foreground">
                  Deep down, you crave harmony and want to care for others. Creating beautiful, peaceful spaces fulfills you.
                </p>
              </div>
            </div>
          </BaseCard>

          {/* Personal Year */}
          <BaseCard>
            <div className="text-center py-4">
              <p className="text-subhead text-muted-foreground mb-2">You're currently in</p>
              <h3 className="font-title text-title-2 font-semibold gradient-text mb-2">Personal Year 5</h3>
              <p className="text-subhead text-muted-foreground">
                A year of change, freedom, and adventure. Embrace new experiences and flexibility.
              </p>
            </div>
          </BaseCard>
        </main>
      </div>
    </PageWrapper>
  );
}
