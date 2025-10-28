import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { SectionHeader } from "@/components/profile/SectionHeader";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function AstrologyDetail() {
  const navigate = useNavigate();

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Your Astrology"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Astrology details">
          {/* Birth Details */}
          <BaseCard className="mb-6">
        <h3 className="font-title text-headline font-semibold mb-4">Birth Details</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-subhead">September 12, 1990</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-subhead">Unknown</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-subhead">San Francisco, CA, USA</span>
          </div>
        </div>
        <GradientButton
          variant="outline"
          onClick={() => navigate("/profile/edit")}
          className="w-full mt-4"
        >
          Edit Birth Details
            </GradientButton>
          </BaseCard>

          {/* Big Three */}
          <SectionHeader title="Your Big Three" className="mb-4" />
          
          <BaseCard className="mb-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center text-white font-title text-title-3">
                ♍
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-headline mb-1">Sun in Virgo</h4>
                <p className="text-footnote text-muted-foreground mb-2">19° Virgo • 6th House</p>
                <p className="text-subhead text-muted-foreground">Analytical, practical, and devoted to service. You find meaning in precision and care.</p>
              </div>
            </div>
          </BaseCard>

          <BaseCard className="mb-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center text-white font-title text-title-3">
                ♓
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-headline mb-1">Moon in Pisces</h4>
                <p className="text-footnote text-muted-foreground mb-2">7° Pisces • 12th House</p>
                <p className="text-subhead text-muted-foreground">Deeply intuitive and emotionally attuned. Your inner world is rich with imagination.</p>
              </div>
            </div>
          </BaseCard>

          <BaseCard className="mb-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center text-white font-title text-title-3">
                ♌
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-headline mb-1">Rising in Leo</h4>
                <p className="text-footnote text-muted-foreground mb-2">14° Leo • Ascendant</p>
                <p className="text-subhead text-muted-foreground">You present with warmth and confidence. Others see your natural radiance first.</p>
              </div>
            </div>
          </BaseCard>

          {/* Current Transits */}
          <SectionHeader title="Current Transits" description="Influences active now" className="mb-4" />
          
          <BaseCard className="mb-4">
            <div className="mb-2">
              <span className="text-footnote font-medium text-accent">Mercury Retrograde</span>
            </div>
            <p className="text-subhead text-muted-foreground">Communication may feel slow. Review rather than rush forward.</p>
          </BaseCard>

          <BaseCard>
            <div className="mb-2">
              <span className="text-footnote font-medium text-accent">Full Moon in Taurus</span>
            </div>
            <p className="text-subhead text-muted-foreground">Illuminating your values and what truly sustains you.</p>
          </BaseCard>
        </main>
      </div>
    </PageWrapper>
  );
}
