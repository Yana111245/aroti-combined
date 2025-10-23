import { cn } from "@/lib/utils";

interface SoftCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const SoftCard = ({ children, className, onClick, style }: SoftCardProps) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={cn(
        "glass-card rounded-[28px] p-6 transition-all duration-300",
        onClick && "cursor-pointer active:scale-[0.98] hover:shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};
