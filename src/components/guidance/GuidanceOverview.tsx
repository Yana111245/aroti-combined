import { FrostedCard } from "@/components/ui/frosted-card";
import { Sparkles, Heart, Hash, MessageCircle, Mic, Send, Star } from "lucide-react";
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
    name: "Astrologer",
    icon: Sparkles,
    description: "Cosmic insights",
    cost: 5,
    gradient: "from-primary-gold to-primary-gold-end",
  },
  {
    id: "therapist" as Specialist,
    name: "Therapist",
    icon: Heart,
    description: "Mindful support",
    cost: 10,
    gradient: "from-accent to-accent",
  },
  {
    id: "numerologist" as Specialist,
    name: "Numerologist",
    icon: Hash,
    description: "Life path clarity",
    cost: 5,
    gradient: "from-primary to-primary",
  },
];

const quickPills = ["Daily Energy", "Ask about my chart", "Free Topic"];

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
      <div className="pt-[80px] min-h-full pb-24">
        <main className="px-6 pb-24 mt-4" role="main" aria-label="Guidance content">
          <section className="space-y-6" aria-labelledby="guidance-content">
            <h2 id="guidance-content" className="sr-only">Guidance Content</h2>

            {/* Quick Pills */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {quickPills.map((pill) => (
                <button
                  key={pill}
                  className="px-5 py-2.5 rounded-full bg-card/70 backdrop-blur-frosted border border-primary/20 text-foreground text-sm font-medium whitespace-nowrap hover:bg-card hover:border-primary/40 transition-all hover:shadow-glow"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* AI Specialists */}
            <div>
              <h2 className="text-title-2 font-title font-semibold text-foreground mb-4">
                AI Specialists
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

            {/* View Past Sessions */}
            <button
              onClick={onViewHistory}
              className="w-full mb-6 text-primary text-body font-semibold hover:underline transition-all"
            >
              View Past Sessions
            </button>

            {/* Quick Message Input */}
            <BaseCard className="sticky bottom-24 p-4">
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
                  <Mic className="w-5 h-5 text-foreground" />
                </button>
                <input
                  type="text"
                  placeholder="Type your message…"
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow hover:shadow-soft transition-all">
                  <Send className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>
            </BaseCard>
          </section>
        </main>
      </div>
    </>
  );
};
