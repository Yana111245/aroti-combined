import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UnifiedBottomNav } from "@/components/navigation/UnifiedBottomNav";
import { FloatingGuidanceButton } from "@/components/guidance/FloatingGuidanceButton";

// Core pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Onboarding pages
import Welcome from "./pages/onboarding/Welcome";
import FocusSelection from "./pages/onboarding/FocusSelection";
import PathType from "./pages/onboarding/PathType";
import BirthDetails from "./pages/onboarding/BirthDetails";
import Intentions from "./pages/onboarding/Intentions";
import DailySummary from "./pages/onboarding/DailySummary";
import PrivacySettings from "./pages/onboarding/PrivacySettings";
import SubscriptionPlan from "./pages/onboarding/SubscriptionPlan";
import CreateAccount from "./pages/onboarding/CreateAccount";
import PaymentMethod from "./pages/onboarding/PaymentMethod";
import Finish from "./pages/onboarding/Finish";

// Home pages
import HomeOverview from "./pages/home/HomeOverview";
import DailyInsightPre from "./pages/home/DailyInsightPre";
import DailyInsightPost from "./pages/home/DailyInsightPost";

// Discovery pages
import DiscoveryHub from "./pages/discovery/DiscoveryHub";
import LearnPage from "./pages/discovery/LearnPage";
import UnlocksPage from "./pages/discovery/UnlocksPage";
import ArticleDetailPage from "./pages/discovery/ArticleDetailPage";
import TarotSpreadDetailPage from "./pages/discovery/TarotSpreadDetailPage";
import PracticeDetailPage from "./pages/discovery/PracticeDetailPage";
import QuizPage from "./pages/discovery/QuizPage";
import CourseDetailPage from "./pages/discovery/CourseDetailPage";
import CoursesListingPage from "./pages/discovery/CoursesListingPage";
import ForYouListingPage from "./pages/discovery/ForYouListingPage";
import TarotSpreadsListingPage from "./pages/discovery/TarotSpreadsListingPage";
import DailyPracticesListingPage from "./pages/discovery/DailyPracticesListingPage";

// Guidance pages
import Guidance from "./pages/guidance/Guidance";

// Booking pages
import BookingHome from "./pages/booking/BookingHome";
import SpecialistProfile from "./pages/booking/SpecialistProfile";
import ScheduleSession from "./pages/booking/ScheduleSession";
import PaymentSummary from "./pages/booking/PaymentSummary";
import BookingHistory from "./pages/booking/BookingHistory";

// Profile pages
import ProfileOverview from "./pages/profile/ProfileOverview";
import AstrologyDetail from "./pages/profile/AstrologyDetail";
import NumerologyDetail from "./pages/profile/NumerologyDetail";
import SavedLibrary from "./pages/profile/SavedLibrary";
import SpecialistMessages from "./pages/profile/SpecialistMessages";
import MessageThread from "./pages/profile/MessageThread";
import SessionHistory from "./pages/profile/SessionHistory";
import SubscriptionPlans from "./pages/profile/SubscriptionPlans";
import BillingPayment from "./pages/profile/BillingPayment";
import EditIdentity from "./pages/profile/EditIdentity";
import SettingsHome from "./pages/profile/SettingsHome";
import PrivacyData from "./pages/profile/PrivacyData";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Entry point - Welcome/Login */}
          <Route path="/" element={<Welcome />} />
          
          {/* Onboarding flow */}
          <Route path="/onboarding/focus" element={<FocusSelection />} />
          <Route path="/onboarding/path" element={<PathType />} />
          <Route path="/onboarding/birth-details" element={<BirthDetails />} />
          <Route path="/onboarding/intentions" element={<Intentions />} />
          <Route path="/onboarding/daily-summary" element={<DailySummary />} />
          <Route path="/onboarding/privacy" element={<PrivacySettings />} />
          <Route path="/onboarding/subscription" element={<SubscriptionPlan />} />
          <Route path="/onboarding/create-account" element={<CreateAccount />} />
          <Route path="/onboarding/payment-method" element={<PaymentMethod />} />
          <Route path="/onboarding/finish" element={<Finish />} />
          
          {/* Home pages */}
          <Route path="/home" element={<HomeOverview />} />
          <Route path="/home/daily-insight-pre" element={<DailyInsightPre />} />
          <Route path="/home/daily-insight-post" element={<DailyInsightPost />} />
          
          {/* Discovery pages */}
          <Route path="/discovery" element={<DiscoveryHub />} />
          <Route path="/discovery/learn" element={<LearnPage />} />
          <Route path="/discovery/unlocks" element={<UnlocksPage />} />
          <Route path="/discovery/article/:id" element={<ArticleDetailPage />} />
          <Route path="/discovery/spread/:id" element={<TarotSpreadDetailPage />} />
          <Route path="/discovery/practice/:id" element={<PracticeDetailPage />} />
          <Route path="/discovery/quiz" element={<QuizPage />} />
          <Route path="/discovery/courses" element={<CoursesListingPage />} />
          <Route path="/discovery/courses/:id" element={<CourseDetailPage />} />
          <Route path="/discovery/for-you" element={<ForYouListingPage />} />
          <Route path="/discovery/spreads" element={<TarotSpreadsListingPage />} />
          <Route path="/discovery/practices" element={<DailyPracticesListingPage />} />
          
          {/* Guidance pages */}
          <Route path="/guidance" element={<Guidance />} />
          
          {/* Booking pages */}
          <Route path="/booking" element={<BookingHome />} />
          <Route path="/booking/specialist/:id" element={<SpecialistProfile />} />
          <Route path="/booking/schedule/:id" element={<ScheduleSession />} />
          <Route path="/booking/payment/:id" element={<PaymentSummary />} />
          <Route path="/booking/history" element={<BookingHistory />} />
          
          {/* Profile pages */}
          <Route path="/profile" element={<ProfileOverview />} />
          <Route path="/profile/astrology" element={<AstrologyDetail />} />
          <Route path="/profile/numerology" element={<NumerologyDetail />} />
          <Route path="/profile/saved" element={<SavedLibrary />} />
          <Route path="/profile/messages" element={<SpecialistMessages />} />
          <Route path="/profile/messages/:id" element={<MessageThread />} />
          <Route path="/profile/sessions" element={<SessionHistory />} />
          <Route path="/profile/subscription" element={<SubscriptionPlans />} />
          <Route path="/profile/billing" element={<BillingPayment />} />
          <Route path="/profile/edit" element={<EditIdentity />} />
          <Route path="/profile/settings" element={<SettingsHome />} />
          <Route path="/profile/settings/privacy" element={<PrivacyData />} />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <UnifiedBottomNav />
        <FloatingGuidanceButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;