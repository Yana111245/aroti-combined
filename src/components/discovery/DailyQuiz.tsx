import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DailyQuiz = () => {
  const navigate = useNavigate();

  const handleQuizClick = () => {
    navigate("/discovery/quiz");
  };

  return (
    <div>
      <div 
        onClick={handleQuizClick}
        className="apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-6 relative"
      >
        {/* Subtle liquid glass highlight */}
        <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-accent" />
            <h3 className="text-headline font-title font-medium text-foreground">Daily Quiz</h3>
          </div>
          <p className="text-subhead text-muted-foreground mb-4">Test your tarot knowledge and earn points</p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleQuizClick();
            }}
            className="px-4 py-2 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 transition-colors"
          >
            Start Quiz
          </button>
        </div>
        
        {/* Decorative shimmer element */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full liquid-glass-shimmer" />
      </div>
    </div>
  );
};
