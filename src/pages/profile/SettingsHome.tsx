import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Bell, Palette, Shield, Lock, LogOut, Trash2 } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function SettingsHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // Handle logout
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Settings"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Settings">
          {/* Notifications */}
          <BaseCard className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-headline">Notifications</h3>
            </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-subhead font-medium">Daily Readings</p>
              <p className="text-footnote text-muted-foreground">Morning horoscope & guidance</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-subhead font-medium">Session Reminders</p>
              <p className="text-footnote text-muted-foreground">1 hour before appointments</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-subhead font-medium">Practice Reminders</p>
              <p className="text-footnote text-muted-foreground">Daily journaling prompts</p>
            </div>
            <Switch />
          </div>
          </div>
          </BaseCard>

          {/* Theme */}
          <BaseCard className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-headline">Theme</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <button className="liquid-glass-card rounded-xl p-3 text-center hover:bg-white/90 transition-colors border-2 border-accent">
                <div className="h-12 w-full rounded-lg bg-gradient-to-br from-white to-gray-100 mb-2"></div>
                <p className="text-footnote font-medium">Light</p>
              </button>
              <button className="liquid-glass-card rounded-xl p-3 text-center hover:bg-white/90 transition-colors">
                <div className="h-12 w-full rounded-lg bg-gradient-to-br from-gray-900 to-black mb-2"></div>
                <p className="text-footnote font-medium">Night</p>
              </button>
              <button className="liquid-glass-card rounded-xl p-3 text-center hover:bg-white/90 transition-colors">
                <div className="h-12 w-full rounded-lg bg-gradient-to-br from-purple-900 to-blue-900 mb-2"></div>
                <p className="text-footnote font-medium">Aurora</p>
              </button>
            </div>
          </BaseCard>

          {/* Privacy & Security */}
          <BaseCard
            onClick={() => navigate("/profile/settings/privacy")}
            className="mb-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-accent" />
                <div>
                  <h3 className="font-semibold text-headline">Privacy & Data</h3>
                  <p className="text-footnote text-muted-foreground">Manage your information</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </BaseCard>

          <BaseCard className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-accent" />
                <div>
                  <h3 className="font-semibold text-headline">Security</h3>
                  <p className="text-footnote text-muted-foreground">Password & authentication</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </BaseCard>

          {/* Danger Zone */}
          <BaseCard className="border border-destructive/20">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity"
            >
              <LogOut className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Log Out</span>
            </button>
            <button className="w-full flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Trash2 className="h-5 w-5 text-destructive" />
              <span className="font-medium text-destructive">Delete Account</span>
            </button>
          </BaseCard>
        </main>
      </div>
    </PageWrapper>
  );
}
