import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { specialists, reviews } from "@/data/specialists";
import { Button } from "@/components/ui/button";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
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
    <PageWrapper showBottomNav={true} showTabBar={false}>
      {/* Fixed Header */}
      <BaseHeader 
        title={specialist.name}
        subtitle={specialist.specialty}
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/booking"),
          label: "Back to booking"
        }}
      />
      
      {/* Main Content */}
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        {/* Header Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={specialist.photo}
            alt={specialist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <main className="px-4 pb-24 mt-4" role="main" aria-label="Specialist profile">
          <section className="space-y-6" aria-labelledby="profile-content">
            <h2 id="profile-content" className="sr-only">Profile Content</h2>
            
            {/* Profile Info Card */}
            <div className="liquid-glass-card p-6 animate-slide-up">
              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-body">
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
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-footnote font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Bio */}
              <p className="text-body text-foreground/80 leading-relaxed mb-6">
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
            <div>
              <h2 className="text-title-2 font-semibold text-foreground mb-4">
                What Clients Say
              </h2>
              <div className="space-y-4">
                {specialistReviews.map((review) => (
                  <BaseCard key={review.id} className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground text-headline">
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
                    <p className="text-body text-foreground/80">{review.comment}</p>
                  </BaseCard>
                ))}
              </div>
            </div>

            {/* Similar Specialists */}
            <div>
              <h2 className="text-title-2 font-semibold text-foreground mb-4">
                Similar Specialists
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {specialists
                  .filter((s) => s.id !== specialist.id)
                  .slice(0, 3)
                  .map((s) => (
                    <BaseCard
                      key={s.id}
                      variant="interactive"
                      onClick={() => navigate(`/booking/specialist/${s.id}`)}
                      className="p-4 min-w-[200px] cursor-pointer hover:scale-[1.02] transition-smooth"
                    >
                      <img
                        src={s.photo}
                        alt={s.name}
                        className="w-16 h-16 rounded-full object-cover mb-3 ring-2 ring-primary/20"
                      />
                      <h3 className="font-semibold text-headline text-foreground">{s.name}</h3>
                      <p className="text-body text-muted-foreground">{s.specialty}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-body font-medium">{s.rating}</span>
                      </div>
                    </BaseCard>
                  ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageWrapper>
  );
}
