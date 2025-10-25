import { useState } from "react";
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
import tarotMoon from "@/assets/tarot-moon.jpg";

const HomeOverview = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [reflection, setReflection] = useState<string>("");
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

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

  const tarotCard = {
    name: "The Fool",
    keywords: ["New beginnings", "Innocence", "Adventure"],
    interpretation: "The Fool represents the beginning of a new journey, filled with potential and possibility. This card encourages you to embrace the unknown with an open heart and trust in the universe's guidance.",
    guidance: [
      "Take a leap of faith today",
      "Trust your intuition completely",
      "Embrace new opportunities",
      "Stay open to unexpected possibilities",
    ],
  };

  const dailyQuote = "Every phase of your journey is an opportunity for growth and transformation.";

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
    <PageWrapper showBottomNav={false} showTabBar={true}>
      {/* Full-screen dark background wrapper */}
      <div className="home-tab-celestial fixed inset-0 bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)]" />

      {/* Day Selector - Fixed at top */}
      <div className="home-tab-celestial fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)]">
        <DaySelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          onCalendarClick={handleCalendarClick}
        />
      </div>

      {/* Content with top padding to account for fixed header */}
      <div className="home-tab-celestial animate-fade-in pt-[80px] relative">
        {/* Header Section - Apple Typography */}
        <div className="px-6 pt-2 pb-6 text-center space-y-1">
          {/* Greeting - Callout style */}
          <p className="text-callout text-[hsl(230,10%,68%)]">
            Hi {userData.name}, it's {getCurrentDate()}
          </p>

          {/* Main Title - Large Title style */}
          <h1 className="text-large-title text-[hsl(230,8%,96%)]">
            Today's Insights
          </h1>

          {/* Subtitle - Subhead style */}
          <p className="text-subhead text-[hsl(20,55%,58%)] pt-1">
            Under {userData.sunSign} skies • Energy Number {userData.energyNumber}
          </p>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-8 space-y-6">
          {/* Tarot Section */}
          {!isRevealed ? (
            <TarotPreReveal onReveal={handleReveal} isRevealing={isRevealing} />
          ) : (
            <RevealTransition isRevealed={isRevealed} isRevealing={isRevealing}>
              <div className="space-y-6">
                <TarotPostReveal card={tarotCard} />
                <AstrologyInsights
                  sunSign={userData.sunSign}
                  moonSign={userData.moonSign}
                  mercuryState={userData.mercuryState}
                  insight="Your intuitive nature is heightened today, making it an excellent time for spiritual practices and trusting your inner guidance."
                />
                <NumerologyInsights
                  energyNumber={userData.energyNumber}
                  traits={userData.traits}
                  guidance="Your spiritual energy is particularly strong today. Focus on meditation and connecting with your higher self."
                />
                <ReflectionSection
                  hasReflection={!!reflection}
                  reflection={reflection}
                  onAddReflection={handleAddReflection}
                />
              </div>
            </RevealTransition>
          )}

          {/* Below the fold content */}
          <DailyQuote quote={dailyQuote} />
          <JourneyProgress
            streak={userData.streak}
            milestones={userData.milestones}
          />
          <RecentlyViewed items={userData.recentlyViewed} />
        </div>
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
    </PageWrapper>
  );
};

export default HomeOverview;
