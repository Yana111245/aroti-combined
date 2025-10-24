import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const Heading1 = ({ children, className }: TypographyProps) => (
  <h1 className={cn("font-title text-title-xl font-normal", className)}>
    {children}
  </h1>
);

export const Heading2 = ({ children, className }: TypographyProps) => (
  <h2 className={cn("font-title text-title-lg font-medium", className)}>
    {children}
  </h2>
);

export const Heading3 = ({ children, className }: TypographyProps) => (
  <h3 className={cn("font-title text-title-md font-medium", className)}>
    {children}
  </h3>
);

export const Body = ({ children, className }: TypographyProps) => (
  <p className={cn("text-body-lg", className)}>
    {children}
  </p>
);

export const BodySmall = ({ children, className }: TypographyProps) => (
  <p className={cn("text-body-md", className)}>
    {children}
  </p>
);

export const Caption = ({ children, className }: TypographyProps) => (
  <p className={cn("text-xs text-muted-foreground", className)}>
    {children}
  </p>
);
