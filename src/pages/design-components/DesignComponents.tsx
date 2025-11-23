import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Settings,
  Star,
  Check,
  Plus,
  Pencil,
  Sparkles,
  Clock,
  Lock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  User,
  Home,
  Compass,
  Bell,
  Globe,
  Shield,
  Edit2,
  Wallet,
  FileText,
  Download,
  Heart,
  X,
  Filter,
  Search,
  Video,
  MessageCircle,
  Crown,
  Eye,
  EyeOff,
  Info,
  CreditCard,
  Smartphone,
  Bot,
  Users,
  Sunrise,
  Sun,
  Sunset,
  Lightbulb,
  TrendingUp,
  Scale,
  Target,
  BookOpen,
  History,
  Trash,
  Menu,
  MoreVertical,
} from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { BaseSectionHeader } from "@/components/layout/BaseSectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryChip } from "@/components/booking/CategoryChip";
import { SpecialistCard } from "@/components/booking/SpecialistCard";
import { StatusChip } from "@/components/profile/StatusChip";
import { TabPills } from "@/components/profile/TabPills";
import { GradientButton } from "@/components/profile/GradientButton";
import { SoftCard } from "@/components/profile/SoftCard";
import { SectionHeader } from "@/components/profile/SectionHeader";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { BackButton } from "@/components/onboarding/BackButton";
import { UnifiedModal } from "@/components/ui/UnifiedModal";
import { CTAButton } from "@/components/ui/CTAButton";
import { SSOButton } from "@/components/ui/SSOButton";
import { TodaysRitual } from "@/components/home/TodaysRitual";
import { ReflectionSection } from "@/components/home/ReflectionSection";
import { RevealedInsightCard } from "@/components/home/RevealedInsightCard";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { DailyPractice } from "@/components/discovery/DailyPractice";
import { DailyQuiz } from "@/components/discovery/DailyQuiz";
import { YourJourney } from "@/components/discovery/YourJourney";
import { SpreadCard } from "@/components/discovery/SpreadCard";
import { TarotSpreadCard } from "@/components/discovery/TarotSpreadCard";
import { SortDropdown } from "@/components/booking/SortDropdown";
import { FilterSheet } from "@/components/booking/FilterSheet";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import profileAvatar from "@/assets/specialist-1.jpg";
import tarotMoon from "@/assets/tarot-moon.jpg";

// Mock data for examples
const mockSpecialist = {
  id: "1",
  name: "Sarah Moon",
  specialty: "Tarot Reader",
  categories: ["Tarot", "Love Readings", "Career Guidance"],
  country: "USA",
  countryFlag: "🇺🇸",
  rating: 4.9,
  reviewCount: 127,
  sessionCount: 500,
  yearsOfPractice: 8,
  price: 75,
  bio: "Experienced tarot reader with 8 years of practice",
  photo: profileAvatar,
  available: true,
  languages: ["English", "Spanish"],
};

const mockRitual = {
  id: "1",
  title: "Morning Gratitude",
  description: "Start your day with intention and gratitude",
  duration: "5 min",
  type: "Mindfulness",
  intention: "Set positive energy for the day",
  steps: ["Find a quiet space", "Take three deep breaths", "List three things you're grateful for"],
  affirmation: "I am grateful for this new day",
};

const mockRecentlyViewed = [
  {
    id: "1",
    title: "Moon Guidance",
    type: "Spread",
    image: tarotMoon,
  },
  {
    id: "2",
    title: "The Fool",
    type: "Card",
    image: tarotMoon,
  },
  {
    id: "3",
    title: "Celtic Cross",
    type: "Spread",
    image: tarotMoon,
  },
];

const mockUpcomingSession = {
  id: "s1",
  specialistId: "1",
  specialistName: "Sarah Moon",
  specialistPhoto: profileAvatar,
  specialty: "Tarot Reading",
  date: new Date(Date.now() + 86400000).toISOString(),
  time: "14:00",
  duration: 60,
  price: 75,
  status: "upcoming" as const,
};

export default function DesignComponents() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("Overview");
  const [categoryActive, setCategoryActive] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [hasReflection, setHasReflection] = useState(false);
  const [sortOption, setSortOption] = useState<"price-low" | "price-high" | "rating" | "sessions" | "newest" | null>(null);
  const [filters, setFilters] = useState<{ availability?: string; priceMin?: number; priceMax?: number; rating?: string; languages?: string[]; yearsOfExperience?: string }>({});
  const [sliderValue, setSliderValue] = useState([50]);

  // Button variants and sizes from buttonVariants
  const buttonVariants = ["default", "glass", "outline", "ghost", "link"] as const;
  const buttonSizes = ["sm", "default", "lg", "icon"] as const;

  // All icons used in the app
  const allIcons = [
    { name: "Lock", icon: Lock },
    { name: "Calendar", icon: Calendar },
    { name: "Clock", icon: Clock },
    { name: "Star", icon: Star },
    { name: "Heart", icon: Heart },
    { name: "Settings", icon: Settings },
    { name: "Bell", icon: Bell },
    { name: "Globe", icon: Globe },
    { name: "Shield", icon: Shield },
    { name: "Edit2", icon: Edit2 },
    { name: "Wallet", icon: Wallet },
    { name: "FileText", icon: FileText },
    { name: "Download", icon: Download },
    { name: "Plus", icon: Plus },
    { name: "Pencil", icon: Pencil },
    { name: "Sparkles", icon: Sparkles },
    { name: "Check", icon: Check },
    { name: "ChevronRight", icon: ChevronRight },
    { name: "ChevronLeft", icon: ChevronLeft },
    { name: "ChevronDown", icon: ChevronDown },
    { name: "ArrowRight", icon: ArrowRight },
    { name: "ArrowLeft", icon: ArrowLeft },
    { name: "Bookmark", icon: Bookmark },
    { name: "User", icon: User },
    { name: "Home", icon: Home },
    { name: "Compass", icon: Compass },
    { name: "X", icon: X },
    { name: "Filter", icon: Filter },
    { name: "Search", icon: Search },
    { name: "Video", icon: Video },
    { name: "MessageCircle", icon: MessageCircle },
    { name: "Crown", icon: Crown },
    { name: "Eye", icon: Eye },
    { name: "EyeOff", icon: EyeOff },
    { name: "Info", icon: Info },
    { name: "CreditCard", icon: CreditCard },
    { name: "Smartphone", icon: Smartphone },
    { name: "Bot", icon: Bot },
    { name: "Users", icon: Users },
    { name: "Sunrise", icon: Sunrise },
    { name: "Sun", icon: Sun },
    { name: "Sunset", icon: Sunset },
    { name: "Lightbulb", icon: Lightbulb },
    { name: "TrendingUp", icon: TrendingUp },
    { name: "Scale", icon: Scale },
    { name: "Target", icon: Target },
    { name: "BookOpen", icon: BookOpen },
    { name: "History", icon: History },
    { name: "Trash", icon: Trash },
    { name: "Menu", icon: Menu },
    { name: "MoreVertical", icon: MoreVertical },
  ];

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Design Components"
        subtitle="All reusable components used in the app"
        leftAction={{
          icon: <ChevronLeft className="w-6 h-6" />,
          onClick: () => navigate(-1),
          label: "Go back",
        }}
      />

      <div className="home-tab-celestial bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-safe pb-6">
        <main className="px-4 pb-10 mt-4 space-y-8" role="main">
          
          {/* A. Typography */}
          <section>
            <BaseSectionHeader 
              title="A. Typography"
              subtitle="Text styles and sizes used throughout the app"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Text Sizes</h3>
                <div className="space-y-3">
                  <p className="text-large-title text-foreground">Large Title (text-large-title)</p>
                  <p className="text-title-1 text-foreground">Title 1 (text-title-1)</p>
                  <p className="text-title-2 text-foreground">Title 2 (text-title-2)</p>
                  <p className="text-title-3 text-foreground">Title 3 (text-title-3)</p>
                  <p className="text-headline text-foreground">Headline (text-headline)</p>
                  <p className="text-body text-foreground">Body (text-body)</p>
                  <p className="text-callout text-foreground">Callout (text-callout)</p>
                  <p className="text-subhead text-foreground">Subhead (text-subhead)</p>
                  <p className="text-footnote text-muted-foreground">Footnote (text-footnote)</p>
                  <p className="text-caption-1 text-muted-foreground">Caption 1 (text-caption-1)</p>
                  <p className="text-caption-2 text-muted-foreground">Caption 2 (text-caption-2)</p>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Font Weights</h3>
                <div className="space-y-2">
                  <p className="text-body text-foreground font-normal">Normal weight (font-normal)</p>
                  <p className="text-body text-foreground font-medium">Medium weight (font-medium)</p>
                  <p className="text-body text-foreground font-semibold">Semibold weight (font-semibold)</p>
                  <p className="text-body text-foreground font-bold">Bold weight (font-bold)</p>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Text Colors</h3>
                <div className="space-y-2">
                  <p className="text-body text-foreground">Foreground (text-foreground)</p>
                  <p className="text-body text-muted-foreground">Muted Foreground (text-muted-foreground)</p>
                  <p className="text-body text-accent">Accent (text-accent)</p>
                </div>
              </BaseCard>
            </div>
          </section>

          {/* B. Colors */}
          <section>
            <BaseSectionHeader 
              title="B. Colors"
              subtitle="Color tokens used in the app"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Color Variables</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-foreground"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Foreground</p>
                      <p className="text-footnote text-muted-foreground">hsl(var(--foreground))</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-muted-foreground"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Muted Foreground</p>
                      <p className="text-footnote text-muted-foreground">hsl(var(--muted-foreground))</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-accent"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Accent</p>
                      <p className="text-footnote text-muted-foreground">hsl(var(--accent))</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-primary"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Primary</p>
                      <p className="text-footnote text-muted-foreground">hsl(var(--primary))</p>
                    </div>
                  </div>
                </div>
              </BaseCard>
            </div>
          </section>

          {/* C. Buttons */}
          <section>
            <BaseSectionHeader 
              title="C. Buttons"
              subtitle="All button variants, sizes, and states"
            />
            <div className="mt-6 space-y-4">
              {/* Button Variants Matrix */}
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Button Variants</h3>
                <div className="space-y-4">
                  {buttonVariants.map((variant) => (
                    <div key={variant} className="space-y-2">
                      <p className="text-footnote text-muted-foreground font-medium">Variant: {variant}</p>
                      <div className="flex flex-wrap gap-3">
                        {buttonSizes.map((size) => (
                          <div key={`${variant}-${size}`} className="flex flex-col items-center gap-1">
                            <Button variant={variant} size={size}>
                              {size === "icon" ? <Settings className="w-4 h-4" /> : variant}
                            </Button>
                            <p className="text-caption-2 text-muted-foreground text-center">
                              {variant} / {size}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </BaseCard>

              {/* Buttons with Icons */}
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Buttons with Icons</h3>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Plus className="w-4 h-4" />
                      Add Item
                    </Button>
                    <Button>
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button>
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button>
                      <Check className="w-4 h-4" />
                      Confirm
                    </Button>
                  </div>
                  <p className="text-footnote text-muted-foreground">Button / default / default / with leading icon</p>
                </div>
              </BaseCard>

              {/* Disabled State */}
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Disabled State</h3>
                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled Default</Button>
                  <Button variant="glass" disabled>Disabled Glass</Button>
                  <Button variant="outline" disabled>Disabled Outline</Button>
                </div>
              </BaseCard>

              {/* Custom Button Components */}
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">GradientButton</h3>
                <div className="flex flex-wrap gap-3">
                  <GradientButton>Primary Gradient</GradientButton>
                  <GradientButton variant="outline">Outline Gradient</GradientButton>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">CTAButton</h3>
                <div className="space-y-3">
                  <CTAButton icon={<Sparkles className="w-5 h-5" />}>Start Free Trial</CTAButton>
                  <CTAButton variant="pill" icon={<Sparkles className="w-5 h-5" />}>Pill Variant</CTAButton>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">SSOButton</h3>
                <div className="space-y-3 max-w-md">
                  <SSOButton provider="apple" onClick={() => {}} />
                  <SSOButton provider="google" onClick={() => {}} />
                  <SSOButton provider="apple" loading onClick={() => {}} />
                </div>
              </BaseCard>

              {/* Accent Button Style (from cards) */}
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Accent Button (from cards)</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
                    Begin Practice
                  </button>
                  <p className="text-footnote text-muted-foreground">Used in TodaysRitual, ReflectionSection, DailyQuiz</p>
                </div>
              </BaseCard>

              {/* Glass Button Style (from cards) */}
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Glass Button (from cards)</h3>
                <div className="space-y-3">
                  <button className="px-4 py-2 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2">
                    Text
                  </button>
                  <p className="text-footnote text-muted-foreground">Used in SpecialistCard, Profile buttons</p>
                </div>
              </BaseCard>

              {/* Premium Unlock Button */}
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Premium Unlock Button</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2.5 rounded-[10px] border border-accent/50 bg-accent/10 hover:bg-accent/20 hover:border-accent transition-all text-subhead font-medium text-accent flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Unlock Full Astrology Report
                  </button>
                  <p className="text-footnote text-muted-foreground">Used in Profile pages for premium features</p>
                </div>
              </BaseCard>
            </div>
          </section>

          {/* D. Inputs & Forms */}
          <section>
            <BaseSectionHeader 
              title="D. Inputs & Forms"
              subtitle="Input and form controls"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Input</h3>
                <div className="space-y-3">
                  <Input placeholder="Enter text..." />
                  <Input type="email" placeholder="Email address" />
                  <Input type="password" placeholder="Password" />
                  <Input disabled placeholder="Disabled input" />
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Slider</h3>
                <div className="space-y-3">
                  <Slider 
                    value={sliderValue} 
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-footnote text-muted-foreground">Value: {sliderValue[0]}</p>
                  <p className="text-footnote text-muted-foreground">Used in FilterSheet for price range</p>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">SortDropdown</h3>
                <SortDropdown value={sortOption} onValueChange={setSortOption} />
                <p className="text-footnote text-muted-foreground mt-2">Used in Booking page for sorting specialists</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">FilterSheet</h3>
                <FilterSheet
                  specialists={[mockSpecialist]}
                  filters={filters}
                  onFiltersChange={setFilters}
                  activeFilterCount={Object.keys(filters).filter(k => filters[k as keyof typeof filters] !== undefined && (Array.isArray(filters[k as keyof typeof filters]) ? (filters[k as keyof typeof filters] as any[]).length > 0 : true)).length}
                />
                <p className="text-footnote text-muted-foreground mt-2">Used in Booking page for filtering specialists</p>
              </BaseCard>
            </div>
          </section>

          {/* E. Cards */}
          <section>
            <BaseSectionHeader 
              title="E. Cards"
              subtitle="Card components used throughout the app"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">BaseCard Variants</h3>
                <div className="space-y-3">
                  <BaseCard className="p-4">
                    <p className="text-body text-foreground">Standard BaseCard</p>
                  </BaseCard>
                  <BaseCard variant="interactive" className="p-4" onClick={() => {}}>
                    <p className="text-body text-foreground">Interactive BaseCard (clickable)</p>
                  </BaseCard>
                  <BaseCard variant="secondary" className="p-4">
                    <p className="text-body text-foreground">Secondary BaseCard</p>
                  </BaseCard>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Today's Ritual</h3>
                <TodaysRitual 
                  ritual={mockRitual}
                  isCompleted={false}
                  onBegin={() => {}}
                />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Reflection</h3>
                <ReflectionSection
                  hasReflection={hasReflection}
                  reflection={hasReflection ? "Today was a day of growth and reflection. I felt more connected to my inner self." : undefined}
                  onAddReflection={() => setHasReflection(!hasReflection)}
                  reflectionTimestamp={hasReflection ? new Date() : undefined}
                />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Revealed Insight</h3>
                <div className="space-y-3">
                  <RevealedInsightCard
                    type="tarot"
                    title="Your Tarot Card"
                    icon={<Star className="w-5 h-5" />}
                    preview="The Fool - New beginnings await"
                    onView={() => {}}
                  />
                  <RevealedInsightCard
                    type="horoscope"
                    title="Your Horoscope"
                    icon={<Star className="w-5 h-5" />}
                    preview="Pisces - Intuitive nature heightened"
                    onView={() => {}}
                  />
                  <RevealedInsightCard
                    type="numerology"
                    title="Your Numerology"
                    icon={<Star className="w-5 h-5" />}
                    preview="Energy number 7 - spiritual focus"
                    onView={() => {}}
                  />
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Specialist</h3>
                <SpecialistCard specialist={mockSpecialist} />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Upcoming Session</h3>
                <BaseCard className="p-3 sm:p-4 liquid-glass-card border border-glass-border/70 shadow-glass">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <img
                        src={mockUpcomingSession.specialistPhoto}
                        alt={mockUpcomingSession.specialistName}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-[12px] object-cover ring-2 ring-primary/20 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 flex flex-col gap-2">
                        <h3 className="text-headline text-foreground font-semibold leading-tight">
                          {mockUpcomingSession.specialistName}
                        </h3>
                        <span className="text-body text-muted-foreground">
                          {mockUpcomingSession.specialty}
                        </span>
                        <div className="flex items-center gap-1 flex-wrap text-subhead text-muted-foreground">
                          <span className="whitespace-nowrap font-medium">Tomorrow</span>
                          <span className="mx-1">at</span>
                          <span className="whitespace-nowrap font-medium">2:00 PM</span>
                          <span className="mx-1">•</span>
                          <span className="whitespace-nowrap">{mockUpcomingSession.duration} min</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="flex-1 px-4 py-2 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200">
                        Text
                      </button>
                      <button className="flex-1 px-4 py-2 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </BaseCard>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Recently Viewed</h3>
                <RecentlyViewed items={mockRecentlyViewed} />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Daily Practice</h3>
                <DailyPractice />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Daily Quiz</h3>
                <DailyQuiz />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Your Journey</h3>
                <YourJourney 
                  variant="compact"
                  streakValue={7}
                  readings={24}
                  reflections={12}
                  rituals={8}
                />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Spread Card</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  <SpreadCard
                    id="1"
                    title="Celtic Cross"
                    description="A comprehensive 10-card spread"
                    cardCount={10}
                    difficulty="Intermediate"
                    timeEstimate="20 min"
                    onClick={() => {}}
                  />
                  <SpreadCard
                    id="2"
                    title="Three Card"
                    description="Past, present, future"
                    cardCount={3}
                    difficulty="Beginner"
                    timeEstimate="10 min"
                    onClick={() => {}}
                  />
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Tarot Spread Card</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  <TarotSpreadCard
                    spreadName="Celtic Cross"
                    cardCount={10}
                    description="Comprehensive reading"
                    onClick={() => {}}
                  />
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / SoftCard</h3>
                <SoftCard>
                  <p className="text-body text-foreground">This is a SoftCard component example.</p>
                </SoftCard>
              </BaseCard>
            </div>
          </section>

          {/* F. Tabs / Navigation */}
          <section>
            <BaseSectionHeader 
              title="F. Tabs / Navigation"
              subtitle="Tab and navigation components"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">TabPills</h3>
                <TabPills
                  tabs={["Overview", "Settings", "History"]}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Bottom Navigation</h3>
                <p className="text-body text-muted-foreground mb-4">
                  The bottom navigation bar is shown at the bottom of the page. It includes: Home, Discovery, Booking, Profile
                </p>
                <div className="rounded-[12px] border border-white/10 p-4 bg-white/5">
                  <p className="text-footnote text-muted-foreground">Bottom nav is rendered via PageWrapper component</p>
                </div>
              </BaseCard>
            </div>
          </section>

          {/* G. Badges / Tags / Points */}
          <section>
            <BaseSectionHeader 
              title="G. Badges / Tags / Points"
              subtitle="Status labels, category tags, and badges"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">StatusChip</h3>
                <div className="flex flex-wrap gap-2">
                  <StatusChip status="confirmed" />
                  <StatusChip status="pending" />
                  <StatusChip status="completed" />
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Badge / status / Confirmed, Pending, Completed</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">CategoryChip</h3>
                <div className="flex flex-wrap gap-2">
                  <CategoryChip 
                    label="All" 
                    active={categoryActive === "All"}
                    onClick={() => setCategoryActive("All")}
                  />
                  <CategoryChip 
                    label="Tarot" 
                    active={categoryActive === "Tarot"}
                    onClick={() => setCategoryActive("Tarot")}
                  />
                  <CategoryChip 
                    label="Astrology" 
                    active={categoryActive === "Astrology"}
                    onClick={() => setCategoryActive("Astrology")}
                  />
                  <CategoryChip 
                    label="Numerology" 
                    active={categoryActive === "Numerology"}
                    onClick={() => setCategoryActive("Numerology")}
                  />
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Badge / category / Active and inactive states</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card Tags (from Ritual Card)</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
                    5 min
                  </span>
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full">
                    Mindfulness
                  </span>
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Badge / tag / Duration and type</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Type Badge (from cards)</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                    Practice
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                    Spread
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                    Card
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                    Learn
                  </span>
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Badge / type / Content type indicators</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Difficulty Badge (from SpreadCard)</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-footnote font-body border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    Beginner
                  </span>
                  <span className="px-3 py-1 rounded-full text-footnote font-body border bg-amber-500/20 text-amber-300 border-amber-500/30">
                    Intermediate
                  </span>
                  <span className="px-3 py-1 rounded-full text-footnote font-body border bg-rose-500/20 text-rose-300 border-rose-500/30">
                    Advanced
                  </span>
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Badge / difficulty / Beginner, Intermediate, Advanced</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card Count Badge (from SpreadCard)</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <span className="text-footnote text-white font-body">10 cards</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <span className="text-footnote text-white font-body">3 cards</span>
                  </span>
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Badge / card count / Number of cards in spread</p>
              </BaseCard>
            </div>
          </section>

          {/* H. Icons */}
          <section>
            <BaseSectionHeader 
              title="H. Icons"
              subtitle="All icons used in the app from lucide-react"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Icon Library</h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                  {allIcons.map(({ name, icon: Icon }) => (
                    <div key={name} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 flex items-center justify-center rounded-[12px] bg-white/5 border border-white/10">
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>
                      <p className="text-caption-2 text-muted-foreground text-center">{name}</p>
                    </div>
                  ))}
                </div>
              </BaseCard>
            </div>
          </section>

          {/* I. Modals / Overlays */}
          <section>
            <BaseSectionHeader 
              title="I. Modals / Overlays"
              subtitle="Modal and dialog components"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">UnifiedModal</h3>
                <Button onClick={() => setModalOpen(true)}>Open Unified Modal</Button>
                <UnifiedModal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Unified Modal"
                  subtitle="A unified modal component with primary and secondary actions"
                  primaryButton={{
                    label: "Confirm",
                    onClick: () => {
                      setModalOpen(false);
                      toast({
                        title: "Confirmed",
                        description: "Action confirmed successfully.",
                      });
                    },
                  }}
                  secondaryButton={{
                    label: "Cancel",
                    onClick: () => setModalOpen(false),
                  }}
                >
                  <p className="text-body text-foreground">This is the unified modal content. It matches the design system used throughout the app.</p>
                </UnifiedModal>
              </BaseCard>
            </div>
          </section>

          {/* Layout Components */}
          <section>
            <BaseSectionHeader 
              title="Layout Components"
              subtitle="Core layout and structure components"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">BaseSectionHeader</h3>
                <div className="space-y-3">
                  <BaseSectionHeader title="Section Title" subtitle="Section subtitle" />
                  <BaseSectionHeader 
                    title="With View All" 
                    subtitle="Clickable view all button"
                    onViewAll={() => {}}
                  />
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">SectionHeader</h3>
                <SectionHeader title="Section Title" description="Section description" />
              </BaseCard>
            </div>
          </section>

          {/* Onboarding Components */}
          <section>
            <BaseSectionHeader 
              title="Onboarding Components"
              subtitle="Components used in onboarding flow"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">ProgressBar</h3>
                <ProgressBar currentStep={3} totalSteps={5} />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">BackButton</h3>
                <BackButton onClick={() => navigate(-1)} />
              </BaseCard>
            </div>
          </section>

          {/* Avatars */}
          <section>
            <BaseSectionHeader 
              title="Avatars"
              subtitle="Profile images and avatars"
            />
            <div className="mt-6 space-y-4">
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Avatar Styles</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={profileAvatar}
                    alt="Avatar example"
                    className="w-20 h-20 rounded-[12px] object-cover ring-2 ring-primary/20 flex-shrink-0"
                  />
                  <div>
                    <p className="text-body text-foreground">Standard avatar (rounded-[12px])</p>
                    <p className="text-footnote text-muted-foreground mt-1">Used in SpecialistCard and Profile pages</p>
                  </div>
                </div>
              </BaseCard>
            </div>
          </section>

        </main>
      </div>

      {/* Coverage Checklist Comment */}
      {/* 
      /design-components coverage checklist
      - [x] All Button variants + sizes used in the app are shown (default, glass, outline, ghost, link + sm, default, lg, icon)
      - [x] All icon components used in the app are rendered in the Icons section (including Lock, Calendar, Star, etc.)
      - [x] All Card types from Home/Discovery/Booking/Profile are shown (TodaysRitual, ReflectionSection, RevealedInsightCard, SpecialistCard, RecentlyViewed, DailyPractice, DailyQuiz, YourJourney, SpreadCard, TarotSpreadCard, Upcoming Session Card)
      - [x] All Input/Form components are shown (Input with all states, Slider, SortDropdown, FilterSheet)
      - [x] All Tabs/Navigation variants are shown (TabPills, Bottom nav)
      - [x] All Badge/Tag/Points styles are shown (StatusChip, CategoryChip, card tags, type badges, difficulty badges, card count badges)
      - [x] All custom button components are shown (CTAButton, SSOButton, GradientButton, accent button, glass button, premium unlock button)
      - [x] All icons used in the app are included (Lock, Calendar, Star, ChevronDown, etc. - complete list in Icons section)
      - [x] No new styles or colors introduced - all use existing design tokens
      */}
    </PageWrapper>
  );
}
