import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { OnboardingLayout } from "@/components/layout/OnboardingLayout";
import { CTAButton } from "@/components/ui/CTAButton";
import { SSOButton } from "@/components/ui/SSOButton";

const CreateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      toast.error("Please fill in email and password");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding/finish`,
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Try logging in instead.");
        } else {
          toast.error(error.message);
        }
      } else if (data.user) {
        toast.success("Account created! Welcome to Aroti.");
        
        // Check selected plan and navigate accordingly
        const selectedPlan = localStorage.getItem('selectedPlan') || 'free';
        if (selectedPlan === 'premium') {
          navigate("/onboarding/payment-method");
        } else {
          navigate("/onboarding/finish");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setAppleLoading(true);
    try {
      const selectedPlan = localStorage.getItem('selectedPlan') || 'free';
      const redirectPath = selectedPlan === 'premium' ? 'payment-method' : 'finish';
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/onboarding/${redirectPath}`,
        }
      });
      
      if (error) {
        toast.error("Apple sign-in failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong with Apple sign-in.");
    } finally {
      setAppleLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const selectedPlan = localStorage.getItem('selectedPlan') || 'free';
      const redirectPath = selectedPlan === 'premium' ? 'payment-method' : 'finish';
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding/${redirectPath}`,
        }
      });
      
      if (error) {
        toast.error("Google sign-in failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong with Google sign-in.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/onboarding/subscription");
  };

  const isFormValid = email && password;

  return (
    <OnboardingLayout 
      showBackButton={true}
      onBack={handleBack}
      currentStep={8}
      totalSteps={9}
      title="Create your account"
      subtitle="Join Aroti to begin your journey of self-discovery"
      ctaButton={
        <CTAButton
          onClick={handleSignUp}
          disabled={!isFormValid || loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </CTAButton>
      }
    >
      <div className="animate-fade-in">
        <div className="w-full max-w-lg mx-auto space-y-6">
          {/* SSO Buttons */}
          <div className="space-y-3">
            <SSOButton 
              provider="apple" 
              onClick={handleAppleSignIn}
              loading={appleLoading}
            />
            <SSOButton 
              provider="google" 
              onClick={handleGoogleSignIn}
              loading={googleLoading}
            />
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <div className="glass-card p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="glass-card border-accent/30 focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-card border-accent/30 focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-card border-accent/30 focus:border-accent pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                At least 6 characters
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              By creating an account, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default CreateAccount;
