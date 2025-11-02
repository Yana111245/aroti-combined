import { ChevronRight, Lock, BookOpen, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
}

const courses: Course[] = [
  {
    id: "1",
    title: "Tarot Fundamentals",
    description: "Master the basics of tarot reading and card interpretation",
    lessonCount: 8,
    price: 29.99,
    isLocked: true,
    category: "Tarot",
    duration: "2h 30m"
  },
  {
    id: "2",
    title: "Advanced Astrology",
    description: "Deep dive into planetary aspects and chart interpretation",
    lessonCount: 12,
    price: 49.99,
    isLocked: true,
    category: "Astrology",
    duration: "4h 15m"
  },
  {
    id: "3",
    title: "Numerology Mastery",
    description: "Learn to calculate and interpret life path numbers",
    lessonCount: 10,
    price: 39.99,
    isLocked: true,
    category: "Numerology",
    duration: "3h 20m"
  },
  {
    id: "4",
    title: "Daily Spiritual Practices",
    description: "Rituals and practices for everyday spirituality",
    lessonCount: 6,
    price: 24.99,
    isLocked: true,
    category: "Meditation",
    duration: "1h 45m"
  },
  {
    id: "5",
    title: "Moon Phase Wisdom",
    description: "Align your practice with lunar cycles and phases",
    lessonCount: 7,
    price: 27.99,
    isLocked: true,
    category: "Moon Phases",
    duration: "2h 10m"
  }
];

export const Courses = () => {
  const navigate = useNavigate();

  const handleCourseClick = (course: Course) => {
    // Navigate to course detail/payment page
    navigate(`/discovery/courses/${course.id}`);
  };

  const handleViewAll = () => {
    navigate("/discovery/courses");
  };

  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-title-3 font-title font-medium text-foreground">Courses</h2>
          <p className="text-footnote text-muted-foreground mt-1">Mini courses to deepen your practice</p>
        </div>
        <button 
          onClick={handleViewAll}
          className="text-subhead font-body text-muted-foreground hover:text-foreground transition-colors"
        >
          View All →
        </button>
      </div>
      
      <div className="grid gap-3">
        {courses.slice(0, 3).map((course, index) => (
          <div 
            key={course.id}
            onClick={() => handleCourseClick(course)}
            className="relative flex items-center apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-4 hover:border-glass-highlight gap-3"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Subtle liquid glass highlight */}
            <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-headline font-medium text-foreground truncate flex-1">{course.title}</h3>
                {course.isLocked && (
                  <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                )}
              </div>
              <p className="text-footnote text-muted-foreground truncate mb-2">{course.description}</p>
              
              {/* Course metadata */}
              <div className="flex items-center gap-3 text-caption-2 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{course.lessonCount} {course.lessonCount === 1 ? 'Lesson' : 'Lessons'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
            
            {/* Price or status badge */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {course.isLocked ? (
                <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
                  <span className="text-caption-1 font-medium text-accent">${course.price.toFixed(2)}</span>
                </div>
              ) : (
                <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                  <span className="text-caption-1 font-medium text-accent">Owned</span>
                </div>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            
            {/* Decorative shimmer element */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/40 rounded-full liquid-glass-shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
};

