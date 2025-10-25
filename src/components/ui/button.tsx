import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-body font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Liquid Glass Primary (Copper filled)
        default: "rounded-full bg-gradient-accent text-accent-foreground hover:shadow-[var(--shadow-copper-glow)] hover:scale-[1.02] shadow-[var(--shadow-glass)]",
        
        // Liquid Glass Secondary (Glass with copper border)
        glass: "rounded-full glass-button text-foreground",
        
        // Liquid Glass Tertiary (Subtle glass)
        outline: "rounded-full backdrop-blur-[12px] bg-glass-secondary/50 border border-glass-border text-foreground hover:bg-glass-primary hover:border-glass-highlight",
        
        // Ghost
        ghost: "rounded-full hover:bg-glass-secondary/30 text-foreground",
        
        // Link
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
