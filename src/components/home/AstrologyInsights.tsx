interface AstrologyInsightsProps {
  sunSign: string;
  moonSign: string;
  mercuryState: string;
  insight: string;
}

export const AstrologyInsights = ({ sunSign, moonSign, mercuryState, insight }: AstrologyInsightsProps) => {
  return (
    <div 
      className="py-10 px-6 stagger-fade-up relative overflow-hidden rounded-[12px]"
      style={{ background: 'linear-gradient(90deg, #F8F7F4 0%, #FFF9F7 100%)' }}
    >
      <h3 className="font-title text-lg font-medium text-accent/80 text-left mb-4">
        Your Cosmic Alignment
      </h3>
      <div className="space-y-4">
        <p className="font-body text-base text-muted-foreground font-medium">
          Sun in {sunSign} • Moon in {moonSign} • {mercuryState}
        </p>
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          {insight}
        </p>
      </div>
    </div>
  );
};
