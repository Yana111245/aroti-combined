import { Sparkles } from "lucide-react";
import { BaseHeader } from "@/components/layout/BaseHeader";

export const DiscoveryHeader = () => {
  return (
      <BaseHeader 
        title="Discovery"
        rightActions={
          <div className="flex items-center gap-3">
            {/* Points Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-subhead font-body font-medium text-accent">120</span>
            </div>
          </div>
        }
      />
  );
};
