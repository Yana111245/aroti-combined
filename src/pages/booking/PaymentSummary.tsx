import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Star } from "lucide-react";
import { specialists } from "@/data/specialists";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { StripeCardForm } from "@/components/payment/StripeCardForm";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function PaymentSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const specialist = specialists.find((s) => s.id === id);
  const { date, time } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState<"apple" | "card" | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const cardFormRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Smooth scroll to show relevant content based on payment method
  useEffect(() => {
    if (paymentMethod && confirmButtonRef.current) {
      // For credit card, wait longer to allow form expansion animation
      const delay = paymentMethod === "card" ? 400 : 300;
      setTimeout(() => {
        confirmButtonRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, delay);
    }
  }, [paymentMethod]);

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
      navigate(`/booking/confirmation/${specialist.id}`, {
        state: { specialist, date, time }
      });
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
          <section className="space-y-6" aria-labelledby="payment-content">
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
            <div className="stagger-fade-up" style={{ animationDelay: "150ms" }}>
              <BaseSectionHeader 
                title="Payment Method"
              />
              <div className="space-y-3 mt-6">
                <button
                  onClick={() => setPaymentMethod("apple")}
                  className={cn(
                    "relative w-full p-4 flex items-center gap-4 rounded-[16px] transition-all duration-300 overflow-hidden",
                    paymentMethod === "apple"
                      ? "liquid-glass-card bg-accent/20 border border-accent/50 shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]"
                      : "liquid-glass-card bg-white/5 border border-glass-border hover:bg-white/10 hover:border-glass-highlight backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
                  )}
                >
                  {/* Liquid glass highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                  
                  <div className={cn(
                    "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative z-10",
                    paymentMethod === "apple" ? "bg-accent/20" : ""
                  )}>
                    <Smartphone className={cn(
                      "w-5 h-5",
                      paymentMethod === "apple" ? "text-accent" : "text-foreground"
                    )} />
                  </div>
                  <div className="flex-1 text-left relative z-10">
                    <p className={cn(
                      "text-body font-medium",
                      paymentMethod === "apple" ? "text-accent" : "text-foreground"
                    )}>Apple Pay</p>
                    <p className={cn(
                      "text-footnote",
                      paymentMethod === "apple" ? "text-accent/70" : "text-muted-foreground/70"
                    )}>Fast checkout with saved cards</p>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={cn(
                    "relative w-full p-4 flex items-center gap-4 rounded-[16px] transition-all duration-300 overflow-hidden",
                    paymentMethod === "card"
                      ? "liquid-glass-card bg-accent/20 border border-accent/50 shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]"
                      : "liquid-glass-card bg-white/5 border border-glass-border hover:bg-white/10 hover:border-glass-highlight backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass"
                  )}
                >
                  {/* Liquid glass highlight */}
                  <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                  
                  <div className={cn(
                    "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center relative z-10",
                    paymentMethod === "card" ? "bg-accent/20" : ""
                  )}>
                    <CreditCard className={cn(
                      "w-5 h-5",
                      paymentMethod === "card" ? "text-accent" : "text-foreground"
                    )} />
                  </div>
                  <div className="flex-1 text-left relative z-10">
                    <p className={cn(
                      "text-body font-medium",
                      paymentMethod === "card" ? "text-accent" : "text-foreground"
                    )}>Credit Card</p>
                    <p className={cn(
                      "text-footnote",
                      paymentMethod === "card" ? "text-accent/70" : "text-muted-foreground/70"
                    )}>Visa, Mastercard, AmEx supported</p>
                  </div>
                </button>
              </div>

              {/* Expandable Credit Card Form */}
              {paymentMethod === "card" && (
                <div 
                  ref={cardFormRef}
                  className="overflow-hidden animate-accordion-down mt-6"
                >
                  <BaseCard className="p-6 liquid-glass-card border border-accent/30">
                    <StripeCardForm
                      onSuccess={(paymentMethodId) => {
                        toast.success("Payment method saved!");
                        console.log("Payment method ID:", paymentMethodId);
                      }}
                      onError={(error) => {
                        toast.error(error);
                      }}
                      loading={isProcessing}
                    />
                  </BaseCard>
                </div>
              )}
            </div>

            {/* Agreement */}
            <div className="stagger-fade-up px-6 mt-2" style={{ animationDelay: "200ms" }}>
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-0.5"
                />
                <span className="text-footnote text-foreground leading-relaxed">
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
            </div>

            {/* Confirm Button */}
            <div ref={confirmButtonRef} className="stagger-fade-up" style={{ animationDelay: "250ms" }}>
              <button
                onClick={handlePayment}
                disabled={!agreed || isProcessing}
                className={cn(
                  "w-full px-5 py-3 rounded-[10px] text-subhead font-body font-medium transition-all duration-200",
                  "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
                  (!agreed || isProcessing)
                    ? "bg-white/10 text-muted-foreground cursor-not-allowed"
                    : "bg-accent text-white hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
                )}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  `Confirm & Pay $${specialist.price}`
                )}
              </button>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
}
