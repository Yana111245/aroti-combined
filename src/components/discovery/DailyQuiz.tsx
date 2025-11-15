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
        className="apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-6"
      >
        <div className="relative z-10">
          {/* Subtle liquid glass highlight */}
          <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
          
          <h3 className="text-headline font-title font-medium text-foreground mb-3 leading-tight">
            Daily Quiz
          </h3>
          <p className="text-subhead text-muted-foreground mb-4">Test your tarot knowledge and earn points</p>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleQuizClick();
            }}
            className="px-4 py-2 rounded-[10px] bg-white/5 backdrop-blur-sm border border-white/10 text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
          >
            Start Quiz
          </button>
          
          {/* Decorative shimmer element */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full liquid-glass-shimmer" />
        </div>
      </div>
    </div>
  );
};
