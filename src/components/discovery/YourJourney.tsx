import { Calendar, Target, BookOpen } from "lucide-react";

export const YourJourney = () => {
  return (
    <div>
      <div className="rounded-[12px] p-6 bg-gradient-to-br from-purple-900/20 via-indigo-900/10 to-blue-900/20 backdrop-blur-sm border border-white/10">
        <h2 className="text-title-3 font-title font-medium text-foreground mb-4">Your Journey</h2>
        
        <div className="space-y-4">
          {/* Current Streak */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-subhead font-body text-foreground">
                Current Streak: <span className="font-bold text-accent">7 days</span>
              </p>
              <p className="text-footnote text-muted-foreground">Keep it going!</p>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-emerald-300" />
              </div>
              <p className="text-subhead font-body font-medium text-foreground">24</p>
              <p className="text-footnote text-muted-foreground">Readings</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-500/10 backdrop-blur-sm border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-amber-300" />
              </div>
              <p className="text-subhead font-body font-medium text-foreground">8</p>
              <p className="text-footnote text-muted-foreground">Guides</p>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full mt-4 px-4 py-2 rounded-[8px] border border-accent/50 bg-accent/10 text-accent text-subhead font-body hover:bg-accent/20 hover:border-accent transition-all backdrop-blur-sm">
            View Reflections
          </button>
        </div>
      </div>
    </div>
  );
};
