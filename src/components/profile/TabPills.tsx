import { cn } from "@/lib/utils";

interface TabPillsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const TabPills = ({ tabs, activeTab, onTabChange, className }: TabPillsProps) => {
  return (
    <div className={cn("flex gap-2 border-b border-border pb-2", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-all rounded-full",
            activeTab === tab
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab}
          {activeTab === tab && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 gradient-accent rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};
