interface DailyQuoteProps {
  quote: string;
}

export const DailyQuote = ({ quote }: DailyQuoteProps) => {
  return (
    <div 
      className="p-8 text-center space-y-4 stagger-fade-up rounded-[12px] shadow-soft"
      style={{ 
        background: 'linear-gradient(135deg, #F5F3F0 0%, #F0EDE8 100%)',
      }}
    >
      <p className="text-xs text-muted-foreground uppercase tracking-wider">Daily Wisdom</p>
      <p className="font-title text-xl font-medium text-foreground leading-relaxed">
        "{quote}"
      </p>
    </div>
  );
};
