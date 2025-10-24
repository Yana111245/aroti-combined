import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { SearchModal } from "./SearchModal";

export const DiscoveryHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="px-6 pt-4 pb-4 bg-background border-b border-border">
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <div>
            <h1 className="text-[36px] font-title font-medium text-foreground">Discovery</h1>
          </div>
          
          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Points Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-body font-medium text-accent">120</span>
            </div>
            
            {/* Search Button */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-card shadow-soft flex items-center justify-center hover:shadow-glow transition-all"
            >
              <Search className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};
