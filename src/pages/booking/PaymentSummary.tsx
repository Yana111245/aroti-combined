import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Check, CreditCard, Smartphone, Star } from "lucide-react";
import { specialists } from "@/data/specialists";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { buttonVariants } from "@/components/ui/button-variants";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function PaymentSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const specialist = specialists.find((s) => s.id === id);
  const { date, time } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState<"apple" | "card">("apple");
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!specialist || !date || !time) {
    return <div>Missing booking information</div>;
  }

  const handlePayment = async () => {
    if (!agreed) {
      toast.error("Please agree to the session policies");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Your session is confirmed! 🌙", {
        description: "Check your email for meeting details",
      });
      navigate("/booking/history");
    }, 2000);
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <BaseHeader 
        title="Confirm & Pay"
        subtitle="Your time for self-reflection is reserved"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate(-1),
          label: "Back to schedule"
        }}
      />
      
      {/* Main Content */}
      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-4">
        <main className="px-4 pb-32 mt-4" role="main" aria-label="Payment content">
          <section className="space-y-8" aria-labelledby="payment-content">
            <h2 id="payment-content" className="sr-only">Payment Content</h2>

            {/* Specialist Summary */}
            <BaseCard className="p-6 liquid-glass-card border border-glass-border/70 shadow-glass animate-fade-in">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={specialist.photo}
                  alt={specialist.name}
                  className="w-20 h-20 rounded-[14px] object-cover ring-2 ring-primary/20"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-headline font-semibold text-foreground">{specialist.name}</h3>
                      <p className="text-subhead text-muted-foreground">{specialist.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-footnote text-muted-foreground/70">From</p>
                      <p className="text-headline font-semibold text-foreground">${specialist.price} <span className="text-subhead font-normal text-muted-foreground">/ session</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="text-body font-semibold text-foreground">{specialist.rating}</span>
                    </div>
                    <span className="text-subhead text-muted-foreground/70">{specialist.reviewCount} reviews</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 text-subhead">
                <div className="flex justify-between">
                  <span className="text-muted-foreground/70">Scheduled for</span>
                  <span className="font-medium text-foreground">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground/70">Duration</span>
                  <span className="font-medium text-foreground">50 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground/70">Location</span>
                  <span className="font-medium text-foreground">Secure video call</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/5 text-headline font-semibold">
                  <span>Total due</span>
                  <span className="text-accent">${specialist.price}</span>
                </div>
                <p className="text-footnote text-muted-foreground/70">
                  We'll send the meeting link and reminder email as soon as your payment is confirmed.
                </p>
              </div>
            </BaseCard>

            {/* Payment Method */}
            <div className="animate-fade-in stagger-fade-up" style={{ animationDelay: "150ms" }}>
              <BaseSectionHeader 
                title="Payment Method"
              />
              <div className="space-y-3 mt-6">
                <button
                  onClick={() => setPaymentMethod("apple")}
                  className={cn(
                    "w-full liquid-glass-card p-4 flex items-center gap-4 rounded-[16px] border border-transparent transition-smooth",
                    paymentMethod === "apple" ? "border-accent/60 shadow-glass" : "hover:border-white/10"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-body font-medium text-foreground">Apple Pay</p>
                    <p className="text-footnote text-muted-foreground/70">Fast checkout with saved cards</p>
                  </div>
                  {paymentMethod === "apple" && (
                    <Check className="w-5 h-5 text-accent" />
                  )}
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "w-full liquid-glass-card p-4 flex items-center gap-4 rounded-[16px] border border-transparent transition-smooth",
                    paymentMethod === "card" ? "border-accent/60 shadow-glass" : "hover:border-white/10"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-body font-medium text-foreground">Credit Card</p>
                    <p className="text-footnote text-muted-foreground/70">Visa, Mastercard, AmEx supported</p>
                  </div>
                  {paymentMethod === "card" && (
                    <Check className="w-5 h-5 text-accent" />
                  )}
                </button>
              </div>
            </div>

            {/* Agreement */}
            <div className="stagger-fade-up" style={{ animationDelay: "200ms" }}>
              <BaseCard className="p-4 liquid-glass-card border border-white/5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    className="mt-1"
                  />
                  <span className="text-subhead text-foreground leading-relaxed">
                    I agree to Aroti's{" "}
                    <a href="#" className="text-accent underline underline-offset-2">
                      session policies
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-accent underline underline-offset-2">
                      cancellation terms
                    </a>
                    .
                  </span>
                </label>
              </BaseCard>
            </div>

            {/* Confirm Button */}
            <div className="stagger-fade-up" style={{ animationDelay: "250ms" }}>
              <Button
                onClick={handlePayment}
                disabled={!agreed || isProcessing}
                className={cn(
                  buttonVariants({ variant: "gold", size: "lg" }),
                  "w-full"
                )}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-glow-pulse">Processing...</span>
                  </span>
                ) : (
                  `Confirm & Pay $${specialist.price}`
                )}
              </Button>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
}
