import { useState } from "react";
import { GuidanceOverview } from "@/components/guidance/GuidanceOverview";
import { ActiveChat } from "@/components/guidance/ActiveChat";
import { NewChatModal } from "@/components/guidance/NewChatModal";
import { PointsBalance } from "@/components/guidance/PointsBalance";
import { PersonaSelector } from "@/components/guidance/PersonaSelector";
import { ChatHistory } from "@/components/guidance/ChatHistory";
import { PageWrapper } from "@/components/layout/PageWrapper";

export type GuidanceView = "overview" | "chat" | "points" | "history";
export type Specialist = "astrologer" | "therapist" | "numerologist" | null;

const Guidance = () => {
  const [currentView, setCurrentView] = useState<GuidanceView>("overview");
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showPersonaSelector, setShowPersonaSelector] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(null);
  const [userPoints] = useState(1240);

  const handleStartChat = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setShowPersonaSelector(true);
  };

  const handleBeginSession = () => {
    setShowPersonaSelector(false);
    setCurrentView("chat");
  };

  const handleNewChat = () => {
    setShowNewChatModal(true);
  };

  const handleTopicSelected = () => {
    setShowNewChatModal(false);
    setShowPersonaSelector(true);
  };

  const renderView = () => {
    switch (currentView) {
      case "chat":
        return (
          <ActiveChat
            specialist={selectedSpecialist}
            onBack={() => setCurrentView("overview")}
            onNewChat={handleNewChat}
            userPoints={userPoints}
          />
        );
      case "points":
        return <PointsBalance onBack={() => setCurrentView("overview")} userPoints={userPoints} />;
      case "history":
        return (
          <ChatHistory
            onBack={() => setCurrentView("overview")}
            onResumeSession={(specialist) => {
              setSelectedSpecialist(specialist);
              setCurrentView("chat");
            }}
          />
        );
      default:
        return (
          <GuidanceOverview
            onStartChat={handleStartChat}
            onViewHistory={() => setCurrentView("history")}
            onViewPoints={() => setCurrentView("points")}
            userPoints={userPoints}
          />
        );
    }
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] min-h-full pb-24">
        {renderView()}
        
        {showNewChatModal && (
          <NewChatModal
            onClose={() => setShowNewChatModal(false)}
            onTopicSelected={handleTopicSelected}
          />
        )}
        
        {showPersonaSelector && (
          <PersonaSelector
            specialist={selectedSpecialist}
            onClose={() => setShowPersonaSelector(false)}
            onBeginSession={handleBeginSession}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default Guidance;
