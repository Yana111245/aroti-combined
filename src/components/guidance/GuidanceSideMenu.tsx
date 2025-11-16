import { useState } from "react";
import { Pencil, Search, MoreVertical, Share2, Trash2 } from "lucide-react";
import { Specialist } from "@/pages/guidance/Guidance";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LiquidGlassDialog,
  LiquidGlassDialogContent,
  LiquidGlassDialogHeader,
  LiquidGlassDialogTitle,
  LiquidGlassDialogDescription,
  LiquidGlassDialogFooter,
} from "@/components/ui/liquid-glass-dialog";
import { Button } from "@/components/ui/button";

interface GuidanceSideMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNewChat: () => void;
  onResumeSession: (specialist: Specialist) => void;
  onShareSession?: (sessionId: string) => void;
  onRenameSession?: (sessionId: string, newName: string) => void;
  onDeleteSession?: (sessionId: string) => void;
}

// Reuse the same data structure from ChatHistory
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

export const GuidanceSideMenu = ({
  open,
  onOpenChange,
  onNewChat,
  onResumeSession,
  onShareSession,
  onRenameSession,
  onDeleteSession,
}: GuidanceSideMenuProps) => {
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter sessions based on search query
  const filteredSessions = pastSessions.filter((session) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      session.specialistName.toLowerCase().includes(searchLower) ||
      session.topic.toLowerCase().includes(searchLower) ||
      session.preview.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="left"
          className="w-[85%] sm:max-w-sm bg-[rgba(12,10,18,0.98)] backdrop-blur-[60px] border-r border-[rgba(255,255,255,0.08)] p-0 overflow-y-auto"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-[rgba(255,255,255,0.08)]">
              {/* New Chat Button */}
              <button
                onClick={() => {
                  onNewChat();
                  onOpenChange(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-gold hover:bg-gradient-gold/90 text-primary-foreground transition-all active:scale-[0.98] mb-3 shadow-glow"
              >
                <Pencil className="w-4 h-4 flex-shrink-0" />
                <span className="text-body font-medium">New Chat</span>
              </button>

              {/* Search Input */}
              <div className="relative">
                <Search 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10 pointer-events-none flex-shrink-0" 
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                />
                <input
                  type="text"
                  placeholder="Search chats..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-card/30 backdrop-blur-[12px] border border-[rgba(255,255,255,0.08)] text-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition-all relative z-0"
                />
              </div>
            </div>

            {/* History Section */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 pt-2 pb-3">
                <h3 className="text-footnote font-semibold text-muted-foreground uppercase tracking-wider">
                  History
                </h3>
              </div>
              
              {filteredSessions.length > 0 ? (
                <div className="px-2">
                  {filteredSessions.map((session) => {
                    return (
                      <div
                        key={session.id}
                        onClick={() => {
                          onResumeSession(session.specialist);
                          onOpenChange(false);
                        }}
                        className="group relative flex items-start gap-2 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="text-body font-medium text-foreground truncate">
                              {session.specialistName} • {session.topic}
                            </h4>
                            <span className="text-footnote text-muted-foreground whitespace-nowrap flex-shrink-0 ml-2">
                              {session.date}
                            </span>
                          </div>
                          <p className="text-footnote text-muted-foreground italic truncate">
                            {session.preview}
                          </p>
                        </div>
                        
                        {/* Three-dot menu */}
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="opacity-60 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-white/10 flex-shrink-0"
                              onClick={(e) => e.stopPropagation()}
                              aria-label="More options"
                            >
                              <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-48 bg-[rgba(23,20,31,0.95)] backdrop-blur-[40px] border border-[rgba(255,255,255,0.12)] rounded-lg shadow-[0_16px_48px_rgba(0,0,0,0.55),0_4px_16px_rgba(0,0,0,0.45)] p-1"
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
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <p className="text-body text-muted-foreground">
                    {searchQuery ? "No chats found" : "No past sessions yet"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

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

