import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className }: TypographyProps) => (
  <h1 className={cn("font-serif text-4xl font-bold tracking-tight", className)}>
    {children}
  </h1>
);

export const Heading2 = ({ children, className }: TypographyProps) => (
  <h2 className={cn("font-serif text-3xl font-bold tracking-tight", className)}>
    {children}
  </h2>
);

export const Heading3 = ({ children, className }: TypographyProps) => (
  <h3 className={cn("font-serif text-2xl font-semibold", className)}>
    {children}
  </h3>
);

export const Body = ({ children, className }: TypographyProps) => (
  <p className={cn("text-base leading-relaxed", className)}>
    {children}
  </p>
);

export const BodySmall = ({ children, className }: TypographyProps) => (
  <p className={cn("text-sm leading-relaxed", className)}>
    {children}
  </p>
);

export const Caption = ({ children, className }: TypographyProps) => (
  <p className={cn("text-xs text-muted-foreground", className)}>
    {children}
  </p>
);
