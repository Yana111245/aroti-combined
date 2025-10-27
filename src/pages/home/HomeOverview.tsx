import { useState, useEffect } from "react";
import { DaySelector } from "@/components/home/DaySelector";
import { TarotPreReveal } from "@/components/home/TarotPreReveal";
import { TarotPostReveal } from "@/components/home/TarotPostReveal";
import { AstrologyInsights } from "@/components/home/AstrologyInsights";
import { NumerologyInsights } from "@/components/home/NumerologyInsights";
import { ReflectionSection } from "@/components/home/ReflectionSection";
import { DailyQuote } from "@/components/home/DailyQuote";
import { JourneyProgress } from "@/components/home/JourneyProgress";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { ReflectionModal } from "@/components/home/ReflectionModal";
import { CalendarModal } from "@/components/home/CalendarModal";
import { RevealTransition } from "@/components/home/RevealTransition";
import { PageWrapper } from "@/components/layout/PageWrapper";

// New components
import { TarotCardPreReveal } from "@/components/home/TarotCardPreReveal";
import { HoroscopeBoxPreReveal } from "@/components/home/HoroscopeBoxPreReveal";
import { NumerologyBoxPreReveal } from "@/components/home/NumerologyBoxPreReveal";
import { RevealedInsightCard } from "@/components/home/RevealedInsightCard";
import { TarotOverflowModal } from "@/components/home/TarotOverflowModal";
import { HoroscopeOverflowModal } from "@/components/home/HoroscopeOverflowModal";
import { NumerologyOverflowModal } from "@/components/home/NumerologyOverflowModal";

import tarotMoon from "@/assets/tarot-moon.jpg";

// TypeScript interfaces for insight states
interface TarotCard {
  name: string;
  keywords: string[];
  interpretation: string;
  guidance: string[];
  image: string;
}

interface HoroscopeContent {
  sign: string;
  forecast: string;
  advice: string;
  preview: string;
}

interface NumerologyContent {
  energyNumber: number;
  traits: string[];
  guidance: string;
  preview: string;
}

interface InsightState {
  tarot: {
    revealed: boolean;
    card: TarotCard | null;
  };
  horoscope: {
    revealed: boolean;
    content: HoroscopeContent | null;
  };
  numerology: {
    revealed: boolean;
    content: NumerologyContent | null;
  };
}

interface StoredInsightState {
  date: string;
  insights: InsightState;
}

const HomeOverview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [reflection, setReflection] = useState<string>("");
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // New insight state management
  const [insightStates, setInsightStates] = useState<InsightState>({
    tarot: { revealed: false, card: null },
    horoscope: { revealed: false, content: null },
    numerology: { revealed: false, content: null }
  });

  // Modal states
  const [showTarotModal, setShowTarotModal] = useState(false);
  const [showHoroscopeModal, setShowHoroscopeModal] = useState(false);
  const [showNumerologyModal, setShowNumerologyModal] = useState(false);

  // View toggle for post-reveal state
  const [showExpandedView, setShowExpandedView] = useState(false);

  // localStorage key for insights
  const INSIGHTS_STORAGE_KEY = 'aroti-daily-insights';

  // Daily reset logic
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(INSIGHTS_STORAGE_KEY);
    
    if (stored) {
      try {
        const parsed: StoredInsightState = JSON.parse(stored);
        if (parsed.date === today) {
          // Same day, restore state
          setInsightStates(parsed.insights);
        } else {
          // Different day, reset and clear storage
          localStorage.removeItem(INSIGHTS_STORAGE_KEY);
          setInsightStates({
            tarot: { revealed: false, card: null },
            horoscope: { revealed: false, content: null },
            numerology: { revealed: false, content: null }
          });
        }
      } catch (error) {
        console.error('Error parsing stored insights:', error);
        localStorage.removeItem(INSIGHTS_STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage whenever insight states change
  useEffect(() => {
    const today = new Date().toDateString();
    const stateToStore: StoredInsightState = {
      date: today,
      insights: insightStates
    };
    localStorage.setItem(INSIGHTS_STORAGE_KEY, JSON.stringify(stateToStore));
  }, [insightStates]);

  // Computed values - removed allInsightsRevealed since we now show individual revealed states

  // Mock data - replace with real data
  const userData = {
    name: "Yana",
    sunSign: "Pisces",
    moonSign: "Cancer",
    mercuryState: "Mercury Retrograde",
    energyNumber: 7,
    traits: ["Intuitive", "Spiritual"],
    streak: 12,
    milestones: [
      { id: "1", title: "First Reading", completed: true },
      { id: "2", title: "7-Day Streak", completed: true },
      { id: "3", title: "30-Day Journey", completed: false },
    ],
    recentlyViewed: [
      {
        id: "1",
        title: "Moon Guidance",
        type: "Spread",
        image: tarotMoon,
      },
      {
        id: "2",
        title: "The Fool",
        type: "Card",
        image: tarotMoon,
      },
      {
        id: "3",
        title: "Celtic Cross",
        type: "Spread",
        image: tarotMoon,
      },
      {
        id: "4",
        title: "Past Present Future",
        type: "Spread",
        image: tarotMoon,
      },
      {
        id: "5",
        title: "The Lovers",
        type: "Card",
        image: tarotMoon,
      },
      {
        id: "6",
        title: "Daily Reading",
        type: "Spread",
        image: tarotMoon,
      },
    ],
  };

  const tarotCard: TarotCard = {
    name: "The Fool",
    keywords: ["New beginnings", "Innocence", "Adventure"],
    interpretation: "The Fool represents the beginning of a new journey, filled with potential and possibility. This card encourages you to embrace the unknown with an open heart and trust in the universe's guidance.",
    guidance: [
      "Take a leap of faith today",
      "Trust your intuition completely",
      "Embrace new opportunities",
      "Stay open to unexpected possibilities",
    ],
    image: tarotMoon,
  };

  const horoscopeContent: HoroscopeContent = {
    sign: "Pisces",
    forecast: "Your intuitive nature is heightened today, making it an excellent time for spiritual practices and trusting your inner guidance. The cosmic energies are aligning to support your creative endeavors.",
    advice: "Focus on meditation and connecting with your higher self. Your spiritual energy is particularly strong today.",
    preview: "Intuitive nature heightened, spiritual practices recommended"
  };

  const numerologyContent: NumerologyContent = {
    energyNumber: 7,
    traits: ["Intuitive", "Spiritual", "Analytical"],
    guidance: "Your spiritual energy is particularly strong today. Focus on meditation and connecting with your higher self.",
    preview: "Energy number 7 - spiritual focus and introspection"
  };

  const dailyQuote = "Every phase of your journey is an opportunity for growth and transformation.";

  // Handler functions for new insight system
  const handleRevealInsight = (type: 'tarot' | 'horoscope' | 'numerology') => {
    setInsightStates(prev => ({
      ...prev,
      [type]: {
        revealed: true,
        card: type === 'tarot' ? tarotCard : null,
        content: type === 'horoscope' ? horoscopeContent : type === 'numerology' ? numerologyContent : null
      }
    }));

    // Open corresponding modal
    switch (type) {
      case 'tarot':
        setShowTarotModal(true);
        break;
      case 'horoscope':
        setShowHoroscopeModal(true);
        break;
      case 'numerology':
        setShowNumerologyModal(true);
        break;
    }
  };

  const handleViewInsight = (type: 'tarot' | 'horoscope' | 'numerology') => {
    switch (type) {
      case 'tarot':
        setShowTarotModal(true);
        break;
      case 'horoscope':
        setShowHoroscopeModal(true);
        break;
      case 'numerology':
        setShowNumerologyModal(true);
        break;
    }
  };

  // Legacy handler for backward compatibility
  const handleReveal = () => {
    setIsRevealing(true);
    // Longer reveal animation for dramatic effect
    setTimeout(() => {
      setIsRevealed(true);
      setIsRevealing(false);
    }, 1000);
  };

  const handleAddReflection = () => {
    setShowReflectionModal(true);
  };

  const handleSaveReflection = (newReflection: string) => {
    setReflection(newReflection);
  };

  const handleCalendarClick = () => {
    setShowCalendarModal(true);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // Reset reveal state when changing dates
    setIsRevealed(false);
    setIsRevealing(false);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Reset reveal state when changing dates
    setIsRevealed(false);
    setIsRevealing(false);
  };

  const getCurrentDate = () => {
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={true} className="home-tab-celestial">
      {/* Day Selector - Fixed at top */}
      <div className="home-tab-celestial fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)]">
        <DaySelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onCalendarClick={handleCalendarClick}
        />
      </div>

      {/* Main content container with background */}
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        {/* Header Section - Apple HIG Navigation Pattern */}
        <div className="px-6 pt-1 pb-4 text-center space-y-0.5">
          {/* Navigation Context - Apple Style */}
          <nav aria-label="Daily insights navigation">
            <p className="text-callout text-[hsl(230,10%,68%)]">
              Hi {userData.name}, it's {getCurrentDate()}
            </p>
          </nav>

          {/* Main Title - Apple Large Title */}
          <header className="mt-1">
            <h1 className="text-large-title text-[hsl(230,8%,96%)] leading-tight">
              Today's Insights
            </h1>
          </header>

          {/* Subtitle - Apple Subhead */}
          <div className="mt-1.5">
            <p className="text-subhead text-[hsl(20,55%,58%)] truncate">
              Under {userData.sunSign} skies • Energy Number {userData.energyNumber}
            </p>
          </div>
        </div>

        {/* Main Content - Apple HIG Visual Hierarchy */}
        <main className="px-6 pb-24 mt-3" role="main" aria-label="Daily insights content">
          <section className="space-y-3" aria-labelledby="daily-insights-section">
            <h2 id="daily-insights-section" className="sr-only">Daily Insights</h2>
            
            {/* Tarot Card - Show revealed or pre-reveal */}
            {insightStates.tarot.revealed && insightStates.tarot.card ? (
              <div className="liquid-glass-card p-3 space-y-2.5 cursor-pointer min-h-[240px]" onClick={() => handleViewInsight('tarot')}>
                <div className="text-center space-y-2.5">
                  <div className="relative mx-auto" style={{ width: '72%', aspectRatio: '3/5' }}>
                    <img 
                      src={insightStates.tarot.card.image} 
                      alt={insightStates.tarot.card.name}
                      className="w-full h-full object-cover rounded-[12px] breathing-glow"
                    />
                  </div>
                  <h3 className="text-headline text-foreground">{insightStates.tarot.card.name}</h3>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {insightStates.tarot.card.keywords.map((keyword, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 bg-accent/20 text-accent text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <TarotCardPreReveal onReveal={() => handleRevealInsight('tarot')} />
            )}
            
            {/* Horoscope & Numerology - Side by side */}
            <div className="grid grid-cols-2 gap-3">
              {/* Horoscope - Show revealed or pre-reveal */}
              {insightStates.horoscope.revealed && insightStates.horoscope.content ? (
                <RevealedInsightCard
                  type="horoscope"
                  title="Daily Horoscope"
                  icon={<span className="text-lg">♓</span>}
                  preview={insightStates.horoscope.content.preview}
                  onView={() => handleViewInsight('horoscope')}
                />
              ) : (
                <HoroscopeBoxPreReveal onReveal={() => handleRevealInsight('horoscope')} />
              )}
              
              {/* Numerology - Show revealed or pre-reveal */}
              {insightStates.numerology.revealed && insightStates.numerology.content ? (
                <RevealedInsightCard
                  type="numerology"
                  title="Numerology"
                  icon={<span className="font-bold text-lg">{insightStates.numerology.content.energyNumber}</span>}
                  preview={insightStates.numerology.content.preview}
                  onView={() => handleViewInsight('numerology')}
                />
              ) : (
                <NumerologyBoxPreReveal onReveal={() => handleRevealInsight('numerology')} />
              )}
            </div>
          </section>

          {/* Additional Content */}
          <section className="mt-12 space-y-6" aria-labelledby="daily-wisdom-section">
            <h2 id="daily-wisdom-section" className="sr-only">Daily Wisdom & Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DailyQuote quote={dailyQuote} />
              <JourneyProgress
                streak={userData.streak}
                milestones={userData.milestones}
              />
            </div>
          </section>

          {/* Supporting Content - Minimal Visual Weight */}
          <section className="mt-12 space-y-6" aria-labelledby="recently-viewed-section">
            <div className="apple-material-section-header">
              <h2 id="recently-viewed-section" className="text-headline text-foreground">Recently Viewed</h2>
            </div>
            <RecentlyViewed items={userData.recentlyViewed} />
          </section>
        </main>
      </div>

      {/* Modals */}
      <ReflectionModal
        isOpen={showReflectionModal}
        onClose={() => setShowReflectionModal(false)}
        onSave={handleSaveReflection}
        initialReflection={reflection}
      />

      <CalendarModal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        onDateSelect={handleDateSelect}
        selectedDate={selectedDate}
      />

      {/* New Insight Modals */}
      {insightStates.tarot.card && (
        <TarotOverflowModal
          isOpen={showTarotModal}
          onClose={() => setShowTarotModal(false)}
          card={insightStates.tarot.card}
        />
      )}

      {insightStates.horoscope.content && (
        <HoroscopeOverflowModal
          isOpen={showHoroscopeModal}
          onClose={() => setShowHoroscopeModal(false)}
          content={insightStates.horoscope.content}
        />
      )}

      {insightStates.numerology.content && (
        <NumerologyOverflowModal
          isOpen={showNumerologyModal}
          onClose={() => setShowNumerologyModal(false)}
          content={insightStates.numerology.content}
        />
      )}
    </PageWrapper>
  );
};

export default HomeOverview;
