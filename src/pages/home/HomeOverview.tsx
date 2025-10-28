import { useState, useEffect } from "react";
import { DaySelector } from "@/components/home/DaySelector";
import { TarotPreReveal } from "@/components/home/TarotPreReveal";
import { TarotPostReveal } from "@/components/home/TarotPostReveal";
import { AstrologyInsights } from "@/components/home/AstrologyInsights";
import { NumerologyInsights } from "@/components/home/NumerologyInsights";
import { ReflectionSection } from "@/components/home/ReflectionSection";
import { DailyAffirmation } from "@/components/home/DailyAffirmation";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { ReflectionModal } from "@/components/home/ReflectionModal";
import { CalendarModal } from "@/components/home/CalendarModal";
import { RevealTransition } from "@/components/home/RevealTransition";
import { PageWrapper } from "@/components/layout/PageWrapper";

// New components
import { TarotCardPreReveal } from "@/components/home/TarotCardPreReveal";
import { TarotCardFront } from "@/components/home/TarotCardFront";
import { HoroscopeBoxPreReveal } from "@/components/home/HoroscopeBoxPreReveal";
import { NumerologyBoxPreReveal } from "@/components/home/NumerologyBoxPreReveal";
import { RevealedInsightCard } from "@/components/home/RevealedInsightCard";
import { TarotOverflowModal } from "@/components/home/TarotOverflowModal";
import { HoroscopeOverflowModal } from "@/components/home/HoroscopeOverflowModal";
import { NumerologyOverflowModal } from "@/components/home/NumerologyOverflowModal";

import tarotMoon from "@/assets/tarot-moon.jpg";
import tarotFool from "@/assets/tarot-fool.png";
import tarotStar from "@/assets/tarot-star.jpg";
import tarotSun from "@/assets/tarot-sun.jpg";
import learnAstrology from "@/assets/learn-astrology.jpg";
import learnMeditation from "@/assets/learn-meditation.jpg";

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
        image: tarotFool,
      },
      {
        id: "3",
        title: "Celtic Cross",
        type: "Spread",
        image: tarotStar,
      },
      {
        id: "4",
        title: "Past Present Future",
        type: "Spread",
        image: tarotSun,
      },
      {
        id: "5",
        title: "Astrology Basics",
        type: "Learn",
        image: learnAstrology,
      },
      {
        id: "6",
        title: "Meditation Guide",
        type: "Learn",
        image: learnMeditation,
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

  const dailyAffirmation = "Every phase of your journey is an opportunity for growth and transformation.";

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
        <div className="px-4 pt-8 pb-4 text-center space-y-1">
          {/* Navigation Context - Apple Style */}
          <nav aria-label="Daily insights navigation">
            <p className="text-callout text-muted-foreground">
              Hi {userData.name}, it's {getCurrentDate()}
            </p>
          </nav>

          {/* Main Title - Apple Large Title */}
          <header className="mt-2">
            <h1 className="text-large-title text-foreground font-normal">
              Today's Insights
            </h1>
          </header>

          {/* Subtitle - Apple Subhead */}
          <div className="mt-2">
            <p className="text-subhead text-accent truncate">
              Under {userData.sunSign} skies • Energy Number {userData.energyNumber}
            </p>
          </div>
        </div>

        {/* Main Content - Apple HIG Visual Hierarchy */}
        <main className="px-4 pb-24 mt-4" role="main" aria-label="Daily insights content">
          <section className="space-y-4" aria-labelledby="daily-insights-section">
            <h2 id="daily-insights-section" className="sr-only">Daily Insights</h2>
            
            {/* Tarot Card - Show revealed or pre-reveal */}
            {insightStates.tarot.revealed && insightStates.tarot.card ? (
              <div 
                className="liquid-glass-card p-4 space-y-3 cursor-pointer min-h-[240px]" 
                onClick={() => handleViewInsight('tarot')}
                role="button"
                tabIndex={0}
                aria-label={`View ${insightStates.tarot.card.name} tarot card details`}
                aria-describedby="tarot-card-description"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleViewInsight('tarot');
                  }
                }}
              >
                <div className="text-center space-y-3">
                  <div className="relative mx-auto" style={{ width: '72%', aspectRatio: '3/5' }}>
                    <TarotCardFront 
                      name={insightStates.tarot.card.name}
                      keywords={insightStates.tarot.card.keywords}
                    />
                  </div>
                  <h3 className="text-headline text-foreground">{insightStates.tarot.card.name}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {insightStates.tarot.card.keywords.map((keyword, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div id="tarot-card-description" className="sr-only">
                  Tarot card {insightStates.tarot.card.name} with keywords: {insightStates.tarot.card.keywords.join(', ')}
                </div>
              </div>
            ) : (
              <TarotCardPreReveal onReveal={() => handleRevealInsight('tarot')} />
            )}
            
            {/* Horoscope & Numerology - Stacked vertically */}
            <div className="space-y-4">
              {/* Horoscope - Show revealed or pre-reveal */}
              {insightStates.horoscope.revealed && insightStates.horoscope.content ? (
                <RevealedInsightCard
                  type="horoscope"
                  title="Daily Horoscope"
                  icon={<span className="text-lg">♓</span>}
                  preview={insightStates.horoscope.content.preview}
                  onView={() => handleViewInsight('horoscope')}
                  image={learnAstrology}
                />
              ) : (
                <HoroscopeBoxPreReveal 
                  onReveal={() => handleRevealInsight('horoscope')} 
                  image={learnAstrology}
                />
              )}
              
              {/* Numerology - Show revealed or pre-reveal */}
              {insightStates.numerology.revealed && insightStates.numerology.content ? (
                <RevealedInsightCard
                  type="numerology"
                  title="Numerology"
                  icon={<span className="font-bold text-lg">{insightStates.numerology.content.energyNumber}</span>}
                  preview={insightStates.numerology.content.preview}
                  onView={() => handleViewInsight('numerology')}
                  image={learnMeditation}
                />
              ) : (
                <NumerologyBoxPreReveal 
                  onReveal={() => handleRevealInsight('numerology')} 
                  image={learnMeditation}
                />
              )}
            </div>
          </section>

          {/* Daily Affirmation - Full Width */}
          <section className="mt-12" aria-labelledby="daily-affirmation-section">
            <h2 id="daily-affirmation-section" className="sr-only">Daily Affirmation</h2>
            <DailyAffirmation quote={dailyAffirmation} />
          </section>

          {/* Reflection Section */}
          <section className="mt-8" aria-labelledby="reflection-section">
            <h2 id="reflection-section" className="sr-only">Daily Reflection</h2>
            <ReflectionSection
              hasReflection={!!reflection}
              reflection={reflection}
              onAddReflection={handleAddReflection}
            />
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
