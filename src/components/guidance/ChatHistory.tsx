import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { ArrowLeft, MessageCircle, MoreVertical, Share2, Pencil, Archive, Trash2 } from "lucide-react";
import { Specialist } from "@/pages/guidance/Guidance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  LiquidGlassDialog,
  LiquidGlassDialogContent,
  LiquidGlassDialogHeader,
  LiquidGlassDialogTitle,
  LiquidGlassDialogDescription,
  LiquidGlassDialogFooter,
} from "@/components/ui/liquid-glass-dialog";
import { Button } from "@/components/ui/button";

interface ChatHistoryProps {
  onBack: () => void;
  onResumeSession: (specialist: Specialist) => void;
  onShareSession?: (sessionId: string) => void;
  onRenameSession?: (sessionId: string, newName: string) => void;
  onArchiveSession?: (sessionId: string) => void;
  onDeleteSession?: (sessionId: string) => void;
}

const pastSessions = [
  {
    id: "1",
    specialist: "astrologer" as Specialist,
    specialistName: "Aroti",
    topic: "Daily Focus",
    date: "Oct 12",
    preview: "Let's tune into your energy together...",
  },
  {
    id: "2",
    specialist: "therapist" as Specialist,
    specialistName: "Elyon",
    topic: "Finding Calm",
    date: "Oct 5",
    preview: "Your chart reveals a gentle shift...",
  },
  {
    id: "3",
    specialist: "numerologist" as Specialist,
    specialistName: "Orin",
    topic: "Life Path Insight",
    date: "Sept 29",
    preview: "The numbers show a powerful pattern...",
  },
];

export const ChatHistory = ({ 
  onBack, 
  onResumeSession,
  onShareSession,
  onRenameSession,
  onArchiveSession,
  onDeleteSession,
}: ChatHistoryProps) => {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<typeof pastSessions[0] | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const handleRename = (session: typeof pastSessions[0]) => {
    setSelectedSession(session);
    setRenameValue(`${session.specialistName} • ${session.topic}`);
    setRenameDialogOpen(true);
  };

  const handleDelete = (session: typeof pastSessions[0]) => {
    setSelectedSession(session);
    setDeleteDialogOpen(true);
  };

  const handleRenameSubmit = () => {
    if (selectedSession && renameValue.trim() && onRenameSession) {
      onRenameSession(selectedSession.id, renameValue.trim());
      setRenameDialogOpen(false);
      setRenameValue("");
      setSelectedSession(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedSession && onDeleteSession) {
      onDeleteSession(selectedSession.id);
      setDeleteDialogOpen(false);
      setSelectedSession(null);
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <BaseHeader 
        title="Your Past Guidance"
        subtitle="Continue where you left off or explore previous insights"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: onBack,
          label: "Go back"
        }}
      />

      {/* Main Content */}
      <div className="pt-[80px] min-h-full pb-4">
        <main className="px-6 pb-4 mt-8" role="main" aria-label="Chat history">
          {pastSessions.length > 0 ? (
            <div className="space-y-2">
              {pastSessions.map((session) => {
                return (
                  <BaseCard
                    key={session.id}
                    variant="interactive"
                    onClick={() => onResumeSession(session.specialist)}
                    className="p-3 hover:shadow-glow transition-all hover:scale-[1.01] group relative"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-headline font-semibold text-foreground flex-1 min-w-0 pr-2">
                            {session.specialistName} • {session.topic}
                          </h3>
                          <span className="text-footnote text-muted-foreground whitespace-nowrap flex-shrink-0">
                            {session.date}
                          </span>
                        </div>
                        <p className="text-body text-muted-foreground italic line-clamp-1 mb-1.5">
                          "{session.preview}"
                        </p>
                        <span className="text-footnote font-semibold text-primary underline underline-offset-2">Resume</span>
                      </div>
                      
                      {/* Three-dot menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-accent/10 flex-shrink-0"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="More options"
                          >
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 bg-[rgba(23,20,31,0.85)] backdrop-blur-[40px] border border-[rgba(255,255,255,0.12)] rounded-[12px] shadow-[0_16px_48px_rgba(0,0,0,0.55),0_4px_16px_rgba(0,0,0,0.45)] p-1"
                        >
                          <DropdownMenuItem
                            className="text-body text-foreground focus:bg-accent/20 focus:text-accent cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onShareSession) {
                                onShareSession(session.id);
                              }
                            }}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-body text-foreground focus:bg-accent/20 focus:text-accent cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRename(session);
                            }}
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-body text-foreground focus:bg-accent/20 focus:text-accent cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onArchiveSession) {
                                onArchiveSession(session.id);
                              }
                            }}
                          >
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/50 my-1" />
                          <DropdownMenuItem
                            className="text-body text-destructive focus:bg-destructive/20 focus:text-destructive cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(session);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </BaseCard>
                );
              })}
            </div>
          ) : (
            <BaseCard className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-body text-muted-foreground mb-4">
                No past sessions yet — start your first conversation.
              </p>
              <button
                onClick={onBack}
                className="px-6 py-2 rounded-full bg-gradient-gold text-primary-foreground text-body font-semibold shadow-glow hover:shadow-soft transition-all active:scale-95"
              >
                Start New Chat
              </button>
            </BaseCard>
          )}
        </main>
      </div>

      {/* Rename Dialog */}
      <LiquidGlassDialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <LiquidGlassDialogContent className="sm:max-w-md">
          <LiquidGlassDialogHeader>
            <LiquidGlassDialogTitle className="text-title-2 font-title text-foreground">
              Rename Session
            </LiquidGlassDialogTitle>
            <LiquidGlassDialogDescription className="text-body text-muted-foreground">
              Enter a new name for this chat session.
            </LiquidGlassDialogDescription>
          </LiquidGlassDialogHeader>
          <div className="mt-4">
            <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              className="w-full px-4 py-3 rounded-[12px] bg-card/50 backdrop-blur-[12px] border border-[rgba(255,255,255,0.12)] text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Session name"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameSubmit();
                } else if (e.key === "Escape") {
                  setRenameDialogOpen(false);
                }
              }}
            />
          </div>
          <LiquidGlassDialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setRenameDialogOpen(false);
                setRenameValue("");
                setSelectedSession(null);
              }}
              className="text-body"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRenameSubmit}
              disabled={!renameValue.trim()}
              className="text-body"
            >
              Save
            </Button>
          </LiquidGlassDialogFooter>
        </LiquidGlassDialogContent>
      </LiquidGlassDialog>

      {/* Delete Confirmation Dialog */}
      <LiquidGlassDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <LiquidGlassDialogContent className="sm:max-w-md">
          <LiquidGlassDialogHeader>
            <LiquidGlassDialogTitle className="text-title-2 font-title text-foreground">
              Delete Session
            </LiquidGlassDialogTitle>
            <LiquidGlassDialogDescription className="text-body text-muted-foreground">
              Are you sure you want to delete this chat session? This action cannot be undone.
            </LiquidGlassDialogDescription>
          </LiquidGlassDialogHeader>
          {selectedSession && (
            <div className="mt-4 p-3 rounded-[12px] bg-card/30 border border-[rgba(255,255,255,0.08)]">
              <p className="text-body text-foreground font-semibold">
                {selectedSession.specialistName} • {selectedSession.topic}
              </p>
            </div>
          )}
          <LiquidGlassDialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedSession(null);
              }}
              className="text-body"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="text-body bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </Button>
          </LiquidGlassDialogFooter>
        </LiquidGlassDialogContent>
      </LiquidGlassDialog>
    </>
  );
};
