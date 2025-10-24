import { cn } from "@/lib/utils";

interface SerifTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SerifTitle = ({ children, className }: SerifTitleProps) => {
  return (
    <h1 className={cn("font-title text-title-xl font-medium text-foreground", className)}>
      {children}
    </h1>
  );
};
