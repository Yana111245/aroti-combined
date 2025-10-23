import { cn } from "@/lib/utils";

interface SerifTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SerifTitle = ({ children, className }: SerifTitleProps) => {
  return (
    <h1 className={cn("font-serif text-3xl font-semibold tracking-tight text-foreground", className)}>
      {children}
    </h1>
  );
};
