import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";

export default function NumerologyDetail() {
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
        <SerifTitle>Your Numerology</SerifTitle>
      </div>

      {/* Life Path */}
      <SoftCard className="mb-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full gradient-accent flex items-center justify-center text-white font-serif text-3xl">
            3
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">Life Path 3</h4>
              <button className="text-accent-gold">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs font-medium text-accent-gold mb-2">Connector • Creative</p>
            <p className="text-sm text-muted-foreground">
              You're here to express, inspire, and bring people together through creativity and communication. Joy is your natural state.
            </p>
          </div>
        </div>
      </SoftCard>

      {/* Destiny Number */}
      <SoftCard className="mb-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full gradient-accent flex items-center justify-center text-white font-serif text-3xl">
            8
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">Destiny 8</h4>
              <button className="text-accent-gold">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs font-medium text-accent-gold mb-2">Builder • Leader</p>
            <p className="text-sm text-muted-foreground">
              Your life purpose revolves around achievement and material mastery. You're meant to build something lasting.
            </p>
          </div>
        </div>
      </SoftCard>

      {/* Soul Urge */}
      <SoftCard className="mb-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full gradient-accent flex items-center justify-center text-white font-serif text-3xl">
            6
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">Soul Urge 6</h4>
              <button className="text-accent-gold">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs font-medium text-accent-gold mb-2">Nurturer • Harmonizer</p>
            <p className="text-sm text-muted-foreground">
              Deep down, you crave harmony and want to care for others. Creating beautiful, peaceful spaces fulfills you.
            </p>
          </div>
        </div>
      </SoftCard>

      {/* Personal Year */}
      <SoftCard>
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground mb-2">You're currently in</p>
          <h3 className="font-serif text-2xl font-semibold gradient-text mb-2">Personal Year 5</h3>
          <p className="text-sm text-muted-foreground">
            A year of change, freedom, and adventure. Embrace new experiences and flexibility.
          </p>
        </div>
      </SoftCard>
    </div>
  );
}
