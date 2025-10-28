import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Plus, Receipt } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { SectionHeader } from "@/components/profile/SectionHeader";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function BillingPayment() {
  const navigate = useNavigate();

  const paymentMethods = [
    { id: 1, type: "Apple Pay", last4: "", icon: "🍎" },
    { id: 2, type: "Card", last4: "1234", icon: "💳" },
  ];

  const receipts = [
    { id: 1, date: "Jan 15, 2025", amount: "$12.00", description: "Premium Subscription" },
    { id: 2, date: "Dec 15, 2024", amount: "$12.00", description: "Premium Subscription" },
    { id: 3, date: "Nov 15, 2024", amount: "$75.00", description: "Session with Luna Clarke" },
  ];

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Billing & Payment"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile/subscription"),
          label: "Back to subscription"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Billing and payment">
          {/* Payment Methods */}
          <SectionHeader title="Payment Methods" className="mb-4" />
          <div className="space-y-3 mb-6">
            {paymentMethods.map((method) => (
              <BaseCard key={method.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-title-2">{method.icon}</span>
                  <div>
                    <p className="font-medium text-headline">{method.type}</p>
                    {method.last4 && <p className="text-footnote text-muted-foreground">•••• {method.last4}</p>}
                  </div>
                </div>
                <button className="text-subhead text-accent hover:opacity-80">Edit</button>
              </BaseCard>
            ))}
            <BaseCard className="flex items-center justify-center gap-2 py-4 cursor-pointer hover:bg-white/90">
              <Plus className="h-5 w-5 text-accent" />
              <span className="font-medium text-accent">Add Payment Method</span>
            </BaseCard>
          </div>

          {/* Subscription Management */}
          <BaseCard className="mb-6">
        <h3 className="font-title text-headline font-semibold mb-4">Subscription</h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-subhead">
            <span className="text-muted-foreground">Current Plan</span>
            <span className="font-medium">Premium</span>
          </div>
          <div className="flex items-center justify-between text-subhead">
            <span className="text-muted-foreground">Next Charge</span>
            <span className="font-medium">$12.00 on Feb 15, 2025</span>
          </div>
          <div className="flex items-center justify-between text-subhead">
            <span className="text-muted-foreground">Renewal</span>
            <span className="font-medium">Monthly</span>
          </div>
        </div>
        <div className="pt-4 border-t border-border flex gap-3">
          <GradientButton variant="outline" className="flex-1 text-subhead">
            Change Plan
          </GradientButton>
          <button className="text-subhead text-destructive hover:opacity-80">
            Cancel
          </button>
          </div>
          </BaseCard>

          {/* Receipts */}
          <SectionHeader title="Receipts" className="mb-4" />
          <div className="space-y-3">
            {receipts.map((receipt) => (
              <BaseCard key={receipt.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Receipt className="h-5 w-5 text-accent" />
                  <div>
                    <p className="font-medium text-subhead">{receipt.description}</p>
                    <p className="text-footnote text-muted-foreground">{receipt.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{receipt.amount}</p>
                  <button className="text-footnote text-accent hover:opacity-80">Download</button>
                </div>
              </BaseCard>
            ))}
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
