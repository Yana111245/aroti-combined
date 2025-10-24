interface CategoryPillProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const CategoryPill = ({ icon, label, isActive = false, onClick }: CategoryPillProps) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-[24px] flex items-center gap-2 transition-all ${
        isActive 
          ? 'bg-accent/20 border border-accent text-accent' 
          : 'bg-card border border-border text-foreground hover:border-accent'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-body font-medium">{label}</span>
    </button>
  );
};
