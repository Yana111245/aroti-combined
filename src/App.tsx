import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/onboarding/Welcome";
import FocusSelection from "./pages/onboarding/FocusSelection";
import PathType from "./pages/onboarding/PathType";
import BirthDetails from "./pages/onboarding/BirthDetails";
import Intentions from "./pages/onboarding/Intentions";
import DailySummary from "./pages/onboarding/DailySummary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding/focus" element={<FocusSelection />} />
          <Route path="/onboarding/path" element={<PathType />} />
          <Route path="/onboarding/birth-details" element={<BirthDetails />} />
          <Route path="/onboarding/intentions" element={<Intentions />} />
          <Route path="/onboarding/daily-summary" element={<DailySummary />} />
          <Route path="/home" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
