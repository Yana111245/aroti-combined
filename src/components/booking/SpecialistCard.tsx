import { Star } from "lucide-react";
import { Specialist } from "@/data/specialists";
import { useNavigate } from "react-router-dom";
import { BaseCard } from "@/components/layout/BaseCard";

interface SpecialistCardProps {
  specialist: Specialist;
}

export const SpecialistCard = ({ specialist }: SpecialistCardProps) => {
  const navigate = useNavigate();

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
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground text-headline">
              {specialist.name}
            </h3>
            <span className="text-body">{specialist.countryFlag}</span>
          </div>
          <p className="text-body text-muted-foreground mb-2">
            {specialist.specialty}
          </p>
          <div className="flex items-center gap-3 text-body">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium text-foreground">
                {specialist.rating}
              </span>
              <span className="text-muted-foreground">
                ({specialist.reviewCount})
              </span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {specialist.sessionCount}+ sessions
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-title-3 font-semibold text-foreground mb-1">
            ${specialist.price}
          </div>
          <div className="text-footnote text-muted-foreground">per session</div>
        </div>
      </div>
    </BaseCard>
  );
};
