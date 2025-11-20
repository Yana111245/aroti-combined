import { Clock, Sparkles, BookOpen, Target, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Activity {
  id: string;
  type: "tarot" | "ritual" | "reflection" | "insight";
  title: string;
  timestamp: string;
}

interface ActivityTimelineProps {
  activities?: Activity[];
  className?: string;
}

const defaultActivities: Activity[] = [
  {
    id: "1",
    type: "tarot",
    title: "Tarot card pulled",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    type: "ritual",
    title: "Ritual completed",
    timestamp: "Yesterday"
  },
  {
    id: "3",
    type: "reflection",
    title: "Reflection added",
    timestamp: "2 days ago"
  },
  {
    id: "4",
    type: "insight",
    title: "AI insight viewed",
    timestamp: "3 days ago"
  }
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "tarot":
      return Target;
    case "ritual":
      return Sparkles;
    case "reflection":
      return BookOpen;
    case "insight":
      return Eye;
    default:
      return Clock;
  }
};

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "tarot":
      return "text-emerald-300";
    case "ritual":
      return "text-amber-300";
    case "reflection":
      return "text-purple-300";
    case "insight":
      return "text-blue-300";
    default:
      return "text-muted-foreground";
  }
};

export const ActivityTimeline = ({ 
  activities = defaultActivities,
  className 
}: ActivityTimelineProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-headline font-medium text-foreground mb-2">Recent Activity</h3>
      <div className="space-y-2">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const iconColor = getActivityColor(activity.type);
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-[10px] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className={cn("w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0", iconColor)}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body text-foreground">{activity.title}</p>
                <p className="text-caption-2 text-muted-foreground mt-0.5">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

