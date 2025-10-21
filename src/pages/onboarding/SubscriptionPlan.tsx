import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { useState } from "react";
import { Check, Sparkles, Crown } from "lucide-react";

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
    navigate("/onboarding/create-account");
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <ProgressBar currentStep={7} totalSteps={9} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl">Choose your journey</h2>
            <p className="text-muted-foreground">
              Start free, upgrade anytime for deeper insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {plans.map(({ id, name, price, period, features, icon: Icon, highlighted }) => {
              const isSelected = selectedPlan === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedPlan(id)}
                  className={`glass-card p-8 text-left transition-all duration-300 hover:scale-[1.02] relative ${
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
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-secondary to-primary rounded-full">
                      <span className="text-xs font-semibold text-white">Most Popular</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-2xl ${highlighted ? 'bg-gradient-to-br from-secondary to-primary' : 'bg-muted'}`}>
                        <Icon className={`w-6 h-6 ${highlighted ? 'text-white' : 'text-accent'}`} />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl">{name}</h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">{price}</span>
                          <span className="text-sm text-muted-foreground">/ {period}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {highlighted && (
                      <Button
                        variant="pill"
                        size="lg"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlan(id);
                        }}
                      >
                        Upgrade to Premium
                      </Button>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            variant="pill"
            size="lg"
            onClick={handleContinue}
            className="w-full"
          >
            {selectedPlan === "premium" ? "Continue with Premium" : "Continue with Free"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Cancel anytime. 7-day free trial for Premium
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
