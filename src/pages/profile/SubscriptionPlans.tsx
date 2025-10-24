import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";

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
    <div className="min-h-screen pb-24 pt-6 px-4 max-w-[420px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/profile")}
          className="rounded-full p-2 hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <SerifTitle>Subscription</SerifTitle>
      </div>

      <p className="text-sm text-muted-foreground mb-8 text-center">
        Premium opens deeper insights and priority sessions
      </p>

      {/* Free Plan */}
      <SoftCard className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-title text-xl font-semibold">Free</h3>
            <p className="text-sm text-muted-foreground">Basic access</p>
          </div>
          <div className="text-right">
            <p className="font-title text-2xl font-semibold">$0</p>
            <p className="text-xs text-muted-foreground">forever</p>
          </div>
        </div>
        <ul className="space-y-3 mb-4">
          {freePlan.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-muted-foreground" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <GradientButton variant="outline" className="w-full">
          Current Plan
        </GradientButton>
      </SoftCard>

      {/* Premium Plan */}
      <SoftCard className="border-2 border-accent-gold relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-gradient-accent text-white text-xs font-medium px-3 py-1 rounded-bl-xl">
          POPULAR
        </div>
        <div className="flex items-center justify-between mb-4 mt-2">
          <div>
            <h3 className="font-title text-xl font-semibold gradient-text">Premium</h3>
            <p className="text-sm text-muted-foreground">Full access</p>
          </div>
          <div className="text-right">
            <p className="font-title text-2xl font-semibold">$12</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
        </div>
        <ul className="space-y-3 mb-6">
          {premiumPlan.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-accent-gold" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <GradientButton className="w-full mb-3">
          Start Free Trial
        </GradientButton>
        <p className="text-xs text-center text-muted-foreground">
          7 days free, then $12/month. Cancel anytime.
        </p>
      </SoftCard>

      {/* Manage Link */}
      <button
        onClick={() => navigate("/profile/billing")}
        className="w-full text-center text-sm text-accent-gold hover:opacity-80 mt-6"
      >
        Manage Billing →
      </button>
    </div>
  );
}
