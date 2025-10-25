import { Home, Compass, Sparkles, Calendar, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Discovery", path: "/discovery" },
    { icon: Sparkles, label: "Guidance", path: "/guidance" },
    { icon: Calendar, label: "Booking", path: "/booking" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="nav-sticky backdrop-blur-[60px] nav-safe-area-light"
      style={{
        background: 'rgba(255,255,255,0.92) !important',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}>
      <nav className="px-6 border-t border-[rgba(0,0,0,0.08)]"
        style={{
          paddingTop: '12px',
          paddingBottom: '12px',
        }}>
        <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-smooth",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
        </div>
      </nav>
    </div>
  );
};
