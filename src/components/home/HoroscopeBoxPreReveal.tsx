interface HoroscopeBoxPreRevealProps {
  onReveal: () => void;
}

export const HoroscopeBoxPreReveal = ({ onReveal }: HoroscopeBoxPreRevealProps) => {
  return (
    <div 
      className="apple-material-card-interactive liquid-glass-card p-6 cursor-pointer group relative overflow-hidden"
      onClick={onReveal}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden rounded-[12px]">
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/5 rounded-full" />
        <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-accent/3 rounded-full" />
        <div className="absolute top-1/2 right-8 w-6 h-6 border border-accent/10 rounded-full" />
        
        {/* Glowing effects */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-accent/10 rounded-full blur-xl opacity-60 glow-effect" />
        <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-accent/8 rounded-full blur-lg opacity-40 glow-effect" />
        <div className="absolute top-1/2 right-6 w-8 h-8 bg-accent/6 rounded-full blur-md opacity-30 glow-effect" />
      </div>

      {/* Co-Star style: Clean, centered layout */}
      <div className="text-center space-y-3 relative z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/60 rounded-full flex items-center justify-center mx-auto">
          <span className="text-white font-bold text-xl">♓</span>
        </div>
        <h3 className="text-headline text-foreground">Daily Horoscope</h3>
        <p className="text-callout text-muted-foreground/70">Intuitive nature heightened today</p>
        <p className="text-footnote text-muted-foreground/50">Tap to reveal your full forecast</p>
      </div>
      
      {/* Enhanced shimmer effect - much more visible tap indicator */}
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
      
      {/* Additional glow layer for more prominence */}
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-t from-accent/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-600 pointer-events-none" />
      
      {/* Subtle pulsing border on hover */}
      <div className="absolute inset-0 rounded-[12px] border-2 border-accent/40 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
      
      {/* Tap indicator - subtle dot with pulsing animation */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-accent/70 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none tap-indicator" />
    </div>
  );
};
