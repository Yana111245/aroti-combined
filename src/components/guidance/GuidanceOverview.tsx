import { Sparkles, Heart, Hash, Star, History } from "lucide-react";
import { Specialist } from "@/pages/Guidance";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

interface GuidanceOverviewProps {
  onStartChat: (specialist: Specialist) => void;
  onViewHistory: () => void;
  onViewPoints: () => void;
  userPoints: number;
}

const specialists = [
  {
    id: "astrologer" as Specialist,
    name: "Luna",
    icon: Sparkles,
    description: "Cosmic insights & astrology guidance",
    cost: 5,
    gradient: "from-primary-gold to-primary-gold-end",
  },
  {
    id: "therapist" as Specialist,
    name: "Elyon",
    icon: Heart,
    description: "Mindful support & emotional guidance",
    cost: 10,
    gradient: "from-accent to-accent",
  },
  {
    id: "numerologist" as Specialist,
    name: "Orin",
    icon: Hash,
    description: "Life path clarity & numerology",
    cost: 5,
    gradient: "from-primary to-primary",
  },
];

export const GuidanceOverview = ({ onStartChat, onViewHistory, onViewPoints, userPoints }: GuidanceOverviewProps) => {
  return (
    <>
      {/* Fixed Header */}
      <BaseHeader 
        title="Guidance"
        subtitle="Personal AI guidance tailored to your journey"
        rightActions={
          <button 
            onClick={onViewPoints}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-semibold shadow-glow"
          >
            <Star className="w-4 h-4 fill-current" />
            {userPoints}
          </button>
        }
      />

      {/* Main Content */}
      <div className="pt-[80px] min-h-full pb-4">
        <main className="px-6 pb-4 mt-8" role="main" aria-label="Guidance content">
          <section className="space-y-8" aria-labelledby="guidance-content">
            <h2 id="guidance-content" className="sr-only">Guidance Content</h2>

            {/* Welcome Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-title-1 font-title font-bold text-foreground">
                Start Your Journey
              </h1>
              <p className="text-body text-muted-foreground max-w-md mx-auto">
                Connect with AI specialists who understand your unique path. Get personalized guidance whenever you need it.
              </p>
            </div>

            {/* Quick Specialist Selection */}
            <div className="space-y-3">
              <h2 className="text-title-2 font-title font-semibold text-foreground mb-4">
                Choose Your Guide
              </h2>
              <div className="space-y-3">
                {specialists.map((specialist) => {
                  const IconComponent = specialist.icon;
                  return (
                    <BaseCard
                      key={specialist.id}
                      variant="interactive"
                      onClick={() => onStartChat(specialist.id)}
                      className="p-4 hover:shadow-glow transition-all hover:scale-[1.02] group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${specialist.gradient} flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-headline font-semibold text-foreground mb-1">
                            {specialist.name}
                          </h3>
                          <p className="text-body text-muted-foreground">
                            {specialist.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-body font-semibold text-primary">
                            {specialist.cost} pts
                          </p>
                          <p className="text-footnote text-muted-foreground">per message</p>
                        </div>
                      </div>
                    </BaseCard>
                  );
                })}
              </div>
            </div>

            {/* Secondary Actions */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={onViewHistory}
                className="flex items-center justify-center gap-2 text-primary text-body font-semibold hover:underline transition-all"
              >
                <History className="w-5 h-5" />
                View Past Sessions
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
