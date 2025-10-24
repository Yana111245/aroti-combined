import { useState } from "react";
import { Trophy, Lock, CheckCircle2, Star } from "lucide-react";
import { TabBar } from "@/components/navigation/TabBar";

const tabs = [
  { id: "spreads", label: "Spreads" },
  { id: "learn", label: "Learn" },
  { id: "unlocks", label: "Unlocks" },
];

const milestones = [
  {
    id: "first-reading",
    title: "First Reading",
    description: "Complete your first daily card reading",
    reward: "✨ Beginner Badge",
    completed: true,
  },
  {
    id: "week-streak",
    title: "7-Day Streak",
    description: "Read your cards for 7 consecutive days",
    reward: "🌙 Lunar Badge",
    completed: true,
    progress: 7,
    total: 7,
  },
  {
    id: "month-streak",
    title: "30-Day Journey",
    description: "Maintain a 30-day reading practice",
    reward: "⭐ Star Keeper Badge",
    completed: false,
    progress: 12,
    total: 30,
  },
  {
    id: "all-spreads",
    title: "Spread Explorer",
    description: "Try all available tarot spreads",
    reward: "🎴 Master Reader Badge",
    completed: false,
    progress: 2,
    total: 8,
  },
  {
    id: "journal-master",
    title: "Reflection Master",
    description: "Write 50 journal reflections",
    reward: "📖 Wisdom Keeper Badge",
    completed: false,
    progress: 23,
    total: 50,
  },
  {
    id: "specialist-session",
    title: "Human Connection",
    description: "Book your first session with a specialist",
    reward: "👥 Seeker Badge",
    completed: false,
    locked: true,
  },
];

const UnlocksPage = () => {
  const [activeTab, setActiveTab] = useState("unlocks");
  
  const completedCount = milestones.filter(m => m.completed).length;
  const totalProgress = (completedCount / milestones.length) * 100;

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="px-6 py-8 space-y-4">
        <h1 className="font-title text-4xl font-medium">Your Journey</h1>
        <p className="text-muted-foreground">
          Track milestones and unlock rewards as you grow
        </p>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="flex gap-8 border-b border-border relative">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`pb-4 text-sm font-medium transition-colors relative ${
                activeTab === id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
              {activeTab === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent animate-scale-in" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="px-6 mb-6">
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-secondary to-primary">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Overall Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {completedCount} of {milestones.length} milestones
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-accent">
                {Math.round(totalProgress)}%
              </p>
            </div>
          </div>
          
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="flex-1 px-6 pb-24 space-y-3">
        {milestones.map(({ id, title, description, reward, completed, progress, total, locked }) => (
          <div
            key={id}
            className={`glass-card p-6 ${
              locked ? "opacity-60" : ""
            }`}
          >
            <div className="flex gap-4">
              <div className={`p-3 rounded-2xl flex-shrink-0 ${
                completed
                  ? "bg-gradient-to-br from-secondary to-primary"
                  : locked
                  ? "bg-muted"
                  : "bg-muted"
              }`}>
                {completed ? (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                ) : locked ? (
                  <Lock className="w-6 h-6 text-muted-foreground" />
                ) : (
                  <Star className="w-6 h-6 text-accent" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {description}
                </p>
                
                {!locked && progress !== undefined && total !== undefined && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">
                        {progress} / {total}
                      </span>
                      <span className="text-accent font-medium">
                        {Math.round((progress / total) * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-500"
                        style={{ width: `${(progress / total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                  completed
                    ? "bg-accent/10 text-accent"
                    : "bg-muted text-muted-foreground"
                }`}>
                  <span>{reward}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <TabBar />
    </div>
  );
};

export default UnlocksPage;
