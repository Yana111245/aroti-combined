import { FrostedCard } from "@/components/ui/frosted-card";
import { Badge } from "@/components/ui/badge";
import learnMeditation from "@/assets/learn-meditation.jpg";
import learnAstrology from "@/assets/learn-astrology.jpg";

const categories = ["Astrology", "Numerology", "Tarot", "Mindfulness"];

const articles = [
  {
    id: 1,
    title: "Understanding Your Birth Chart",
    category: "Astrology",
    readTime: "8 min read",
    image: learnAstrology,
  },
  {
    id: 2,
    title: "Daily Meditation Rituals",
    category: "Mindfulness",
    readTime: "5 min read",
    image: learnMeditation,
  },
  {
    id: 3,
    title: "The Power of Life Path Numbers",
    category: "Numerology",
    readTime: "10 min read",
    image: learnAstrology,
  },
];

export const LearnCarousel = () => {
  return (
    <section className="px-6 mb-12">
      <div className="mb-4">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">Learn & Grow</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Short lessons from your mentors and guides
        </p>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="px-4 py-2 rounded-full border-primary/30 text-primary bg-primary/5 whitespace-nowrap cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-all"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-6 px-6">
        {articles.map((article) => (
          <FrostedCard
            key={article.id}
            className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center cursor-pointer hover:shadow-glow transition-all hover:scale-[1.02] group"
          >
            <div className="flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Badge
                  variant="secondary"
                  className="mb-2 text-xs bg-secondary text-secondary-foreground"
                >
                  {article.category}
                </Badge>
                <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {article.readTime}
                </p>
              </div>
            </div>
          </FrostedCard>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-primary text-sm font-semibold hover:underline transition-all">
        View All Articles
      </button>
    </section>
  );
};
