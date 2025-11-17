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

// Format card number with spaces every 4 digits
const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const limited = cleaned.substring(0, 16);
  const groups = limited.match(/.{1,4}/g);
  return groups ? groups.join(' ') : limited;
};

// Format expiry date as MM/YY
const formatExpiry = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return cleaned.substring(0, 2) + (cleaned.length > 2 ? '/' + cleaned.substring(2, 4) : '');
  }
  return cleaned;
};

// Format CVC to digits only
const formatCVC = (value: string): string => {
  return value.replace(/\D/g, '').substring(0, 4);
};

// Luhn algorithm for card validation
const luhnCheck = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const StripeCardForm = ({ 
  onSuccess, 
  onError, 
  loading = false,
  className 
}: StripeCardFormProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('US');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Card number validation
    const cleanCardNumber = cardNumber.replace(/\D/g, '');
    if (!cleanCardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cleanCardNumber.length < 13 || cleanCardNumber.length > 16) {
      newErrors.cardNumber = 'Invalid card number length';
    } else if (!luhnCheck(cleanCardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }

    // Expiry validation
    const cleanExpiry = expiry.replace(/\D/g, '');
    if (!cleanExpiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (cleanExpiry.length !== 4) {
      newErrors.expiry = 'Invalid expiry format';
    } else {
      const month = parseInt(cleanExpiry.substring(0, 2));
      const year = parseInt('20' + cleanExpiry.substring(2, 4));
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      
      if (month < 1 || month > 12) {
        newErrors.expiry = 'Invalid month';
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = 'Card has expired';
      }
    }

    // CVC validation
    if (!cvc) {
      newErrors.cvc = 'CVC is required';
    } else if (cvc.length < 3) {
      newErrors.cvc = 'CVC must be 3-4 digits';
    }

    // Billing address validation
    if (!streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      onError('Please fill in all required fields correctly');
      return;
    }

    setIsProcessing(true);
    setErrors({});

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      onSuccess('card_simulated_payment_method_id');
    } catch (error) {
      const errorMessage = 'Something went wrong. Please try again.';
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {/* Cardholder Name */}
      <div className="space-y-3">
        <label className="text-subhead font-medium text-foreground">
          Cardholder Name
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-[12px] bg-white/5 border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                "text-foreground placeholder:text-muted-foreground/50",
                "focus:outline-none focus:border-accent transition-colors",
                errors.firstName ? "border-red-500" : "border-glass-border"
              )}
            />
            {errors.firstName && (
              <p className="text-footnote text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-[12px] bg-white/5 border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                "text-foreground placeholder:text-muted-foreground/50",
                "focus:outline-none focus:border-accent transition-colors",
                errors.lastName ? "border-red-500" : "border-glass-border"
              )}
            />
            {errors.lastName && (
              <p className="text-footnote text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Card Information */}
      <div className="space-y-3">
        <label className="text-subhead font-medium text-foreground">
          Card Information
        </label>
        <div className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              className={cn(
                "w-full px-4 py-3 rounded-[12px] bg-white/5 border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                "text-foreground placeholder:text-muted-foreground/50",
                "focus:outline-none focus:border-accent transition-colors",
                errors.cardNumber ? "border-red-500" : "border-glass-border"
              )}
            />
            {errors.cardNumber && (
              <p className="text-footnote text-red-500 mt-1">{errors.cardNumber}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                className={cn(
                  "w-full px-4 py-3 rounded-[12px] bg-white/5 border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                  "text-foreground placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:border-accent transition-colors",
                  errors.expiry ? "border-red-500" : "border-glass-border"
                )}
              />
              {errors.expiry && (
                <p className="text-footnote text-red-500 mt-1">{errors.expiry}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(formatCVC(e.target.value))}
                className={cn(
                  "w-full px-4 py-3 rounded-[12px] bg-white/5 border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                  "text-foreground placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:border-accent transition-colors",
                  errors.cvc ? "border-red-500" : "border-glass-border"
                )}
              />
              {errors.cvc && (
                <p className="text-footnote text-red-500 mt-1">{errors.cvc}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-3">
        <label className="text-subhead font-medium text-foreground">
          Billing Address
        </label>
        <div className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Street address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-[12px] bg-white/5 border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                "text-foreground placeholder:text-muted-foreground/50",
                "focus:outline-none focus:border-accent transition-colors",
                errors.streetAddress ? "border-red-500" : "border-glass-border"
              )}
            />
            {errors.streetAddress && (
              <p className="text-footnote text-red-500 mt-1">{errors.streetAddress}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-[12px] bg-white/5 border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                  "text-foreground placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:border-accent transition-colors",
                  errors.city ? "border-red-500" : "border-glass-border"
                )}
              />
              {errors.city && (
                <p className="text-footnote text-red-500 mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-[12px] bg-white/5 border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                  "text-foreground placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:border-accent transition-colors",
                  errors.state ? "border-red-500" : "border-glass-border"
                )}
              />
              {errors.state && (
                <p className="text-footnote text-red-500 mt-1">{errors.state}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="Postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-[12px] bg-white/5 border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                  "text-foreground placeholder:text-muted-foreground/50",
                  "focus:outline-none focus:border-accent transition-colors",
                  errors.postalCode ? "border-red-500" : "border-glass-border"
                )}
              />
              {errors.postalCode && (
                <p className="text-footnote text-red-500 mt-1">{errors.postalCode}</p>
              )}
            </div>
            <div>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-[12px] bg-white/5 border border-glass-border backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]",
                  "text-foreground",
                  "focus:outline-none focus:border-accent transition-colors"
                )}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="NL">Netherlands</option>
                <option value="SE">Sweden</option>
                <option value="NO">Norway</option>
                <option value="DK">Denmark</option>
                <option value="FI">Finland</option>
                <option value="JP">Japan</option>
                <option value="KR">South Korea</option>
                <option value="SG">Singapore</option>
                <option value="NZ">New Zealand</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
