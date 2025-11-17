import { useState, useEffect } from "react";
import { Star, Bookmark } from "lucide-react";
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
      className="p-3 sm:p-4 hover:scale-[1.02] transition-smooth group"
      aria-label={`View ${specialist.name}'s profile`}
    >
      <div className="flex flex-col gap-2">
        {/* Container for Avatar + Rows 1-3 */}
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Avatar - spans height of rows 1-3 */}
          <img
            src={specialist.photo}
            alt={specialist.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-[12px] object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all flex-shrink-0"
          />
          
          {/* Rows 1-3 Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            {/* Row 1: Name + Bookmark Icon */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-foreground text-title-3 leading-tight">
                {specialist.name}
              </h3>
              <button
                onClick={handleFavoriteClick}
                className={`transition-all duration-200 hover:scale-110 flex-shrink-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${isAnimating ? 'animate-heart-bounce' : ''}`}
                aria-label={isFavorite ? "Remove from saved" : "Save specialist"}
              >
                <Bookmark 
                  className={`w-5 h-5 transition-all duration-200 ${
                    isFavorite 
                      ? 'fill-accent text-accent' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                />
              </button>
            </div>

            {/* Row 2: Specialty Text + Price */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-body text-muted-foreground">
                {specialist.specialty}
              </span>
              <div className="text-right flex-shrink-0">
                <div className="text-body font-semibold text-foreground whitespace-nowrap">
                  ${specialist.price} <span className="text-footnote font-normal text-muted-foreground">/ session</span>
                </div>
              </div>
            </div>

            {/* Row 3: Rating + Reviews + Sessions + Experience */}
            <div className="flex items-center gap-1 flex-wrap">
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
                {specialist.yearsOfPractice} years experience
              </span>
            </div>
          </div>
        </div>

        {/* Row 4: CTA Button - Full Width */}
        <button
          onClick={handleButtonClick}
          className="mt-2 px-4 py-2 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 w-full"
        >
          Book session
        </button>
      </div>
    </BaseCard>
  );
};
