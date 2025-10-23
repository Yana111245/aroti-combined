import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { SectionHeader } from "@/components/profile/SectionHeader";

export default function AstrologyDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 max-w-[420px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/profile")}
          className="rounded-full p-2 hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <SerifTitle>Your Astrology</SerifTitle>
      </div>

      {/* Birth Details */}
      <SoftCard className="mb-6">
        <h3 className="font-serif text-lg font-semibold mb-4">Birth Details</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">September 12, 1990</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Unknown</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">San Francisco, CA, USA</span>
          </div>
        </div>
        <GradientButton
          variant="outline"
          onClick={() => navigate("/profile/edit")}
          className="w-full mt-4"
        >
          Edit Birth Details
        </GradientButton>
      </SoftCard>

      {/* Big Three */}
      <SectionHeader title="Your Big Three" className="mb-4" />
      
      <SoftCard className="mb-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full gradient-accent flex items-center justify-center text-white font-serif text-xl">
            ♍
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Sun in Virgo</h4>
            <p className="text-xs text-muted-foreground mb-2">19° Virgo • 6th House</p>
            <p className="text-sm text-muted-foreground">Analytical, practical, and devoted to service. You find meaning in precision and care.</p>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="mb-4">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full gradient-accent flex items-center justify-center text-white font-serif text-xl">
            ♓
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Moon in Pisces</h4>
            <p className="text-xs text-muted-foreground mb-2">7° Pisces • 12th House</p>
            <p className="text-sm text-muted-foreground">Deeply intuitive and emotionally attuned. Your inner world is rich with imagination.</p>
          </div>
        </div>
      </SoftCard>

      <SoftCard className="mb-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full gradient-accent flex items-center justify-center text-white font-serif text-xl">
            ♌
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Rising in Leo</h4>
            <p className="text-xs text-muted-foreground mb-2">14° Leo • Ascendant</p>
            <p className="text-sm text-muted-foreground">You present with warmth and confidence. Others see your natural radiance first.</p>
          </div>
        </div>
      </SoftCard>

      {/* Current Transits */}
      <SectionHeader title="Current Transits" description="Influences active now" className="mb-4" />
      
      <SoftCard className="mb-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-accent-gold">Mercury Retrograde</span>
        </div>
        <p className="text-sm text-muted-foreground">Communication may feel slow. Review rather than rush forward.</p>
      </SoftCard>

      <SoftCard>
        <div className="mb-2">
          <span className="text-xs font-medium text-accent-gold">Full Moon in Taurus</span>
        </div>
        <p className="text-sm text-muted-foreground">Illuminating your values and what truly sustains you.</p>
      </SoftCard>
    </div>
  );
}
