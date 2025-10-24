interface DailyQuoteProps {
  quote: string;
}

export const DailyQuote = ({ quote }: DailyQuoteProps) => {
  return (
    <div className="glass-card p-8 text-center space-y-4 stagger-fade-up rounded-[20px]">
      <p className="text-xs text-muted-foreground uppercase tracking-wider">Daily Wisdom</p>
      <p className="font-title text-xl font-medium text-foreground leading-relaxed">
        "{quote}"
      </p>
    </div>
  );
};
