import { Clock, Moon, Sun, Heart } from "lucide-react";

const practices = [
  {
    id: "1",
    title: "Morning Intention",
    duration: "5 min"
  },
  {
    id: "2",
    title: "Breathing Exercise",
    duration: "10 min"
  },
  {
    id: "3",
    title: "Evening Reflection",
    duration: "8 min"
  },
  {
    id: "4",
    title: "Gratitude Practice",
    duration: "3 min"
  }
];

export const DailyPractice = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-title-3 font-title font-medium text-foreground">Daily Practice</h2>
          <p className="text-footnote text-muted-foreground mt-1">Morning routines & evening rituals</p>
        </div>
        <button className="text-subhead font-body text-muted-foreground hover:text-foreground transition-colors">
          View All →
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-4">
        {practices.map((practice) => (
          <div 
            key={practice.id}
            className="flex-shrink-0 w-[260px] flex apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-5"
          >
            <div className="flex items-center gap-3 mb-3 relative z-10">
              {/* Subtle liquid glass highlight */}
              <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
              
              <div>
                <h3 className="text-base font-body font-bold text-foreground">{practice.title}</h3>
                <p className="text-[13px] text-muted-foreground">{practice.duration}</p>
              </div>
              
              {/* Decorative shimmer element */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full liquid-glass-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
