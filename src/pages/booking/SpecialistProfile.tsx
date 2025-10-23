import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { specialists, reviews } from "@/data/specialists";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/booking/BottomNav";
import { buttonVariants } from "@/components/ui/button-variants";

export default function SpecialistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const specialist = specialists.find((s) => s.id === id);
  const specialistReviews = reviews.filter((r) => r.specialistId === id);

  if (!specialist) {
    return <div>Specialist not found</div>;
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={specialist.photo}
          alt={specialist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <button
          onClick={() => navigate("/booking")}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-smooth"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Profile Content */}
      <div className="px-6 -mt-8 relative z-10">
        <div className="glass-card p-6 mb-6 animate-slide-up">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {specialist.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            {specialist.specialty}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold text-foreground">
                {specialist.rating}
              </span>
              <span className="text-muted-foreground">
                ({specialist.reviewCount} reviews)
              </span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {specialist.sessionCount}+ sessions
            </span>
          </div>

          {/* Specialties */}
          <div className="flex gap-2 flex-wrap mb-6">
            {specialist.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-foreground/80 leading-relaxed mb-6">
            {specialist.bio}
          </p>

          {/* CTA */}
          <Button
            onClick={() => navigate(`/booking/schedule/${specialist.id}`)}
            className={buttonVariants({ variant: "gold", size: "lg" })}
          >
            Book a Session • ${specialist.price}
          </Button>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            What Clients Say
          </h2>
          <div className="space-y-4">
            {specialistReviews.map((review) => (
              <div key={review.id} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-foreground">
                    {review.userName}
                  </span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/80">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Specialists */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Similar Specialists
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {specialists
              .filter((s) => s.id !== specialist.id)
              .slice(0, 3)
              .map((s) => (
                <div
                  key={s.id}
                  onClick={() => navigate(`/booking/specialist/${s.id}`)}
                  className="glass-card p-4 min-w-[200px] cursor-pointer hover:scale-[1.02] transition-smooth"
                >
                  <img
                    src={s.photo}
                    alt={s.name}
                    className="w-16 h-16 rounded-full object-cover mb-3 ring-2 ring-primary/20"
                  />
                  <h3 className="font-semibold text-foreground">{s.name}</h3>
                  <p className="text-sm text-muted-foreground">{s.specialty}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    <span className="text-sm font-medium">{s.rating}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <BottomNav />

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
