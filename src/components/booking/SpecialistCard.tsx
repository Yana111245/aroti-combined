import { useState, useEffect } from "react";
import { Star, CheckCircle2, Heart } from "lucide-react";
import { Specialist } from "@/data/specialists";
import { useNavigate } from "react-router-dom";
import { BaseCard } from "@/components/layout/BaseCard";
import { isFavorited, toggleFavorite } from "@/utils/favorites";

interface SpecialistCardProps {
  specialist: Specialist;
}

export const SpecialistCard = ({ specialist }: SpecialistCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load favorite status from localStorage on mount
  useEffect(() => {
    setIsFavorite(isFavorited(specialist.id));
  }, [specialist.id]);

  const handleCardClick = () => {
    navigate(`/booking/specialist/${specialist.id}`);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/booking/specialist/${specialist.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    const newState = toggleFavorite(specialist.id);
    setIsFavorite(newState);
    
    // Trigger animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <BaseCard
      variant="interactive"
      onClick={handleCardClick}
      className="p-3 sm:p-4 hover:scale-[1.02] transition-smooth group relative"
      aria-label={`View ${specialist.name}'s profile`}
    >
      {/* Heart Icon - Top Right */}
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 right-2 z-10 transition-all duration-200 hover:scale-110 ${isAnimating ? 'animate-heart-bounce' : ''}`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-200 ${
            isFavorite 
              ? 'fill-accent text-accent' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        />
      </button>

      <div className="flex flex-col gap-0.5">
        {/* Row 1: Avatar + Name + Price */}
        <div className="flex items-start gap-3 sm:gap-4">
          <img
            src={specialist.photo}
            alt={specialist.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-[12px] object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all flex-shrink-0"
          />
          <div className="flex-1 min-w-0 flex items-start justify-between gap-2 mt-6">
            <h3 className="font-bold text-foreground text-title-3 leading-tight">
              {specialist.name}
            </h3>
            <div className="text-right flex-shrink-0">
              <div className="text-title-3 font-semibold text-foreground whitespace-nowrap">
                ${specialist.price} <span className="text-footnote font-normal text-muted-foreground">/ session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Specialty Chip */}
        <div className="flex items-start gap-3 sm:gap-4 mt-1">
          <div className="w-16 sm:w-20 flex-shrink-0" /> {/* Spacer for avatar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Specialty Chip */}
            <span className="relative px-3 py-1.5 rounded-full flex items-center justify-center whitespace-nowrap transition-all duration-300 overflow-hidden liquid-glass-card bg-accent/20 border border-accent/50 text-accent shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] text-footnote font-medium">
              <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
              <span className="relative z-10">{specialist.specialty}</span>
            </span>
          </div>
        </div>

        {/* Row 3: Rating + Reviews + Sessions + Experience */}
        <div className="flex items-center gap-2 flex-wrap mt-1">
          <div className="w-16 sm:w-20 flex-shrink-0" /> {/* Spacer for avatar */}
          <div className="flex items-center gap-1 flex-nowrap flex-1 min-w-0">
            <Star className="w-3.5 h-3.5 fill-primary text-primary flex-shrink-0" />
            <span className="font-medium text-subhead text-muted-foreground whitespace-nowrap">
              {specialist.rating}
            </span>
            <span className="text-subhead text-muted-foreground whitespace-nowrap">
              ({specialist.reviewCount})
            </span>
            <span className="text-subhead text-muted-foreground mx-1">•</span>
            <span className="text-subhead text-muted-foreground whitespace-nowrap">
              {specialist.sessionCount}+ sessions
            </span>
            <span className="text-subhead text-muted-foreground mx-1">•</span>
            <span className="text-subhead text-muted-foreground whitespace-nowrap">
              {specialist.yearsOfPractice} years
            </span>
          </div>
        </div>

        {/* Row 4: Availability + CTA Button */}
        <div className="flex items-center justify-between gap-3 flex-wrap mt-1">
          <div className="w-16 sm:w-20 flex-shrink-0" /> {/* Spacer for avatar */}
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-footnote text-muted-foreground">
              {specialist.available ? "Available today" : "Next slot at 15:00"}
            </span>
          </div>
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 transition-colors flex-shrink-0"
          >
            Book session
          </button>
        </div>
      </div>
    </BaseCard>
  );
};
