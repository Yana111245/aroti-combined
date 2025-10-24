import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Sun, Moon, ChevronRight, Star, Bookmark, MessageCircle, Calendar } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { SectionHeader } from "@/components/profile/SectionHeader";

export default function ProfileOverview() {
  const navigate = useNavigate();
  const [streak, setStreak] = useState(5);

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 max-w-[420px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gradient-accent flex items-center justify-center text-white text-2xl font-subtitle">
              A
            </div>
            <button className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-white shadow-md flex items-center justify-center">
              <span className="text-xs">✏️</span>
            </button>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Alexandra Moon</h2>
            <p className="text-sm text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/profile/settings")}
          className="rounded-full p-2 hover:bg-white/50 transition-colors"
        >
          <Settings className="h-6 w-6 text-foreground" />
        </button>
      </div>

      {/* Cosmic Snapshot */}
      <SoftCard className="mb-6 animate-raise">
        <div className="mb-4">
          <h3 className="font-subtitle text-lg font-semibold mb-1">Your Cosmic Snapshot</h3>
          <p className="text-xs text-muted-foreground">Updates as the sky moves</p>
        </div>
        <div className="flex items-center justify-around mb-4">
          <div className="text-center">
            <Sun className="h-8 w-8 mx-auto mb-2 text-accent-gold" />
            <p className="text-xs font-medium">Virgo</p>
            <p className="text-xs text-muted-foreground">Sun</p>
          </div>
          <div className="text-center">
            <Moon className="h-8 w-8 mx-auto mb-2 text-accent-gold" />
            <p className="text-xs font-medium">Pisces</p>
            <p className="text-xs text-muted-foreground">Moon</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-accent-gold" />
            <p className="text-xs font-medium">Leo</p>
            <p className="text-xs text-muted-foreground">Rising</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/profile/astrology")}
          className="w-full text-center text-sm font-medium text-accent-gold hover:opacity-80 transition-opacity flex items-center justify-center gap-1"
        >
          View Astrology Details
          <ChevronRight className="h-4 w-4" />
        </button>
      </SoftCard>

      {/* Life Path */}
      <SoftCard className="mb-6 animate-raise" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-subtitle text-lg font-semibold mb-1">Life Path 3</h3>
            <p className="text-sm text-muted-foreground">Connector • Creative</p>
          </div>
          <button
            onClick={() => navigate("/profile/numerology")}
            className="text-accent-gold hover:opacity-80 transition-opacity"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </SoftCard>

      {/* Practice & Streaks */}
      <SoftCard className="mb-6 animate-raise" style={{ animationDelay: "0.2s" }}>
        <h3 className="font-subtitle text-lg font-semibold mb-4">Practice & Streaks</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Reflection Streak</span>
            <span className="font-semibold text-accent-gold">{streak} days 🔥</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Reading</span>
            <span className="font-medium text-sm">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Stars Earned</span>
            <span className="font-medium text-sm">127 ⭐</span>
          </div>
        </div>
      </SoftCard>

      {/* Saved Content */}
      <div className="mb-6 animate-raise" style={{ animationDelay: "0.3s" }}>
        <SectionHeader title="Saved" onViewAll={() => navigate("/profile/saved")} />
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {[1, 2, 3].map((i) => (
            <SoftCard key={i} className="min-w-[140px] p-4">
              <Bookmark className="h-6 w-6 text-accent-gold mb-2" />
              <p className="text-sm font-medium line-clamp-2">Celtic Cross Spread</p>
            </SoftCard>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6 animate-raise" style={{ animationDelay: "0.4s" }}>
        <SoftCard onClick={() => navigate("/profile/messages")} className="p-5">
          <MessageCircle className="h-6 w-6 text-accent-gold mb-2" />
          <p className="text-sm font-medium mb-1">Messages</p>
          <p className="text-xs text-muted-foreground">2 unread</p>
        </SoftCard>
        <SoftCard onClick={() => navigate("/profile/sessions")} className="p-5">
          <Calendar className="h-6 w-6 text-accent-gold mb-2" />
          <p className="text-sm font-medium mb-1">Sessions</p>
          <p className="text-xs text-muted-foreground">Next: Tomorrow</p>
        </SoftCard>
      </div>

      {/* Subscription */}
      <SoftCard className="mb-6 animate-raise" style={{ animationDelay: "0.5s" }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-subtitle text-lg font-semibold">Free Plan</h3>
            <p className="text-xs text-muted-foreground mt-1">Limited access</p>
          </div>
          <span className="text-2xl">✨</span>
        </div>
        <GradientButton onClick={() => navigate("/profile/subscription")} className="w-full">
          Upgrade to Premium
        </GradientButton>
      </SoftCard>
    </div>
  );
}
