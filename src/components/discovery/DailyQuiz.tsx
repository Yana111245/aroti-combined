import { Sparkles } from "lucide-react";

export const DailyQuiz = () => {
  return (
    <div className="px-6">
      <div 
        className="rounded-[16px] p-6 cursor-pointer hover:scale-105 transition-transform"
        style={{background: 'linear-gradient(135deg, #F8F3E6 0%, #FFFFFF 100%)'}}
      >
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="text-base font-body font-medium text-foreground">Daily Quiz</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Test your tarot knowledge and earn points</p>
        <button className="px-4 py-2 rounded-[10px] bg-accent text-white text-sm font-body font-medium hover:bg-accent/90 transition-colors">
          Start Quiz
        </button>
      </div>
    </div>
  );
};
