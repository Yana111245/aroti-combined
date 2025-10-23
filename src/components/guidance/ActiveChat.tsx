import { useState, useRef, useEffect } from "react";
import { FrostedCard } from "@/components/ui/frosted-card";
import { ArrowLeft, Sparkles, Mic, Send, Star } from "lucide-react";
import { Specialist } from "@/pages/Guidance";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ActiveChatProps {
  specialist: Specialist;
  onBack: () => void;
  onNewChat: () => void;
  userPoints: number;
}

const specialistNames = {
  astrologer: "Luna",
  therapist: "Elyon",
  numerologist: "Orin",
};

const quickSuggestions = [
  "What's my energy today?",
  "Should I focus on work or rest?",
];

export const ActiveChat = ({ specialist, onBack, onNewChat, userPoints }: ActiveChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Let's tune into your energy together. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pointsUsed] = useState(15);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Your chart reveals a gentle shift — how are you feeling about this transition?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="px-6 pt-8 pb-4 border-b border-primary/10">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-secondary/50 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-gold shadow-glow">
            <Star className="w-4 h-4 text-primary-foreground fill-current" />
            <span className="text-sm font-semibold text-primary-foreground">
              {pointsUsed} pts used
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          {specialist ? specialistNames[specialist] : "Guidance"}
        </h1>
        <p className="text-sm text-muted-foreground">AI {specialist}</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`max-w-[80%] rounded-3xl px-5 py-3 ${
                message.role === "user"
                  ? "bg-card/90 backdrop-blur-frosted border-2 border-primary/30 shadow-soft"
                  : "bg-primary/5 backdrop-blur-frosted shadow-glow"
              }`}
            >
              <p
                className={`text-base ${
                  message.role === "user" ? "text-foreground" : "text-foreground/90 italic"
                }`}
              >
                {message.content}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-primary/5 backdrop-blur-frosted rounded-3xl px-5 py-3 shadow-glow">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="px-6 pb-6">
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputValue(suggestion)}
              className="px-4 py-2 rounded-full bg-card/70 backdrop-blur-frosted border border-primary/20 text-sm text-foreground whitespace-nowrap hover:bg-card hover:border-primary/40 transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <FrostedCard>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors">
              <Mic className="w-5 h-5 text-foreground" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message…"
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow hover:shadow-soft transition-all disabled:opacity-50"
              disabled={!inputValue.trim()}
            >
              <Send className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </FrostedCard>
      </div>
    </div>
  );
};
