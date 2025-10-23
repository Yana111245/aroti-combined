import { Home, Compass, Calendar, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Compass, label: "Discovery", path: "/discovery" },
    { icon: Calendar, label: "Booking", path: "/booking" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  // Don't show navigation during onboarding or on guidance page
  const shouldHideNav = location.pathname.startsWith("/onboarding") || 
                       location.pathname === "/" ||
                       location.pathname === "/guidance";

  if (shouldHideNav) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-card border-t border-border/50 z-50 safe-bottom">
      <div className="max-w-2xl mx-auto px-6 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 transition-smooth py-2",
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
  );
};