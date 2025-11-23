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
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { FloatingGuidanceButton } from "@/components/guidance/FloatingGuidanceButton";
import { FloatingSearchButton } from "@/components/discovery/FloatingSearchButton";
import { TarotOverflowModal } from "@/components/home/TarotOverflowModal";
import { DailyAffirmation } from "@/components/home/DailyAffirmation";
import { Courses } from "@/components/discovery/Courses";
import profileAvatar from "@/assets/specialist-1.jpg";
import tarotMoon from "@/assets/tarot-moon.jpg";
import tarotFool from "@/assets/tarot-fool.png";

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
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-secondary"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Secondary</p>
                      <p className="text-footnote text-muted-foreground">hsl(var(--secondary))</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-destructive"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Destructive / Error</p>
                      <p className="text-footnote text-muted-foreground">hsl(var(--destructive))</p>
                    </div>
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Surface Colors</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-background"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Surface Background</p>
                      <p className="text-footnote text-muted-foreground">hsl(var(--background))</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-card"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Surface Elevated (Card)</p>
                      <p className="text-footnote text-muted-foreground">hsl(var(--card))</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] liquid-glass-card border border-glass-border"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Surface Modal</p>
                      <p className="text-footnote text-muted-foreground">liquid-glass-card (rgba(12, 10, 18, 0.92))</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-black/60"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Overlay Scrim</p>
                      <p className="text-footnote text-muted-foreground">rgba(0, 0, 0, 0.6)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] border border-border"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Border Divider</p>
                      <p className="text-footnote text-muted-foreground">hsl(var(--border))</p>
                    </div>
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Status Colors</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-emerald-500/20 border border-emerald-500/30"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Success / Available</p>
                      <p className="text-footnote text-muted-foreground">emerald-500/20</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-rose-500/20 border border-rose-500/30"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Danger / Error</p>
                      <p className="text-footnote text-muted-foreground">rose-500/20</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-amber-500/20 border border-amber-500/30"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Warning</p>
                      <p className="text-footnote text-muted-foreground">amber-500/20</p>
                    </div>
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Gradients</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-gradient-to-r from-accent/90 to-accent"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Gradient Primary</p>
                      <p className="text-footnote text-muted-foreground">from-accent/90 to-accent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-[12px] bg-gradient-to-br from-accent/20 to-transparent"></div>
                    <div>
                      <p className="text-body text-foreground font-medium">Gradient Membership</p>
                      <p className="text-footnote text-muted-foreground">from-accent/20 to-transparent</p>
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

              {/* Special Buttons */}
              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Special Buttons</h3>
                
                {/* FAB */}
                <div className="space-y-3">
                  <p className="text-footnote text-muted-foreground font-medium">Button / FAB</p>
                  <div className="relative h-20">
                    <button className="fixed z-50 w-14 h-14 rounded-full apple-material-card-elevated liquid-glass-card backdrop-blur-xl shadow-elevated border border-glass-border flex items-center justify-center transition-all duration-300 ease-out hover:scale-105 hover:shadow-glow active:scale-95 cursor-grab">
                      <MessageCircle className="w-6 h-6 text-accent drop-shadow-sm" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 140, 0, 0.3))' }} />
                    </button>
                  </div>
                  <p className="text-footnote text-muted-foreground">Floating Action Button (Guidance & Search)</p>
                </div>

                {/* Lock Icon Button */}
                <div className="space-y-3">
                  <p className="text-footnote text-muted-foreground font-medium">Button / Lock Icon</p>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-[8px] liquid-glass-card bg-white/5 border border-glass-border hover:bg-white/10 hover:border-glass-highlight transition-colors">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-2 rounded-[8px] liquid-glass-card bg-white/5 border border-glass-border hover:bg-white/10 hover:border-glass-highlight transition-colors">
                      <Lock className="w-4 h-4 text-accent fill-accent" />
                    </button>
                  </div>
                  <p className="text-footnote text-muted-foreground">Lock icon button (unlocked / locked states)</p>
                </div>

                {/* Date Pill Button */}
                <div className="space-y-3">
                  <p className="text-footnote text-muted-foreground font-medium">Button / Date Pill</p>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    <button className="relative flex flex-col items-center min-w-[76px] px-4 py-3 rounded-2xl liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass">
                      <span className="text-footnote font-medium mb-1 relative z-10">Mon</span>
                      <span className="text-title-2 font-bold relative z-10">15</span>
                      <span className="text-footnote mt-1 relative z-10">Jan</span>
                    </button>
                    <button className="relative flex flex-col items-center min-w-[76px] px-4 py-3 rounded-2xl liquid-glass-card bg-accent/20 border border-accent/50 text-accent shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%]">
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      <span className="text-footnote font-medium mb-1 relative z-10">Tue</span>
                      <span className="text-title-2 font-bold relative z-10">16</span>
                      <span className="text-footnote mt-1 relative z-10">Jan</span>
                    </button>
                    <button className="relative flex flex-col items-center min-w-[76px] px-4 py-3 rounded-2xl liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass">
                      <span className="text-footnote font-medium mb-1 relative z-10">Wed</span>
                      <span className="text-title-2 font-bold relative z-10">17</span>
                      <span className="text-footnote mt-1 relative z-10">Jan</span>
                    </button>
                  </div>
                  <p className="text-footnote text-muted-foreground">Date pill button (inactive / active selected)</p>
                </div>

                {/* Time Slot Button */}
                <div className="space-y-3">
                  <p className="text-footnote text-muted-foreground font-medium">Button / Time Slot</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="relative py-3 rounded-full liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass text-subhead font-medium transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      <span className="relative z-10">09:00</span>
                    </button>
                    <button className="relative py-3 rounded-full liquid-glass-card bg-accent/20 border border-accent/50 text-accent shadow-glow backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] text-subhead font-medium transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      <span className="relative z-10">09:30</span>
                    </button>
                    <button className="relative py-3 rounded-full liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground hover:bg-white/10 hover:border-glass-highlight hover:text-foreground backdrop-filter backdrop-blur-[12px] backdrop-saturate-[150%] hover:shadow-glass text-subhead font-medium transition-all duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      <span className="relative z-10">10:00</span>
                    </button>
                  </div>
                  <p className="text-footnote text-muted-foreground">Time slot button (inactive / selected)</p>
                </div>

                {/* Edit Profile Button */}
                <div className="space-y-3">
                  <p className="text-footnote text-muted-foreground font-medium">Button / Edit Profile</p>
                  <button className="px-4 py-2 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border hover:bg-white/10 hover:border-glass-highlight transition-colors text-subhead font-medium text-foreground">
                    Edit Profile
                  </button>
                  <p className="text-footnote text-muted-foreground">Small ghost/outline button used in Profile header</p>
                </div>

                {/* Tag / Add Reflection Button */}
                <div className="space-y-3">
                  <p className="text-footnote text-muted-foreground font-medium">Button / Tag / Add Reflection</p>
                  <button className="w-full px-4 py-2.5 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200 active:translate-y-0 flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Reflection
                  </button>
                  <button className="w-full px-4 py-2.5 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200 active:translate-y-0 flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Partner
                  </button>
                  <p className="text-footnote text-muted-foreground">Large full-width button with leading plus icon</p>
                </div>

                {/* Share / Image CTA Buttons */}
                <div className="space-y-3">
                  <p className="text-footnote text-muted-foreground font-medium">Button / Share & Image (from Tarot Modal)</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 active:shadow-md flex items-center justify-center gap-2">
                      <Search className="w-4 h-4" />
                      Share
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-[10px] liquid-glass-card bg-white/5 border border-glass-border text-muted-foreground text-subhead font-body font-medium hover:bg-white/10 hover:border-glass-highlight hover:text-foreground hover:shadow-glass transition-all duration-200 flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Image
                    </button>
                  </div>
                  <p className="text-footnote text-muted-foreground">Gold solid Share button and outline Image button</p>
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
                <h3 className="text-title-3 font-semibold text-foreground">Text Input</h3>
                <div className="space-y-3">
                  <Input placeholder="Enter text..." />
                  <Input type="email" placeholder="Email address" />
                  <Input type="password" placeholder="Password" />
                  <Input disabled placeholder="Disabled input" />
                  <div className="space-y-1">
                    <Input className="border-destructive focus-visible:ring-destructive" placeholder="Error state" />
                    <p className="text-footnote text-destructive">This field is required</p>
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Search Input</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Search specialists..." />
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Search field with leading search icon</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Textarea</h3>
                <div className="space-y-3">
                  <Textarea placeholder="Enter your reflection..." />
                  <Textarea disabled placeholder="Disabled textarea" />
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Used for reflections or longer text</p>
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
                <h3 className="text-title-3 font-semibold text-foreground">Filter Tabs</h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  <CategoryChip label="All" active={categoryActive === "All"} onClick={() => setCategoryActive("All")} />
                  <CategoryChip label="Astrology" active={categoryActive === "Astrology"} onClick={() => setCategoryActive("Astrology")} />
                  <CategoryChip label="Therapy" active={categoryActive === "Therapy"} onClick={() => setCategoryActive("Therapy")} />
                  <CategoryChip label="Numerology" active={categoryActive === "Numerology"} onClick={() => setCategoryActive("Numerology")} />
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Category filter chips at top of Booking</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Calendar / DatePicker</h3>
                <div className="flex justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={new Date()}
                    className="rounded-[12px] border border-glass-border liquid-glass-card p-4"
                  />
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Full month calendar from Cosmic Timeline</p>
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

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Daily Affirmation</h3>
                <DailyAffirmation
                  affirmation={{ id: "1", text: "I am worthy of love and abundance", meaning: "You deserve all the good things life has to offer" }}
                  shuffleCount={0}
                  canShuffle={true}
                  onShuffle={() => {}}
                  onView={() => {}}
                />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Horoscope (Daily Horoscope)</h3>
                <RevealedInsightCard
                  type="horoscope"
                  title="Daily Horoscope"
                  icon={<span className="text-lg">♓</span>}
                  preview="Pisces - Intuitive nature heightened"
                  onView={() => {}}
                />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Numerology</h3>
                <RevealedInsightCard
                  type="numerology"
                  title="Numerology"
                  icon={<span className="font-bold text-lg">7</span>}
                  preview="Energy number 7 - spiritual focus"
                  onView={() => {}}
                />
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Course</h3>
                <div className="space-y-3">
                  <div className="flex items-center apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-4 hover:border-glass-highlight gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-headline font-medium text-foreground truncate flex-1">Tarot Fundamentals</h3>
                        <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      </div>
                      <p className="text-footnote text-muted-foreground truncate mb-2">Master the basics of tarot reading</p>
                      <div className="flex items-center gap-3 text-caption-2 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          <span>8 Lessons</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>2h 30m</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
                        <span className="text-caption-1 font-medium text-accent">$29.99</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Report</h3>
                <div className="space-y-3">
                  <div className="rounded-[12px] border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 hover:border-accent/30 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-body font-medium text-foreground">Birth Chart Report</p>
                        <p className="text-footnote text-muted-foreground mt-1">Comprehensive analysis of your natal chart</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-title-3 font-semibold text-accent">$11.99</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[12px] border border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 hover:border-accent/30 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-body font-medium text-foreground">Numerology Report</p>
                        <p className="text-footnote text-muted-foreground mt-1">Complete numerology analysis and insights</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-title-3 font-semibold text-accent">$7.99</p>
                      </div>
                    </div>
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Membership</h3>
                <BaseCard className="p-5 space-y-4">
                  <div>
                    <h3 className="text-title-3 font-title text-foreground">Premium Membership</h3>
                    <p className="text-footnote text-muted-foreground mt-1">Unlock all features and insights</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-body text-foreground">
                      <Check className="w-4 h-4 text-accent" />
                      <span>Unlimited readings</span>
                    </li>
                    <li className="flex items-center gap-2 text-body text-foreground">
                      <Check className="w-4 h-4 text-accent" />
                      <span>Full astrology reports</span>
                    </li>
                    <li className="flex items-center gap-2 text-body text-foreground">
                      <Check className="w-4 h-4 text-accent" />
                      <span>Premium courses</span>
                    </li>
                  </ul>
                  <button className="w-full px-4 py-2.5 rounded-[10px] bg-accent text-white text-subhead font-body font-medium hover:bg-accent/90 hover:shadow-lg transition-all duration-200">
                    Upgrade Now
                  </button>
                </BaseCard>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Saved Content</h3>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                  <div className="flex-shrink-0 w-[320px] h-[200px] flex apple-material-card-interactive liquid-glass-card rounded-[12px] overflow-hidden border border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300 cursor-pointer group p-6 relative">
                    <div className="relative z-10 flex flex-col h-full justify-between w-full">
                      <div className="absolute top-0 left-0 right-0 h-px liquid-glass-highlight opacity-50" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-footnote font-body font-medium border border-white/10">
                            Readings
                          </span>
                        </div>
                        <h3 className="text-headline font-title font-medium text-foreground leading-tight mt-2">Celtic Cross Spread</h3>
                        <p className="text-[15px] text-muted-foreground mt-2 leading-relaxed">Tap to view your saved content</p>
                      </div>
                    </div>
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Booking Summary</h3>
                <BaseCard className="p-6 liquid-glass-card border border-glass-border/70 shadow-glass">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={mockSpecialist.photo}
                      alt={mockSpecialist.name}
                      className="w-16 h-16 rounded-[12px] object-cover ring-2 ring-primary/20"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-headline">{mockSpecialist.name}</h3>
                      <p className="text-subhead text-muted-foreground">{mockSpecialist.specialty}</p>
                      <div className="flex items-center gap-2 mt-2 text-footnote text-muted-foreground/70">
                        <span>${mockSpecialist.price} / session</span>
                        <span>•</span>
                        <span>50 min</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-footnote text-muted-foreground/70">Date</span>
                      <span className="text-body text-foreground">Tue, January 16</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-footnote text-muted-foreground/70">Time</span>
                      <span className="text-body text-foreground">09:30</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-footnote text-muted-foreground/70">Platform</span>
                      <span className="text-body text-foreground">Video call (Zoom)</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-headline font-semibold">
                      <span>Total</span>
                      <span className="text-accent">${mockSpecialist.price}</span>
                    </div>
                  </div>
                </BaseCard>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Settings List Item</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 rounded-[12px] border border-white/5 bg-white/2 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-muted-foreground" />
                      <span className="text-body text-foreground">Wallet & Credits</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-[12px] border border-white/5 bg-white/2 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-muted-foreground" />
                      <span className="text-body text-foreground">Settings</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-[12px] border border-white/5 bg-white/2 hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                      <span className="text-body text-foreground">Notifications</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Blueprint - Astrology</h3>
                <BaseCard className="p-5 space-y-4">
                  <div>
                    <h3 className="text-title-3 font-title text-foreground">Astrology</h3>
                    <p className="text-footnote text-muted-foreground mt-1">Your essential placements</p>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-[12px] border border-white/5 bg-white/2 p-3 cursor-pointer hover:bg-white/5 transition-colors">
                      <p className="text-body font-medium text-foreground">Sun — Virgo</p>
                      <p className="text-footnote text-muted-foreground mt-1">Identity • How you move through the world</p>
                    </div>
                    <div className="rounded-[12px] border border-white/5 bg-white/2 p-3 cursor-pointer hover:bg-white/5 transition-colors">
                      <p className="text-body font-medium text-foreground">Moon — Pisces</p>
                      <p className="text-footnote text-muted-foreground mt-1">Inner world • How you feel and process emotion</p>
                    </div>
                  </div>
                </BaseCard>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Card / Blueprint - Numerology</h3>
                <BaseCard className="p-5 space-y-4">
                  <div>
                    <h3 className="text-title-3 font-title text-foreground">Numerology</h3>
                    <p className="text-footnote text-muted-foreground mt-1">Your life path number</p>
                  </div>
                  <div className="rounded-[12px] border border-white/5 bg-white/2 p-4 cursor-pointer hover:bg-white/5 transition-colors">
                    <p className="text-title-3 font-semibold text-foreground">Life Path 3 — The Connector</p>
                    <p className="text-footnote text-muted-foreground mt-2">Creative energy • Expression • Communication</p>
                  </div>
                </BaseCard>
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
                <h3 className="text-title-3 font-semibold text-foreground">Header / Top Bar</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-[12px] border border-white/10 bg-white/5">
                    <button className="p-2 rounded-[8px] hover:bg-white/10 transition-colors">
                      <ChevronLeft className="w-5 h-5 text-foreground" />
                    </button>
                    <h2 className="text-headline font-semibold text-foreground">Page Title</h2>
                    <button className="p-2 rounded-[8px] hover:bg-white/10 transition-colors">
                      <Calendar className="w-5 h-5 text-foreground" />
                    </button>
                  </div>
                  <p className="text-footnote text-muted-foreground">Back arrow + centered title + right icon</p>
                </div>
              </BaseCard>

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

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Rating Badge</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-body font-semibold text-foreground">4.9</span>
                    <span className="text-subhead text-muted-foreground/70">(127 reviews)</span>
                  </div>
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Badge / rating / Star + rating + reviews text</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Price Badge</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
                    <span className="text-caption-1 font-medium text-accent">$29.99</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
                    <span className="text-caption-1 font-medium text-accent">$11.99</span>
                  </div>
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Badge / price / Used in course and report cards</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Availability Badge</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-footnote font-medium">
                    Available
                  </span>
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Badge / availability / Green pill in specialist profile</p>
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

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Tarot Card Modal</h3>
                <Button onClick={() => setModalOpen(true)}>Open Tarot Modal</Button>
                <TarotOverflowModal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  card={{
                    name: "The Fool",
                    keywords: ["New beginnings", "Innocence", "Adventure"],
                    interpretation: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe.",
                    guidance: [
                      "Embrace new opportunities with an open heart",
                      "Trust your instincts and take the leap",
                      "Remember that every journey starts with a single step"
                    ],
                    image: tarotFool
                  }}
                />
                <p className="text-footnote text-muted-foreground mt-2">Card image, name, tag chips, interpretation, guidance list, Share + Image buttons</p>
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

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Horizontal Card Carousel</h3>
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
                  <SpreadCard
                    id="3"
                    title="Daily Guidance"
                    description="Quick daily insight"
                    cardCount={1}
                    difficulty="Beginner"
                    timeEstimate="5 min"
                    onClick={() => {}}
                  />
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Horizontally scrollable container used in Discovery</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Tag Carousel</h3>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                  <CategoryChip label="Tarot" active={false} onClick={() => {}} />
                  <CategoryChip label="Astrology" active={false} onClick={() => {}} />
                  <CategoryChip label="Numerology" active={true} onClick={() => {}} />
                  <CategoryChip label="Therapy" active={false} onClick={() => {}} />
                  <CategoryChip label="Meditation" active={false} onClick={() => {}} />
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Horizontal scroll list of category chips</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Grid Layout</h3>
                <div className="grid grid-cols-2 gap-3">
                  <BaseCard className="p-4">
                    <p className="text-body text-foreground">Grid Item 1</p>
                  </BaseCard>
                  <BaseCard className="p-4">
                    <p className="text-body text-foreground">Grid Item 2</p>
                  </BaseCard>
                  <BaseCard className="p-4">
                    <p className="text-body text-foreground">Grid Item 3</p>
                  </BaseCard>
                  <BaseCard className="p-4">
                    <p className="text-body text-foreground">Grid Item 4</p>
                  </BaseCard>
                </div>
                <p className="text-footnote text-muted-foreground mt-2">2-column grid layout</p>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">List Layout</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 rounded-[12px] border border-white/5 bg-white/2 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-muted-foreground" />
                      <span className="text-body text-foreground">Wallet & Credits</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-[12px] border border-white/5 bg-white/2 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-muted-foreground" />
                      <span className="text-body text-foreground">Settings</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-footnote text-muted-foreground mt-2">Single list row layout used for Account & Settings</p>
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
                <h3 className="text-title-3 font-semibold text-foreground">Avatar / Large Specialist</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={profileAvatar}
                    alt="Large specialist avatar"
                    className="w-24 h-24 rounded-[12px] object-cover ring-2 ring-primary/20 flex-shrink-0"
                  />
                  <div>
                    <p className="text-body text-foreground">Large specialist avatar (w-24 h-24)</p>
                    <p className="text-footnote text-muted-foreground mt-1">Used in Specialist Profile header</p>
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Avatar / List</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={profileAvatar}
                    alt="List avatar"
                    className="w-20 h-20 rounded-[12px] object-cover ring-2 ring-primary/20 flex-shrink-0"
                  />
                  <div>
                    <p className="text-body text-foreground">List avatar (w-20 h-20)</p>
                    <p className="text-footnote text-muted-foreground mt-1">Used in Booking lists and SpecialistCard</p>
                  </div>
                </div>
              </BaseCard>

              <BaseCard className="p-5 space-y-4">
                <h3 className="text-title-3 font-semibold text-foreground">Avatar / Profile</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={profileAvatar}
                    alt="Profile avatar"
                    className="w-20 h-20 rounded-[12px] object-cover ring-2 ring-primary/20 flex-shrink-0"
                  />
                  <div>
                    <p className="text-body text-foreground">Profile avatar (w-20 h-20)</p>
                    <p className="text-footnote text-muted-foreground mt-1">Used in Profile header</p>
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
      - [x] Foundations: all color tokens used in app are shown (foreground, muted-foreground, accent, primary, secondary, destructive, surface-background, surface-elevated, surface-modal, overlay-scrim, border-divider, success, danger, warning, gradients)
      - [x] Buttons: all variants (incl. FAB, lock, date pill, time slot, share, edit, tag/add reflection, premium unlock, CTAButton, SSOButton, GradientButton)
      - [x] Inputs: text, search, textarea, slider, sort dropdown, filter tabs, calendar, error states
      - [x] Cards: all card types from Home, Discovery, Booking, Profile, Reports, Membership, Settings (TodaysRitual, ReflectionSection, RevealedInsightCard, SpecialistCard, RecentlyViewed, DailyPractice, DailyQuiz, YourJourney, SpreadCard, TarotSpreadCard, Upcoming Session Card, Daily Affirmation, Horoscope, Numerology, Course, Report, Membership, Saved Content, Booking Summary, Settings List Item, Blueprint cards)
      - [x] Navigation: bottom nav, header bar, tabs/filter tabs
      - [x] Badges: status, category, type, difficulty, count, rating, price, availability
      - [x] Icons: every icon imported in the app is in the icon grid
      - [x] Modals: unified modal + tarot modal
      - [x] Layout: carousels, grids, list rows, section headers, progress bar, back button
      - [x] Avatars: all avatar sizes (profile, specialist large, list)
      - [x] No new visual style or tokens were invented in this page
      */}
    </PageWrapper>
  );
}
