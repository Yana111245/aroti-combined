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
import { ActivityTimeline, type Activity } from "@/components/journey/ActivityTimeline";
import { SavedItemsPreview } from "@/components/journey/SavedItemsPreview";

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
  variant?: "compact" | "full";
  title?: string;
  subtitle?: string;
  streakValue?: number;
  readings?: number;
  reflections?: number;
  rituals?: number;
  nextMilestone?: NextMilestone;
  stats?: JourneyStat[];
  activities?: Activity[];
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

const defaultJourneyData = {
  streak: 7,
  readings: 24,
  reflections: 12,
  rituals: 8,
  nextMilestone: {
    title: "14 days",
    progress: 7,
    total: 14,
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
    id: "reflections",
    label: "Reflections",
    value: 12,
    icon: Sparkles,
    iconColorClass: "text-purple-300",
    iconBgClass: "bg-purple-500/20",
    iconBorderClass: "border-purple-500/30"
  },
  {
    id: "rituals",
    label: "Rituals",
    value: 8,
    icon: BookOpen,
    iconColorClass: "text-amber-300",
    iconBgClass: "bg-amber-500/20",
    iconBorderClass: "border-amber-500/30"
  }
];

export const YourJourney = ({
  variant = "full",
  title = "Your Journey",
  subtitle = "Track your progress and achievements",
  streakValue = defaultJourneyData.streak,
  readings = defaultJourneyData.readings,
  reflections = defaultJourneyData.reflections,
  rituals = defaultJourneyData.rituals,
  nextMilestone = defaultJourneyData.nextMilestone,
  stats = defaultStats,
  activities,
  ctaLabel = "View Full Journey",
  ctaHref = "/journey",
  onCtaClick,
  className
}: YourJourneyProps = {}) => {
  const navigate = useNavigate();
  const progressPercentage = nextMilestone ? Math.round((nextMilestone.progress / nextMilestone.total) * 100) : 0;

  const handleClick = () => {
    if (variant === "compact") {
      navigate("/journey");
    } else if (onCtaClick) {
      onCtaClick();
    } else if (ctaHref) {
      navigate(ctaHref);
    }
  };

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={cn("space-y-4 pt-6", className)}>
        <div className="flex items-end justify-between">
          <h2 className="text-title-3 font-title font-medium text-foreground">{title}</h2>
        </div>

        <div 
          onClick={handleClick}
          className="relative apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 p-4 cursor-pointer group"
        >
          {/* Liquid glass highlight */}
          <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
          
          {/* Metrics row - single line */}
          <div className="flex items-center justify-center mb-3 text-center">
            <div className="flex items-center gap-2 text-body text-foreground">
              <span>{streakValue}-day streak</span>
              <span className="text-muted-foreground">•</span>
              <span>{readings} readings</span>
              <span className="text-muted-foreground">•</span>
              <span>{reflections} reflections</span>
              <span className="text-muted-foreground">•</span>
              <span>{rituals} rituals</span>
            </div>
          </div>

          {/* Thin progress bar */}
          <div className="h-0.5 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full transition-all duration-300 journey-progress-glow"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Centered button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="w-full px-4 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4 mr-2" />
              View full journey
            </button>
          </div>

          {/* Decorative shimmer element */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full liquid-glass-shimmer" />
        </div>
      </div>
    );
  }

  // Full variant
  return (
    <div className={cn("space-y-4 pt-6", className)}>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-title-3 font-title font-medium text-foreground">{title}</h2>
          {subtitle && <p className="text-footnote text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </div>

      <div className="relative liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5">
        {/* Liquid glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
        
        <div className="space-y-6">
          {/* A. Streak Section */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-accent text-3xl">✨</span>
              <h3 className="text-title-3 font-semibold text-foreground">{streakValue}-day streak</h3>
            </div>
            <p className="text-footnote text-muted-foreground">You've shown up every day. Keep going.</p>
          </div>

          {/* B. Milestone Tracker */}
          {nextMilestone && (
            <div className="space-y-2">
              <p className="text-caption-2 text-muted-foreground uppercase tracking-wider">
                Next milestone: {nextMilestone.title}
              </p>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full transition-all duration-300 journey-progress-glow"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* C. Stats Cards (3 columns) */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className="text-center p-4 rounded-[10px] bg-white/5 border border-white/10">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-[8px] flex items-center justify-center mx-auto mb-2",
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

          {/* D. Activity Timeline */}
          <ActivityTimeline activities={activities} />

          {/* E. Saved Items Section */}
          <SavedItemsPreview />

          {/* F. Footer Text */}
          <div className="text-center pt-2">
            <p className="text-footnote text-muted-foreground">Your journey is unfolding beautifully.</p>
          </div>
        </div>

        {/* Decorative shimmer element */}
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full liquid-glass-shimmer" />
      </div>
    </div>
  );
};
