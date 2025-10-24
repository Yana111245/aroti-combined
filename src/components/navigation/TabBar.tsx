import { useNavigate, useLocation } from "react-router-dom";
import { Home, Compass, MessageCircle, Calendar, User } from "lucide-react";

export const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="glass-card border-t border-accent/10 px-6 py-4 fixed bottom-0 left-0 right-0 z-50 rounded-t-[28px]">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/home") ? "text-accent" : "text-muted-foreground hover:text-accent"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          onClick={() => navigate("/discovery")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            isActive("/discovery") ? "text-accent" : "text-muted-foreground hover:text-accent"
          }`}
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
  );
};
