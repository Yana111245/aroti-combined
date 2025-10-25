interface JourneyProgressProps {
  streak: number;
  milestones: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
}

export const JourneyProgress = ({ streak, milestones }: JourneyProgressProps) => {
  return (
    <div 
      className="p-6 space-y-4 stagger-fade-up rounded-[12px] shadow-soft"
      style={{ 
        background: 'linear-gradient(135deg, #F8F7F4 0%, #F3F1ED 100%)',
      }}
    >
      <h3 className="text-xl font-title font-medium text-foreground">Your Journey</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Streak</span>
          <span className="text-2xl font-title font-medium text-accent">{streak} days</span>
        </div>
        
        <div className="space-y-2">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${milestone.completed ? 'bg-accent' : 'bg-muted'}`} />
              <span className={`text-sm ${milestone.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                {milestone.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
