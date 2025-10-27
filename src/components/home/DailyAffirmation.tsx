interface DailyAffirmationProps {
  quote: string;
}

export const DailyAffirmation = ({ quote }: DailyAffirmationProps) => {
  return (
    <div className="apple-material-card-standard p-8 text-center space-y-4 stagger-fade-up">
      <p className="text-footnote text-muted-foreground uppercase tracking-wider">Daily Affirmation</p>
      <p className="text-title-3 text-foreground">
        "{quote}"
      </p>
    </div>
  );
};
