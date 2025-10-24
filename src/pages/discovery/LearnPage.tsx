import { useState } from "react";
import { BookOpen, Star, Moon, Sun } from "lucide-react";
import { TabBar } from "@/components/navigation/TabBar";

const tabs = [
  { id: "spreads", label: "Spreads" },
  { id: "learn", label: "Learn" },
  { id: "unlocks", label: "Unlocks" },
];

const articles = [
  {
    id: "major-arcana",
    title: "Understanding the Major Arcana",
    description: "Deep dive into the 22 major arcana cards and their spiritual significance",
    category: "Tarot Basics",
    icon: Star,
    readTime: "8 min read",
  },
  {
    id: "moon-phases",
    title: "Moon Phases & Your Energy",
    description: "How lunar cycles influence your spiritual practice and daily life",
    category: "Astrology",
    icon: Moon,
    readTime: "6 min read",
  },
  {
    id: "daily-rituals",
    title: "Creating Sacred Morning Rituals",
    description: "Build a meaningful practice to start each day with intention",
    category: "Practice",
    icon: Sun,
    readTime: "5 min read",
  },
  {
    id: "numerology-basics",
    title: "Your Life Path Number",
    description: "Discover what your birth date reveals about your purpose",
    category: "Numerology",
    icon: Star,
    readTime: "7 min read",
  },
  {
    id: "intuition",
    title: "Developing Your Intuition",
    description: "Practical exercises to strengthen your inner guidance system",
    category: "Spiritual Growth",
    icon: Star,
    readTime: "10 min read",
  },
  {
    id: "card-spreads",
    title: "Creating Custom Spreads",
    description: "Design your own tarot spreads for specific questions",
    category: "Advanced",
    icon: Star,
    readTime: "12 min read",
  },
];

const LearnPage = () => {
  const [activeTab, setActiveTab] = useState("learn");

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="px-6 py-8 space-y-4">
        <h1 className="font-title text-4xl font-medium">Learn</h1>
        <p className="text-muted-foreground">
          Deepen your spiritual practice with guides and wisdom
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

      {/* Articles Grid */}
      <div className="flex-1 px-6 pb-24">
        <div className="grid gap-4">
          {articles.map(({ id, title, description, category, icon: Icon, readTime }) => (
            <button
              key={id}
              className="glass-card p-6 text-left hover:scale-[1.01] transition-all"
            >
              <div className="flex gap-4">
                <div className="p-3 rounded-2xl bg-muted flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-accent">
                      {category}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="glass-card p-8 text-center space-y-3 mt-6">
          <BookOpen className="w-8 h-8 text-accent mx-auto" />
          <h3 className="font-semibold">More wisdom coming soon</h3>
          <p className="text-sm text-muted-foreground">
            New articles and guides are added weekly
          </p>
        </div>
      </div>

      <TabBar />
    </div>
  );
};

export default LearnPage;
