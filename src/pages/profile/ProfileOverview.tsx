import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  ChevronRight,
  Sparkles,
  Bell,
  Globe,
  Shield,
  Edit2,
  Wallet,
  Lock,
  Heart,
  FileText,
  Download,
  Plus
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { CategoryChip } from "@/components/booking/CategoryChip";
import { PremiumPaywallModal } from "@/components/profile/PremiumPaywallModal";
import { PDFPurchaseModal } from "@/components/profile/PDFPurchaseModal";
import { AstrologyDetailModal } from "@/components/profile/AstrologyDetailModal";
import { NumerologyDetailModal } from "@/components/profile/NumerologyDetailModal";
import { PartnerInputModal } from "@/components/profile/PartnerInputModal";
import { EditProfileModal } from "@/components/profile/EditProfileModal";
import profileAvatar from "@/assets/specialist-1.jpg";

const savedLibrary = {
  Readings: [
    "Celtic Cross Spread",
    "Moonlit Reflection",
    "Solar Alignment"
  ],
  Practices: [
    "Morning Mantra",
    "Gratitude Flow",
    "Evening Integration"
  ]
};

const accountTools = [
  { label: "Wallet & Credits", icon: Wallet, path: "/profile/settings/wallet" },
  { label: "Settings", icon: Settings, path: "/profile/settings" },
  { label: "Notifications", icon: Bell, path: "/profile/notifications" },
  { label: "Language", icon: Globe, path: "/profile/language" },
  { label: "Privacy & Terms", icon: Shield, path: "/profile/settings/privacy" }
];

const astrologyPlacements = [
  {
    title: "Sun — Virgo",
    description: "Identity • How you move through the world",
    sign: "Virgo",
    meaning: "Your Sun in Virgo reflects a practical, analytical nature. You move through the world with attention to detail and a desire to be of service. You find meaning in organization, improvement, and helping others."
  },
  {
    title: "Moon — Pisces",
    description: "Inner world • How you feel and process emotion",
    sign: "Pisces",
    meaning: "Your Moon in Pisces reveals a deeply intuitive and empathetic emotional nature. You process feelings through imagination and compassion, often absorbing the emotions of those around you."
  },
  {
    title: "Rising — Leo",
    description: "First impression • The energy you project to others",
    sign: "Leo",
    meaning: "Your Rising in Leo means you present with warmth and confidence. Others see your natural radiance first. You project an energy of creativity, leadership, and generosity."
  }
];

const premiumAstrologyFeatures = [
  "All planets (Venus, Mars, Mercury...)",
  "12 Houses",
  "Aspects",
  "Strengths & weaknesses",
  "Full personality, love, career, health interpretation",
  "Full chart overview"
];

const premiumNumerologyFeatures = [
  "Destiny Number",
  "Expression Number",
  "Soul Urge",
  "Birthday Number",
  "Karmic Lessons"
];

const reports = [
  {
    id: "birth-chart",
    name: "Birth Chart Report",
    description: "Comprehensive analysis of your natal chart",
    price: 11.99
  },
  {
    id: "numerology",
    name: "Numerology Report",
    description: "Complete numerology analysis and insights",
    price: 7.99
  },
  {
    id: "compatibility",
    name: "Compatibility Report",
    description: "Deep dive into relationship dynamics",
    price: 9.99
  },
  {
    id: "year-ahead",
    name: "Year Ahead Report",
    description: "Astrological forecast for the coming year",
    price: 12.99
  }
];

export default function ProfileOverview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<keyof typeof savedLibrary>("Readings");
  
  // Modal states
  const [showAstrologyModal, setShowAstrologyModal] = useState(false);
  const [selectedAstrologyPlacement, setSelectedAstrologyPlacement] = useState<typeof astrologyPlacements[0] | null>(null);
  const [showNumerologyModal, setShowNumerologyModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showNatalPaywall, setShowNatalPaywall] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleAstrologyPlacementClick = (placement: typeof astrologyPlacements[0]) => {
    setSelectedAstrologyPlacement(placement);
    setShowAstrologyModal(true);
  };

  const handleNumerologyClick = () => {
    setShowNumerologyModal(true);
  };

  const handlePremiumClick = () => {
    setShowPaywall(true);
  };

  const handlePDFPurchase = (report: typeof reports[0]) => {
    setSelectedReport(report);
    setShowPDFModal(true);
  };

  const handlePDFPurchaseConfirm = () => {
    // Handle PDF purchase logic here
    console.log("Purchasing:", selectedReport);
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Profile"
        subtitle="Your cosmic journey and personal insights"
      />

      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-safe pb-6">
        <main className="px-4 pb-10 mt-4 space-y-8" role="main" aria-label="Profile content">
          
          {/* 1. Profile Header */}
          <section>
            <BaseCard className="p-4">
              <div className="flex items-start gap-4">
                {/* Avatar - 80x80 matching SpecialistCard */}
                <img
                  src={profileAvatar}
                  alt="Alexandra Moon"
                  className="w-20 h-20 rounded-[12px] object-cover ring-2 ring-primary/20 flex-shrink-0"
                />
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-title-3 font-semibold text-foreground">Alexandra Moon</h1>
                  <p className="text-footnote text-muted-foreground mt-1">San Francisco, CA</p>
                </div>
                
                {/* Action Button */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="px-4 py-2 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border hover:bg-white/10 hover:border-glass-highlight transition-colors text-subhead font-medium text-foreground"
                    aria-label="Edit profile"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </BaseCard>
          </section>

          {/* 2. Your Blueprint */}
          <section>
            <BaseSectionHeader 
              title="Your Blueprint"
              subtitle="Your core traits based on your birth details"
            />
            <div className="mt-6 space-y-4">
              {/* Astrology Card */}
              <BaseCard className="p-5 space-y-4">
                <div>
                  <h3 className="text-title-3 font-title text-foreground">Astrology</h3>
                  <p className="text-footnote text-muted-foreground mt-1">
                    Your essential placements based on your birth date, time, and location.
                  </p>
                </div>
                <div className="space-y-3">
                  {astrologyPlacements.map((placement) => (
                    <div
                      key={placement.title}
                      onClick={() => handleAstrologyPlacementClick(placement)}
                      className="rounded-[12px] border border-white/5 bg-white/2 p-3 cursor-pointer hover:bg-white/5 transition-colors"
                    >
                      <p className="text-body font-medium text-foreground">{placement.title}</p>
                      <p className="text-footnote text-muted-foreground mt-1">{placement.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Premium Locked Items */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-4 h-4 text-accent" />
                    <p className="text-footnote text-accent">Premium Features</p>
                  </div>
                  <div className="space-y-2">
                    {premiumAstrologyFeatures.slice(0, 3).map((feature, index) => (
                      <div
                        key={index}
                        onClick={handlePremiumClick}
                        className="flex items-center gap-2 text-body text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      >
                        <Lock className="w-3 h-3 text-accent" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePremiumClick}
                  className="w-full mt-4 px-4 py-2.5 rounded-[10px] border border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all text-subhead font-medium text-accent flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Unlock Full Astrology Report
                </button>
              </BaseCard>

              {/* Numerology Card */}
              <BaseCard className="p-5 space-y-4">
                <div>
                  <h3 className="text-title-3 font-title text-foreground">Numerology</h3>
                  <p className="text-footnote text-muted-foreground mt-1">
                    Your life path number calculated from your birth date.
                  </p>
                </div>
                <div
                  onClick={handleNumerologyClick}
                  className="rounded-[12px] border border-white/5 bg-white/2 p-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <p className="text-title-3 font-semibold text-foreground">Life Path 3 — The Connector</p>
                  <p className="text-footnote text-muted-foreground mt-2">
                    Creative energy • Expression • Communication
                  </p>
                </div>
                
                {/* Premium Locked Items */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-4 h-4 text-accent" />
                    <p className="text-footnote text-accent">Premium Numbers</p>
                  </div>
                  <div className="space-y-2">
                    {premiumNumerologyFeatures.slice(0, 3).map((feature, index) => (
                      <div
                        key={index}
                        onClick={handlePremiumClick}
                        className="flex items-center gap-2 text-body text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      >
                        <Lock className="w-3 h-3 text-accent" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePremiumClick}
                  className="w-full mt-4 px-4 py-2.5 rounded-[10px] border border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all text-subhead font-medium text-accent flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Unlock All Numerology Numbers
                </button>
              </BaseCard>

              {/* Compatibility Card */}
              <BaseCard className="p-5 space-y-4">
                <div>
                  <h3 className="text-title-3 font-title text-foreground">Compatibility</h3>
                  <p className="text-footnote text-muted-foreground mt-1">
                    Explore your relationship dynamics and connection patterns.
                  </p>
                </div>
                <button
                  onClick={() => setShowPartnerModal(true)}
                  className="w-full px-4 py-2.5 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Partner
                </button>
                <div className="rounded-[12px] border border-white/5 bg-white/2 p-4">
                  <p className="text-footnote text-muted-foreground">
                    Your Sun-Sign compatibility preview
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-4 h-4 text-accent" />
                    <p className="text-footnote text-accent">Premium Features</p>
                  </div>
                  <div className="space-y-2">
                    <div
                      onClick={handlePremiumClick}
                      className="flex items-center gap-2 text-body text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    >
                      <Lock className="w-3 h-3 text-accent" />
                      <span>Full emotional compatibility</span>
                    </div>
                    <div
                      onClick={handlePremiumClick}
                      className="flex items-center gap-2 text-body text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    >
                      <Lock className="w-3 h-3 text-accent" />
                      <span>Communication chemistry</span>
                    </div>
                    <div
                      onClick={handlePremiumClick}
                      className="flex items-center gap-2 text-body text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    >
                      <Lock className="w-3 h-3 text-accent" />
                      <span>Long-term potential</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handlePremiumClick}
                  className="w-full mt-4 px-4 py-2.5 rounded-[10px] border border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all text-subhead font-medium text-accent flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Full Compatibility Insights
                </button>
              </BaseCard>

              {/* Natal Chart Wheel */}
              <BaseCard
                onClick={() => setShowNatalPaywall(true)}
                className="p-5 space-y-4 cursor-pointer hover:bg-white/5 transition-colors relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-50 blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-title-3 font-title text-foreground">Natal Chart Wheel</h3>
                      <p className="text-footnote text-muted-foreground mt-1">
                        Your unique natal blueprint
                      </p>
                    </div>
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="w-full h-48 rounded-[12px] bg-gradient-to-br from-accent/10 via-white/5 to-accent/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
                    {/* Constellation-like background pattern */}
                    <div className="absolute inset-0 backdrop-blur-sm">
                      {/* Radial gradient for circular chart effect */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(199,176,126,0.15)_0%,_transparent_70%)]" />
                      {/* Subtle constellation dots */}
                      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-accent/40 rounded-full" />
                      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/30 rounded-full" />
                      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-accent/35 rounded-full" />
                      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-accent/40 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-accent/25 rounded-full -translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute top-1/5 right-1/5 w-0.5 h-0.5 bg-accent/30 rounded-full" />
                      <div className="absolute bottom-1/5 left-1/5 w-0.5 h-0.5 bg-accent/30 rounded-full" />
                    </div>
                    <div className="relative z-10 text-center">
                      <p className="text-body text-muted-foreground mb-2">Premium Feature</p>
                      <p className="text-footnote text-muted-foreground">Tap to unlock</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePremiumClick();
                    }}
                    className="w-full mt-4 px-4 py-2.5 rounded-[10px] border border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all text-subhead font-medium text-accent flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Unlock Full Blueprint
                  </button>
                </div>
              </BaseCard>
            </div>
          </section>

          {/* 3. Saved Content */}
          <section>
            <BaseSectionHeader 
              title="Saved Content"
              subtitle="Your personal library of readings and tools"
              onViewAll={() => navigate("/profile/saved")}
            />
            <div className="mt-6 space-y-4">
              {/* Category Chips */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {Object.keys(savedLibrary).map((tab) => (
                  <CategoryChip
                    key={tab}
                    label={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab as keyof typeof savedLibrary)}
                  />
                ))}
              </div>

              {/* Saved Items Horizontal Scroll */}
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 pl-0 pr-4">
                {savedLibrary[activeTab].map((item, index) => {
                  // Example: first item in Practices is premium
                  const isPremium = activeTab === "Practices" && index === 0;
                  return (
                    <div
                      key={item}
                      onClick={() => {
                        if (isPremium) {
                          handlePremiumClick();
                        } else {
                          // Navigate to content
                          navigate(`/profile/saved`);
                        }
                      }}
                      className="flex-shrink-0 w-[320px] h-[200px] flex apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-6 relative"
                    >
                      {/* Content */}
                      <div className="relative z-10 flex flex-col h-full justify-between w-full">
                        {/* Subtle liquid glass highlight */}
                        <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                              {activeTab}
                            </span>
                            {isPremium && (
                              <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-caption-2 font-medium flex items-center gap-1">
                                <Lock className="w-3 h-3" />
                                Premium
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-headline font-title font-medium text-foreground leading-tight mt-2">{item}</h3>
                          <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">
                            {isPremium ? "Unlock to view" : "Tap to view your saved content"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 4. Reports */}
          <section>
            <BaseSectionHeader 
              title="Reports"
              subtitle="Purchase detailed PDF reports"
            />
            <div className="mt-6">
              <BaseCard className="p-5">
                <div className="grid gap-3">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => handlePDFPurchase(report)}
                      className="rounded-[12px] border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 hover:border-accent/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-body font-medium text-foreground">{report.name}</p>
                          <p className="text-footnote text-muted-foreground mt-1">{report.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-title-3 font-semibold text-accent">${report.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </BaseCard>
            </div>
          </section>

          {/* 5. Your Membership */}
          <section>
            <BaseSectionHeader 
              title="Your Membership"
              subtitle="Unlock your full cosmic potential"
            />
            <div className="mt-6">
              <div className="rounded-[12px] border border-accent/40 bg-gradient-to-r from-accent/25 via-accent/10 to-transparent p-5 shadow-elevated">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <p className="text-title-3 font-title text-foreground">Membership</p>
                    <p className="text-footnote text-muted-foreground mt-2">
                      You're on the Free Plan
                    </p>
                  </div>
                  <Sparkles className="w-6 h-6 text-accent flex-shrink-0" />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-body text-foreground">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Access every ritual and reading</span>
                  </div>
                  <div className="flex items-center gap-2 text-body text-foreground">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Reveal your full astrological blueprint</span>
                  </div>
                  <div className="flex items-center gap-2 text-body text-foreground">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Unlock complete numerology insights</span>
                  </div>
                  <div className="flex items-center gap-2 text-body text-foreground">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Premium compatibility breakdowns</span>
                  </div>
                  <div className="flex items-center gap-2 text-body text-foreground">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span>Zero ads, pure focus</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/profile/subscription")}
                  className="w-full rounded-[10px] bg-gradient-to-r from-accent via-accent/90 to-accent text-white px-4 py-3 text-subhead font-semibold hover:opacity-90 transition-all hover:shadow-lg"
                >
                  Unlock All Access
                </button>
              </div>
            </div>
          </section>

          {/* 6. Account & Settings */}
          <section className="border-t border-white/10 mt-8 pt-8">
            <BaseSectionHeader 
              title="Account & Settings"
              subtitle="Manage your preferences and privacy"
            />
            <div className="mt-6 grid gap-3">
              {accountTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <BaseCard
                    key={tool.label}
                    variant="interactive"
                    onClick={() => navigate(tool.path)}
                    className="p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-[8px] bg-white/5">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="flex-1 text-body font-medium text-foreground">{tool.label}</span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </BaseCard>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      {/* Modals */}
      {selectedAstrologyPlacement && (
        <AstrologyDetailModal
          isOpen={showAstrologyModal}
          onClose={() => {
            setShowAstrologyModal(false);
            setSelectedAstrologyPlacement(null);
          }}
          placement={selectedAstrologyPlacement}
        />
      )}

      <NumerologyDetailModal
        isOpen={showNumerologyModal}
        onClose={() => setShowNumerologyModal(false)}
        lifePath={{
          number: 3,
          name: "The Connector",
          traits: ["Creative energy", "Expression", "Communication"],
          meaning: "You're here to express, inspire, and bring people together through creativity and communication. Joy is your natural state. Your life path encourages you to share your gifts with the world and connect with others through your unique voice."
        }}
      />

      <PremiumPaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
      />

      <PremiumPaywallModal
        isOpen={showNatalPaywall}
        onClose={() => setShowNatalPaywall(false)}
        title="Unlock Natal Chart Wheel"
        description="Get full interactive natal wheel with planets, houses, and aspects"
      />

      {selectedReport && (
        <PDFPurchaseModal
          isOpen={showPDFModal}
          onClose={() => {
            setShowPDFModal(false);
            setSelectedReport(null);
          }}
          reportName={selectedReport.name}
          description={selectedReport.description}
          price={selectedReport.price}
          onPurchase={handlePDFPurchaseConfirm}
        />
      )}

      <PartnerInputModal
        isOpen={showPartnerModal}
        onClose={() => setShowPartnerModal(false)}
      />

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        initialData={{
          name: "Alexandra Moon",
          birthDate: "1990-09-12",
          birthTime: "",
          location: "San Francisco, CA, USA",
        }}
        onSave={(data) => {
          console.log("Profile saved:", data);
          // Handle save logic here
        }}
      />
    </PageWrapper>
  );
}
