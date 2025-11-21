import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Mail, Lock, Trash2, Download, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function SettingsHome() {
  const navigate = useNavigate();

  const handleChangeEmail = () => {
    toast.info("Change email feature coming soon");
  };

  const handleChangePassword = () => {
    toast.info("Change password feature coming soon");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Account deletion requires additional verification. Please contact support.");
    }
  };

  const handleDownloadData = () => {
    toast.success("Data export started. You'll receive an email when ready.");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@aroti.com?subject=Support Request";
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
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-4">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Settings">
          {/* Change Email */}
          <BaseCard
            onClick={handleChangeEmail}
            variant="interactive"
            className="mb-4 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-body font-medium text-foreground">Change Email</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </BaseCard>

          {/* Change Password */}
          <BaseCard
            onClick={handleChangePassword}
            variant="interactive"
            className="mb-4 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-accent" />
                <span className="text-body font-medium text-foreground">Change Password</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </BaseCard>

          {/* Download My Data */}
          <BaseCard
            onClick={handleDownloadData}
            variant="interactive"
            className="mb-4 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="h-5 w-5 text-accent" />
                <span className="text-body font-medium text-foreground">Download My Data</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </BaseCard>

          {/* Contact Support */}
          <BaseCard
            onClick={handleContactSupport}
            variant="interactive"
            className="mb-6 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-accent" />
                <span className="text-body font-medium text-foreground">Contact Support</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </BaseCard>

          {/* Danger Zone - Delete Account */}
          <BaseCard className="border border-destructive/20 p-4">
            <button
              onClick={handleDeleteAccount}
              className="w-full flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Trash2 className="h-5 w-5 text-destructive" />
              <span className="text-body font-medium text-destructive">Delete Account</span>
            </button>
          </BaseCard>
        </main>
      </div>
    </PageWrapper>
  );
}
