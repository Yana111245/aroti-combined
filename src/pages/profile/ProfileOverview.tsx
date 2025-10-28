import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Sun, Moon, ChevronRight, Star, Bookmark, MessageCircle, Calendar } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { SectionHeader } from "@/components/profile/SectionHeader";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function ProfileOverview() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(5);

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <BaseHeader 
        title="Profile"
        subtitle="Your cosmic journey and personal insights"
        rightActions={
          <button
            onClick={() => navigate("/profile/settings")}
            className="apple-touch-target-comfortable p-2 rounded-[16px] transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            aria-label="Open settings"
          >
            <Settings className="h-6 w-6" />
          </button>
        }
      />

      {/* Main Content */}
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 pb-24 mt-4" role="main" aria-label="Profile content">
          <section className="space-y-6" aria-labelledby="profile-content">
            <h2 id="profile-content" className="sr-only">Profile Content</h2>

            {/* Profile Header */}
            <div className="flex items-center gap-4 animate-fade-in">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-gradient-accent flex items-center justify-center text-white text-title-2 font-title">
                  A
                </div>
                <button className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-white shadow-md flex items-center justify-center">
                  <span className="text-footnote">✏️</span>
                </button>
              </div>
              <div>
                <h2 className="font-semibold text-headline text-foreground">Alexandra Moon</h2>
                <p className="text-body text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>

            {/* Cosmic Snapshot */}
            <BaseCard className="animate-fade-in">
              <div className="mb-4">
                <h3 className="font-title text-title-3 font-semibold mb-1 text-foreground">Your Cosmic Snapshot</h3>
                <p className="text-footnote text-muted-foreground">Updates as the sky moves</p>
              </div>
              <div className="flex items-center justify-around mb-4">
                <div className="text-center">
                  <Sun className="h-8 w-8 mx-auto mb-2 text-accent-gold" />
                  <p className="text-footnote font-medium text-foreground">Virgo</p>
                  <p className="text-footnote text-muted-foreground">Sun</p>
                </div>
                <div className="text-center">
                  <Moon className="h-8 w-8 mx-auto mb-2 text-accent-gold" />
                  <p className="text-footnote font-medium text-foreground">Pisces</p>
                  <p className="text-footnote text-muted-foreground">Moon</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-accent-gold" />
                  <p className="text-footnote font-medium text-foreground">Leo</p>
                  <p className="text-footnote text-muted-foreground">Rising</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/profile/astrology")}
                className="w-full text-center text-body font-medium text-accent-gold hover:opacity-80 transition-opacity flex items-center justify-center gap-1"
              >
                View Astrology Details
                <ChevronRight className="h-4 w-4" />
              </button>
            </BaseCard>

            {/* Life Path */}
            <BaseCard className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-title text-title-3 font-semibold mb-1 text-foreground">Life Path 3</h3>
                  <p className="text-body text-muted-foreground">Connector • Creative</p>
                </div>
                <button
                  onClick={() => navigate("/profile/numerology")}
                  className="text-accent-gold hover:opacity-80 transition-opacity"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </BaseCard>

            {/* Practice & Streaks */}
            <BaseCard className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="font-title text-title-3 font-semibold mb-4 text-foreground">Practice & Streaks</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-body text-muted-foreground">Reflection Streak</span>
                  <span className="font-semibold text-accent-gold">{streak} days 🔥</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body text-muted-foreground">Last Reading</span>
                  <span className="font-medium text-body text-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body text-muted-foreground">Stars Earned</span>
                  <span className="font-medium text-body text-foreground">127 ⭐</span>
                </div>
              </div>
            </BaseCard>

            {/* Saved Content */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <SectionHeader title="Saved" onViewAll={() => navigate("/profile/saved")} />
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {[1, 2, 3].map((i) => (
                  <BaseCard key={i} variant="interactive" className="min-w-[140px] p-4">
                    <Bookmark className="h-6 w-6 text-accent-gold mb-2" />
                    <p className="text-body font-medium line-clamp-1 text-foreground">Celtic Cross Spread</p>
                  </BaseCard>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <BaseCard variant="interactive" onClick={() => navigate("/profile/messages")} className="p-5">
                <MessageCircle className="h-6 w-6 text-accent-gold mb-2" />
                <p className="text-body font-medium mb-1 text-foreground">Messages</p>
                <p className="text-footnote text-muted-foreground">2 unread</p>
              </BaseCard>
              <BaseCard variant="interactive" onClick={() => navigate("/profile/sessions")} className="p-5">
                <Calendar className="h-6 w-6 text-accent-gold mb-2" />
                <p className="text-body font-medium mb-1 text-foreground">Sessions</p>
                <p className="text-footnote text-muted-foreground">Next: Tomorrow</p>
              </BaseCard>
            </div>

            {/* Subscription */}
            <BaseCard className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-title text-title-3 font-semibold text-foreground">Free Plan</h3>
                  <p className="text-footnote text-muted-foreground mt-1">Limited access</p>
                </div>
                <span className="text-title-2">✨</span>
              </div>
              <GradientButton onClick={() => navigate("/profile/subscription")} className="w-full">
                Upgrade to Premium
              </GradientButton>
            </BaseCard>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
}
