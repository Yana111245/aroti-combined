import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function SpecialistMessages() {
  const navigate = useNavigate();

  const threads = [
    {
      id: 1,
      name: "Luna Clarke",
      specialty: "Astrologer",
      lastMessage: "Your Saturn return insights are ready...",
      unread: true,
      avatar: "L",
    },
    {
      id: 2,
      name: "Marcus Rivers",
      specialty: "Tarot Reader",
      lastMessage: "Thank you for the session! Here's a recap...",
      unread: false,
      avatar: "M",
    },
  ];

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Messages"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Messages">
          {/* Threads */}
          <div className="space-y-3">
            {threads.map((thread) => (
              <BaseCard
                key={thread.id}
                onClick={() => navigate(`/profile/messages/${thread.id}`)}
                className="flex items-center gap-4 relative"
              >
                {thread.unread && (
                  <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-accent" />
                )}
                <div className="h-12 w-12 rounded-full bg-gradient-gold flex items-center justify-center text-white font-title text-title-3">
                  {thread.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-headline">{thread.name}</h4>
                    <span className="text-footnote text-muted-foreground">• {thread.specialty}</span>
                  </div>
                  <p className="text-subhead text-muted-foreground line-clamp-1">{thread.lastMessage}</p>
                </div>
              </BaseCard>
            ))}
          </div>

          {threads.length === 0 && (
            <BaseCard className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-4">
                <span className="text-large-title">💬</span>
              </div>
              <h3 className="font-title text-headline font-semibold mb-2">No messages yet</h3>
              <p className="text-subhead text-muted-foreground">Book a session to connect with specialists</p>
            </BaseCard>
          )}
        </main>
      </div>
    </PageWrapper>
  );
}
