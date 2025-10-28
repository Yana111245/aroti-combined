interface CategoryPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const CategoryPill = ({ label, isActive = false, onClick }: CategoryPillProps) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 backdrop-blur-sm ${
        isActive 
          ? 'bg-accent/20 border border-accent/50 text-accent shadow-glow' 
          : 'bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20 hover:text-foreground'
      }`}
    >
      <span className="text-footnote font-medium">{label}</span>
    </button>
  );
};
