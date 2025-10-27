interface RevealedInsightCardProps {
  type: 'tarot' | 'horoscope' | 'numerology';
  title: string;
  icon: React.ReactNode;
  preview: string;
  onView: () => void;
}

export const RevealedInsightCard = ({ type, title, icon, preview, onView }: RevealedInsightCardProps) => {
  const getCardColor = () => {
    switch (type) {
      case 'tarot':
        return 'bg-accent/20';
      case 'horoscope':
        return 'bg-accent/20';
      case 'numerology':
        return 'bg-primary/20';
      default:
        return 'bg-muted/20';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'tarot':
        return 'text-accent';
      case 'horoscope':
        return 'text-accent';
      case 'numerology':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div 
      className="liquid-glass-secondary p-6 cursor-pointer group hover:bg-opacity-80 transition-all duration-200"
      onClick={onView}
    >
      {/* Co-Star style: Clean, centered layout */}
      <div className="text-center space-y-3">
        <div className={`w-12 h-12 ${getCardColor()} rounded-full flex items-center justify-center mx-auto`}>
          <div className={getIconColor()}>
            {icon}
          </div>
        </div>
        <h4 className="text-headline text-foreground">{title}</h4>
        <p className="text-callout text-muted-foreground/70">{preview}</p>
      </div>
    </div>
  );
};
