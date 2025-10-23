import { FrostedCard } from "@/components/ui/frosted-card";
import { ArrowLeft, Sparkles, Heart, Hash, MessageCircle } from "lucide-react";
import { Specialist } from "@/pages/Guidance";

interface ChatHistoryProps {
  onBack: () => void;
  onResumeSession: (specialist: Specialist) => void;
}

const pastSessions = [
  {
    id: "1",
    specialist: "astrologer" as Specialist,
    specialistName: "Luna",
    icon: Sparkles,
    topic: "Daily Focus",
    date: "Oct 12",
    preview: "Let's tune into your energy together...",
    gradient: "from-primary-gold to-primary-gold-end",
  },
  {
    id: "2",
    specialist: "therapist" as Specialist,
    specialistName: "Elyon",
    icon: Heart,
    topic: "Finding Calm",
    date: "Oct 5",
    preview: "Your chart reveals a gentle shift...",
    gradient: "from-accent to-accent",
  },
  {
    id: "3",
    specialist: "numerologist" as Specialist,
    specialistName: "Orin",
    icon: Hash,
    topic: "Life Path Insight",
    date: "Sept 29",
    preview: "The numbers show a powerful pattern...",
    gradient: "from-primary to-primary",
  },
];

export const ChatHistory = ({ onBack, onResumeSession }: ChatHistoryProps) => {
  return (
    <div className="px-6 pt-8 pb-6">
      <header className="mb-8">
        <button onClick={onBack} className="p-2 -ml-2 mb-4 hover:bg-secondary/50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-[28px] font-display font-bold text-foreground mb-2">
          Your Past Guidance
        </h1>
        <p className="text-muted-foreground text-sm">
          Continue where you left off or explore previous insights
        </p>
      </header>

      {pastSessions.length > 0 ? (
        <div className="space-y-3">
          {pastSessions.map((session) => {
            const IconComponent = session.icon;
            return (
              <FrostedCard
                key={session.id}
                className="cursor-pointer hover:shadow-glow transition-all hover:scale-[1.02] group"
                onClick={() => onResumeSession(session.specialist)}
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${session.gradient} flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-semibold text-foreground">
                        {session.specialistName} • {session.topic}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {session.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground italic line-clamp-1 mb-2">
                      "{session.preview}"
                    </p>
                    <span className="text-xs font-semibold text-primary">Resume</span>
                  </div>
                </div>
              </FrostedCard>
            );
          })}
        </div>
      ) : (
        <FrostedCard className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">
            No past sessions yet — start your first conversation.
          </p>
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all"
          >
            Start New Chat
          </button>
        </FrostedCard>
      )}
    </div>
  );
};
