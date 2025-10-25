import { Clock, Moon, Sun, Heart } from "lucide-react";

const practices = [
  {
    id: "1",
    title: "Morning Intention",
    duration: "5 min",
    icon: <Sun className="w-5 h-5 text-accent" />
  },
  {
    id: "2",
    title: "Breathing Exercise",
    duration: "10 min",
    icon: <Heart className="w-5 h-5 text-accent" />
  },
  {
    id: "3",
    title: "Evening Reflection",
    duration: "8 min",
    icon: <Moon className="w-5 h-5 text-accent" />
  },
  {
    id: "4",
    title: "Gratitude Practice",
    duration: "3 min",
    icon: <Clock className="w-5 h-5 text-accent" />
  }
];

export const DailyPractice = () => {
  return (
    <div className="space-y-4">
      <div className="px-6 flex items-center justify-between">
        <h2 className="text-xl font-title font-medium text-foreground">Daily Practice</h2>
        <button className="text-sm font-body text-accent hover:text-accent/80 transition-colors">
          View All →
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pl-6 pr-6 pb-2 scrollbar-hide">
        {practices.map((practice) => (
          <div 
            key={practice.id}
            className="flex-shrink-0 w-[260px] rounded-[16px] p-5 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform"
            style={{background: 'linear-gradient(180deg, #FFFDF8 0%, #F6F2EB 100%)'}}
          >
            <div className="flex items-center gap-3 mb-3">
              {practice.icon}
              <div>
                <h3 className="text-base font-body font-bold text-foreground">{practice.title}</h3>
                <p className="text-[13px] text-muted-foreground">{practice.duration}</p>
              </div>
            </div>
            
            {/* Subtle shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
