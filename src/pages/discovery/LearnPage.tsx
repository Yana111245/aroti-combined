import { useState } from "react";
import { BookOpen, Star, Moon, Sun } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";

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
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader title="Learn" subtitle="Deepen your spiritual practice with guides and wisdom" />
      
      {/* Main Content */}
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 pb-24 mt-4" role="main" aria-label="Learn content">
          <section className="space-y-6" aria-labelledby="learn-content">
            <h2 id="learn-content" className="sr-only">Learn Content</h2>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-border relative">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`pb-4 text-subhead font-medium transition-colors relative ${
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

            {/* Articles Grid */}
            <div className="grid gap-4">
              {articles.map(({ id, title, description, category, icon: Icon, readTime }) => (
                <button
                  key={id}
                  className="liquid-glass-card p-6 text-left hover:scale-[1.01] transition-all"
                >
                  <div className="flex gap-4">
                    <div className="p-3 rounded-2xl bg-muted flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-footnote font-medium text-accent">
                          {category}
                        </span>
                        <span className="text-footnote text-muted-foreground">•</span>
                        <span className="text-footnote text-muted-foreground">
                          {readTime}
                        </span>
                      </div>
                      <h3 className="font-semibold text-headline mb-2">{title}</h3>
                      <p className="text-body text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="liquid-glass-card p-8 text-center space-y-3 mt-6">
              <BookOpen className="w-8 h-8 text-accent mx-auto" />
              <h3 className="font-semibold text-headline">More wisdom coming soon</h3>
              <p className="text-body text-muted-foreground">
                New articles and guides are added weekly
              </p>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
};

export default LearnPage;
