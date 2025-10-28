import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SerifTitle } from "@/components/profile/SerifTitle";
import { SoftCard } from "@/components/profile/SoftCard";
import { GradientButton } from "@/components/profile/GradientButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { BaseHeader } from "@/components/layout/BaseHeader";
import { BaseCard } from "@/components/layout/BaseCard";

export default function EditIdentity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Alexandra Moon",
    birthDate: "1990-09-12",
    birthTime: "",
    location: "San Francisco, CA, USA",
  });

  const handleSave = () => {
    toast.success("Profile updated successfully");
    navigate("/profile");
  };

  return (
    <PageWrapper showBottomNav={true} showTabBar={false}>
      <BaseHeader
        title="Edit Profile"
        leftAction={{
          icon: <ArrowLeft className="w-5 h-5" />,
          onClick: () => navigate("/profile/astrology"),
          label: "Back to astrology"
        }}
      />
      
      <div className="bg-gradient-to-b from-[hsl(235,35%,7%)] to-[hsl(240,30%,9%)] pt-[80px] min-h-full pb-24">
        <main className="px-4 max-w-[420px] mx-auto animate-fade-in pt-6" role="main" aria-label="Edit profile">
          <BaseCard className="mb-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-subhead font-medium mb-2 block">
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="liquid-glass-card border-border"
            />
          </div>

          <div>
            <Label htmlFor="birthDate" className="text-subhead font-medium mb-2 block">
              Birth Date
            </Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              className="liquid-glass-card border-border"
            />
            <p className="text-footnote text-muted-foreground mt-1">Required for chart calculations</p>
          </div>

          <div>
            <Label htmlFor="birthTime" className="text-subhead font-medium mb-2 block">
              Birth Time
            </Label>
            <Input
              id="birthTime"
              type="time"
              value={formData.birthTime}
              onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
              placeholder="Not sure"
              className="liquid-glass-card border-border"
            />
            <p className="text-footnote text-muted-foreground mt-1">
              Optional • If unknown, Rising sign will be estimated
            </p>
          </div>

          <div>
            <Label htmlFor="location" className="text-subhead font-medium mb-2 block">
              Birth Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State, Country"
              className="liquid-glass-card border-border"
            />
            <p className="text-footnote text-muted-foreground mt-1">Used for accurate chart positioning</p>
          </div>
          </div>
          </BaseCard>

          <div className="flex gap-3">
            <GradientButton variant="outline" onClick={() => navigate("/profile/astrology")} className="flex-1">
              Cancel
            </GradientButton>
            <GradientButton onClick={handleSave} className="flex-1">
              Save Changes
            </GradientButton>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
