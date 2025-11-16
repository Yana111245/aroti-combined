import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type SortOption = 
  | "price-low" 
  | "price-high" 
  | "rating" 
  | "sessions" 
  | "newest" 
  | null;

interface SortDropdownProps {
  value: SortOption;
  onValueChange: (value: SortOption) => void;
}

const sortOptions = [
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating: High to Low" },
  { value: "sessions", label: "Most Sessions (Most Booked)" },
  { value: "newest", label: "Newest Specialists" },
] as const;

export const SortDropdown = ({ value, onValueChange }: SortDropdownProps) => {
  const selectedLabel = sortOptions.find(opt => opt.value === value)?.label || "Sort";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative px-4 py-2 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
          aria-label="Sort specialists"
        >
          {/* Liquid glass highlight */}
          <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
          <span className="text-footnote font-medium relative z-10 flex items-center gap-2">
            <span>{selectedLabel}</span>
            <ChevronDown className="w-4 h-4" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="home-tab-celestial liquid-glass-card bg-[rgba(23,20,31,0.85)] backdrop-filter backdrop-blur-[24px] backdrop-saturate-[180%] border border-glass-border shadow-glass min-w-[200px] p-1"
        align="start"
      >
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(
              "relative flex items-center gap-2 px-3 py-2 rounded-sm text-footnote font-medium cursor-pointer transition-colors",
              "text-foreground hover:bg-white/10 focus:bg-white/10 focus:text-foreground",
              "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              value === option.value && "bg-accent/10 text-accent"
            )}
            onClick={() => {
              const newValue = value === option.value ? null : (option.value as SortOption);
              onValueChange(newValue);
            }}
          >
            {value === option.value && (
              <Check className="w-4 h-4 text-accent" />
            )}
            <span className={cn(value === option.value && "text-accent")}>
              {option.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

