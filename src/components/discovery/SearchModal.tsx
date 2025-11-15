import { useState } from "react";
import { Search, X, Clock } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const recentSearches = [
  "Celtic Cross",
  "Love reading",
  "Career guidance",
  "Three card spread"
];

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      {/* Header with Search Input */}
      <div 
        className="fixed top-0 left-0 right-0 liquid-glass-card border-b border-glass-border shadow-elevated pt-[env(safe-area-inset-top)]"
        onClick={handleContentClick}
      >
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent z-10" />
              <input
                type="text"
                placeholder="Search spreads, topics, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-white/5 bg-card/80 backdrop-blur-[12px] text-base text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:bg-card focus-visible:border-accent/30 transition-all duration-200 font-body"
                autoFocus
                onClick={handleContentClick}
              />
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full liquid-glass-card border border-glass-border flex items-center justify-center hover:bg-glass-primary hover:border-accent/30 transition-all duration-200 apple-touch-target-comfortable"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div 
        className="pt-[calc(80px+env(safe-area-inset-top))] px-4 pb-6 pb-safe overflow-y-auto h-full"
        onClick={handleContentClick}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          {searchQuery === "" ? (
            <>
              {/* Recent Searches */}
              <div className="mt-4">
                <div className="flex items-center gap-4 mb-3">
                  <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                  <h3 className="font-title text-title-3 font-medium text-foreground">Recent</h3>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(search)}
                      className="w-full text-left px-3 py-2 rounded-[10px] bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-200 group"
                    >
                      <span className="font-body text-subhead text-foreground group-hover:text-accent transition-colors">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="mt-4">
              <h3 className="font-title text-title-3 font-medium text-foreground mb-4">
                Results for "<span className="text-accent">{searchQuery}</span>"
              </h3>
              <div className="text-center py-12">
                <div className="liquid-glass-card rounded-[16px] p-8 border border-glass-border">
                  <p className="font-body text-body text-muted-foreground">
                    Search functionality coming soon...
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
