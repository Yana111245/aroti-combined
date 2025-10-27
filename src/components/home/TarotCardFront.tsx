interface TarotCardFrontProps {
  name: string;
  keywords: string[];
  className?: string;
}

export const TarotCardFront = ({ name, keywords, className = "" }: TarotCardFrontProps) => {
  return (
    <div className={`w-full h-full bg-gradient-to-br from-[hsl(235,30%,11%)] to-[hsl(240,28%,13%)] rounded-[12px] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.35)] relative overflow-hidden breathing-glow ${className}`}>
      
      {/* Decorative border with copper accents */}
      <div className="absolute inset-2 border border-accent/20 rounded-[8px] opacity-60" />
      <div className="absolute inset-3 border border-accent/10 rounded-[6px] opacity-40" />
      
      {/* Corner decorative elements */}
      <div className="absolute top-2 left-2 w-3 h-3 border border-accent/30 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-accent/50 rounded-full" />
      </div>
      <div className="absolute top-2 right-2 w-3 h-3 border border-accent/30 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-accent/50 rounded-full" />
      </div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border border-accent/30 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-accent/50 rounded-full" />
      </div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border border-accent/30 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-accent/50 rounded-full" />
      </div>
      
      {/* Moon crescent at top - more elegant */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          {/* Main crescent */}
          <div className="w-10 h-10 border-2 border-accent/50 rounded-full relative">
            <div className="absolute top-0 left-1/2 w-5 h-5 bg-gradient-to-br from-[hsl(235,30%,11%)] to-[hsl(240,28%,13%)] rounded-full transform -translate-x-1/2" />
            <div className="absolute top-1 left-1/2 w-2 h-2 bg-accent/30 rounded-full transform -translate-x-1/2 animate-pulse" />
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-accent/20 rounded-full blur-sm animate-pulse opacity-60" />
        </div>
      </div>
      
      {/* Star constellation pattern - more mystical */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-[12%] left-[18%] w-1 h-1 bg-accent/70 rounded-full animate-pulse" />
        <div className="absolute top-[22%] right-[22%] w-1 h-1 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[32%] left-[12%] w-1 h-1 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[42%] right-[18%] w-1 h-1 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[52%] left-[22%] w-1 h-1 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[62%] right-[12%] w-1 h-1 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[72%] left-[15%] w-1 h-1 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[82%] right-[25%] w-1 h-1 bg-accent/70 rounded-full animate-pulse" style={{ animationDelay: '3.5s' }} />
      </div>
      
      {/* Mystical energy lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[20%] left-1/2 w-px h-8 bg-gradient-to-b from-accent/30 to-transparent transform -translate-x-1/2" />
        <div className="absolute top-[30%] left-1/2 w-px h-6 bg-gradient-to-b from-accent/20 to-transparent transform -translate-x-1/2" />
        <div className="absolute top-[40%] left-1/2 w-px h-4 bg-gradient-to-b from-accent/15 to-transparent transform -translate-x-1/2" />
      </div>
      
      {/* Central mystical figure silhouette (The Fool) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Figure silhouette - more refined */}
          <div className="relative w-20 h-24">
            {/* Head - more circular */}
            <div className="absolute top-0 left-1/2 w-7 h-7 bg-gradient-to-br from-accent/40 to-accent/20 rounded-full transform -translate-x-1/2 shadow-lg" />
            
            {/* Body - more natural shape */}
            <div className="absolute top-6 left-1/2 w-10 h-12 bg-gradient-to-br from-accent/30 to-accent/15 rounded-full transform -translate-x-1/2" />
            
            {/* Arms - more natural positioning */}
            <div className="absolute top-8 left-3 w-1 h-8 bg-gradient-to-b from-accent/35 to-accent/20 rounded-full transform rotate-12" />
            <div className="absolute top-8 right-3 w-1 h-8 bg-gradient-to-b from-accent/35 to-accent/20 rounded-full transform -rotate-12" />
            
            {/* Legs - more natural stance */}
            <div className="absolute top-16 left-1/2 w-1 h-10 bg-gradient-to-b from-accent/35 to-accent/20 rounded-full transform -translate-x-1/2" />
            <div className="absolute top-16 left-1/2 w-1 h-10 bg-gradient-to-b from-accent/35 to-accent/20 rounded-full transform -translate-x-1/2 translate-x-1" />
            
            {/* Walking stick - more prominent */}
            <div className="absolute top-6 right-1 w-1 h-16 bg-gradient-to-b from-accent/30 to-accent/15 rounded-full transform rotate-15" />
            
            {/* Bag - more detailed */}
            <div className="absolute top-12 left-1 w-4 h-5 bg-gradient-to-br from-accent/35 to-accent/20 rounded transform rotate-12 shadow-md" />
            <div className="absolute top-13 left-0.5 w-1 h-2 bg-accent/25 rounded-full transform rotate-12" />
          </div>
          
          {/* Enhanced glow effect around figure */}
          <div className="absolute -inset-6 bg-gradient-to-r from-accent/15 via-accent/10 to-accent/15 rounded-full blur-lg animate-pulse opacity-70" />
          <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-full blur-md animate-pulse opacity-50" />
        </div>
      </div>
      
      {/* Card number and title at bottom */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <div className="text-xs text-accent/80 font-bold tracking-wider mb-1">0</div>
        <div className="text-[10px] text-accent/60 font-medium tracking-widest">{name.toUpperCase()}</div>
      </div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent rounded-[12px]" />
      
      {/* Mystical aura effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 rounded-[12px] animate-pulse opacity-30" />
    </div>
  );
};
