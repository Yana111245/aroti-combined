import * as React from "react";
import { cn } from "@/lib/utils";

export interface FrostedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "minimal";
}

const FrostedCard = React.forwardRef<HTMLDivElement, FrostedCardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[16px] backdrop-blur-frosted shadow-soft",
          variant === "default" && "bg-card/70 p-6",
          variant === "minimal" && "bg-card/50 p-4",
          className
        )}
        {...props}
      />
    );
  }
);
FrostedCard.displayName = "FrostedCard";

export { FrostedCard };
