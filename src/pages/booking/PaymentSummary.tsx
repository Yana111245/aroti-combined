import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Check, CreditCard, Smartphone } from "lucide-react";
import { specialists } from "@/data/specialists";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { buttonVariants } from "@/components/ui/button-variants";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 pb-24 mt-4" role="main" aria-label="Payment content">
          <section className="space-y-6" aria-labelledby="payment-content">
            <h2 id="payment-content" className="sr-only">Payment Content</h2>

            {/* Session Details */}
            <div className="animate-fade-in">
              <BaseCard className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <img
              src={specialist.photo}
              alt={specialist.name}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-title-3 mb-1">
                {specialist.name}
              </h3>
              <p className="text-muted-foreground">{specialist.specialty}</p>
            </div>
          </div>

          <div className="space-y-3 text-subhead">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium text-foreground">
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}{" "}
                at {time}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium text-foreground">50 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Session Price</span>
              <span className="font-medium text-foreground">
                ${specialist.price}
              </span>
            </div>
            <div className="flex justify-between text-headline font-semibold pt-3 border-t border-border">
              <span>Total</span>
              <span className="text-gradient-gold">${specialist.price}</span>
            </div>
          </div>
              </BaseCard>
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-headline font-semibold text-foreground mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => setPaymentMethod("apple")}
                  className={`w-full liquid-glass-card p-4 flex items-center gap-4 transition-smooth ${
                    paymentMethod === "apple"
                      ? "ring-2 ring-primary shadow-lg"
                      : ""
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-foreground" />
                  <span className="font-medium text-body text-foreground">Apple Pay</span>
                  {paymentMethod === "apple" && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full liquid-glass-card p-4 flex items-center gap-4 transition-smooth ${
                    paymentMethod === "card"
                      ? "ring-2 ring-primary shadow-lg"
                      : ""
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-foreground" />
                  <span className="font-medium text-body text-foreground">Credit Card</span>
                  {paymentMethod === "card" && (
                    <Check className="w-5 h-5 text-primary ml-auto" />
                  )}
                </button>
              </div>
            </div>

            {/* Agreement */}
            <div>
              <BaseCard className="p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-1"
            />
            <span className="text-subhead text-foreground">
              I agree to Aroti's{" "}
              <a href="#" className="text-primary underline">
                session policies
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary underline">
                cancellation terms
              </a>
              .
            </span>
          </label>
              </BaseCard>
            </div>

            {/* Confirm Button */}
            <div>
              <Button
                onClick={handlePayment}
                disabled={!agreed || isProcessing}
                className={buttonVariants({ variant: "gold", size: "lg" }) + " w-full"}
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
