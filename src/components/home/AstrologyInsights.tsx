interface AstrologyInsightsProps {
  sunSign: string;
  moonSign: string;
  mercuryState: string;
  insight: string;
}

export const AstrologyInsights = ({ sunSign, moonSign, mercuryState, insight }: AstrologyInsightsProps) => {
  return (
    <div className="glass-card p-6 space-y-4 stagger-fade-up relative overflow-hidden">
      {/* Cosmic background elements */}
      <div className="absolute top-2 right-2 text-accent/30 text-lg">🌙</div>
      <div className="absolute bottom-2 left-2 text-accent/30 text-sm">☀️</div>
      
      <h3 className="text-xl font-serif text-foreground flex items-center gap-2">
        <span className="text-accent">🌌</span>
        Your Cosmic Alignment
      </h3>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground font-medium">
          Sun in {sunSign} • Moon in {moonSign} • {mercuryState}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {insight}
        </p>
      </div>
    </div>
  );
};
