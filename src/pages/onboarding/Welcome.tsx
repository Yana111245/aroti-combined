import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import arotiLogo from "@/assets/aroti-logo.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <img 
              src={arotiLogo} 
              alt="Aroti" 
              className="h-24 w-24 animate-scale-in"
            />
          </div>
          
          <h1 className="font-serif text-5xl tracking-tight">
            Aroti
          </h1>
          
          <p className="text-xl text-muted-foreground font-light max-w-sm mx-auto leading-relaxed">
            Your path to balance begins within
          </p>
        </div>

        <div className="pt-8">
          <Button 
            variant="pill" 
            size="lg" 
            onClick={() => navigate("/onboarding/focus")}
            className="w-full max-w-xs mx-auto group"
          >
            <span>Get Started</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground pt-4">
          Discover guidance through Tarot, Astrology & AI
        </p>
      </div>
    </div>
  );
};

export default Welcome;
