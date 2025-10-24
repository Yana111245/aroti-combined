interface SpreadCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  cardCount: number;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate?: string;
  onClick?: () => void;
}

export const SpreadCard = ({ 
  id, 
  title, 
  description, 
  image, 
  cardCount, 
  difficulty = 'Beginner',
  timeEstimate = '15 min',
  onClick 
}: SpreadCardProps) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div 
      className="flex-shrink-0 w-48 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-32 rounded-[20px] overflow-hidden mb-3 group-hover:scale-105 transition-transform">
        <img src={image} className="w-full h-full object-cover" alt={title} />
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/50 backdrop-blur">
          <span className="text-xs text-white font-body">{cardCount} cards</span>
        </div>
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-body ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>
      <h3 className="font-title text-base font-medium text-foreground mb-1 line-clamp-1">{title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{description}</p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-body">⏱️ {timeEstimate}</span>
      </div>
    </div>
  );
};
