import { FrostedCard } from "@/components/ui/frosted-card";
import { Sparkles, Heart, Hash, MessageCircle, Mic, Send, Star } from "lucide-react";
import { Specialist } from "@/pages/Guidance";

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
    <div className="px-6 pt-8 pb-6">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-[28px] font-display font-bold text-foreground">
            Hi Friend, welcome to your Guidance.
          </h1>
          <button 
            onClick={onViewPoints}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-semibold shadow-glow"
          >
            <Star className="w-4 h-4 fill-current" />
            {userPoints}
          </button>
        </div>
        <p className="text-muted-foreground text-base">
          I'm here to help you explore your day's energy, chart, and intentions.
        </p>
      </header>

      <div className="mb-8">
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
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          AI Specialists
        </h2>
        <div className="space-y-3">
          {specialists.map((specialist) => {
            const IconComponent = specialist.icon;
            return (
              <FrostedCard
                key={specialist.id}
                className="cursor-pointer hover:shadow-glow transition-all hover:scale-[1.02] group"
                onClick={() => onStartChat(specialist.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${specialist.gradient} flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {specialist.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {specialist.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">
                      {specialist.cost} pts
                    </p>
                    <p className="text-xs text-muted-foreground">per message</p>
                  </div>
                </div>
              </FrostedCard>
            );
          })}
        </div>
      </section>

      <button
        onClick={onViewHistory}
        className="w-full mb-6 text-primary text-sm font-semibold hover:underline transition-all"
      >
        View Past Sessions
      </button>

      <FrostedCard className="sticky bottom-24">
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
      </FrostedCard>
    </div>
  );
};
