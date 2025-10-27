import { Home, Compass, MessageCircle, Calendar, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// Individual tab item component
const TabItem = ({ 
  item, 
  isActive, 
  onClick 
}: { 
  item: { icon: any; label: string; path: string }; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "apple-tab-item relative flex flex-col items-center gap-1 py-2 px-3 min-w-[60px]",
        "apple-touch-target-comfortable",
        isActive 
          ? "apple-tab-item-active text-accent" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <item.icon 
        className={cn(
          "w-5 h-5 transition-all duration-300",
          isActive && "apple-glow-accent"
        )} 
      />
      <span className={cn(
        "apple-tab-label",
        isActive && "apple-tab-label-active"
      )}>
        {item.label}
      </span>
      
      {/* Apple-style active indicator */}
      {isActive && (
        <div className="apple-tab-indicator" />
      )}
    </button>
  );
};

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Apple-style tab configuration
  const navItems = [
    { 
      icon: Home, 
      label: "Home", 
      path: "/home"
    },
    { 
      icon: Compass, 
      label: "Discovery", 
      path: "/discovery"
    },
    { 
      icon: Calendar, 
      label: "Booking", 
      path: "/booking"
    },
    { 
      icon: User, 
      label: "Profile", 
      path: "/profile"
    },
  ];

  // Don't show navigation during onboarding or on root page
  const shouldHideNav = location.pathname.startsWith("/onboarding") || 
                       location.pathname === "/";

  if (shouldHideNav) {
    return null;
  }

  return (
    <div 
      className="nav-sticky backdrop-blur-[60px] nav-safe-area-dark apple-tab-bar"
      style={{
        background: 'rgba(12,10,18,0.92) !important',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <nav 
        className="px-6 border-t border-[rgba(255,255,255,0.08)]"
        style={{
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <TabItem
                  key={item.path}
                  item={item}
                  isActive={isActive}
                  onClick={() => navigate(item.path)}
                />
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};