import { useState, useRef, useEffect } from "react";
import { FrostedCard } from "@/components/ui/frosted-card";
import { Sparkles, Heart, Hash, Mic, Send, Star, Menu } from "lucide-react";
import { Specialist } from "@/pages/Guidance";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { GuidanceSideMenu } from "@/components/guidance/GuidanceSideMenu";
import {
  LiquidGlassDialog,
  LiquidGlassDialogContent,
  LiquidGlassDialogHeader,
  LiquidGlassDialogTitle,
} from "@/components/ui/liquid-glass-dialog";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ActiveChatProps {
  specialist: Specialist;
  onSpecialistChange: (specialist: Specialist) => void;
  onViewHistory: () => void;
  onViewPoints: () => void;
  onStartNewChat?: () => void;
  userPoints: number;
}

const specialistData = {
  astrologer: {
    name: "Aroti",
    icon: Sparkles,
    description: "Cosmic insights & astrology guidance",
    gradient: "from-primary-gold to-primary-gold-end",
    cost: 5,
  },
  therapist: {
    name: "Elyon",
    icon: Heart,
    description: "Mindful support & emotional guidance",
    gradient: "from-accent to-accent",
    cost: 10,
  },
  numerologist: {
    name: "Orin",
    icon: Hash,
    description: "Life path clarity & numerology",
    gradient: "from-primary to-primary",
    cost: 5,
  },
};

const welcomeMessages = {
  astrologer: "Hello! I'm Aroti, your cosmic guide. I can help you understand your astrological chart, daily energy, and life timing. What would you like to explore?",
  therapist: "Hi there! I'm Elyon, here to offer mindful support and gentle guidance. How are you feeling today?",
  numerologist: "Welcome! I'm Orin, a numbers mystic. I can help decode the patterns in your life path. What would you like to discover?",
};

const quickSuggestions = {
  astrologer: [
    "What's my energy today?",
    "Tell me about my chart",
    "What should I focus on this week?",
  ],
  therapist: [
    "I'm feeling anxious",
    "Help me process my emotions",
    "I need guidance on a relationship",
  ],
  numerologist: [
    "What's my life path number?",
    "What do my numbers reveal?",
    "Help me understand my destiny",
  ],
};

export const ActiveChat = ({ 
  specialist, 
  onSpecialistChange, 
  onViewHistory, 
  onViewPoints,
  onStartNewChat,
  userPoints 
}: ActiveChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pointsUsed, setPointsUsed] = useState(0);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentSpecialist = specialist ? specialistData[specialist] : null;

  // Initialize with welcome message if no messages
  useEffect(() => {
    if (specialist && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: welcomeMessages[specialist],
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [specialist]);

  // Auto-focus input on mount and specialist change
  useEffect(() => {
    inputRef.current?.focus();
  }, [specialist]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim() || !specialist) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);
    setPointsUsed((prev) => prev + (currentSpecialist?.cost || 0));

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand. Let me help you explore this further. Can you tell me more about what you're experiencing?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  if (!specialist || !currentSpecialist) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-body text-muted-foreground">Please select a specialist</p>
      </div>
    );
  }

  const IconComponent = currentSpecialist.icon;
  const suggestions = quickSuggestions[specialist] || [];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)]">
      {/* Fixed Header with Title and Actions */}
      <BaseHeader 
        title="Guidance"
        subtitle="Each insight costs 5 pts"
        leftAction={{
          icon: <Menu className="w-5 h-5" />,
          onClick: () => setSideMenuOpen(true),
          label: "Open menu"
        }}
        rightActions={
          <div className="flex items-center gap-1 self-stretch">
            <Star className="w-2.5 h-2.5 text-accent" />
            <span className="text-footnote font-body font-medium text-accent">{userPoints}</span>
          </div>
        }
      />

      {/* Side Menu */}
      <GuidanceSideMenu
        open={sideMenuOpen}
        onOpenChange={setSideMenuOpen}
        onNewChat={() => {
          if (onStartNewChat) {
            onStartNewChat();
          }
        }}
        onResumeSession={(specialist) => {
          onSpecialistChange(specialist);
          if (onStartNewChat) {
            onStartNewChat();
          }
        }}
        onShareSession={(sessionId) => {
          // TODO: Implement share functionality
          console.log("Share session:", sessionId);
        }}
        onRenameSession={(sessionId, newName) => {
          // TODO: Implement rename functionality
          console.log("Rename session:", sessionId, "to", newName);
        }}
        onDeleteSession={(sessionId) => {
          // TODO: Implement delete functionality
          console.log("Delete session:", sessionId);
        }}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-[200px] space-y-4 pt-[calc(80px+1rem)]">
        {messages.length === 0 ? (
          // Welcome State
          <div className="flex flex-col items-center justify-center pt-8 space-y-6">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentSpecialist.gradient} flex items-center justify-center shadow-glow animate-pulse`}>
              <IconComponent className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="text-center space-y-2 max-w-sm">
              <h2 className="text-title-2 font-title font-semibold text-foreground">
                Chat with {currentSpecialist.name}
              </h2>
              <p className="text-body text-muted-foreground">
                {currentSpecialist.description}
              </p>
            </div>
          </div>
        ) : (
          // Messages
          messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`max-w-[85%] rounded-3xl px-5 py-3.5 ${
                  message.role === "user"
                    ? "bg-gradient-gold text-primary-foreground shadow-glow rounded-br-md"
                    : "bg-card/90 backdrop-blur-frosted border border-primary/20 text-foreground shadow-soft rounded-bl-md"
                }`}
              >
                <p className="text-body leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                {message.role === "assistant" && (
                  <button
                    onClick={() => setShowDisclaimer(true)}
                    className="mt-2 text-footnote text-muted-foreground hover:text-accent transition-colors underline"
                  >
                    Disclaimer
                  </button>
                )}
              </div>
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-card/90 backdrop-blur-frosted border border-primary/20 rounded-3xl rounded-bl-md px-5 py-3.5 shadow-soft">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed Above Bottom Nav */}
      <div 
        className="fixed left-0 right-0 z-50 px-4 pt-3 pb-2 bg-gradient-to-t from-[hsl(235,35%,7%)] via-[hsl(235,35%,7%)] to-transparent"
        style={{
          bottom: 'calc(5rem + env(safe-area-inset-bottom))',
        }}
      >
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Quick Suggestions */}
          {messages.length <= 1 && suggestions.length > 0 && (
            <div className="px-2 pb-2">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 rounded-full bg-card/70 backdrop-blur-frosted border border-primary/20 text-footnote text-foreground whitespace-nowrap hover:bg-card hover:border-primary/40 transition-all active:scale-95"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Main Input Bar */}
          <FrostedCard className="p-4">
            <div className="flex items-center gap-3">
              {/* Input Field */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={`Ask ${currentSpecialist.name}...`}
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-body min-w-0"
              />

              {/* Conditional Action Button */}
              {inputValue.trim() ? (
                <button
                  onClick={handleSend}
                  className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow hover:shadow-soft transition-all active:scale-95 flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4.5 h-4.5 text-primary-foreground" />
                </button>
              ) : (
                <button 
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary/30 transition-colors active:scale-95 flex-shrink-0"
                  aria-label="Voice input"
                >
                  <Mic className="w-4.5 h-4.5 text-muted-foreground" />
                </button>
              )}
            </div>
          </FrostedCard>
        </div>
      </div>

      {/* Disclaimer Modal */}
      <LiquidGlassDialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <LiquidGlassDialogContent className="p-6 max-w-md">
          <LiquidGlassDialogHeader>
            <LiquidGlassDialogTitle className="text-headline text-foreground">
              Disclaimer
            </LiquidGlassDialogTitle>
          </LiquidGlassDialogHeader>
          <div className="mt-4 space-y-3">
            <p className="text-body text-foreground leading-relaxed">
              AI responses are generated by artificial intelligence and may not always be accurate. 
              Please use your judgment and consult with qualified professionals for important decisions.
            </p>
            <p className="text-body text-foreground leading-relaxed">
              Responses may vary and should not be considered as definitive advice. The information 
              provided is for guidance purposes only and does not replace professional consultation.
            </p>
          </div>
        </LiquidGlassDialogContent>
      </LiquidGlassDialog>
    </div>
  );
};
