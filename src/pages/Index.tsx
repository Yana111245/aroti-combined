import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Compass, MessageCircle, Calendar, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6">
          <h1 className="font-serif text-4xl">Welcome to Aroti</h1>
          <p className="text-muted-foreground max-w-md">
            Your holistic guidance companion is ready. Start exploring your path to balance.
          </p>
          <Button 
            variant="pill" 
            size="lg"
            onClick={() => navigate("/home")}
          >
            Start Your Journey
          </Button>
        </div>
      </main>

      {/* Tab Bar Navigation */}
      <nav className="glass-card border-t border-accent/10 px-6 py-4">
        <div className="max-w-lg mx-auto flex justify-around items-center">
          <button 
            onClick={() => navigate("/home")}
            className="flex flex-col items-center gap-1 text-accent"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => navigate("/discovery")}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
          >
            <Compass className="w-6 h-6" />
            <span className="text-xs">Discovery</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">Guidance</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Booking</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
