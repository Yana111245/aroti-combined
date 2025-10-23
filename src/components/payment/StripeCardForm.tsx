import { useState } from 'react';
// Stripe integration disabled for now - will be activated later
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { cn } from '@/lib/utils';

interface StripeCardFormProps {
  onSuccess: (paymentMethodId: string) => void;
  onError: (error: string) => void;
  loading?: boolean;
  className?: string;
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: 'hsl(0 0% 12%)',
      fontFamily: 'system-ui, sans-serif',
      '::placeholder': {
        color: 'hsl(0 0% 42%)',
      },
    },
    invalid: {
      color: 'hsl(0 84.2% 60.2%)',
    },
  },
  hidePostalCode: false,
};

export const StripeCardForm = ({ 
  onSuccess, 
  onError, 
  loading = false,
  className 
}: StripeCardFormProps) => {
  // Stripe integration disabled for now - will be activated later
  // const stripe = useStripe();
  // const elements = useElements();
  const [cardError, setCardError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Simulate card validation
    if (!cardNumber || !expiry || !cvc) {
      setCardError('Please fill in all card details');
      onError('Please fill in all card details');
      return;
    }

    setIsProcessing(true);
    setCardError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      onSuccess('card_simulated_payment_method_id');
    } catch (error) {
      const errorMessage = 'Something went wrong. Please try again.';
      setCardError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Card Information
        </label>
        <div className="glass-card p-4 border border-accent/30 focus-within:border-accent transition-colors space-y-3">
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
            <input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="w-20 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
        {cardError && (
          <p className="text-sm text-destructive">{cardError}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || isProcessing}
        className={cn(
          "w-full h-12 font-medium transition-all duration-200 rounded-[var(--radius)]",
          "bg-gradient-to-r from-secondary to-primary text-primary-foreground",
          "hover:shadow-[var(--shadow-glow)] hover:scale-105",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        )}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          'Save Payment Method'
        )}
      </button>
    </form>
  );
};
