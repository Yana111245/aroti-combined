import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Info, CreditCard, Smartphone } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { SSOButton } from "@/components/ui/SSOButton";
import { StripeCardForm } from "@/components/payment/StripeCardForm";
// Stripe integration disabled for now - will be activated later
// import { Elements } from "@stripe/react-stripe-js";
// import { stripePromise } from "@/lib/stripe";
import { createSetupIntent, savePaymentMethod } from "@/lib/payment";
import { toast } from "sonner";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'google' | 'card'>('card');
  const [loading, setLoading] = useState(false);
  const [setupIntentClientSecret, setSetupIntentClientSecret] = useState<string>('');

  useEffect(() => {
    // Check if user has a premium plan selected
    const selectedPlan = localStorage.getItem('selectedPlan');
    if (selectedPlan !== 'premium') {
      // Redirect to finish if not premium
      navigate('/onboarding/finish');
      return;
    }

    // Create SetupIntent for card payments
    const initializePayment = async () => {
      try {
        const result = await createSetupIntent();
        if (result.success && result.paymentMethod) {
          // For now, we'll use a placeholder - in production, this would come from your backend
          setSetupIntentClientSecret('seti_placeholder');
        }
      } catch (error) {
        console.error('Failed to initialize payment:', error);
      }
    };

    initializePayment();
  }, [navigate]);

  const handleApplePay = async () => {
    setLoading(true);
    try {
      // In a real implementation, you would handle Apple Pay here
      // For now, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Apple Pay setup complete!");
      navigate("/onboarding/finish");
    } catch (error) {
      toast.error("Apple Pay setup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGooglePay = async () => {
    setLoading(true);
    try {
      // In a real implementation, you would handle Google Pay here
      // For now, we'll simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Google Pay setup complete!");
      navigate("/onboarding/finish");
    } catch (error) {
      toast.error("Google Pay setup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardSuccess = async (paymentMethodId: string) => {
    setLoading(true);
    try {
      // Save payment method to user profile
      const success = await savePaymentMethod({
        id: paymentMethodId,
        type: 'card',
      });

      if (success) {
        toast.success("Payment method saved successfully!");
        navigate("/onboarding/finish");
      } else {
        toast.error("Failed to save payment method. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardError = (error: string) => {
    toast.error(error);
  };

  const handleBack = () => {
    navigate("/onboarding/create-account");
  };

  const handleSkip = () => {
    // Store a flag that payment was skipped
    localStorage.setItem('paymentSkipped', 'true');
    navigate("/onboarding/finish");
  };

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={9}
      totalSteps={10}
      title="Add payment method"
      subtitle="Your 7-day free trial starts now. We'll remind you before charging."
      ctaButton={
        <div className="space-y-3">
          <CTAButton
            onClick={() => {
              if (paymentMethod === 'apple') handleApplePay();
              else if (paymentMethod === 'google') handleGooglePay();
            }}
            disabled={loading || paymentMethod === 'card'}
          >
            {loading ? "Setting up..." : "Start Free Trial"}
          </CTAButton>
          <button
            onClick={handleSkip}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now
          </button>
        </div>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto space-y-6">
          {/* Trial Info Banner */}
          <div className="glass-card p-4 border border-accent/20">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Start your 7-day free trial</h3>
                <p className="text-sm text-muted-foreground">
                  $0 today, then $9.99/month after trial
                </p>
                <p className="text-xs text-muted-foreground">
                  Cancel anytime during trial
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Choose payment method</h3>
            
            {/* Apple Pay */}
            <button
              onClick={() => setPaymentMethod('apple')}
              className={`w-full p-4 glass-card transition-all duration-200 ${
                paymentMethod === 'apple' 
                  ? 'ring-2 ring-accent bg-white/90' 
                  : 'hover:bg-white/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-black rounded-xl">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Apple Pay</div>
                  <div className="text-sm text-muted-foreground">Pay securely with Touch ID or Face ID</div>
                </div>
              </div>
            </button>

            {/* Google Pay */}
            <button
              onClick={() => setPaymentMethod('google')}
              className={`w-full p-4 glass-card transition-all duration-200 ${
                paymentMethod === 'google' 
                  ? 'ring-2 ring-accent bg-white/90' 
                  : 'hover:bg-white/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white border border-gray-300 rounded-xl">
                  <CreditCard className="w-5 h-5 text-gray-700" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Google Pay</div>
                  <div className="text-sm text-muted-foreground">Pay securely with your Google account</div>
                </div>
              </div>
            </button>

            {/* Credit/Debit Card */}
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full p-4 glass-card transition-all duration-200 ${
                paymentMethod === 'card' 
                  ? 'ring-2 ring-accent bg-white/90' 
                  : 'hover:bg-white/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-xl">
                  <CreditCard className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Credit or Debit Card</div>
                  <div className="text-sm text-muted-foreground">Visa, Mastercard, American Express</div>
                </div>
              </div>
            </button>
          </div>

          {/* Card Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <StripeCardForm
                onSuccess={handleCardSuccess}
                onError={handleCardError}
                loading={loading}
              />
            </div>
          )}

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Your payment information is encrypted and secure. We use Stripe for payment processing.
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default PaymentMethod;
