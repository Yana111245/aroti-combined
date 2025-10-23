# Stripe Payment Setup Guide for Aroti

This guide covers setting up Stripe payment processing for the Aroti app's premium subscription flow.

## Overview

The payment system supports:
- **Credit/Debit Cards** via Stripe Elements
- **Apple Pay** (iOS devices)
- **Google Pay** (Android/Chrome)
- **Free Trial** with $0 charge upfront, billing starts after 7 days

## 1. Stripe Account Setup

### Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create account or sign in
3. Complete business verification
4. Enable test mode for development

### Get API Keys
1. Dashboard → Developers → API Keys
2. Copy **Publishable key** (starts with `pk_test_` for test mode)
3. Copy **Secret key** (starts with `sk_test_` for test mode) - keep this secure!

## 2. Environment Configuration

### Add to `.env.local`:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

### For Production:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key_here
STRIPE_SECRET_KEY=sk_live_your_live_secret_key_here
```

## 3. Supabase Edge Functions Setup

### Create Edge Functions for Payment Processing

Create `supabase/functions/create-setup-intent/index.ts`:
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
})

serve(async (req) => {
  try {
    const { userId, email } = await req.json()

    // Create or retrieve Stripe customer
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    let customer
    if (customers.data.length > 0) {
      customer = customers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: email,
        metadata: {
          userId: userId,
        },
      })
    }

    // Create SetupIntent for saving payment method
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      usage: 'off_session',
    })

    return new Response(
      JSON.stringify({
        clientSecret: setupIntent.client_secret,
        customerId: customer.id,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
```

Create `supabase/functions/confirm-setup-intent/index.ts`:
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
})

serve(async (req) => {
  try {
    const { setupIntentId, paymentMethodId } = await req.json()

    // Confirm the SetupIntent
    const setupIntent = await stripe.setupIntents.confirm(setupIntentId, {
      payment_method: paymentMethodId,
    })

    return new Response(
      JSON.stringify({
        success: true,
        paymentMethod: {
          id: setupIntent.payment_method,
          type: 'card',
        },
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
```

### Deploy Edge Functions
```bash
supabase functions deploy create-setup-intent
supabase functions deploy confirm-setup-intent
```

## 4. Database Schema

### Create Payment Methods Table
```sql
-- Create user_payment_methods table
CREATE TABLE user_payment_methods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_method_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('card', 'apple_pay', 'google_pay')),
  last4 TEXT,
  brand TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE user_payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payment methods" ON user_payment_methods
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment methods" ON user_payment_methods
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment methods" ON user_payment_methods
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own payment methods" ON user_payment_methods
  FOR DELETE USING (auth.uid() = user_id);
```

## 5. Webhook Setup (for Production)

### Create Webhook Endpoint
Create `supabase/functions/stripe-webhook/index.ts`:
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@12.0.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    )

    switch (event.type) {
      case 'setup_intent.succeeded':
        // Handle successful payment method setup
        console.log('SetupIntent succeeded:', event.data.object)
        break
      case 'payment_method.attached':
        // Handle payment method attached to customer
        console.log('Payment method attached:', event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
```

### Configure Webhook in Stripe Dashboard
1. Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-project.supabase.co/functions/v1/stripe-webhook`
3. Select events:
   - `setup_intent.succeeded`
   - `payment_method.attached`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook signing secret to environment variables

## 6. Testing

### Test Cards
Use these Stripe test card numbers:

**Successful payments:**
- `4242424242424242` - Visa
- `5555555555554444` - Mastercard
- `378282246310005` - American Express

**Declined payments:**
- `4000000000000002` - Card declined
- `4000000000009995` - Insufficient funds

### Test Apple Pay
- Use iOS Simulator or physical iOS device
- Add test card to Wallet app
- Test Apple Pay flow in app

### Test Google Pay
- Use Chrome on Android or desktop
- Add test card to Google Pay
- Test Google Pay flow in app

## 7. Production Deployment

### Checklist
- [ ] Switch to live API keys
- [ ] Update webhook endpoint to production URL
- [ ] Test with real (small amount) transactions
- [ ] Set up monitoring and alerts
- [ ] Configure proper error handling
- [ ] Test subscription creation and management

### Security Considerations
- Never expose secret keys in client-side code
- Use HTTPS for all webhook endpoints
- Validate webhook signatures
- Implement proper error handling
- Monitor for suspicious activity
- Keep Stripe SDK updated

## 8. Subscription Management

### Future Implementation
For full subscription management, you'll need:

1. **Create Subscription** - After trial ends
2. **Update Subscription** - Change plans
3. **Cancel Subscription** - Handle cancellations
4. **Retry Failed Payments** - Handle declined cards
5. **Proration** - Handle plan changes mid-cycle

### Example Subscription Creation
```typescript
// After 7-day trial ends
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{
    price: 'price_premium_monthly', // Create this in Stripe Dashboard
  }],
  default_payment_method: paymentMethodId,
  trial_end: 'now', // Start billing immediately
})
```

## 9. Troubleshooting

### Common Issues

1. **"Invalid API key"**
   - Check environment variables are set correctly
   - Ensure you're using the right key for test/live mode

2. **"SetupIntent not found"**
   - Verify client secret is passed correctly
   - Check that SetupIntent was created successfully

3. **Apple Pay not showing**
   - Ensure device supports Apple Pay
   - Check that domain is verified in Apple Developer Console

4. **Google Pay not working**
   - Verify domain is registered with Google
   - Check that test cards are added to Google Pay

### Debug Steps
1. Check browser console for JavaScript errors
2. Verify Stripe Dashboard for failed payments
3. Check Supabase Edge Function logs
4. Test with Stripe CLI for webhook debugging

## 10. Support Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Elements](https://stripe.com/docs/stripe-js/react)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Apple Pay Integration](https://developer.apple.com/apple-pay/)
- [Google Pay Integration](https://developers.google.com/pay/api)
