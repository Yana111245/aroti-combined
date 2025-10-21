import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import arotiLogo from "@/assets/aroti-logo.png";

const Finish = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative animate-glow">
              <img 
                src={arotiLogo} 
                alt="Aroti" 
                className="h-32 w-32 animate-scale-in"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-20 blur-3xl rounded-full" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="font-serif text-5xl tracking-tight text-gradient">
              You're all set
            </h1>
            
            <p className="text-xl text-muted-foreground font-light max-w-sm mx-auto leading-relaxed">
              Your journey to inner balance begins now
            </p>
          </div>
        </div>

        <div className="pt-8 space-y-6">
          <div className="glass-card p-6 space-y-3">
            <Sparkles className="w-8 h-8 text-accent mx-auto" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aroti will guide you through daily insights, personalized readings, and meaningful reflections
            </p>
          </div>

          <Button 
            variant="pill" 
            size="lg" 
            onClick={() => navigate("/home")}
            className="w-full max-w-xs mx-auto group animate-glow"
          >
            <span>Enter Aroti</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground pt-4">
          Begin with your first daily reading
        </p>
      </div>
    </div>
  );
};

export default Finish;
