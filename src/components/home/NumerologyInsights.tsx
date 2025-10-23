interface NumerologyInsightsProps {
  energyNumber: number;
  traits: string[];
  guidance: string;
}

export const NumerologyInsights = ({ energyNumber, traits, guidance }: NumerologyInsightsProps) => {
  return (
    <div className="glass-card p-6 space-y-4 stagger-fade-up relative overflow-hidden">
      {/* Numerological symbols */}
      <div className="absolute top-2 right-2 text-accent/30 text-lg">🔢</div>
      <div className="absolute bottom-2 left-2 text-accent/30 text-sm">✨</div>
      
      <h3 className="text-xl font-serif text-foreground flex items-center gap-2">
        <span className="text-accent">🔮</span>
        Life Path Influence
      </h3>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground font-medium">
          Energy Number {energyNumber} — {traits.join(", ")}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {guidance}
        </p>
      </div>
    </div>
  );
};
