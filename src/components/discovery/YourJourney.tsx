import { Calendar, Target, BookOpen, Trophy, ChevronRight, Sparkles, Flame, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JourneyData {
  streak: number;
  readings: number;
  guides: number;
  reflections: number;
  nextMilestone?: {
    title: string;
    progress: number;
    total: number;
    reward: string;
  };
}

// Mock data - in production, this would come from state/API
const journeyData: JourneyData = {
  streak: 7,
  readings: 24,
  guides: 8,
  reflections: 12,
  nextMilestone: {
    title: "30-Day Journey",
    progress: 12,
    total: 30,
    reward: "Star Keeper Badge"
  }
};

export const YourJourney = () => {
  const navigate = useNavigate();
  const { streak, readings, guides, reflections, nextMilestone } = journeyData;
  const progressPercentage = nextMilestone ? Math.round((nextMilestone.progress / nextMilestone.total) * 100) : 0;

  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-title-3 font-title font-medium text-foreground">Your Journey</h2>
          <p className="text-footnote text-muted-foreground mt-1">Track your progress and achievements</p>
        </div>
      </div>

      <div className="relative apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 p-6">
        {/* Liquid glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
        
        <div className="space-y-5">
          {/* Streak Section - Improved */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center liquid-glass-secondary">
                <Calendar className="w-6 h-6 text-accent" />
                {/* Small flame indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent/30 border border-accent/50 flex items-center justify-center backdrop-blur-sm">
                  <Flame className="w-2.5 h-2.5 text-accent fill-accent" />
                </div>
              </div>
              <div>
                <p className="text-caption-2 text-muted-foreground uppercase tracking-wider">Current Streak</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-headline font-medium text-foreground">{streak}</p>
                  <p className="text-subhead text-muted-foreground">days</p>
                </div>
              </div>
            </div>
            {/* Progress Circle for next milestone */}
            {nextMilestone && (
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progressPercentage / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-caption-1 font-medium text-foreground">{progressPercentage}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Next Milestone - Enhanced */}
          {nextMilestone && (
            <div className="relative liquid-glass-secondary rounded-[10px] p-4 border border-glass-border overflow-hidden">
              {/* Subtle background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
              
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-[8px] bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 liquid-glass-secondary">
                    <Trophy className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-caption-2 text-muted-foreground uppercase tracking-wider mb-1">Next Milestone</p>
                    <p className="text-headline font-medium text-foreground truncate mb-2">{nextMilestone.title}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                      <span className="text-caption-1 text-muted-foreground whitespace-nowrap font-medium">
                        {nextMilestone.progress}/{nextMilestone.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {nextMilestone.reward && (
                <div className="relative flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                  <Award className="w-4 h-4 text-accent flex-shrink-0" />
                  <p className="text-caption-2 text-accent font-medium">{nextMilestone.reward}</p>
                </div>
              )}
            </div>
          )}

          {/* Stats Grid - Enhanced */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-4 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors liquid-glass-secondary">
              <div className="w-10 h-10 rounded-[8px] bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2 liquid-glass-secondary">
                <Target className="w-5 h-5 text-emerald-300" />
              </div>
              <p className="text-headline font-semibold text-foreground">{readings}</p>
              <p className="text-caption-2 text-muted-foreground mt-0.5">Readings</p>
            </div>
            <div className="text-center p-4 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors liquid-glass-secondary">
              <div className="w-10 h-10 rounded-[8px] bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-2 liquid-glass-secondary">
                <BookOpen className="w-5 h-5 text-amber-300" />
              </div>
              <p className="text-headline font-semibold text-foreground">{guides}</p>
              <p className="text-caption-2 text-muted-foreground mt-0.5">Guides</p>
            </div>
            <div className="text-center p-4 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors liquid-glass-secondary">
              <div className="w-10 h-10 rounded-[8px] bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-2 liquid-glass-secondary">
                <Sparkles className="w-5 h-5 text-purple-300" />
              </div>
              <p className="text-headline font-semibold text-foreground">{reflections}</p>
              <p className="text-caption-2 text-muted-foreground mt-0.5">Reflections</p>
            </div>
          </div>

          {/* Action Button - Enhanced */}
          <button 
            onClick={() => navigate("/discovery/unlocks")}
            className="w-full mt-2 px-4 py-3 rounded-[10px] border border-accent/50 bg-accent/10 text-accent text-subhead font-body hover:bg-accent/20 hover:border-accent transition-all backdrop-blur-sm flex items-center justify-center gap-2 group liquid-glass-secondary"
          >
            <Trophy className="w-4 h-4" />
            <span>View Full Journey</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Decorative shimmer element */}
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full liquid-glass-shimmer" />
      </div>
    </div>
  );
};
