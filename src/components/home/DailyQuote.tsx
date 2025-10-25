interface DailyQuoteProps {
  quote: string;
}

export const DailyQuote = ({ quote }: DailyQuoteProps) => {
  return (
    <div className="liquid-glass-secondary p-8 text-center space-y-4 stagger-fade-up">
      <p className="text-footnote text-muted-foreground uppercase tracking-wider">Daily Wisdom</p>
      <p className="text-title-3 text-foreground">
        "{quote}"
      </p>
    </div>
  );
};
