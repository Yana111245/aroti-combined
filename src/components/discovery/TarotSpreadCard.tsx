interface TarotSpreadCardProps {
  spreadName: string;
  cardCount: number;
  description: string;
  onClick?: () => void;
  className?: string;
}

export const TarotSpreadCard = ({ 
  spreadName, 
  cardCount, 
  description, 
  onClick,
  className = "" 
}: TarotSpreadCardProps) => {
  return (
    <div 
      className={`w-[180px] h-[300px] bg-gradient-to-br from-[hsl(235,30%,11%)] to-[hsl(240,28%,13%)] rounded-[12px] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.35)] relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      
      {/* Decorative border with copper accents */}
      <div className="absolute inset-2 border border-accent/20 rounded-[8px] opacity-60" />
      <div className="absolute inset-3 border border-accent/10 rounded-[6px] opacity-40" />
      
      {/* Corner decorative elements */}
      <div className="absolute top-2 left-2 w-2 h-2 border border-accent/30 rounded-full flex items-center justify-center">
        <div className="w-0.5 h-0.5 bg-accent/50 rounded-full" />
      </div>
      <div className="absolute top-2 right-2 w-2 h-2 border border-accent/30 rounded-full flex items-center justify-center">
        <div className="w-0.5 h-0.5 bg-accent/50 rounded-full" />
      </div>
      <div className="absolute bottom-2 left-2 w-2 h-2 border border-accent/30 rounded-full flex items-center justify-center">
        <div className="w-0.5 h-0.5 bg-accent/50 rounded-full" />
      </div>
      <div className="absolute bottom-2 right-2 w-2 h-2 border border-accent/30 rounded-full flex items-center justify-center">
        <div className="w-0.5 h-0.5 bg-accent/50 rounded-full" />
      </div>
      
      {/* Moon crescent at top - static */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          {/* Main crescent */}
          <div className="w-6 h-6 border-2 border-accent/50 rounded-full relative">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-br from-[hsl(235,30%,11%)] to-[hsl(240,28%,13%)] rounded-full transform -translate-x-1/2" />
            <div className="absolute top-0.5 left-1/2 w-1 h-1 bg-accent/30 rounded-full transform -translate-x-1/2" />
          </div>
          {/* Glow effect - static */}
          <div className="absolute -inset-1 bg-accent/20 rounded-full blur-sm opacity-60" />
        </div>
      </div>
      
      {/* Star constellation pattern - static */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-[12%] left-[18%] w-0.5 h-0.5 bg-accent/70 rounded-full" />
        <div className="absolute top-[22%] right-[22%] w-0.5 h-0.5 bg-accent/70 rounded-full" />
        <div className="absolute top-[32%] left-[12%] w-0.5 h-0.5 bg-accent/70 rounded-full" />
        <div className="absolute top-[42%] right-[18%] w-0.5 h-0.5 bg-accent/70 rounded-full" />
        <div className="absolute top-[52%] left-[22%] w-0.5 h-0.5 bg-accent/70 rounded-full" />
        <div className="absolute top-[62%] right-[12%] w-0.5 h-0.5 bg-accent/70 rounded-full" />
        <div className="absolute top-[72%] left-[15%] w-0.5 h-0.5 bg-accent/70 rounded-full" />
        <div className="absolute top-[82%] right-[25%] w-0.5 h-0.5 bg-accent/70 rounded-full" />
      </div>
      
      {/* Mystical energy lines - static */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[20%] left-1/2 w-px h-4 bg-gradient-to-b from-accent/30 to-transparent transform -translate-x-1/2" />
        <div className="absolute top-[30%] left-1/2 w-px h-3 bg-gradient-to-b from-accent/20 to-transparent transform -translate-x-1/2" />
        <div className="absolute top-[40%] left-1/2 w-px h-2 bg-gradient-to-b from-accent/15 to-transparent transform -translate-x-1/2" />
      </div>
      
      {/* Central mystical figure silhouette - static */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Figure silhouette */}
          <div className="relative w-12 h-16">
            {/* Head */}
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-gradient-to-br from-accent/40 to-accent/20 rounded-full transform -translate-x-1/2 shadow-lg" />
            
            {/* Body */}
            <div className="absolute top-4 left-1/2 w-6 h-8 bg-gradient-to-br from-accent/30 to-accent/15 rounded-full transform -translate-x-1/2" />
            
            {/* Arms */}
            <div className="absolute top-5 left-2 w-0.5 h-5 bg-gradient-to-b from-accent/35 to-accent/20 rounded-full transform rotate-12" />
            <div className="absolute top-5 right-2 w-0.5 h-5 bg-gradient-to-b from-accent/35 to-accent/20 rounded-full transform -rotate-12" />
            
            {/* Legs */}
            <div className="absolute top-10 left-1/2 w-0.5 h-6 bg-gradient-to-b from-accent/35 to-accent/20 rounded-full transform -translate-x-1/2" />
            <div className="absolute top-10 left-1/2 w-0.5 h-6 bg-gradient-to-b from-accent/35 to-accent/20 rounded-full transform -translate-x-1/2 translate-x-0.5" />
            
            {/* Walking stick */}
            <div className="absolute top-4 right-0.5 w-0.5 h-10 bg-gradient-to-b from-accent/30 to-accent/15 rounded-full transform rotate-15" />
            
            {/* Bag */}
            <div className="absolute top-7 left-0.5 w-2 h-3 bg-gradient-to-br from-accent/35 to-accent/20 rounded transform rotate-12 shadow-md" />
            <div className="absolute top-8 left-0 w-0.5 h-1 bg-accent/25 rounded-full transform rotate-12" />
          </div>
          
          {/* Static glow effect around figure */}
          <div className="absolute -inset-3 bg-gradient-to-r from-accent/15 via-accent/10 to-accent/15 rounded-full blur-md opacity-70" />
          <div className="absolute -inset-2 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-full blur-sm opacity-50" />
        </div>
      </div>
      
      {/* Card count indicator */}
      <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full">
        <span className="text-[10px] text-white font-body">{cardCount} cards</span>
      </div>
      
      {/* Spread name and description at bottom */}
      <div className="absolute bottom-3 left-0 right-0 text-center px-2">
        <div className="text-[10px] text-accent/80 font-bold tracking-wider mb-1">{cardCount}</div>
        <div className="text-[8px] text-accent/60 font-medium tracking-widest leading-tight">{spreadName.toUpperCase()}</div>
        <div className="text-[7px] text-accent/50 font-normal mt-1 leading-tight">{description}</div>
      </div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent rounded-[12px]" />
      
      {/* Static mystical aura effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 rounded-[12px] opacity-30" />
    </div>
  );
};
