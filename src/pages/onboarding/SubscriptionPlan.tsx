import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check, Sparkles, Crown } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { BaseCard } from "@/components/layout/BaseCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      "Priority AI mentor",
      "Book human specialists",
      "Detailed numerology",
      "Custom rituals",
      "Ad-free experience",
    ],
    icon: Crown,
    highlighted: true,
  },
];

const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>("free");

  const handleContinue = (plan?: string) => {
    const planToUse = plan || selectedPlan;
    localStorage.setItem('selectedPlan', planToUse);
    navigate("/onboarding/create-account", { state: { selectedPlan: planToUse } });
  };

  const handleBack = () => {
    navigate("/onboarding/how-to-use");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={11}
      totalSteps={14}
      title="Choose your journey"
      subtitle="Begin free, deepen your path whenever you're ready"
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {plans.map(({ id, name, price, period, features, icon: Icon, highlighted }, index) => {
              const isSelected = selectedPlan === id;
              return (
                <BaseCard
                  key={id}
                  variant="interactive"
                  onClick={() => setSelectedPlan(id)}
                  className={cn(
                    "p-8 text-left transition-all duration-300 relative stagger-fade-up",
                    "hover:scale-[1.01] active:scale-[0.99]",
                    highlighted && !isSelected && "ring-2 ring-accent/30 border-accent/30",
                    isSelected && "scale-[1.01]",
                    isSelected && "bg-gradient-to-br from-accent/15 to-accent/8 shadow-[0_4px_20px_rgba(209,122,82,0.2)]"
                  )}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    ...(isSelected && {
                      border: '2px solid',
                      borderColor: 'hsl(42 38% 57%)',
                      boxShadow: '0 0 0 1px rgba(209, 122, 82, 0.3), 0 4px 20px rgba(209, 122, 82, 0.25), inset 0 0 20px rgba(209, 122, 82, 0.1)'
                    })
                  }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 rounded-[12px] pointer-events-none" 
                      style={{
                        border: '1px solid',
                        borderColor: 'rgba(209, 122, 82, 0.6)',
                        boxShadow: 'inset 0 0 30px rgba(209, 122, 82, 0.15), 0 0 20px rgba(209, 122, 82, 0.2)'
                      }}
                    />
                  )}
                  {highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-accent/90 to-accent rounded-full shadow-[0_2px_12px_rgba(209,122,82,0.4)]">
                      <span className="text-footnote font-semibold text-white">Most Popular</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-4 rounded-[12px] transition-all duration-300",
                        highlighted 
                          ? 'bg-gradient-to-br from-accent/25 to-accent/15' 
                          : 'bg-white/5'
                      )}
                      style={highlighted ? {
                        filter: 'drop-shadow(0 0 16px rgba(209, 122, 82, 0.5))'
                      } : {}}
                      >
                        <Icon className={cn(
                          "w-7 h-7 transition-all duration-300",
                          highlighted ? 'text-accent' : 'text-muted-foreground'
                        )} />
                      </div>
                      <div>
                        <h3 className="font-title text-title-2 font-medium text-foreground">{name}</h3>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-title-1 font-bold text-foreground">{price}</span>
                          <span className="text-footnote text-muted-foreground">/ {period}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-body text-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </BaseCard>
              );
            })}
          </div>

          {/* Two CTAs */}
          <div className="space-y-4 pt-2">
            <Button
              onClick={() => handleContinue("premium")}
              variant="default"
              className="w-full h-14 rounded-[10px] text-base font-semibold shadow-[0_4px_20px_rgba(209,122,82,0.4)] hover:shadow-[0_6px_28px_rgba(209,122,82,0.5)]"
            >
              Start Free Trial
            </Button>
            <Button
              onClick={() => handleContinue("free")}
              variant="outline"
              className="w-full h-14 rounded-[10px] text-base font-medium"
            >
              Continue with Free
            </Button>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default SubscriptionPlan;
