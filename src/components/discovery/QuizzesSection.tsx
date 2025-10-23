import { FrostedCard } from "@/components/ui/frosted-card";
import { Sparkles, Moon, Flame } from "lucide-react";
import { useState } from "react";

const quizzes = [
  {
    id: 1,
    title: "What energy are you in this week?",
    icon: Sparkles,
    description: "Discover your current spiritual frequency",
    questions: 3,
  },
  {
    id: 2,
    title: "Which element rules your intuition?",
    icon: Flame,
    description: "Fire, Water, Earth, or Air",
    questions: 4,
  },
  {
    id: 3,
    title: "Find your guiding archetype",
    icon: Moon,
    description: "Unlock your spiritual identity",
    questions: 5,
  },
];

export const QuizzesSection = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  return (
    <section className="px-6 mb-12">
      <div className="mb-4">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Discover Yourself
        </h2>
        <p className="text-muted-foreground text-sm">
          Interactive insights to understand your patterns and archetypes.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-6 px-6">
        {quizzes.map((quiz) => {
          const IconComponent = quiz.icon;
          return (
            <FrostedCard
              key={quiz.id}
              className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center cursor-pointer hover:shadow-glow transition-all group"
              onClick={() => setSelectedQuiz(quiz.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-gold mb-4 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {quiz.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {quiz.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Sparkles className="w-3 h-3" />
                  <span>{quiz.questions} questions</span>
                </div>
              </div>
            </FrostedCard>
          );
        })}

        <FrostedCard
          variant="minimal"
          className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all flex items-center justify-center min-h-[240px]"
        >
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-3 animate-pulse" />
            <p className="text-primary font-semibold">More Coming Soon</p>
            <p className="text-xs text-muted-foreground mt-1">
              New journeys unlock weekly
            </p>
          </div>
        </FrostedCard>
      </div>

      {selectedQuiz && (
        <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in" onClick={() => setSelectedQuiz(null)}>
          <FrostedCard className="max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-gold mx-auto mb-4 flex items-center justify-center shadow-glow">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                Quiz Coming Soon
              </h3>
              <p className="text-muted-foreground mb-6">
                This interactive journey will be available soon. We're crafting each question with intention.
              </p>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="w-full py-3 px-6 rounded-full bg-gradient-gold text-primary-foreground font-semibold shadow-glow hover:shadow-soft transition-all"
              >
                Continue Exploring
              </button>
            </div>
          </FrostedCard>
        </div>
      )}
    </section>
  );
};
