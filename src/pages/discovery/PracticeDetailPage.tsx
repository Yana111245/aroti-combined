import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Play, Clock, Sparkles } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";

// Mock data - in production, this would come from an API
const practices: Record<string, {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
  steps: string[];
  benefits: string[];
}> = {
  "1": {
    id: "1",
    title: "Morning Intention",
    duration: "5 min",
    category: "Mindfulness",
    description: "Start your day with clarity and purpose by setting meaningful intentions that align with your values and goals.",
    steps: [
      "Find a quiet space and sit comfortably with your back straight.",
      "Take three deep breaths, inhaling through your nose and exhaling through your mouth.",
      "Bring to mind three things you're grateful for today.",
      "Ask yourself: 'What is one intention I want to set for today?'",
      "Visualize yourself embodying this intention throughout your day.",
      "Take a final breath and affirm your intention silently or aloud.",
      "Carry this intention with you as you begin your day."
    ],
    benefits: [
      "Increases focus and clarity",
      "Aligns actions with values",
      "Reduces morning anxiety",
      "Creates positive momentum"
    ]
  },
  "2": {
    id: "2",
    title: "Breathing Exercise",
    duration: "10 min",
    category: "Meditation",
    description: "A calming breathing practice that helps regulate your nervous system and brings you into the present moment.",
    steps: [
      "Sit or lie in a comfortable position.",
      "Place one hand on your chest and one on your belly.",
      "Inhale slowly through your nose for a count of four.",
      "Hold your breath for a count of four.",
      "Exhale slowly through your mouth for a count of six.",
      "Repeat this cycle 8-10 times.",
      "Notice how your body feels as you complete each cycle.",
      "When finished, take a few normal breaths and slowly open your eyes."
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Improves focus",
      "Regulates nervous system",
      "Promotes relaxation"
    ]
  },
  "3": {
    id: "3",
    title: "Evening Reflection",
    duration: "8 min",
    category: "Reflection",
    description: "A thoughtful practice to review your day, acknowledge growth, and prepare for restful sleep.",
    steps: [
      "Find a comfortable, quiet space where you won't be disturbed.",
      "Take a few deep breaths to transition from your day.",
      "Reflect on three moments of growth or learning today.",
      "Acknowledge one challenge you faced and how you handled it.",
      "Note one thing you're proud of yourself for today.",
      "Consider one thing you'd like to do differently tomorrow.",
      "End by expressing gratitude for the day's experiences.",
      "Set an intention for peaceful rest."
    ],
    benefits: [
      "Promotes self-awareness",
      "Improves sleep quality",
      "Encourages growth mindset",
      "Reduces daily stress"
    ]
  },
  "4": {
    id: "4",
    title: "Gratitude Practice",
    duration: "3 min",
    category: "Mindfulness",
    description: "A quick but powerful practice to shift your perspective and cultivate appreciation.",
    steps: [
      "Take a comfortable seated position.",
      "Close your eyes and take three deep breaths.",
      "Think of three specific things you're grateful for today.",
      "For each item, spend a moment truly feeling the gratitude.",
      "Notice where you feel gratitude in your body.",
      "Open your eyes with a renewed sense of appreciation.",
      "Carry this feeling with you as you continue your day."
    ],
    benefits: [
      "Boosts mood and happiness",
      "Shifts perspective positively",
      "Reduces negative thinking",
      "Strengthens relationships"
    ]
  }
};

const PracticeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const referrer = (location.state as { referrer?: string })?.referrer || "/discovery";
  
  const practice = id ? practices[id] : null;

  if (!practice) {
    return (
      <PageWrapper showBottomNav={true} showTabBar={false}>
        <BaseHeader
          title="Practice Not Found"
          leftAction={{
            icon: <ChevronLeft className="w-5 h-5" />,
            onClick: () => navigate(referrer),
            label: "Back"
          }}
        />
        <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen pb-24">
          <main className="px-4 mt-4 pb-6 max-w-2xl mx-auto">
            <div className="liquid-glass-card rounded-[12px] p-6 text-center">
              <p className="text-body text-muted-foreground">This practice could not be found.</p>
            </div>
          </main>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title={practice.title}
        subtitle={practice.category}
        leftAction={{
          icon: <ChevronLeft className="w-5 h-5" />,
          onClick: () => navigate(referrer),
          label: "Back"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-nav pb-safe">
        <main className="px-4 mt-4 pb-[calc(8rem+env(safe-area-inset-bottom))] max-w-2xl mx-auto space-y-4">
          {/* Hero Section */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-footnote text-muted-foreground">{practice.duration}</span>
                    <span className="text-footnote text-muted-foreground">•</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-medium border border-white/10">
                      {practice.category}
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="text-title-1 font-title font-medium text-foreground leading-tight">
                {practice.title}
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                {practice.description}
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-headline font-medium text-foreground mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {practice.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span className="text-body text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5 space-y-4">
            <h2 className="text-title-3 font-title font-medium text-foreground">Step-by-Step Guide</h2>
            <ol className="space-y-4">
              {practice.steps.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-footnote font-medium">
                    {index + 1}
                  </span>
                  <p className="text-body text-foreground leading-relaxed flex-1 pt-1">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Start Practice Button */}
          <button
            onClick={() => {
              // Navigate to guided practice interface
              navigate(`/discovery/practice/${practice.id}/guided`);
            }}
            className="w-full liquid-glass-card rounded-[12px] overflow-hidden border border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all duration-300 p-5 flex items-center justify-center gap-3 group"
          >
            <Play className="w-5 h-5 text-accent" />
            <span className="text-subhead font-medium text-accent">Start Practice</span>
            <ChevronLeft className="w-5 h-5 text-accent transform rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Related Practices */}
          <div className="space-y-3 pt-2">
            <h2 className="text-title-3 font-title font-medium text-foreground px-1">Related Practices</h2>
            <div className="grid gap-3">
              {Object.values(practices)
                .filter(p => p.id !== practice.id && p.category === practice.category)
                .slice(0, 2)
                .map((related) => (
                  <div
                    key={related.id}
                    onClick={() => navigate(`/discovery/practice/${related.id}`, { state: { referrer } })}
                    className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer p-4 hover:border-glass-highlight"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-headline font-medium text-foreground mb-1">{related.title}</h3>
                        <p className="text-footnote text-muted-foreground mb-2">{related.duration}</p>
                        <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-caption-2 font-medium border border-white/10">
                          {related.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default PracticeDetailPage;

