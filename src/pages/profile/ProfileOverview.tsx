import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Bookmark,
  MessageCircle,
  Calendar,
  ChevronRight,
  Sparkles,
  Bell,
  Globe,
  Shield,
  Edit2
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { YourJourney } from "@/components/discovery/YourJourney";
import { CategoryChip } from "@/components/booking/CategoryChip";
import { WalletActivityCard } from "@/components/profile/WalletActivityCard";
import profileAvatar from "@/assets/specialist-1.jpg";
import specialist1 from "@/assets/specialist-1.jpg";

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
  { label: "Settings", icon: Settings, path: "/profile/settings" },
  { label: "Notifications", icon: Bell, path: "/profile/notifications" },
  { label: "Language", icon: Globe, path: "/profile/language" },
  { label: "Privacy & Terms", icon: Shield, path: "/profile/privacy" }
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

      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-safe pb-6">
        <main className="px-4 pb-10 mt-4 space-y-8" role="main" aria-label="Profile content">
          
          {/* 1. Profile Header */}
          <section>
            <BaseCard className="p-4">
              <div className="flex items-start gap-4">
                {/* Avatar - 80x80 matching SpecialistCard */}
                <img
                  src={profileAvatar}
                  alt="Alexandra Moon"
                  className="w-20 h-20 rounded-[12px] object-cover ring-2 ring-primary/20 flex-shrink-0"
                />
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-caption-2 uppercase tracking-[0.2em] text-muted-foreground">Explorer</p>
                  <h1 className="text-title-3 font-semibold text-foreground mt-1">Alexandra Moon</h1>
                  <p className="text-footnote text-muted-foreground mt-1">San Francisco, CA</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => navigate("/profile/edit")}
                    className="p-2 rounded-[12px] liquid-glass-card bg-white/5 border border-glass-border hover:bg-white/10 hover:border-glass-highlight transition-colors"
                    aria-label="Edit profile"
                  >
                    <Edit2 className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => navigate("/profile/settings")}
                    className="p-2 rounded-[12px] liquid-glass-card bg-white/5 border border-glass-border hover:bg-white/10 hover:border-glass-highlight transition-colors"
                    aria-label="Open settings"
                  >
                    <Settings className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </BaseCard>
          </section>

          {/* 2. Wallet & Activity Card */}
          <section>
            <WalletActivityCard credits={120} stars={127} />
          </section>

          {/* 3. Your Cosmic Blueprint */}
          <section>
            <BaseSectionHeader 
              title="Your Cosmic Blueprint"
              subtitle="Your core traits based on your birth details"
            />
            <div className="mt-6 space-y-4">
              {/* Astrology Card */}
              <BaseCard 
                variant="interactive"
                onClick={() => navigate("/profile/astrology")}
                className="p-5 space-y-4"
              >
                <div>
                  <h3 className="text-title-3 font-title text-foreground">Astrology</h3>
                  <p className="text-footnote text-muted-foreground mt-1">
                    Your essential placements based on your birth date, time, and location.
                  </p>
                </div>
                <div className="space-y-3">
                  {astrologyPlacements.map((placement) => (
                    <div key={placement.title} className="rounded-[12px] border border-white/5 bg-white/2 p-3">
                      <p className="text-body font-medium text-foreground">{placement.title}</p>
                      <p className="text-footnote text-muted-foreground mt-1">{placement.description}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-accent text-body font-medium">
                  View Full Birth Chart
                  <ChevronRight className="w-4 h-4" />
                </div>
              </BaseCard>

              {/* Numerology Card */}
              <BaseCard 
                variant="interactive"
                onClick={() => navigate("/profile/numerology")}
                className="p-5 space-y-4"
              >
                <div>
                  <h3 className="text-title-3 font-title text-foreground">Numerology</h3>
                  <p className="text-footnote text-muted-foreground mt-1">
                    Your life path number calculated from your birth date.
                  </p>
                </div>
                <div className="rounded-[12px] border border-white/5 bg-white/2 p-4">
                  <p className="text-title-3 font-semibold text-foreground">Life Path 3 — The Connector</p>
                  <p className="text-footnote text-muted-foreground mt-2">
                    Creative energy • Expression • Communication
                  </p>
                </div>
                <div className="flex items-center gap-2 text-accent text-body font-medium">
                  Learn More About Your Number
                  <ChevronRight className="w-4 h-4" />
                </div>
              </BaseCard>
            </div>
          </section>

          {/* 4. Quick Actions Hub */}
          <section>
            <BaseSectionHeader 
              title="Quick Actions"
              subtitle="Messages and upcoming sessions"
            />
            <div className="mt-6 space-y-4">
              {/* Messages and Next Session Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Messages Card */}
                <BaseCard 
                  variant="interactive"
                  onClick={() => navigate("/profile/messages")}
                  className="p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <MessageCircle className="w-6 h-6 text-accent" />
                    <span className="px-2 py-0.5 rounded-full bg-accent text-white text-caption-2 font-medium">2</span>
                  </div>
                  <div>
                    <p className="text-body font-medium text-foreground">Messages</p>
                    <p className="text-footnote text-muted-foreground mt-1">2 unread messages</p>
                  </div>
                </BaseCard>

                {/* Next Session Card */}
                <BaseCard 
                  variant="interactive"
                  onClick={() => navigate("/booking/session/1")}
                  className="p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Calendar className="w-6 h-6 text-accent" />
                    <img 
                      src={specialist1} 
                      alt="Specialist"
                      className="w-8 h-8 rounded-[8px] object-cover ring-1 ring-white/20"
                    />
                  </div>
                  <div>
                    <p className="text-body font-medium text-foreground">Next Session</p>
                    <p className="text-footnote text-muted-foreground mt-1">Tomorrow at 2:00 PM</p>
                  </div>
                </BaseCard>
              </div>

              {/* Book Another Session CTA */}
              <button
                onClick={() => navigate("/booking")}
                className="w-full px-4 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 flex items-center justify-center gap-2"
              >
                Book Another Session
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* 5. Practice & Progress */}
          <section>
            <YourJourney
              variant="compact"
              title="Your Journey"
              streakValue={5}
              readings={24}
              reflections={12}
              rituals={8}
              nextMilestone={{
                title: "14 days",
                progress: 5,
                total: 14
              }}
            />
          </section>

          {/* 6. Saved Library */}
          <section>
            <BaseSectionHeader 
              title="Saved"
              subtitle="Your personal library of readings and tools"
              onViewAll={() => navigate("/profile/saved")}
            />
            <div className="mt-6 space-y-4">
              {/* Category Chips */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {Object.keys(savedLibrary).map((tab) => (
                  <CategoryChip
                    key={tab}
                    label={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab as keyof typeof savedLibrary)}
                  />
                ))}
              </div>

              {/* Saved Items Horizontal Scroll */}
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-0 pr-4">
                {savedLibrary[activeTab].map((item) => (
                  <div
                    key={item}
                    className="flex-shrink-0 w-[320px] h-[200px] flex apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-6"
                  >
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      {/* Subtle liquid glass highlight */}
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      
                      <div>
                        <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                          {activeTab}
                        </span>
                        
                        <h3 className="text-headline font-title font-medium text-foreground leading-tight mt-4">{item}</h3>
                        <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">Tap to view your saved content</p>
                      </div>
                      
                      {/* Bookmark icon instead of shimmer */}
                      <div className="absolute top-6 right-6">
                        <Bookmark className="w-5 h-5 text-accent fill-accent" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Membership */}
          <section>
            <div className="rounded-[12px] border border-accent/40 bg-gradient-to-r from-accent/25 via-accent/10 to-transparent p-5 shadow-elevated">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-title-3 font-title text-foreground">Membership</p>
                  <p className="text-footnote text-muted-foreground mt-2">
                    You're on the Free Plan — enjoy basic guidance anytime.
                  </p>
                </div>
                <Sparkles className="w-6 h-6 text-accent flex-shrink-0" />
              </div>
              <button
                onClick={() => navigate("/profile/subscription")}
                className="mt-4 w-full rounded-[10px] bg-white/90 text-accent px-4 py-3 text-subhead font-semibold hover:bg-white transition-all hover:shadow-lg"
              >
                Unlock Full Access
              </button>
            </div>
          </section>

          {/* 8. Account & Settings */}
          <section>
            <BaseSectionHeader 
              title="Account & Settings"
              subtitle="Manage your preferences and privacy"
            />
            <div className="mt-6 grid gap-3">
              {accountTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <BaseCard
                    key={tool.label}
                    variant="interactive"
                    onClick={() => navigate(tool.path)}
                    className="p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-[8px] bg-white/5">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="flex-1 text-body font-medium text-foreground">{tool.label}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </BaseCard>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
}
