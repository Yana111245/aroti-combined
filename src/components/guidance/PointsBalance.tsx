import { FrostedCard } from "@/components/ui/frosted-card";
import { ArrowLeft, Star, Play, UserPlus, Crown } from "lucide-react";

interface PointsBalanceProps {
  onBack: () => void;
  userPoints: number;
}

const earnOptions = [
  {
    id: "watch",
    icon: Play,
    title: "Watch short lessons",
    points: 10,
    description: "Complete 5-minute mindful videos",
  },
  {
    id: "invite",
    icon: UserPlus,
    title: "Invite a friend",
    points: 50,
    description: "Share Aroti with your circle",
  },
  {
    id: "premium",
    icon: Crown,
    title: "Upgrade to Premium",
    points: "unlimited",
    description: "Unlimited messages & exclusive content",
  },
];

export const PointsBalance = ({ onBack, userPoints }: PointsBalanceProps) => {
  return (
    <div className="px-6 pt-8 pb-6">
      <header className="mb-8">
        <button onClick={onBack} className="p-2 -ml-2 mb-4 hover:bg-secondary/50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-[28px] font-display font-bold text-foreground mb-2">
          Your Balance
        </h1>
      </header>

      <FrostedCard className="mb-8 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-gold mx-auto mb-4 flex items-center justify-center shadow-glow">
          <Star className="w-10 h-10 text-primary-foreground fill-current" />
        </div>
        <h2 className="text-4xl font-display font-bold text-foreground mb-2">
          {userPoints.toLocaleString()} Points
        </h2>
        <p className="text-sm text-muted-foreground">
          Each message costs 5–10 points depending on your specialist.
        </p>
      </FrostedCard>

      <section>
        <h2 className="text-xl font-display font-semibold text-foreground mb-4">
          Earn More Points
        </h2>
        <div className="space-y-3 mb-6">
          {earnOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <FrostedCard
                key={option.id}
                className="cursor-pointer hover:shadow-glow transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {option.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {option.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {typeof option.points === "number" ? `+${option.points}` : option.points}
                    </p>
                  </div>
                </div>
              </FrostedCard>
            );
          })}
        </div>

        <button className="w-full py-4 px-6 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all hover:scale-[1.02]">
          Get More Points
        </button>
      </section>
    </div>
  );
};
