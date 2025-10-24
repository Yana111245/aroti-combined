import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Share2, BookOpen, Home } from "lucide-react";
import tarotFool from "@/assets/tarot-fool.png";
import { toast } from "sonner";

const DailyInsightPost = () => {
  const navigate = useNavigate();

  const handleShare = () => {
    toast.success("Card copied to share!");
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Header */}
      <div className="px-6 py-8 space-y-4">
        <p className="text-sm text-muted-foreground">Daily Reading</p>
        
        <h1 className="font-title text-4xl font-medium">
          The Fool
        </h1>
        
        <p className="text-accent font-medium">
          New beginnings • Innocence • Adventure
        </p>
      </div>

      {/* Card Display */}
      <div className="flex-1 px-6 pb-24 space-y-6">
        <div className="flex justify-center animate-scale-in">
          <img
            src={tarotFool}
            alt="The Fool Tarot Card"
            className="w-64 rounded-3xl shadow-[var(--shadow-soft)]"
          />
        </div>

        {/* Interpretation */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-accent" />
            <h3 className="font-semibold">Interpretation</h3>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Fool represents a fresh start and the courage to step into the unknown. Today, you&apos;re being called to trust your instincts and embrace spontaneity. Don&apos;t overthink—sometimes the best path is the one taken with childlike wonder.
          </p>
        </div>

        {/* Today's Guidance */}
        <div className="glass-card p-6 space-y-3">
          <h3 className="font-semibold">Today&apos;s Guidance</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-accent mt-0.5">•</span>
              <span>Take a leap of faith in a new project or relationship</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-accent mt-0.5">•</span>
              <span>Release attachments to outcomes and enjoy the journey</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-accent mt-0.5">•</span>
              <span>Trust your inner wisdom, even if the path seems unclear</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="glass"
            size="lg"
            onClick={handleShare}
            className="flex-1"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          
          <Button
            variant="pill"
            size="lg"
            onClick={() => navigate("/home")}
            className="flex-1"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyInsightPost;
