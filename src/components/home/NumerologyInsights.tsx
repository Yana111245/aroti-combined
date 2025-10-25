interface NumerologyInsightsProps {
  energyNumber: number;
  traits: string[];
  guidance: string;
}

export const NumerologyInsights = ({ energyNumber, traits, guidance }: NumerologyInsightsProps) => {
  return (
    <div 
      className="p-6 space-y-4 stagger-fade-up relative overflow-hidden rounded-[12px]"
      style={{ background: 'rgba(255, 255, 255, 0.7)' }}
    >
      <h3 className="font-title text-lg font-medium text-foreground text-left">
        Life Path Influence
      </h3>
      <div className="space-y-4">
        <p className="font-body text-base text-muted-foreground font-medium">
          Energy Number <span className="text-accent font-title text-xl">{energyNumber}</span> — {traits.join(", ")}
        </p>
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          {guidance}
        </p>
      </div>
    </div>
  );
};
