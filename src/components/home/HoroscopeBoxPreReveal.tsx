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
      </div>

      <div className="flex items-start gap-3 h-full relative z-10">
        <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/60 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-white font-bold text-base">♓</span>
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="text-headline font-semibold text-foreground">Daily Horoscope</h3>
          <p className="text-callout text-muted-foreground opacity-75">Your cosmic forecast awaits</p>
          <p className="text-footnote text-muted-foreground/60">Pisces energy influences your day...</p>
        </div>
      </div>
      
      {/* Enhanced shimmer effect - more obvious tap indicator */}
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
      <div className="absolute inset-0 rounded-[12px] bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
    </div>
  );
};
