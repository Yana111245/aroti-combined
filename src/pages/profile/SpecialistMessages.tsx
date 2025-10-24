import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";

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
    <div className="min-h-screen pb-24 pt-6 px-4 max-w-[420px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/profile")}
          className="rounded-full p-2 hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <SerifTitle>Messages</SerifTitle>
      </div>

      {/* Threads */}
      <div className="space-y-3">
        {threads.map((thread) => (
          <SoftCard
            key={thread.id}
            onClick={() => navigate(`/profile/messages/${thread.id}`)}
            className="flex items-center gap-4 relative"
          >
            {thread.unread && (
              <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-accent-gold" />
            )}
            <div className="h-12 w-12 rounded-full gradient-accent flex items-center justify-center text-white font-subtitle text-xl">
              {thread.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{thread.name}</h4>
                <span className="text-xs text-muted-foreground">• {thread.specialty}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">{thread.lastMessage}</p>
            </div>
          </SoftCard>
        ))}
      </div>

      {threads.length === 0 && (
        <SoftCard className="text-center py-12">
          <div className="h-16 w-16 rounded-full gradient-accent flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💬</span>
          </div>
          <h3 className="font-subtitle text-lg font-semibold mb-2">No messages yet</h3>
          <p className="text-sm text-muted-foreground">Book a session to connect with specialists</p>
        </SoftCard>
      )}
    </div>
  );
}
