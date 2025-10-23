import { FrostedCard } from "@/components/ui/frosted-card";
import { X } from "lucide-react";
import { useState } from "react";

interface NewChatModalProps {
  onClose: () => void;
  onTopicSelected: () => void;
}

const topics = [
  "Tarot Energy Reading",
  "Astrology Forecast",
  "Emotional Guidance",
  "Numerology Insight",
  "Free Topic",
];

export const NewChatModal = ({ onClose, onTopicSelected }: NewChatModalProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedTopic) {
      onTopicSelected();
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
      <FrostedCard className="max-w-md w-full animate-scale-in relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-secondary/50 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-gold mx-auto mb-4 flex items-center justify-center shadow-glow animate-pulse">
            <div className="w-6 h-6 rounded-full bg-primary-foreground/30" />
          </div>
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-2">
            What would you like to explore today?
          </h2>
        </div>

        <div className="space-y-2 mb-6">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`w-full px-5 py-3 rounded-full text-left font-medium transition-all ${
                selectedTopic === topic
                  ? "bg-gradient-gold text-primary-foreground shadow-glow"
                  : "bg-card/70 backdrop-blur-frosted border border-primary/20 text-foreground hover:bg-card hover:border-primary/40"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedTopic}
          className="w-full py-3 px-6 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </FrostedCard>
    </div>
  );
};
