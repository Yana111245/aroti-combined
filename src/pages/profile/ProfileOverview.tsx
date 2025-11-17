import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Sun,
  Moon,
  Star,
  Bookmark,
  MessageCircle,
  Calendar,
  ChevronRight,
  BookOpen,
  Sparkles,
  Target,
  Bell,
  Globe,
  Shield
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { YourJourney } from "@/components/discovery/YourJourney";
import { TabPills } from "@/components/profile/TabPills";
import profileAvatar from "@/assets/specialist-1.jpg";

const savedLibrary = {
  Readings: [
    "Celtic Cross Spread",
    "Moonlit Reflection",
    "Solar Alignment"
  ],
  Guides: [
    "Lunar Living",
    "Tarot Foundations",
    "Chakra Reset"
  ],
  Practices: [
    "Morning Mantra",
    "Gratitude Flow",
    "Evening Integration"
  ],
  Sessions: [
    "Energy Tuning with Maia",
    "Dream Work Circle",
    "Sound Bath Ritual"
  ]
};

const accountTools = [
  { label: "Settings", icon: Settings },
  { label: "Notifications", icon: Bell },
  { label: "Language", icon: Globe },
  { label: "Privacy & Terms", icon: Shield }
];

const astrologyPlacements = [
  {
    title: "Sun — Virgo",
    description: "Identity • How you move through the world"
  },
  {
    title: "Moon — Pisces",
    description: "Inner world • How you feel and process emotion"
  },
  {
    title: "Rising — Leo",
    description: "First impression • The energy you project to others"
  }
];

export default function ProfileOverview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<keyof typeof savedLibrary>("Readings");

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Profile"
        subtitle="Your cosmic journey and personal insights"
      />

      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-safe pb-6">
        <main className="px-4 pb-10 mt-4 space-y-8" role="main" aria-label="Profile content">
          {/* Profile Header */}
          <section className="space-y-4">
            <div className="liquid-glass-card rounded-[16px] border border-glass-border shadow-glass p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-[78px] h-[96px] rounded-[18px] border border-white/10 shadow-glass overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                    <img
                      src={profileAvatar}
                      alt="Alexandra Moon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-caption-2 uppercase tracking-[0.2em] text-muted-foreground">Explorer</p>
                    <h1 className="text-headline font-semibold text-foreground mt-1">Alexandra Moon</h1>
                    <p className="text-body text-muted-foreground mt-1">San Francisco, CA</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/profile/settings")}
                  className="p-2 rounded-[12px] border border-white/10 hover:bg-white/5 transition-colors"
                  aria-label="Open settings"
                >
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </section>

          {/* Cosmic Blueprint */}
          <section className="space-y-4">
            <div className="liquid-glass-card rounded-[16px] border border-glass-border shadow-glass p-5 space-y-6">
              <div>
                <p className="text-caption-2 uppercase tracking-[0.3em] text-muted-foreground">Your Cosmic Blueprint</p>
                <p className="text-subhead text-muted-foreground mt-1">Your core traits based on your birth details.</p>
              </div>

              <div className="grid gap-4">
                <BaseCard className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-title-4 font-title text-foreground">Astrology</h3>
                      <p className="text-footnote text-muted-foreground mt-1">
                        Your essential placements based on your birth date, time, and location.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-accent">
                      <Sun className="w-4 h-4" />
                      <Moon className="w-4 h-4" />
                      <Star className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {astrologyPlacements.map((placement) => (
                      <div key={placement.title} className="rounded-[12px] border border-white/5 bg-white/2 p-3">
                        <p className="text-body font-medium text-foreground">{placement.title}</p>
                        <p className="text-footnote text-muted-foreground mt-1">{placement.description}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => navigate("/profile/astrology")}
                    className="text-accent flex items-center gap-2 text-body font-medium hover:opacity-80 transition"
                  >
                    View Full Birth Chart
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </BaseCard>

                <BaseCard className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-title-4 font-title text-foreground">Numerology</h3>
                      <p className="text-footnote text-muted-foreground mt-1">
                        Your life path number calculated from your birth date.
                      </p>
                    </div>
                    <Bookmark className="w-5 h-5 text-accent" />
                  </div>
                  <div className="rounded-[12px] border border-white/5 bg-white/2 p-4">
                    <p className="text-title-3 font-semibold text-foreground">Life Path 3 — The Connector</p>
                    <p className="text-footnote text-muted-foreground mt-2">
                      Creative energy • Expression • Communication
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/profile/numerology")}
                    className="text-accent flex items-center gap-2 text-body font-medium hover:opacity-80 transition"
                  >
                    Learn More About Your Number
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </BaseCard>
              </div>
            </div>
          </section>

          {/* Practice & Progress */}
          <section>
            <YourJourney
              title="Practice & Progress"
              subtitle="Your daily activity and milestones."
              streakLabel="Current Streak"
              streakUnit="days"
              streakValue={5}
              nextMilestone={{
                title: "14-Day Reflection",
                progress: 5,
                total: 14,
                reward: "Daily Insight Boost"
              }}
              stats={[
                {
                  id: "reflection",
                  label: "Reflection Streak",
                  value: "5 days",
                  icon: Target,
                  iconColorClass: "text-emerald-300",
                  iconBgClass: "bg-emerald-500/20",
                  iconBorderClass: "border-emerald-500/30"
                },
                {
                  id: "reading",
                  label: "Last Reading",
                  value: "2 hours ago",
                  icon: BookOpen,
                  iconColorClass: "text-amber-300",
                  iconBgClass: "bg-amber-500/20",
                  iconBorderClass: "border-amber-500/30"
                },
                {
                  id: "stars",
                  label: "Stars Earned",
                  value: "127",
                  icon: Sparkles,
                  iconColorClass: "text-purple-300",
                  iconBgClass: "bg-purple-500/20",
                  iconBorderClass: "border-purple-500/30"
                }
              ]}
              ctaLabel="View All Activity"
              ctaHref="/profile/activity"
            />
          </section>

          {/* Saved */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-title-3 font-title text-foreground">Saved</h2>
                <p className="text-footnote text-muted-foreground">Your personal library of readings and tools.</p>
              </div>
              <button
                onClick={() => navigate("/profile/saved")}
                className="text-accent text-body font-medium hover:opacity-80 transition"
              >
                View All
              </button>
            </div>
            <TabPills
              tabs={Object.keys(savedLibrary)}
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab as keyof typeof savedLibrary)}
            />
            <div className="grid grid-cols-2 gap-3">
              {savedLibrary[activeTab].map((item) => (
                <BaseCard
                  key={item}
                  variant="interactive"
                  className="p-4 space-y-2 min-h-[120px]"
                >
                  <Bookmark className="w-5 h-5 text-accent" />
                  <p className="text-body font-medium text-foreground">{item}</p>
                </BaseCard>
              ))}
            </div>
          </section>

          {/* Your Connections */}
          <section>
            <div className="relative apple-material-card-interactive liquid-glass-card rounded-[16px] border border-glass-border shadow-glass p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-title-3 font-title text-foreground">Your Connections</h3>
                  <p className="text-footnote text-muted-foreground mt-1">
                    Messages, sessions, and interactions with specialists.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[12px] border border-white/5 bg-white/2 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-body font-medium text-foreground">Messages</p>
                    <p className="text-footnote text-muted-foreground mt-1">2 unread</p>
                  </div>
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div className="rounded-[12px] border border-white/5 bg-white/2 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-body font-medium text-foreground">Next Session</p>
                    <p className="text-footnote text-muted-foreground mt-1">Tomorrow</p>
                  </div>
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
              </div>
              <button
                onClick={() => navigate("/profile/sessions")}
                className="w-full mt-2 px-4 py-3 rounded-[10px] border border-accent/40 bg-accent/10 text-accent text-subhead font-body hover:bg-accent/20 transition-all flex items-center justify-center gap-2"
              >
                View History
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Membership */}
          <section>
            <div className="rounded-[18px] border border-accent/40 bg-gradient-to-r from-accent/25 via-accent/10 to-transparent p-5 shadow-elevated">
              <p className="text-title-4 font-title text-foreground">Membership</p>
              <p className="text-footnote text-muted-foreground mt-1">
                You’re on the Free Plan — enjoy basic guidance anytime.
              </p>
              <button
                onClick={() => navigate("/profile/subscription")}
                className="mt-4 w-full rounded-[12px] bg-white/90 text-accent px-4 py-3 font-semibold hover:bg-white transition"
              >
                Unlock Full Access
              </button>
            </div>
          </section>

          {/* Account Tools */}
          <section>
            <div className="liquid-glass-card rounded-[16px] border border-glass-border shadow-glass p-4">
              <p className="text-caption-2 uppercase tracking-[0.3em] text-muted-foreground mb-3">Account Tools</p>
              <div className="grid grid-cols-2 gap-3">
                {accountTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div
                      key={tool.label}
                      className="flex items-center gap-3 rounded-[12px] border border-white/5 bg-white/2 px-3 py-2 text-muted-foreground"
                    >
                      <Icon className="w-4 h-4 opacity-80" />
                      <span className="text-footnote">{tool.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
}
