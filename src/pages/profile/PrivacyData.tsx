import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Shield, FileText, Cookie, Trash2, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function PrivacyData() {
  const navigate = useNavigate();

  const handlePrivacyPolicy = () => {
    toast.info("Privacy Policy page coming soon");
  };

  const handleTermsOfUse = () => {
    toast.info("Terms of Use page coming soon");
  };

  const handleCookiePolicy = () => {
    toast.info("Cookie Policy page coming soon");
  };

  const handleDataDeletionPolicy = () => {
    toast.info("Data Deletion Policy page coming soon");
  };

  const handleContactSupport = () => {
    window.location.href = "mailto:support@aroti.com?subject=Privacy & Terms Inquiry";
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Privacy & Terms"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile"),
          label: "Back to profile"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-4">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Privacy and terms">
          {/* Privacy Policy */}
          <BaseCard
            onClick={handlePrivacyPolicy}
            variant="interactive"
            className="mb-4 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-body font-medium text-foreground">Privacy Policy</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </BaseCard>

          {/* Terms of Use */}
          <BaseCard
            onClick={handleTermsOfUse}
            variant="interactive"
            className="mb-4 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-accent" />
                <span className="text-body font-medium text-foreground">Terms of Use</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </BaseCard>

          {/* Cookie Policy */}
          <BaseCard
            onClick={handleCookiePolicy}
            variant="interactive"
            className="mb-4 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cookie className="h-5 w-5 text-accent" />
                <span className="text-body font-medium text-foreground">Cookie Policy</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </BaseCard>

          {/* Data Deletion Policy */}
          <BaseCard
            onClick={handleDataDeletionPolicy}
            variant="interactive"
            className="mb-4 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trash2 className="h-5 w-5 text-accent" />
                <span className="text-body font-medium text-foreground">Data Deletion Policy</span>
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
        </main>
      </div>
    </PageWrapper>
  );
}
