import { useNavigate, useLocation } from "react-router-dom";
import { Home, Compass, MessageCircle, Calendar, User } from "lucide-react";

export const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomeTab = location.pathname.startsWith("/home");

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="nav-sticky backdrop-blur-[60px]"
    style={{
      background: isHomeTab 
        ? 'rgba(12,10,18,0.92) !important' // Dark for Home tab
        : 'rgba(255,255,255,0.92) !important', // Light for other tabs
      // Extend to the very bottom of the screen
      bottom: 0,
      height: 'calc(100% + env(safe-area-inset-bottom))',
      marginBottom: 'calc(-1 * env(safe-area-inset-bottom))',
    }}>
      <nav className={`px-6 ${
        isHomeTab 
          ? "border-t border-[rgba(255,255,255,0.12)]"
          : "border-t border-[rgba(0,0,0,0.08)]"
      }`}
      style={{
        paddingTop: '12px',
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
      }}>
        <div className="max-w-lg mx-auto flex justify-around items-center">
        <button
          onClick={() => navigate("/home")}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            isActive("/home") 
              ? "text-[hsl(20,55%,58%)] scale-105" // Copper accent for active
              : isHomeTab
                ? "text-[rgba(255,255,255,0.6)] hover:text-[rgba(255,255,255,0.9)]" // Light gray for dark theme
                : "text-[rgba(0,0,0,0.6)] hover:text-[rgba(0,0,0,0.9)]" // Dark gray for light theme
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          onClick={() => navigate("/discovery")}
          className={`flex flex-col items-center gap-1 transition-all duration-200 ${
            isActive("/discovery") 
              ? "text-[hsl(20,55%,58%)] scale-105" // Copper accent for active
              : isHomeTab
                ? "text-[rgba(255,255,255,0.6)] hover:text-[rgba(255,255,255,0.9)]" // Light gray for dark theme
                : "text-[rgba(0,0,0,0.6)] hover:text-[rgba(0,0,0,0.9)]" // Dark gray for light theme
          }`}
        >
          <Compass className="w-6 h-6" />
          <span className="text-xs">Discovery</span>
        </button>
        <button className={`flex flex-col items-center gap-1 transition-all duration-200 ${
          isHomeTab
            ? "text-[rgba(255,255,255,0.6)] hover:text-[rgba(255,255,255,0.9)]" // Light gray for dark theme
            : "text-[rgba(0,0,0,0.6)] hover:text-[rgba(0,0,0,0.9)]" // Dark gray for light theme
        }`}>
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs">Guidance</span>
        </button>
        <button className={`flex flex-col items-center gap-1 transition-all duration-200 ${
          isHomeTab
            ? "text-[rgba(255,255,255,0.6)] hover:text-[rgba(255,255,255,0.9)]" // Light gray for dark theme
            : "text-[rgba(0,0,0,0.6)] hover:text-[rgba(0,0,0,0.9)]" // Dark gray for light theme
        }`}>
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Booking</span>
        </button>
        <button className={`flex flex-col items-center gap-1 transition-all duration-200 ${
          isHomeTab
            ? "text-[rgba(255,255,255,0.6)] hover:text-[rgba(255,255,255,0.9)]" // Light gray for dark theme
            : "text-[rgba(0,0,0,0.6)] hover:text-[rgba(0,0,0,0.9)]" // Dark gray for light theme
        }`}>
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </button>
        </div>
      </nav>
    </div>
  );
};
