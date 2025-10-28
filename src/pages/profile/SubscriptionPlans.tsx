import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function SubscriptionPlans() {
  const navigate = useNavigate();

  const freePlan = [
    "Limited AI chat messages",
    "Basic tarot spreads",
    "Daily horoscopes",
    "Community access",
  ];

  const premiumPlan = [
    "Unlimited AI chat",
    "All exclusive spreads",
    "Priority booking",
    "Advanced chart readings",
    "Personalized rituals",
    "10% off specialist sessions",
    "Ad-free experience",
  ];

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Subscription"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in" role="main" aria-label="Subscription plans">
          <p className="text-subhead text-muted-foreground mb-8 text-center pt-6">
            Premium opens deeper insights and priority sessions
          </p>

          {/* Free Plan */}
          <BaseCard className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-title text-title-3 font-semibold">Free</h3>
            <p className="text-subhead text-muted-foreground">Basic access</p>
          </div>
          <div className="text-right">
            <p className="font-title text-title-2 font-semibold">$0</p>
            <p className="text-footnote text-muted-foreground">forever</p>
          </div>
        </div>
        <ul className="space-y-3 mb-4">
          {freePlan.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-subhead">
              <Check className="h-4 w-4 text-muted-foreground" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
            <GradientButton variant="outline" className="w-full">
              Current Plan
            </GradientButton>
          </BaseCard>

          {/* Premium Plan */}
          <BaseCard className="border-2 border-accent relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-gold text-white text-footnote font-medium px-3 py-1 rounded-bl-xl">
              POPULAR
            </div>
        <div className="flex items-center justify-between mb-4 mt-2">
          <div>
            <h3 className="font-title text-title-3 font-semibold gradient-text">Premium</h3>
            <p className="text-subhead text-muted-foreground">Full access</p>
          </div>
          <div className="text-right">
            <p className="font-title text-title-2 font-semibold">$12</p>
            <p className="text-footnote text-muted-foreground">per month</p>
          </div>
        </div>
        <ul className="space-y-3 mb-6">
          {premiumPlan.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-subhead">
              <Check className="h-4 w-4 text-accent-gold" />
              <span>{feature}</span>
            </li>
          ))}
            </ul>
            <GradientButton className="w-full mb-3">
              Start Free Trial
            </GradientButton>
            <p className="text-footnote text-center text-muted-foreground">
              7 days free, then $12/month. Cancel anytime.
            </p>
          </BaseCard>

          {/* Manage Link */}
          <button
            onClick={() => navigate("/profile/billing")}
            className="w-full text-center text-subhead text-accent hover:opacity-80 mt-6"
          >
            Manage Billing →
          </button>
        </main>
      </div>
    </PageWrapper>
  );
}
