interface CategoryPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const CategoryPill = ({ label, isActive = false, onClick }: CategoryPillProps) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full flex items-center justify-center whitespace-nowrap w-fit transition-all duration-200 ${
        isActive 
          ? 'bg-transparent border border-accent text-accent shadow-[0_2px_8px_rgba(0,0,0,0.05)]' 
          : 'bg-accent text-white hover:scale-105 hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]'
      }`}
      style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', fontWeight: 500 }}
    >
      <span>{label}</span>
    </button>
  );
};
