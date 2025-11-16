interface CategoryChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const CategoryChip = ({ label, active = false, onClick }: CategoryChipProps) => {
  return (
    <button 
      onClick={onClick}
      className={`relative px-4 py-2 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden ${
        active 
          ? 'liquid-glass-card bg-accent/20 border border-accent/50 text-accent shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]' 
          : 'liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass'
      }`}
      aria-pressed={active}
      aria-label={`Filter by ${label}`}
    >
      {/* Liquid glass highlight */}
      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
      
      <span className="text-footnote font-medium relative z-10">{label}</span>
    </button>
  );
};
