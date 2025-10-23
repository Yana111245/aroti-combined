import { FrostedCard } from "@/components/ui/frosted-card";
import { Sparkles, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const unlocks = [
  { id: 1, title: "First Reading", completed: true },
  { id: 2, title: "Week Streak", completed: true },
  { id: 3, title: "Moon Cycle", completed: false },
  { id: 4, title: "Inner Wisdom", completed: false },
];

export const UnlocksSection = () => {
  const progress = (unlocks.filter(u => u.completed).length / unlocks.length) * 100;
  
  return (
    <section className="px-6 mb-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-1">
            Your Journey Progress
          </h2>
          <p className="text-sm text-muted-foreground">
            {unlocks.filter(u => u.completed).length} of {unlocks.length} milestones reached
          </p>
        </div>
      </div>
      
      <FrostedCard className="mb-4">
        <Progress value={progress} className="h-2 mb-3 transition-all duration-700" />
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {unlocks.map((unlock, index) => (
            <div
              key={unlock.id}
              className="flex-shrink-0 text-center"
              style={{
                animation: unlock.completed 
                  ? `scale-in 0.3s ease-out ${index * 0.1}s both` 
                  : 'none'
              }}
            >
              <div
                className={`w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center transition-all duration-300 ${
                  unlock.completed
                    ? "bg-gradient-gold shadow-glow hover:scale-110"
                    : "bg-secondary"
                }`}
              >
                {unlock.completed ? (
                  <Sparkles className="w-6 h-6 text-primary-foreground animate-pulse" />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <p
                className={`text-xs font-medium ${
                  unlock.completed ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {unlock.title}
              </p>
            </div>
          ))}
        </div>
      </FrostedCard>
      
      <button className="w-full py-3 px-6 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all hover:scale-[1.02]">
        View All Rewards
      </button>
    </section>
  );
};
