import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { TarotPreReveal } from "@/components/home/TarotPreReveal";
import { TarotPostReveal } from "@/components/home/TarotPostReveal";
import { AstrologyInsights } from "@/components/home/AstrologyInsights";
import { NumerologyInsights } from "@/components/home/NumerologyInsights";
import { ReflectionSection } from "@/components/home/ReflectionSection";
import { DailyAffirmation } from "@/components/home/DailyAffirmation";
import { DailyAffirmationModal } from "@/components/home/DailyAffirmationModal";
import { ReflectionModal } from "@/components/home/ReflectionModal";
import { RevealTransition } from "@/components/home/RevealTransition";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";

// New components
import { TarotCardPreReveal } from "@/components/home/TarotCardPreReveal";
import { TarotCardFront } from "@/components/home/TarotCardFront";
import { HoroscopeBoxPreReveal } from "@/components/home/HoroscopeBoxPreReveal";
import { NumerologyBoxPreReveal } from "@/components/home/NumerologyBoxPreReveal";
import { RevealedInsightCard } from "@/components/home/RevealedInsightCard";
import { TarotOverflowModal } from "@/components/home/TarotOverflowModal";
import { HoroscopeOverflowModal } from "@/components/home/HoroscopeOverflowModal";
import { NumerologyOverflowModal } from "@/components/home/NumerologyOverflowModal";
import { TodaysRitual } from "@/components/home/TodaysRitual";
import { RitualOverflowModal } from "@/components/home/RitualOverflowModal";

// Utilities
import { getTodaysAffirmation, shuffleAffirmation, Affirmation } from "@/utils/dailyAffirmations";

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

interface Ritual {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  intention: string;
  steps: string[];
  affirmation?: string;
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
  ritual: {
    completed: boolean;
    ritual: Ritual | null;
  };
}

interface StoredInsightState {
  date: string;
  insights: InsightState;
}

const HomeOverview = () => {
  const navigate = useNavigate();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [reflection, setReflection] = useState<string>("");
  const [reflectionTimestamp, setReflectionTimestamp] = useState<Date | undefined>(undefined);
  const [showReflectionModal, setShowReflectionModal] = useState(false);

  // New insight state management
  const [insightStates, setInsightStates] = useState<InsightState>({
    tarot: { revealed: false, card: null },
    horoscope: { revealed: false, content: null },
    numerology: { revealed: false, content: null },
    ritual: { completed: false, ritual: null }
  });

  // Modal states
  const [showTarotModal, setShowTarotModal] = useState(false);
  const [showHoroscopeModal, setShowHoroscopeModal] = useState(false);
  const [showNumerologyModal, setShowNumerologyModal] = useState(false);
  const [showRitualModal, setShowRitualModal] = useState(false);
  const [showAffirmationModal, setShowAffirmationModal] = useState(false);

  // Daily Affirmation state
  const [affirmationState, setAffirmationState] = useState(() => getTodaysAffirmation());

  // Refresh affirmation state on day change
  useEffect(() => {
    const checkDayChange = () => {
      const current = getTodaysAffirmation();
      setAffirmationState(current);
    };

    // Check on mount
    checkDayChange();

    // Set up interval to check every minute (in case user leaves app open past midnight)
    const interval = setInterval(checkDayChange, 60000);

    return () => clearInterval(interval);
  }, []);

  // View toggle for post-reveal state
  const [showExpandedView, setShowExpandedView] = useState(false);

  // localStorage key for insights
  const INSIGHTS_STORAGE_KEY = 'aroti-daily-insights';

  // Select ritual of the day helper
  const getRitualOfTheDay = (): Ritual => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const rituals: Ritual[] = [
      {
        id: "1",
        title: "Grounding Breath",
        description: "A simple breathing practice to center yourself and reconnect with your body.",
        duration: "3 min",
        type: "Grounding",
        intention: "This ritual helps you ground your energy and reconnect with your body after a busy day.",
        steps: [
          "Find a quiet space and sit comfortably.",
          "Take three slow, deep breaths.",
          "Place your hand over your heart and set your intention.",
          "Repeat the affirmation silently three times."
        ],
        affirmation: "I am grounded, centered, and at peace."
      },
      {
        id: "2",
        title: "Morning Intention",
        description: "Set a meaningful intention for your day with this gentle morning practice.",
        duration: "5 min",
        type: "Intention",
        intention: "This ritual helps you start your day with clarity and purpose.",
        steps: [
          "Sit comfortably with your back straight.",
          "Take three deep breaths, inhaling through your nose and exhaling through your mouth.",
          "Bring to mind three things you're grateful for today.",
          "Ask yourself: 'What is one intention I want to set for today?'",
          "Visualize yourself embodying this intention throughout your day."
        ],
        affirmation: "I move through my day with intention and grace."
      },
      {
        id: "3",
        title: "Evening Gratitude",
        description: "End your day with gratitude and reflection.",
        duration: "4 min",
        type: "Gratitude",
        intention: "This ritual helps you reflect on your day and cultivate gratitude.",
        steps: [
          "Find a comfortable seated or lying position.",
          "Close your eyes and take five deep breaths.",
          "Think of three things from today you're grateful for.",
          "Allow yourself to feel the warmth of gratitude in your heart.",
          "Set an intention for restful sleep."
        ],
        affirmation: "I am grateful for all the blessings in my life."
      }
    ];
    return rituals[dayOfYear % rituals.length];
  };

  // Daily reset logic
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(INSIGHTS_STORAGE_KEY);
    
    if (stored) {
      try {
        const parsed: StoredInsightState = JSON.parse(stored);
        if (parsed.date === today) {
          // Same day, restore state
          // Ensure ritual is set if missing
          const restoredState = parsed.insights;
          if (!restoredState.ritual || !restoredState.ritual.ritual) {
            restoredState.ritual = {
              completed: restoredState.ritual?.completed || false,
              ritual: getRitualOfTheDay()
            };
          }
          setInsightStates(restoredState);
        } else {
          // Different day, reset and clear storage
          localStorage.removeItem(INSIGHTS_STORAGE_KEY);
          setInsightStates({
            tarot: { revealed: false, card: null },
            horoscope: { revealed: false, content: null },
            numerology: { revealed: false, content: null },
            ritual: { completed: false, ritual: getRitualOfTheDay() }
          });
        }
      } catch (error) {
        console.error('Error parsing stored insights:', error);
        localStorage.removeItem(INSIGHTS_STORAGE_KEY);
        setInsightStates({
          tarot: { revealed: false, card: null },
          horoscope: { revealed: false, content: null },
          numerology: { revealed: false, content: null },
          ritual: { completed: false, ritual: getRitualOfTheDay() }
        });
      }
    } else {
      // No stored data, initialize with today's ritual
      setInsightStates({
        tarot: { revealed: false, card: null },
        horoscope: { revealed: false, content: null },
        numerology: { revealed: false, content: null },
        ritual: { completed: false, ritual: getRitualOfTheDay() }
      });
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

  const handleBeginRitual = () => {
    setShowRitualModal(true);
  };

  const handleCompleteRitual = () => {
    setInsightStates(prev => ({
      ...prev,
      ritual: { ...prev.ritual, completed: true }
    }));
    // Update Journey streak if needed
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
    setReflectionTimestamp(new Date());
  };

  const handleCalendarClick = () => {
    navigate('/home/calendar');
  };

  // Daily Affirmation handlers
  const handleShuffleAffirmation = () => {
    const newAffirmation = shuffleAffirmation();
    if (newAffirmation) {
      setAffirmationState(prev => ({
        ...prev,
        affirmation: newAffirmation,
        shuffleCount: prev.shuffleCount + 1,
        canShuffle: prev.shuffleCount + 1 < 2
      }));
    }
  };

  const handleViewAffirmation = () => {
    setShowAffirmationModal(true);
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={true} className="home-tab-celestial">
      {/* Fixed Header */}
      <BaseHeader
        title="Today's Insights"
        className="[&_h1]:!text-[22px] [&_h1]:!font-medium [&_h1]:!tracking-normal [&_h1]:!leading-tight"
        rightActions={
          <button 
            onClick={handleCalendarClick}
            className="apple-touch-target-comfortable p-2 rounded-[16px] transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95"
            style={{ 
              color: 'hsl(var(--accent))',
              filter: 'drop-shadow(0 0 8px rgba(209, 122, 82, 0.4))'
            }}
            aria-label="Open calendar timeline"
          >
            <Calendar className="w-5 h-5" />
          </button>
        }
      />

      {/* Main content container with background */}
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-4">
        {/* Greeting and Daily Energy Summary */}
        <div className="px-6 pt-6 pb-4 space-y-2">
          {/* Greeting */}
          <h2 className="text-title-3 text-foreground font-normal">
            Hi {userData.name || "there"},
          </h2>
          
          {/* Daily Energy Summary */}
          <p className="text-subhead text-accent" style={{ opacity: 0.9 }}>
            {userData.sunSign && userData.traits?.length > 0 
              ? `Today your energy feels ${userData.traits[0]?.toLowerCase() || 'intuitive'} and ${userData.traits[1]?.toLowerCase() || 'grounded'} under ${userData.sunSign} skies.`
              : "Your energy today is shifting gently."
            }
          </p>
        </div>

        {/* Main Content - Apple HIG Visual Hierarchy */}
        <main className="px-4 pb-4 mt-4" role="main" aria-label="Daily insights content">
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

            {/* Today's Ritual - After Numerology */}
            <TodaysRitual
              ritual={insightStates.ritual.ritual}
              isCompleted={insightStates.ritual.completed}
              onBegin={handleBeginRitual}
            />
          </section>

          {/* Reflection Section */}
          <section className="mt-4" aria-labelledby="reflection-section">
            <h2 id="reflection-section" className="sr-only">Daily Reflection</h2>
            <ReflectionSection
              hasReflection={!!reflection}
              reflection={reflection}
              onAddReflection={handleAddReflection}
              reflectionTimestamp={reflectionTimestamp}
            />
          </section>

          {/* Daily Affirmation */}
          <section className="mt-4" aria-labelledby="daily-affirmation-section">
            <h2 id="daily-affirmation-section" className="sr-only">Daily Affirmation</h2>
            <DailyAffirmation
              affirmation={affirmationState.affirmation}
              shuffleCount={affirmationState.shuffleCount}
              canShuffle={affirmationState.canShuffle}
              onShuffle={handleShuffleAffirmation}
              onView={handleViewAffirmation}
            />
          </section>

          {/* Footer Message */}
          <div className="py-8 text-center">
            <p className="text-footnote text-muted-foreground opacity-60">
              Aroti is guiding you today.
            </p>
          </div>

        </main>
      </div>

      {/* Modals */}
      <ReflectionModal
        isOpen={showReflectionModal}
        onClose={() => setShowReflectionModal(false)}
        onSave={handleSaveReflection}
        initialReflection={reflection}
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

      {insightStates.ritual.ritual && (
        <RitualOverflowModal
          isOpen={showRitualModal}
          onClose={() => setShowRitualModal(false)}
          ritual={insightStates.ritual.ritual}
          isCompleted={insightStates.ritual.completed}
          onComplete={handleCompleteRitual}
        />
      )}

      {/* Daily Affirmation Modal */}
      <DailyAffirmationModal
        isOpen={showAffirmationModal}
        onClose={() => setShowAffirmationModal(false)}
        affirmation={affirmationState.affirmation}
      />
    </PageWrapper>
  );
};

export default HomeOverview;
