import { supabase } from '@/integrations/supabase/client';

export interface PaymentMethodData {
  id: string;
  type: 'card' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
}

export interface SetupIntentResult {
  success: boolean;
  paymentMethod?: PaymentMethodData;
  error?: string;
}

/**
 * Create a Stripe SetupIntent for saving payment method without charging
 * This is used for the free trial - we save the card but don't charge until trial ends
 */
export const createSetupIntent = async (): Promise<SetupIntentResult> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    // Call Supabase Edge Function to create SetupIntent
    const { data, error } = await supabase.functions.invoke('create-setup-intent', {
      body: {
        userId: user.id,
        email: user.email,
      }
    });

    if (error) {
      console.error('SetupIntent creation error:', error);
      return { success: false, error: 'Failed to create payment setup' };
    }

    return {
      success: true,
      paymentMethod: data.paymentMethod
    };
  } catch (error) {
    console.error('Payment setup error:', error);
    return { 
      success: false, 
      error: 'Something went wrong. Please try again.' 
    };
  }
};

/**
 * Confirm a SetupIntent with payment method
 */
export const confirmSetupIntent = async (
  setupIntentId: string, 
  paymentMethodId: string
): Promise<SetupIntentResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('confirm-setup-intent', {
      body: {
        setupIntentId,
        paymentMethodId,
      }
    });

    if (error) {
      console.error('SetupIntent confirmation error:', error);
      return { success: false, error: 'Failed to confirm payment method' };
    }

    return {
      success: true,
      paymentMethod: data.paymentMethod
    };
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return { 
      success: false, 
      error: 'Something went wrong. Please try again.' 
    };
  }
};

/**
 * Save payment method to user profile
 */
export const savePaymentMethod = async (paymentMethod: PaymentMethodData): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return false;
    }

    const { error } = await supabase
      .from('user_payment_methods')
      .upsert({
        user_id: user.id,
        payment_method_id: paymentMethod.id,
        type: paymentMethod.type,
        last4: paymentMethod.last4,
        brand: paymentMethod.brand,
        is_default: true,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error saving payment method:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving payment method:', error);
    return false;
  }
};

/**
 * Get user's saved payment methods
 */
export const getPaymentMethods = async (): Promise<PaymentMethodData[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('user_payment_methods')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payment methods:', error);
      return [];
    }

    return data.map(method => ({
      id: method.payment_method_id,
      type: method.type,
      last4: method.last4,
      brand: method.brand,
    }));
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return [];
  }
};
