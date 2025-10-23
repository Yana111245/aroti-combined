import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Check, CreditCard, Smartphone } from "lucide-react";
import { specialists } from "@/data/specialists";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/booking/BottomNav";
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
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-white/90 transition-smooth"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Confirm & Pay
          </h1>
          <p className="text-muted-foreground text-sm">
            Your time for self-reflection is reserved.
          </p>
        </div>
      </header>

      {/* Session Details */}
      <div className="px-6 mb-6">
        <div className="glass-card p-6 animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <img
              src={specialist.photo}
              alt={specialist.name}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-xl mb-1">
                {specialist.name}
              </h3>
              <p className="text-muted-foreground">{specialist.specialty}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
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
            <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
              <span>Total</span>
              <span className="text-gradient-gold">${specialist.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Payment Method
        </h2>
        <div className="space-y-3">
          <button
            onClick={() => setPaymentMethod("apple")}
            className={`w-full glass-card p-4 flex items-center gap-4 transition-smooth ${
              paymentMethod === "apple"
                ? "ring-2 ring-primary shadow-lg"
                : "hover:bg-white/90"
            }`}
          >
            <Smartphone className="w-5 h-5 text-foreground" />
            <span className="font-medium text-foreground">Apple Pay</span>
            {paymentMethod === "apple" && (
              <Check className="w-5 h-5 text-primary ml-auto" />
            )}
          </button>
          <button
            onClick={() => setPaymentMethod("card")}
            className={`w-full glass-card p-4 flex items-center gap-4 transition-smooth ${
              paymentMethod === "card"
                ? "ring-2 ring-primary shadow-lg"
                : "hover:bg-white/90"
            }`}
          >
            <CreditCard className="w-5 h-5 text-foreground" />
            <span className="font-medium text-foreground">Credit Card</span>
            {paymentMethod === "card" && (
              <Check className="w-5 h-5 text-primary ml-auto" />
            )}
          </button>
        </div>
      </div>

      {/* Agreement */}
      <div className="px-6 mb-6">
        <div className="glass-card p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-1"
            />
            <span className="text-sm text-foreground">
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
        </div>
      </div>

      {/* Confirm Button */}
      <div className="px-6">
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

      <BottomNav />
    </div>
  );
}
