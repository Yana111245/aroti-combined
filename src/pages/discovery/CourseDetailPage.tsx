import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Lock, BookOpen, Clock, CheckCircle, Play } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  isLocked: boolean;
  isCompleted?: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  lessonCount: number;
  price: number;
  isLocked: boolean;
  category: string;
  duration: string;
  progress?: number;
  lessons: Lesson[];
  instructor?: string;
}

// Mock data - in production, this would come from an API
const courses: Record<string, Course> = {
  "1": {
    id: "1",
    title: "Tarot Fundamentals",
    description: "Master the basics of tarot reading and card interpretation. This comprehensive course covers everything from understanding card meanings to performing your first readings with confidence.",
    lessonCount: 8,
    price: 29.99,
    isLocked: true,
    category: "Tarot",
    duration: "2h 30m",
    progress: 0,
    lessons: [
      { id: "1-1", title: "Introduction to Tarot", duration: "15 min", isLocked: false },
      { id: "1-2", title: "Understanding the Major Arcana", duration: "25 min", isLocked: false },
      { id: "1-3", title: "The Four Suits", duration: "20 min", isLocked: true },
      { id: "1-4", title: "Card Combinations", duration: "22 min", isLocked: true },
      { id: "1-5", title: "Basic Spreads", duration: "18 min", isLocked: true },
      { id: "1-6", title: "Reading Techniques", duration: "20 min", isLocked: true },
      { id: "1-7", title: "Interpreting Reversals", duration: "18 min", isLocked: true },
      { id: "1-8", title: "Your First Reading", duration: "32 min", isLocked: true }
    ]
  },
  "2": {
    id: "2",
    title: "Advanced Astrology",
    description: "Deep dive into planetary aspects and chart interpretation. Learn to read complex astrological patterns and understand the deeper meanings in birth charts.",
    lessonCount: 12,
    price: 49.99,
    isLocked: true,
    category: "Astrology",
    duration: "4h 15m",
    progress: 0,
    lessons: [
      { id: "2-1", title: "Planetary Aspects Explained", duration: "25 min", isLocked: false },
      { id: "2-2", title: "Understanding Houses", duration: "30 min", isLocked: true },
      { id: "2-3", title: "Transits and Progressions", duration: "28 min", isLocked: true },
      { id: "2-4", title: "Synastry Basics", duration: "35 min", isLocked: true },
      { id: "2-5", title: "Composite Charts", duration: "32 min", isLocked: true },
      { id: "2-6", title: "Timing Events", duration: "28 min", isLocked: true },
      { id: "2-7", title: "Lunar Cycles", duration: "25 min", isLocked: true },
      { id: "2-8", title: "Solar Returns", duration: "30 min", isLocked: true },
      { id: "2-9", title: "Career Indicators", duration: "28 min", isLocked: true },
      { id: "2-10", title: "Relationship Patterns", duration: "30 min", isLocked: true },
      { id: "2-11", title: "Advanced Chart Reading", duration: "35 min", isLocked: true },
      { id: "2-12", title: "Case Studies", duration: "40 min", isLocked: true }
    ]
  },
  "3": {
    id: "3",
    title: "Numerology Mastery",
    description: "Learn to calculate and interpret life path numbers. Discover how numbers reveal your purpose, challenges, and opportunities.",
    lessonCount: 10,
    price: 39.99,
    isLocked: true,
    category: "Numerology",
    duration: "3h 20m",
    progress: 0,
    lessons: [
      { id: "3-1", title: "Introduction to Numerology", duration: "18 min", isLocked: false },
      { id: "3-2", title: "Life Path Number Calculation", duration: "22 min", isLocked: true },
      { id: "3-3", title: "Expression Number", duration: "20 min", isLocked: true },
      { id: "3-4", title: "Soul Urge Number", duration: "18 min", isLocked: true },
      { id: "3-5", title: "Personality Number", duration: "20 min", isLocked: true },
      { id: "3-6", title: "Birth Day Number", duration: "15 min", isLocked: true },
      { id: "3-7", title: "Pinnacle Numbers", duration: "25 min", isLocked: true },
      { id: "3-8", title: "Challenge Numbers", duration: "22 min", isLocked: true },
      { id: "3-9", title: "Personal Year Cycles", duration: "28 min", isLocked: true },
      { id: "3-10", title: "Complete Number Analysis", duration: "32 min", isLocked: true }
    ]
  },
  "4": {
    id: "4",
    title: "Daily Spiritual Practices",
    description: "Rituals and practices for everyday spirituality. Create meaningful routines that connect you to your inner wisdom.",
    lessonCount: 6,
    price: 24.99,
    isLocked: true,
    category: "Meditation",
    duration: "1h 45m",
    progress: 0,
    lessons: [
      { id: "4-1", title: "Morning Rituals", duration: "15 min", isLocked: false },
      { id: "4-2", title: "Breathing Techniques", duration: "18 min", isLocked: true },
      { id: "4-3", title: "Meditation Basics", duration: "20 min", isLocked: true },
      { id: "4-4", title: "Evening Reflection", duration: "15 min", isLocked: true },
      { id: "4-5", title: "Gratitude Practice", duration: "12 min", isLocked: true },
      { id: "4-6", title: "Creating Sacred Space", duration: "25 min", isLocked: true }
    ]
  },
  "5": {
    id: "5",
    title: "Moon Phase Wisdom",
    description: "Align your practice with lunar cycles and phases. Learn to work with moon energy for manifestation and release.",
    lessonCount: 7,
    price: 27.99,
    isLocked: true,
    category: "Moon Phases",
    duration: "2h 10m",
    progress: 0,
    lessons: [
      { id: "5-1", title: "Understanding Moon Phases", duration: "20 min", isLocked: false },
      { id: "5-2", title: "New Moon Rituals", duration: "18 min", isLocked: true },
      { id: "5-3", title: "Waxing Moon Practices", duration: "15 min", isLocked: true },
      { id: "5-4", title: "Full Moon Ceremonies", duration: "22 min", isLocked: true },
      { id: "5-5", title: "Waning Moon Release", duration: "20 min", isLocked: true },
      { id: "5-6", title: "Moon in Your Chart", duration: "25 min", isLocked: true },
      { id: "5-7", title: "Monthly Moon Calendar", duration: "25 min", isLocked: true }
    ]
  }
};

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const referrer = (location.state as { referrer?: string })?.referrer || "/discovery";
  
  const course = id ? courses[id] : null;

  if (!course) {
    return (
      <PageWrapper showBottomNav={true} showTabBar={false}>
        <BaseHeader
          title="Course Not Found"
          leftAction={{
            icon: <ChevronLeft className="w-5 h-5" />,
            onClick: () => navigate(referrer),
            label: "Back"
          }}
        />
        <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen pb-24">
          <main className="px-4 mt-4 pb-6 max-w-2xl mx-auto">
            <div className="liquid-glass-card rounded-[12px] p-6 text-center">
              <p className="text-body text-muted-foreground">This course could not be found.</p>
            </div>
          </main>
        </div>
      </PageWrapper>
    );
  }

  const completedLessons = course.lessons.filter(l => l.isCompleted).length;
  const progressPercentage = course.lessons.length > 0 
    ? Math.round((completedLessons / course.lessons.length) * 100)
    : 0;

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title={course.title}
        subtitle={course.category}
        leftAction={{
          icon: <ChevronLeft className="w-5 h-5" />,
          onClick: () => navigate(referrer),
          label: "Back"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen pb-24">
        <main className="px-4 mt-4 pb-6 max-w-2xl mx-auto space-y-4">
          {/* Hero Section */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-6 space-y-4">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-footnote font-medium border border-accent/30">
                {course.category}
              </span>
              <h1 className="text-title-1 font-title font-medium text-foreground leading-tight">
                {course.title}
              </h1>
              <p className="text-body text-muted-foreground leading-relaxed">
                {course.description}
              </p>
            </div>
            <div className="flex items-center gap-4 pt-3 border-t border-white/5 text-footnote text-muted-foreground">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessonCount} Lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          {!course.isLocked && (
            <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-footnote text-muted-foreground">Progress</span>
                <span className="text-footnote font-medium text-foreground">{progressPercentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-caption-2 text-muted-foreground mt-2">
                {completedLessons} of {course.lessons.length} lessons completed
              </p>
            </div>
          )}

          {/* Price/Purchase Section */}
          {course.isLocked && (
            <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-footnote text-muted-foreground mb-1">Price</p>
                  <p className="text-title-2 font-title font-medium text-foreground">
                    ${course.price.toFixed(2)}
                  </p>
                </div>
                <Lock className="w-8 h-8 text-muted-foreground" />
              </div>
              <button
                onClick={() => {
                  // Navigate to payment page
                  navigate(`/discovery/courses/${course.id}/purchase`);
                }}
                className="w-full liquid-glass-card rounded-[12px] overflow-hidden border border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all duration-300 p-4 text-center"
              >
                <span className="text-subhead font-medium text-accent">Purchase Course</span>
              </button>
            </div>
          )}

          {/* Lessons */}
          <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-6 space-y-4">
            <h2 className="text-title-3 font-title font-medium text-foreground">
              Course Lessons
            </h2>
            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (!lesson.isLocked) {
                      navigate(`/discovery/courses/${course.id}/lesson/${lesson.id}`);
                    }
                  }}
                  className={`flex items-center gap-4 p-4 rounded-[10px] border transition-all duration-300 ${
                    lesson.isLocked
                      ? "border-glass-border bg-white/5 opacity-60 cursor-not-allowed"
                      : lesson.isCompleted
                      ? "border-accent/30 bg-accent/10 cursor-pointer hover:bg-accent/15"
                      : "border-glass-border bg-white/5 cursor-pointer hover:bg-white/10 hover:border-glass-highlight"
                  }`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                    lesson.isCompleted
                      ? "border-accent bg-accent/20"
                      : "border-white/20 bg-white/5"
                  }`}>
                    {lesson.isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    ) : lesson.isLocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <span className="text-footnote font-medium text-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-headline font-medium mb-1 ${
                      lesson.isLocked ? "text-muted-foreground" : "text-foreground"
                    }`}>
                      {lesson.title}
                    </h3>
                    <div className="flex items-center gap-2 text-caption-2 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                  {!lesson.isLocked && !lesson.isCompleted && (
                    <Play className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
};

export default CourseDetailPage;

