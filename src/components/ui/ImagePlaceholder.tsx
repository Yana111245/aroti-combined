import { Circle } from "lucide-react";

interface ImagePlaceholderProps {
  width?: number | string;
  height?: number;
  className?: string;
  category?: string;
}

export const ImagePlaceholder = ({ 
  width = 120, 
  height = 120, 
  className = "",
  category = "general"
}: ImagePlaceholderProps) => {
  return (
    <div 
      className={`bg-slate-900/30 border border-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm ${className}`}
      style={{ 
        width: typeof width === 'string' ? width : `${width}px`,
        height: `${height}px` 
      }}
    >
      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <Circle className="w-4 h-4 text-accent/40" />
      </div>
    </div>
  );
};
