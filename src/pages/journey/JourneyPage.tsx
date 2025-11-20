import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { YourJourney } from "@/components/discovery/YourJourney";
import { Target, Sparkles, BookOpen } from "lucide-react";
import type { Activity } from "@/components/journey/ActivityTimeline";

const mockActivities: Activity[] = [
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

export default function JourneyPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Your Journey"
        subtitle="Track your progress and achievements"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate(-1),
          label: "Back"
        }}
      />

      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-safe pb-6">
        <main className="px-4 pb-10 mt-4" role="main" aria-label="Journey content">
          <YourJourney
            variant="full"
            title="Your Journey"
            subtitle="Your daily activity and milestones"
            streakValue={7}
            readings={24}
            reflections={12}
            rituals={8}
            nextMilestone={{
              title: "14 days",
              progress: 7,
              total: 14
            }}
            stats={[
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
            ]}
            activities={mockActivities}
          />
        </main>
      </div>
    </PageWrapper>
  );
}

