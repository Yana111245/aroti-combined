import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";
import { Switch } from "@/components/ui/switch";

export default function Notifications() {
  const navigate = useNavigate();
  
  const [ritualReminders, setRitualReminders] = useState(true);
  const [dailyReading, setDailyReading] = useState(true);
  const [astrologyUpdates, setAstrologyUpdates] = useState(true);
  const [bookingUpdates, setBookingUpdates] = useState(true);
  const [marketingOffers, setMarketingOffers] = useState(false);

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Notifications"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-4">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Notifications">
          <BaseCard className="p-5 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-5 w-5 text-accent" />
              <h2 className="text-headline font-semibold text-foreground">Notification Preferences</h2>
            </div>
            
            <div className="space-y-4">
              {/* Ritual Reminders */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-subhead font-medium text-foreground">Ritual Reminders</p>
                </div>
                <Switch 
                  checked={ritualReminders}
                  onCheckedChange={setRitualReminders}
                />
              </div>

              {/* Daily Reading */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-subhead font-medium text-foreground">Daily Reading</p>
                </div>
                <Switch 
                  checked={dailyReading}
                  onCheckedChange={setDailyReading}
                />
              </div>

              {/* Astrology Updates */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-subhead font-medium text-foreground">Astrology Updates</p>
                </div>
                <Switch 
                  checked={astrologyUpdates}
                  onCheckedChange={setAstrologyUpdates}
                />
              </div>

              {/* Booking Updates */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-subhead font-medium text-foreground">Booking Updates</p>
                </div>
                <Switch 
                  checked={bookingUpdates}
                  onCheckedChange={setBookingUpdates}
                />
              </div>

              {/* Marketing/Offers */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-subhead font-medium text-foreground">Marketing/Offers</p>
                </div>
                <Switch 
                  checked={marketingOffers}
                  onCheckedChange={setMarketingOffers}
                />
              </div>
            </div>
          </BaseCard>

          {/* Footer Text */}
          <p className="text-footnote text-muted-foreground text-center">
            Your device notification settings can override these preferences.
          </p>
        </main>
      </div>
    </PageWrapper>
  );
}

