import { useState } from "react";
import { Search, X, Clock, Star } from "lucide-react";

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

const popularSearches = [
  "Daily tarot",
  "Relationship spread",
  "Moon phases",
  "Crystal healing",
  "Meditation guide",
  "Birth chart"
];

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed top-0 left-0 right-0 bg-background border-b border-border pt-[env(safe-area-inset-top)]">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search spreads, topics, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-[24px] bg-card border border-border focus:border-accent focus:outline-none font-body"
                autoFocus
              />
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-card flex items-center justify-center"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-[120px] px-6 pb-6 space-y-6">
        {searchQuery === "" ? (
          <>
            {/* Recent Searches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-title text-lg font-medium text-foreground">Recent</h3>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="w-full text-left p-3 rounded-[16px] bg-card hover:bg-card/80 transition-colors"
                  >
                    <span className="font-body text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-title text-lg font-medium text-foreground">Popular</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="px-3 py-2 rounded-[24px] bg-card border border-border hover:border-accent transition-colors"
                  >
                    <span className="text-sm font-body text-foreground">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <h3 className="font-title text-lg font-medium text-foreground mb-3">
              Results for "{searchQuery}"
            </h3>
            <div className="text-center py-8">
              <p className="font-body text-muted-foreground">
                Search functionality coming soon...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
