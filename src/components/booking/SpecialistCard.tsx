import { Star } from "lucide-react";
import { Specialist } from "@/data/specialists";
import { useNavigate } from "react-router-dom";
import { BaseCard } from "@/components/layout/BaseCard";

interface SpecialistCardProps {
  specialist: Specialist;
}

export const SpecialistCard = ({ specialist }: SpecialistCardProps) => {
  const navigate = useNavigate();

  // Generate availability text
  const getAvailabilityText = () => {
    if (specialist.available) {
      return "🟢 Available today";
    }
    // Mock next slot time - in real app this would come from specialist data
    return "Next slot at 15:00";
  };

  return (
    <BaseCard
      variant="interactive"
      onClick={() => navigate(`/booking/specialist/${specialist.id}`)}
      className="p-4 hover:scale-[1.02] transition-smooth group"
      aria-label={`View ${specialist.name}'s profile`}
    >
      <div className="flex items-start gap-4">
        <img
          src={specialist.photo}
          alt={specialist.name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
        />
        <div className="flex-1 min-w-0">
          {/* Name + Specialization - Bold/Large */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-foreground text-title-3">
              {specialist.name}
            </h3>
            <span className="text-body">{specialist.countryFlag}</span>
          </div>
          <p className="font-semibold text-headline text-foreground mb-3">
            {specialist.specialty}
          </p>
          
          {/* Rating + reviews + sessions - Smaller/Lighter */}
          <div className="flex items-center gap-2 text-subhead text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="font-medium">
                {specialist.rating}
              </span>
              <span>
                ({specialist.reviewCount})
              </span>
            </div>
            <span>•</span>
            <span>
              {specialist.sessionCount}+ sessions
            </span>
          </div>

          {/* Availability line */}
          <div className="text-footnote text-muted-foreground mb-3">
            {getAvailabilityText()}
          </div>
        </div>
        
        {/* Price - Single line format */}
        <div className="text-right">
          <div className="text-title-3 font-semibold text-foreground">
            ${specialist.price} <span className="text-footnote font-normal text-muted-foreground">/ session</span>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};
