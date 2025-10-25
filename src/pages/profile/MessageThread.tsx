import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MoreVertical, Send, Paperclip } from "lucide-react";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { Input } from "@/components/ui/input";

export default function MessageThread() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const messages = [
    {
      id: 1,
      sender: "specialist",
      content: "Hi Alexandra! I've completed your chart analysis. Your Saturn return is approaching - this is a significant time.",
      time: "2:30 PM",
    },
    {
      id: 2,
      sender: "user",
      content: "Thank you! What should I focus on during this period?",
      time: "2:45 PM",
    },
    {
      id: 3,
      sender: "specialist",
      content: "Focus on structures in your life - career, relationships, foundations. It's about maturity and responsibility. I've shared a detailed PDF in our session notes.",
      time: "3:00 PM",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle send
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[420px] mx-auto">
      {/* Header */}
      <div className="glass-card rounded-b-[28px] px-4 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/profile/messages")}
              className="rounded-full p-2 hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-full gradient-accent flex items-center justify-center text-white font-title">
              L
            </div>
            <div>
              <h3 className="font-semibold">Luna Clarke</h3>
              <p className="text-xs text-muted-foreground">Astrologer</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full p-2 hover:bg-white/50 transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-white/50 transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] ${
                msg.sender === "user"
                  ? "glass-card rounded-[12px] rounded-br-md p-4"
                  : "glass-card rounded-[12px] rounded-bl-md p-4"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-muted-foreground mt-2">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3">
        <div className="flex gap-2 mb-3">
          <button className="glass-card rounded-full px-4 py-2 text-xs font-medium hover:bg-white/90 transition-colors">
            📎 Share files
          </button>
          <button className="glass-card rounded-full px-4 py-2 text-xs font-medium hover:bg-white/90 transition-colors">
            📅 Book again
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="glass-card rounded-t-[28px] px-4 py-4 sticky bottom-0">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
            <Paperclip className="h-5 w-5 text-accent-gold" />
          </button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 glass-card border-border"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="gradient-accent p-2 rounded-full hover:opacity-90 transition-opacity"
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
