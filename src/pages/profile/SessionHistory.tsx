import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Video, Calendar } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { TabPills } from "@/components/profile/TabPills";
import { StatusChip } from "@/components/profile/StatusChip";
import { GradientButton } from "@/components/profile/GradientButton";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function SessionHistory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Upcoming");

  const upcomingSessions = [
    {
      id: 1,
      specialist: "Luna Clarke",
      specialty: "Astrology Reading",
      date: "Tomorrow",
      time: "2:00 PM PST",
      status: "confirmed" as const,
      price: "$75",
      avatar: "L",
    },
  ];

  const pastSessions = [
    {
      id: 2,
      specialist: "Marcus Rivers",
      specialty: "Tarot Reading",
      date: "3 days ago",
      time: "4:30 PM PST",
      status: "completed" as const,
      price: "$60",
      avatar: "M",
    },
    {
      id: 3,
      specialist: "Aria Moon",
      specialty: "Energy Healing",
      date: "1 week ago",
      time: "11:00 AM PST",
      status: "completed" as const,
      price: "$90",
      avatar: "A",
    },
  ];

  const sessions = activeTab === "Upcoming" ? upcomingSessions : pastSessions;

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Sessions"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Session history">
          {/* Tabs */}
          <TabPills
            tabs={["Upcoming", "Past"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-6"
          />

          {/* Sessions */}
          {sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((session) => (
                <BaseCard key={session.id}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center text-white font-title text-title-3">
                      {session.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-headline">{session.specialist}</h4>
                        <StatusChip status={session.status} />
                      </div>
                      <p className="text-subhead text-muted-foreground mb-1">{session.specialty}</p>
                      <div className="flex items-center gap-2 text-footnote text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{session.date} • {session.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-semibold">{session.price}</span>
                    <div className="flex gap-2">
                      {activeTab === "Upcoming" && (
                        <>
                          <GradientButton variant="outline" className="text-subhead px-4 py-2">
                            Reschedule
                          </GradientButton>
                          <GradientButton className="text-subhead px-4 py-2 flex items-center gap-1">
                            <Video className="h-4 w-4" />
                            Join
                          </GradientButton>
                        </>
                      )}
                      {activeTab === "Past" && (
                        <>
                          <GradientButton variant="outline" className="text-subhead px-4 py-2">
                            Rate
                          </GradientButton>
                          <GradientButton className="text-subhead px-4 py-2">
                            Rebook
                          </GradientButton>
                        </>
                      )}
                    </div>
                  </div>
                </BaseCard>
              ))}
            </div>
          ) : (
            <BaseCard className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-title text-headline font-semibold mb-2">
                {activeTab === "Upcoming" ? "No upcoming sessions" : "No past sessions"}
              </h3>
              <p className="text-subhead text-muted-foreground mb-4">
                {activeTab === "Upcoming"
                  ? "Book a session with a specialist to get started"
                  : "Your completed sessions will appear here"}
              </p>
              {activeTab === "Upcoming" && (
                <GradientButton onClick={() => navigate("/booking")}>
                  Browse Specialists
                </GradientButton>
              )}
            </BaseCard>
          )}
        </main>
      </div>
    </PageWrapper>
  );
}
