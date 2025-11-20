import { Wallet, Sparkles, Plus, History } from "lucide-react";
import { BaseCard } from "@/components/layout/BaseCard";
import { useNavigate } from "react-router-dom";

interface WalletActivityCardProps {
  credits: number;
  stars: number;
}

export const WalletActivityCard = ({ credits, stars }: WalletActivityCardProps) => {
  const navigate = useNavigate();

  return (
    <BaseCard className="p-5">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-title-3 font-title text-foreground">Wallet & Activity</h2>
          <Wallet className="w-5 h-5 text-accent" />
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Credits */}
          <div className="rounded-[12px] border border-accent/20 bg-accent/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-accent" />
              <p className="text-footnote text-muted-foreground uppercase tracking-wide">Credits</p>
            </div>
            <p className="text-title-1 font-semibold text-accent">{credits}</p>
            <p className="text-caption-2 text-muted-foreground mt-1">Available balance</p>
          </div>

          {/* Stars */}
          <div className="rounded-[12px] border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-footnote text-muted-foreground uppercase tracking-wide">Stars</p>
            </div>
            <p className="text-title-1 font-semibold text-foreground">{stars}</p>
            <p className="text-caption-2 text-muted-foreground mt-1">Points earned</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/profile/add-credits")}
            className="flex-1 px-4 py-2.5 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Credits
          </button>
          <button
            onClick={() => navigate("/profile/wallet-history")}
            className="flex-1 px-4 py-2.5 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 flex items-center justify-center gap-2"
          >
            <History className="w-4 h-4" />
            History
          </button>
        </div>
      </div>
    </BaseCard>
  );
};


