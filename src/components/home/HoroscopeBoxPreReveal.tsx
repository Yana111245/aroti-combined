interface HoroscopeBoxPreRevealProps {
  onReveal: () => void;
  image?: string;
}

export const HoroscopeBoxPreReveal = ({ onReveal, image }: HoroscopeBoxPreRevealProps) => {
  return (
    <div 
      className="flex apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group h-[120px]"
      onClick={onReveal}
    >
      {/* Text Content - Left Side */}
      <div className="flex-1 p-6 flex flex-col justify-center relative">
        {/* Subtle liquid glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
        
        {/* Category and Title - Centered vertically */}
        <div className="space-y-2">
          <h4 className="text-headline text-foreground font-semibold leading-tight">
            Daily Horoscope
          </h4>
          <p className="text-footnote text-muted-foreground/70">
            Intuitive nature heightened today
          </p>
        </div>
      </div>
      
      {/* Visual Element - Right Side */}
      <div className="w-[120px] h-[120px] relative">
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden liquid-glass-secondary rounded-[16px]">
          {/* Background Image */}
          {image && (
            <img 
              src={image} 
              alt="Horoscope background"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          
          {/* Dark overlay for better contrast when image is present */}
          {image && (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-900/60 to-accent-800/60" />
          )}
          
          {/* Fallback gradient when no image */}
          {!image && (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/30 to-accent-600/30" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-accent-500/20" />
          <div className="absolute inset-0 liquid-glass-highlight" />
          <div className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 liquid-glass-glow">
            <span className="text-white font-bold text-2xl drop-shadow-lg">♓</span>
          </div>
          <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full liquid-glass-shimmer" />
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
