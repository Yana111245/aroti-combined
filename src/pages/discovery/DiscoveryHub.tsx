import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, BookOpen, Trophy, ChevronRight } from "lucide-react";
import { TabBar } from "@/components/navigation/TabBar";

const tabs = [
  { id: "spreads", label: "Spreads" },
  { id: "learn", label: "Learn" },
  { id: "unlocks", label: "Unlocks" },
];

const spreads = [
  {
    id: "three-card",
    title: "Three Card Spread",
    description: "Past, Present, Future",
    cards: 3,
    icon: Sparkles,
  },
  {
    id: "celtic-cross",
    title: "Celtic Cross",
    description: "Comprehensive life reading",
    cards: 10,
    icon: Sparkles,
  },
  {
    id: "relationship",
    title: "Relationship Spread",
    description: "Insights into connections",
    cards: 5,
    icon: Sparkles,
  },
];

const DiscoveryHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("spreads");

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="px-6 py-8 space-y-4">
        <h1 className="font-serif text-4xl">Discover</h1>
        <p className="text-muted-foreground">
          Explore readings, wisdom, and your spiritual journey
        </p>
      </div>

      {/* Tabs with underline animation */}
      <div className="px-6 mb-6">
        <div className="flex gap-8 border-b border-border relative">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                if (id === "learn") navigate("/discovery/learn");
                if (id === "unlocks") navigate("/discovery/unlocks");
              }}
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

      {/* Spreads Content */}
      <div className="flex-1 px-6 pb-24 space-y-4">
        <div className="space-y-3">
          {spreads.map(({ id, title, description, cards, icon: Icon }) => (
            <button
              key={id}
              className="glass-card w-full p-6 text-left hover:scale-[1.01] transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-secondary to-primary">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {description}
                  </p>
                  <span className="text-xs text-accent font-medium">
                    {cards} cards
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        {/* Featured Section */}
        <div className="glass-card p-6 space-y-4 mt-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Featured Wisdom</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            New to tarot? Start with our beginner&apos;s guide to understand the major arcana and their meanings.
          </p>
          <button
            onClick={() => navigate("/discovery/learn")}
            className="text-sm text-accent font-medium hover:underline"
          >
            Explore Learning →
          </button>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default DiscoveryHub;
