import { FrostedCard } from "@/components/ui/frosted-card";
import { X, Sparkles, Heart, Hash } from "lucide-react";
import { Specialist } from "@/pages/Guidance";
import { useState } from "react";

interface PersonaSelectorProps {
  specialist: Specialist;
  onClose: () => void;
  onBeginSession: () => void;
}

const personas = {
  astrologer: {
    name: "Luna",
    icon: Sparkles,
    description: "A cosmic guide who reads the stars and planets to help you understand your spiritual path and life timing.",
    gradient: "from-primary-gold to-primary-gold-end",
  },
  therapist: {
    name: "Elyon",
    icon: Heart,
    description: "A compassionate listener offering mindful support and gentle guidance through life's emotional landscapes.",
    gradient: "from-accent to-accent",
  },
  numerologist: {
    name: "Orin",
    icon: Hash,
    description: "A numbers mystic who decodes the sacred patterns in your life path and reveals your soul's purpose.",
    gradient: "from-primary to-primary",
  },
};

export const PersonaSelector = ({ specialist, onClose, onBeginSession }: PersonaSelectorProps) => {
  const [selected, setSelected] = useState<keyof typeof personas | null>(specialist);
  
  if (!selected) return null;
  
  const currentPersona = personas[selected];
  const IconComponent = currentPersona.icon;

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
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-6">
            Choose Your Guide
          </h2>

          <div className="space-y-3 mb-6">
            {(Object.keys(personas) as Array<keyof typeof personas>).map((key) => {
              const persona = personas[key];
              const Icon = persona.icon;
              const isSelected = selected === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`w-full text-left transition-all ${
                    isSelected ? "scale-[1.02]" : "hover:scale-[1.01]"
                  }`}
                >
                  <FrostedCard
                    className={`${
                      isSelected
                        ? "border-2 border-primary shadow-glow"
                        : "border border-transparent hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${persona.gradient} flex items-center justify-center shadow-glow ${isSelected ? "scale-110" : ""} transition-transform`}>
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {persona.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {persona.description}
                        </p>
                      </div>
                    </div>
                  </FrostedCard>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onBeginSession}
          className="w-full py-3 px-6 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all"
        >
          Begin Session with {currentPersona.name}
        </button>
      </FrostedCard>
    </div>
  );
};
