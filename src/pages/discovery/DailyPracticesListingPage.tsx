import { useNavigate } from "react-router-dom";
import { ChevronLeft, Clock, ChevronRight } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";

interface Practice {
  id: string;
  title: string;
  duration: string;
  category: string;
  description: string;
}

const practices: Practice[] = [
  {
    id: "1",
    title: "Morning Intention",
    duration: "5 min",
    category: "Mindfulness",
    description: "Start your day with clarity and purpose by setting meaningful intentions"
  },
  {
    id: "2",
    title: "Breathing Exercise",
    duration: "10 min",
    category: "Meditation",
    description: "A calming breathing practice that helps regulate your nervous system"
  },
  {
    id: "3",
    title: "Evening Reflection",
    duration: "8 min",
    category: "Reflection",
    description: "A thoughtful practice to review your day and prepare for restful sleep"
  },
  {
    id: "4",
    title: "Gratitude Practice",
    duration: "3 min",
    category: "Mindfulness",
    description: "A quick but powerful practice to shift your perspective and cultivate appreciation"
  },
  {
    id: "5",
    title: "Body Scan Meditation",
    duration: "15 min",
    category: "Meditation",
    description: "Progressive relaxation technique to release tension and increase awareness"
  },
  {
    id: "6",
    title: "Loving Kindness",
    duration: "12 min",
    category: "Meditation",
    description: "Cultivate compassion for yourself and others through guided meditation"
  },
  {
    id: "7",
    title: "Journaling Session",
    duration: "10 min",
    category: "Reflection",
    description: "Express your thoughts and emotions through guided writing prompts"
  },
  {
    id: "8",
    title: "Energy Clearing",
    duration: "7 min",
    category: "Energy Work",
    description: "Release negative energy and restore your natural energetic balance"
  },
  {
    id: "9",
    title: "Chakra Alignment",
    duration: "20 min",
    category: "Energy Work",
    description: "Balance and align your seven chakras through visualization and breathwork"
  },
  {
    id: "10",
    title: "Mindful Walking",
    duration: "15 min",
    category: "Mindfulness",
    description: "Practice presence and awareness through intentional movement"
  }
];

const DailyPracticesListingPage = () => {
  const navigate = useNavigate();

  const handlePracticeClick = (practiceId: string) => {
    navigate(`/discovery/practice/${practiceId}`, { state: { referrer: "/discovery/practices" } });
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Daily Practices"
        subtitle="Morning routines & evening rituals"
        leftAction={{
          icon: <ChevronLeft className="w-5 h-5" />,
          onClick: () => navigate("/discovery"),
          label: "Back to Discovery"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full">
        <main className="px-4 mt-4 pb-24 max-w-2xl mx-auto space-y-4">
          {practices.map((practice, index) => (
            <div
              key={practice.id}
              onClick={() => handlePracticeClick(practice.id)}
              className="relative flex items-center apple-material-card-interactive liquid-glass-card rounded-[16px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-5 hover:border-glass-highlight gap-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Subtle liquid glass highlight */}
              <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
              
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-headline font-title font-medium text-foreground leading-tight flex-1">
                    {practice.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-footnote text-muted-foreground">{practice.duration}</span>
                  <span className="text-footnote text-muted-foreground">•</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-caption-2 font-medium border border-white/10">
                    {practice.category}
                  </span>
                </div>
                
                <p className="text-footnote text-muted-foreground leading-relaxed">{practice.description}</p>
              </div>
              
              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Decorative shimmer element */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full liquid-glass-shimmer" />
            </div>
          ))}
        </main>
      </div>
    </PageWrapper>
  );
};

export default DailyPracticesListingPage;

