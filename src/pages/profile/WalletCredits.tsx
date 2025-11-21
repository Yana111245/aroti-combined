import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wallet, History } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function WalletCredits() {
  const navigate = useNavigate();
  const credits = 0;
  const transactions: any[] = []; // Empty for V1

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Wallet & Credits"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-4">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Wallet and credits">
          {/* Balance Card */}
          <BaseCard className="p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="h-5 w-5 text-accent" />
              <h2 className="text-headline font-semibold text-foreground">Current credits</h2>
            </div>
            <p className="text-title-1 font-semibold text-foreground mb-3">{credits}</p>
            <p className="text-body text-muted-foreground">
              Use credits to unlock readings, rituals, and personalized insights.
            </p>
          </BaseCard>

          {/* History Section */}
          <BaseCard className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <History className="h-5 w-5 text-accent" />
              <h2 className="text-headline font-semibold text-foreground">History</h2>
            </div>
            {transactions.length === 0 ? (
              <p className="text-body text-muted-foreground">No transactions yet.</p>
            ) : (
              <div className="space-y-3">
                {/* Transaction items would go here in future versions */}
              </div>
            )}
          </BaseCard>
        </main>
      </div>
    </PageWrapper>
  );
}

