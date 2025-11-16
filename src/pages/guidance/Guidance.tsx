import { useState } from "react";
import { GuidanceOverview } from "@/components/guidance/GuidanceOverview";
import { ActiveChat } from "@/components/guidance/ActiveChat";
import { PointsBalance } from "@/components/guidance/PointsBalance";
import { ChatHistory } from "@/components/guidance/ChatHistory";
import { PageWrapper } from "@/components/layout/PageWrapper";

export type GuidanceView = "overview" | "chat" | "points" | "history";
export type Specialist = "astrologer" | "therapist" | "numerologist" | null;

const Guidance = () => {
  const [currentView, setCurrentView] = useState<GuidanceView>("chat");
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>("astrologer");
  const [userPoints] = useState(1240);
  const [chatKey, setChatKey] = useState(0);

  const handleStartNewChat = () => {
    // Reset chat by changing key to force remount and clear messages
    setChatKey((prev) => prev + 1);
  };

  const renderView = () => {
    switch (currentView) {
      case "chat":
        return (
          <ActiveChat
            key={chatKey}
            specialist={selectedSpecialist}
            onSpecialistChange={setSelectedSpecialist}
            onViewHistory={() => setCurrentView("history")}
            onViewPoints={() => setCurrentView("points")}
            onStartNewChat={handleStartNewChat}
            userPoints={userPoints}
          />
        );
      case "points":
        return <PointsBalance onBack={() => setCurrentView("chat")} userPoints={userPoints} />;
      case "history":
        return (
          <ChatHistory
            onBack={() => setCurrentView("chat")}
            onResumeSession={(specialist) => {
              setSelectedSpecialist(specialist);
              setChatKey((prev) => prev + 1);
              setCurrentView("chat");
            }}
            onShareSession={(sessionId) => {
              // TODO: Implement share functionality
              console.log("Share session:", sessionId);
            }}
            onRenameSession={(sessionId, newName) => {
              // TODO: Implement rename functionality
              console.log("Rename session:", sessionId, "to", newName);
            }}
            onArchiveSession={(sessionId) => {
              // TODO: Implement archive functionality
              console.log("Archive session:", sessionId);
            }}
            onDeleteSession={(sessionId) => {
              // TODO: Implement delete functionality
              console.log("Delete session:", sessionId);
            }}
          />
        );
      default:
        return (
          <GuidanceOverview
            onStartChat={(specialist) => {
              setSelectedSpecialist(specialist);
              setChatKey((prev) => prev + 1);
              setCurrentView("chat");
            }}
            onViewHistory={() => setCurrentView("history")}
            onViewPoints={() => setCurrentView("points")}
            userPoints={userPoints}
          />
        );
    }
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] min-h-full pb-4">
        {renderView()}
      </div>
    </PageWrapper>
  );
};

export default Guidance;
