import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check, Sparkles, Crown } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "Daily card reading",
      "Basic astrology insights",
      "AI guidance",
      "Reflection journal",
    ],
    icon: Sparkles,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$9.99",
    period: "per month",
    features: [
      "Unlimited readings",
      "Advanced astrology charts",
      "Priority AI mentor access",
      "Book human specialists",
      "Detailed numerology reports",
      "Custom rituals & practices",
      "Ad-free experience",
    ],
    icon: Crown,
    highlighted: true,
  },
];

const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>("free");

  const handleContinue = () => {
    localStorage.setItem('selectedPlan', selectedPlan);
    navigate("/onboarding/create-account", { state: { selectedPlan } });
  };

  const handleBack = () => {
    navigate("/onboarding/privacy");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={7}
      totalSteps={9}
      title="Choose your journey"
      subtitle="Start free, upgrade anytime for deeper insights"
      ctaButton={
        <CTAButton
          onClick={handleContinue}
        >
          {selectedPlan === "premium" ? "Continue with Premium" : "Continue with Free"}
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-2xl mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {plans.map(({ id, name, price, period, features, icon: Icon, highlighted }) => {
              const isSelected = selectedPlan === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedPlan(id)}
                  className={`glass-card p-6 text-left transition-all duration-300 hover:scale-[1.02] relative ${
                    highlighted
                      ? "ring-2 ring-accent"
                      : ""
                  } ${
                    isSelected && !highlighted
                      ? "bg-white/90"
                      : ""
                  }`}
                >
                  {highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-secondary to-primary rounded-full">
                      <span className="text-xs font-semibold text-white">Most Popular</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${highlighted ? 'bg-gradient-to-br from-secondary to-primary' : 'bg-muted'}`}>
                        <Icon className={`w-5 h-5 ${highlighted ? 'text-white' : 'text-accent'}`} />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl">{name}</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold">{price}</span>
                          <span className="text-sm text-muted-foreground">/ {period}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Cancel anytime. 7-day free trial for Premium
          </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SubscriptionPlan;
