interface NumerologyInsightsProps {
  energyNumber: number;
  traits: string[];
  guidance: string;
}

export const NumerologyInsights = ({ energyNumber, traits, guidance }: NumerologyInsightsProps) => {
  return (
    <div className="apple-material-card-subtle p-6 space-y-4 stagger-fade-up relative overflow-hidden">
      <h3 className="text-headline text-foreground text-left">
        Life Path Influence
      </h3>
      <div className="space-y-4">
        <p className="text-body text-muted-foreground font-medium">
          Energy Number <span className="text-accent text-title-2">{energyNumber}</span> — {traits.join(", ")}
        </p>
        <p className="text-body text-muted-foreground">
          {guidance}
        </p>
      </div>
    </div>
  );
};
