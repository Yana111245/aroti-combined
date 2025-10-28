import { Calendar, Target, BookOpen } from "lucide-react";

export const YourJourney = () => {
  return (
    <div>
      <div 
        className="rounded-[12px] p-6"
        style={{background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F2 100%)'}}
      >
        <h2 className="text-title-3 font-title font-medium text-foreground mb-4">Your Journey</h2>
        
        <div className="space-y-4">
          {/* Current Streak */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-subhead font-body text-foreground">
                Current Streak: <span className="font-bold text-accent">7 days</span>
              </p>
              <p className="text-footnote text-muted-foreground">Keep it going!</p>
            </div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <p className="text-subhead font-body font-medium text-foreground">24</p>
              <p className="text-footnote text-muted-foreground">Readings</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <p className="text-subhead font-body font-medium text-foreground">8</p>
              <p className="text-footnote text-muted-foreground">Guides</p>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full mt-4 px-4 py-2 rounded-[8px] border border-accent text-accent text-subhead font-body hover:bg-accent/10 transition-colors">
            View Reflections
          </button>
        </div>
      </div>
    </div>
  );
};
