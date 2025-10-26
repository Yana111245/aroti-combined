import { Eye } from "lucide-react";

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
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 ${getCardColor()} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
          <div className={getIconColor()}>
            {icon}
          </div>
        </div>
        <div className="space-y-2 flex-1">
          <h4 className="text-headline text-foreground font-semibold">{title}</h4>
          <p className="text-callout text-muted-foreground opacity-75">Tap to view details</p>
          <p className="text-footnote text-muted-foreground/60">{preview}</p>
        </div>
        <div className="w-6 h-6 bg-muted/20 rounded-full flex items-center justify-center group-hover:bg-muted/30 transition-colors flex-shrink-0 mt-1">
          <Eye className="w-3 h-3 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};
