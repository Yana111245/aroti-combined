interface TarotCardBackProps {
  className?: string;
}

export const TarotCardBack = ({ className = "" }: TarotCardBackProps) => {
  return (
    <div 
      className={`w-[180px] h-[300px] bg-gradient-to-br from-[hsl(235,30%,11%)] to-[hsl(240,28%,13%)] rounded-[12px] border border-[rgba(255,255,255,0.08)] shadow-[0_8px_32px_rgba(0,0,0,0.45),0_2px_8px_rgba(0,0,0,0.35)] relative overflow-hidden ${className}`}
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
      
      {/* Central mystical pattern - scaled down */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 border border-accent/30 rounded-full relative">
            {/* Inner ring */}
            <div className="absolute inset-2 border border-accent/20 rounded-full">
              {/* Central pattern */}
              <div className="absolute inset-2 flex items-center justify-center">
                <div className="w-8 h-8 border border-accent/40 rounded-full relative">
                  {/* Central dot */}
                  <div className="absolute inset-2 bg-accent/30 rounded-full" />
                  {/* Radiating lines */}
                  <div className="absolute top-1 left-1/2 w-px h-2 bg-accent/40 transform -translate-x-1/2" />
                  <div className="absolute bottom-1 left-1/2 w-px h-2 bg-accent/40 transform -translate-x-1/2" />
                  <div className="absolute left-1 top-1/2 w-2 h-px bg-accent/40 transform -translate-y-1/2" />
                  <div className="absolute right-1 top-1/2 w-2 h-px bg-accent/40 transform -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements around the pattern */}
          <div className="absolute -top-2 left-1/2 w-1 h-1 bg-accent/50 rounded-full transform -translate-x-1/2" />
          <div className="absolute -bottom-2 left-1/2 w-1 h-1 bg-accent/50 rounded-full transform -translate-x-1/2" />
          <div className="absolute top-1/2 -left-2 w-1 h-1 bg-accent/50 rounded-full transform -translate-y-1/2" />
          <div className="absolute top-1/2 -right-2 w-1 h-1 bg-accent/50 rounded-full transform -translate-y-1/2" />
        </div>
      </div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.01] to-transparent rounded-[12px]" />
      
      {/* Static mystical aura effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 rounded-[12px] opacity-30" />
    </div>
  );
};










