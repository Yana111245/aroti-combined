import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Plus, Receipt } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { SectionHeader } from "@/components/profile/SectionHeader";

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
    <div className="min-h-screen pb-24 pt-6 px-4 max-w-[420px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/profile/subscription")}
          className="rounded-full p-2 hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <SerifTitle>Billing & Payment</SerifTitle>
      </div>

      {/* Payment Methods */}
      <SectionHeader title="Payment Methods" className="mb-4" />
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <SoftCard key={method.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{method.icon}</span>
              <div>
                <p className="font-medium">{method.type}</p>
                {method.last4 && <p className="text-xs text-muted-foreground">•••• {method.last4}</p>}
              </div>
            </div>
            <button className="text-sm text-accent-gold hover:opacity-80">Edit</button>
          </SoftCard>
        ))}
        <SoftCard className="flex items-center justify-center gap-2 py-4 cursor-pointer hover:bg-white/90">
          <Plus className="h-5 w-5 text-accent-gold" />
          <span className="font-medium text-accent-gold">Add Payment Method</span>
        </SoftCard>
      </div>

      {/* Subscription Management */}
      <SoftCard className="mb-6">
        <h3 className="font-serif text-lg font-semibold mb-4">Subscription</h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Plan</span>
            <span className="font-medium">Premium</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next Charge</span>
            <span className="font-medium">$12.00 on Feb 15, 2025</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Renewal</span>
            <span className="font-medium">Monthly</span>
          </div>
        </div>
        <div className="pt-4 border-t border-border flex gap-3">
          <GradientButton variant="outline" className="flex-1 text-sm">
            Change Plan
          </GradientButton>
          <button className="text-sm text-destructive hover:opacity-80">
            Cancel
          </button>
        </div>
      </SoftCard>

      {/* Receipts */}
      <SectionHeader title="Receipts" className="mb-4" />
      <div className="space-y-3">
        {receipts.map((receipt) => (
          <SoftCard key={receipt.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt className="h-5 w-5 text-accent-gold" />
              <div>
                <p className="font-medium text-sm">{receipt.description}</p>
                <p className="text-xs text-muted-foreground">{receipt.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{receipt.amount}</p>
              <button className="text-xs text-accent-gold hover:opacity-80">Download</button>
            </div>
          </SoftCard>
        ))}
      </div>
    </div>
  );
}
