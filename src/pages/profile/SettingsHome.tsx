import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Bell, Palette, Shield, Lock, LogOut, Trash2 } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function SettingsHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // Handle logout
  };

  return (
    <div className="min-h-screen pb-24 pt-6 px-4 max-w-[420px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/profile")}
          className="rounded-full p-2 hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <SerifTitle>Settings</SerifTitle>
      </div>

      {/* Notifications */}
      <SoftCard className="mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-accent-gold" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Daily Readings</p>
              <p className="text-xs text-muted-foreground">Morning horoscope & guidance</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Session Reminders</p>
              <p className="text-xs text-muted-foreground">1 hour before appointments</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Practice Reminders</p>
              <p className="text-xs text-muted-foreground">Daily journaling prompts</p>
            </div>
            <Switch />
          </div>
        </div>
      </SoftCard>

      {/* Theme */}
      <SoftCard className="mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="h-5 w-5 text-accent-gold" />
          <h3 className="font-semibold">Theme</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button className="glass-card rounded-xl p-3 text-center hover:bg-white/90 transition-colors border-2 border-accent-gold">
            <div className="h-12 w-full rounded-lg bg-gradient-to-br from-white to-gray-100 mb-2"></div>
            <p className="text-xs font-medium">Light</p>
          </button>
          <button className="glass-card rounded-xl p-3 text-center hover:bg-white/90 transition-colors">
            <div className="h-12 w-full rounded-lg bg-gradient-to-br from-gray-900 to-black mb-2"></div>
            <p className="text-xs font-medium">Night</p>
          </button>
          <button className="glass-card rounded-xl p-3 text-center hover:bg-white/90 transition-colors">
            <div className="h-12 w-full rounded-lg bg-gradient-to-br from-purple-900 to-blue-900 mb-2"></div>
            <p className="text-xs font-medium">Aurora</p>
          </button>
        </div>
      </SoftCard>

      {/* Privacy & Security */}
      <SoftCard
        onClick={() => navigate("/profile/settings/privacy")}
        className="mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-accent-gold" />
            <div>
              <h3 className="font-semibold">Privacy & Data</h3>
              <p className="text-xs text-muted-foreground">Manage your information</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </SoftCard>

      <SoftCard className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-accent-gold" />
            <div>
              <h3 className="font-semibold">Security</h3>
              <p className="text-xs text-muted-foreground">Password & authentication</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </SoftCard>

      {/* Danger Zone */}
      <SoftCard className="border border-destructive/20">
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
      </SoftCard>
    </div>
  );
}
