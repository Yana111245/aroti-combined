import {
  Calendar,
  Target,
  BookOpen,
  Trophy,
  ChevronRight,
  Sparkles,
  Flame,
  Award,
  type LucideIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NextMilestone {
  title: string;
  progress: number;
  total: number;
  reward?: string;
}

interface JourneyStat {
  id: string;
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColorClass?: string;
  iconBgClass?: string;
  iconBorderClass?: string;
}

interface YourJourneyProps {
  title?: string;
  subtitle?: string;
  streakLabel?: string;
  streakUnit?: string;
  streakValue?: number;
  nextMilestone?: NextMilestone;
  stats?: JourneyStat[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

const defaultJourneyData = {
  streak: 7,
  nextMilestone: {
    title: "30-Day Journey",
    progress: 12,
    total: 30,
    reward: "Star Keeper Badge"
  }
};

const defaultStats: JourneyStat[] = [
  {
    id: "readings",
    label: "Readings",
    value: 24,
    icon: Target,
    iconColorClass: "text-emerald-300",
    iconBgClass: "bg-emerald-500/20",
    iconBorderClass: "border-emerald-500/30"
  },
  {
    id: "guides",
    label: "Guides",
    value: 8,
    icon: BookOpen,
    iconColorClass: "text-amber-300",
    iconBgClass: "bg-amber-500/20",
    iconBorderClass: "border-amber-500/30"
  },
  {
    id: "reflections",
    label: "Reflections",
    value: 12,
    icon: Sparkles,
    iconColorClass: "text-purple-300",
    iconBgClass: "bg-purple-500/20",
    iconBorderClass: "border-purple-500/30"
  }
];

export const YourJourney = ({
  title = "Your Journey",
  subtitle = "Track your progress and achievements",
  streakLabel = "Current Streak",
  streakUnit = "days",
  streakValue = defaultJourneyData.streak,
  nextMilestone = defaultJourneyData.nextMilestone,
  stats = defaultStats,
  ctaLabel = "View Full Journey",
  ctaHref = "/discovery/unlocks",
  onCtaClick,
  className
}: YourJourneyProps = {}) => {
  const navigate = useNavigate();
  const progressPercentage = nextMilestone ? Math.round((nextMilestone.progress / nextMilestone.total) * 100) : 0;

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    if (ctaHref) {
      navigate(ctaHref);
    }
  };

  return (
    <div className={cn("space-y-4 pt-6", className)}>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-title-3 font-title font-medium text-foreground">{title}</h2>
          <p className="text-footnote text-muted-foreground mt-1">{subtitle}</p>
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
                <p className="text-caption-2 text-muted-foreground uppercase tracking-wider">{streakLabel}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-headline font-medium text-foreground">{streakValue}</p>
                  <p className="text-subhead text-muted-foreground">{streakUnit}</p>
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
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className="text-center p-4 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors liquid-glass-secondary">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-[8px] flex items-center justify-center mx-auto mb-2 liquid-glass-secondary",
                      stat.iconBgClass ?? "bg-accent/15",
                      stat.iconBorderClass ?? "border border-accent/30"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", stat.iconColorClass ?? "text-accent")} />
                  </div>
                  <p className="text-headline font-semibold text-foreground">{stat.value}</p>
                  <p className="text-caption-2 text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Action Button - Enhanced */}
          <button 
            onClick={handleCta}
            className="w-full mt-2 px-4 py-3 rounded-[10px] border border-accent/50 bg-accent/10 text-accent text-subhead font-body hover:bg-accent/20 hover:border-accent transition-all backdrop-blur-sm flex items-center justify-center gap-2 group liquid-glass-secondary"
          >
            <Trophy className="w-4 h-4" />
            <span>{ctaLabel}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Decorative shimmer element */}
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full liquid-glass-shimmer" />
      </div>
    </div>
  );
};
