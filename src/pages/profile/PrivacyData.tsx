import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Shield, Eye } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function PrivacyData() {
  const navigate = useNavigate();

  const handleExport = () => {
    toast.success("Data export started. You'll receive an email when ready.");
  };

  const handleDelete = () => {
    toast.error("This action cannot be undone. Please contact support to proceed.");
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Privacy & Data"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile/settings"),
          label: "Back to settings"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Privacy and data settings">
          <p className="text-subhead text-muted-foreground mb-6">
            Your information is encrypted and never shared without consent. You have full control over your data.
          </p>

          {/* Data Controls */}
          <BaseCard className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Download className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-headline">Export Your Data</h3>
            </div>
            <p className="text-subhead text-muted-foreground mb-4">
              Download a copy of your astrology chart, journal entries, and account information.
            </p>
            <GradientButton onClick={handleExport} variant="outline" className="w-full">
              Request Data Export
            </GradientButton>
          </BaseCard>

          {/* Privacy Toggles */}
          <BaseCard className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-headline">Data Usage</h3>
            </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="text-subhead font-medium">Analytics</p>
              <p className="text-footnote text-muted-foreground">Help improve Aroti with usage data</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="text-subhead font-medium">Personalization</p>
              <p className="text-footnote text-muted-foreground">Tailor content based on your activity</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="text-subhead font-medium">Marketing</p>
              <p className="text-footnote text-muted-foreground">Receive updates about new features</p>
            </div>
            <Switch />
          </div>
          </div>
          </BaseCard>

          {/* Data Deletion */}
          <BaseCard className="border border-destructive/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-headline">Delete All Data</h3>
            </div>
            <p className="text-subhead text-muted-foreground mb-4">
              Permanently remove your chart, readings, and personal information. This cannot be undone.
            </p>
            <button
              onClick={handleDelete}
              className="w-full rounded-full border-2 border-destructive text-destructive hover:bg-destructive/10 transition-all py-2 font-medium"
            >
              Delete All Data
            </button>
          </BaseCard>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-footnote text-muted-foreground">
              For questions about privacy, read our{" "}
              <button className="text-accent hover:opacity-80">Privacy Policy</button>
            </p>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
