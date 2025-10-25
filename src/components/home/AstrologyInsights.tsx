interface AstrologyInsightsProps {
  sunSign: string;
  moonSign: string;
  mercuryState: string;
  insight: string;
}

export const AstrologyInsights = ({ sunSign, moonSign, mercuryState, insight }: AstrologyInsightsProps) => {
  return (
    <div className="liquid-glass-card py-10 px-6 stagger-fade-up relative overflow-hidden">
      <h3 className="text-headline text-accent/80 text-left mb-4">
        Your Cosmic Alignment
      </h3>
      <div className="space-y-4">
        <p className="text-body text-muted-foreground font-medium">
          Sun in {sunSign} • Moon in {moonSign} • {mercuryState}
        </p>
        <p className="text-body text-muted-foreground">
          {insight}
        </p>
      </div>
    </div>
  );
};
