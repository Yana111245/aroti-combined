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
import { TabBar } from "@/components/navigation/TabBar";
import { PageWrapper } from "@/components/layout/PageWrapper";
import tarotMoon from "@/assets/tarot-moon.jpg";

const HomeOverview = () => {
  const [selectedDay, setSelectedDay] = useState<"yesterday" | "today">("today");
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [reflection, setReflection] = useState<string>("");
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
      <div className="animate-fade-in">
        {/* Day Selector */}
        <DaySelector 
          selectedDay={selectedDay} 
          onDayChange={setSelectedDay}
          onCalendarClick={handleCalendarClick}
        />

        {/* Header Section */}
        <div className="px-6 py-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            Hi {userData.name}, it's {getCurrentDate()}
          </p>
          
          <p className="text-sm text-muted-foreground">
            Under {userData.sunSign} skies • Energy Number {userData.energyNumber}
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 pb-8 space-y-6">
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
      
      <TabBar />
    </PageWrapper>
  );
};

export default HomeOverview;
