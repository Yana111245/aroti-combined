import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 nav-safe-area backdrop-blur-[60px] border-t border-white/10 z-40" style={{
      background: 'rgba(12,10,18,0.92)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <nav className="px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => navigate("/booking")}
            variant="ghost"
            className="w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Booking
          </Button>
        </div>
      </nav>
    </div>
  );
};
