import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CheckCircle, XCircle, Trophy } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What does the Fool card typically represent?",
    options: [
      "The end of a journey",
      "A new beginning or fresh start",
      "Wisdom and completion",
      "Challenges and obstacles"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "How many cards are in the Major Arcana?",
    options: ["20", "21", "22", "24"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What does reversed position of a card typically indicate?",
    options: [
      "The opposite meaning",
      "Blocked or internal energy",
      "A negative outcome",
      "The card should be ignored"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "What is the Celtic Cross spread primarily used for?",
    options: [
      "Simple yes/no questions",
      "Comprehensive life guidance",
      "Love and relationships only",
      "Career questions only"
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: "Which suit represents emotions and relationships?",
    options: ["Wands", "Cups", "Swords", "Pentacles"],
    correctAnswer: 1
  }
];

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (showResults) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answerIndex
    }));

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 500);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const pointsEarned = score * 10; // 10 points per correct answer

  const getScoreMessage = () => {
    if (percentage >= 80) return "Excellent! You're a tarot master!";
    if (percentage >= 60) return "Great job! Keep learning!";
    if (percentage >= 40) return "Good effort! Practice makes perfect!";
    return "Keep studying! Every expert was once a beginner.";
  };

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQ.id];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Daily Quiz"
        subtitle="Test your tarot knowledge"
        leftAction={{
          icon: <ChevronLeft className="w-5 h-5" />,
          onClick: () => navigate("/discovery"),
          label: "Back to Discovery"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-screen pb-24">
        <main className="px-4 mt-4 pb-6 max-w-2xl mx-auto space-y-4">
          {!showResults ? (
            <>
              {/* Progress */}
              <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-footnote text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-footnote text-muted-foreground">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-5 space-y-4">
                <h2 className="text-title-2 font-title font-medium text-foreground leading-tight">
                  {currentQ.question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const showCorrect = selectedAnswer !== undefined;
                    const isCorrectOption = index === currentQ.correctAnswer;

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== undefined}
                        className={`w-full text-left p-4 rounded-[10px] border transition-all duration-300 ${
                          selectedAnswer === undefined
                            ? "border-glass-border bg-white/5 hover:bg-white/10 hover:border-glass-highlight cursor-pointer"
                            : isSelected && isCorrect
                            ? "border-accent/50 bg-accent/20 cursor-default"
                            : isSelected && !isCorrect
                            ? "border-red-500/50 bg-red-500/10 cursor-default"
                            : isCorrectOption && showCorrect
                            ? "border-accent/50 bg-accent/10 cursor-default"
                            : "border-glass-border bg-white/5 cursor-default opacity-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected && isCorrect
                              ? "border-accent bg-accent/20"
                              : isSelected && !isCorrect
                              ? "border-red-500 bg-red-500/20"
                              : "border-white/20"
                          }`}>
                            {isSelected && isCorrect && <CheckCircle className="w-4 h-4 text-accent" />}
                            {isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500" />}
                            {!isSelected && <span className="text-footnote text-muted-foreground">{String.fromCharCode(65 + index)}</span>}
                          </div>
                          <span className={`flex-1 ${
                            isSelected && isCorrect
                              ? "text-accent font-medium"
                              : isSelected && !isCorrect
                              ? "text-red-400"
                              : "text-foreground"
                          }`}>
                            {option}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Results */
            <div className="space-y-4">
              <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-6 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center mx-auto">
                  <Trophy className="w-10 h-10 text-accent" />
                </div>
                <div>
                  <h2 className="text-title-2 font-title font-medium text-foreground mb-2">
                    Quiz Complete!
                  </h2>
                  <p className="text-body text-muted-foreground mb-4">
                    {getScoreMessage()}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5">
                  <div className="text-center">
                    <p className="text-title-1 font-title font-medium text-foreground">
                      {score}/{questions.length}
                    </p>
                    <p className="text-footnote text-muted-foreground mt-1">Correct</p>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <p className="text-title-1 font-title font-medium text-accent">
                      {percentage}%
                    </p>
                    <p className="text-footnote text-muted-foreground mt-1">Score</p>
                  </div>
                  <div className="w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <p className="text-title-1 font-title font-medium text-accent">
                      +{pointsEarned}
                    </p>
                    <p className="text-footnote text-muted-foreground mt-1">Points</p>
                  </div>
                </div>
              </div>

              {/* Review */}
              <div className="liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass p-6 space-y-4">
                <h3 className="text-title-3 font-title font-medium text-foreground">Review Your Answers</h3>
                <div className="space-y-4">
                  {questions.map((q) => {
                    const selected = selectedAnswers[q.id];
                    const correct = selected === q.correctAnswer;
                    
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-[10px] border ${
                          correct
                            ? "border-accent/30 bg-accent/10"
                            : "border-red-500/30 bg-red-500/10"
                        }`}
                      >
                        <p className="text-body font-medium text-foreground mb-2">{q.question}</p>
                        <div className="space-y-1">
                          {q.options.map((option, index) => {
                            const isSelected = selected === index;
                            const isCorrect = index === q.correctAnswer;
                            
                            return (
                              <div
                                key={index}
                                className={`text-footnote p-2 rounded ${
                                  isCorrect
                                    ? "bg-accent/20 text-accent font-medium"
                                    : isSelected && !isCorrect
                                    ? "bg-red-500/20 text-red-400"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {String.fromCharCode(65 + index)}. {option}
                                {isCorrect && " ✓"}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswers({});
                    setShowResults(false);
                  }}
                  className="flex-1 liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 p-4 text-center"
                >
                  <span className="text-subhead font-medium text-foreground">Retake Quiz</span>
                </button>
                <button
                  onClick={() => navigate("/discovery")}
                  className="flex-1 liquid-glass-card rounded-[12px] overflow-hidden border border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all duration-300 p-4 text-center"
                >
                  <span className="text-subhead font-medium text-accent">Back to Discovery</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </PageWrapper>
  );
};

export default QuizPage;

