import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { UnifiedModal } from "@/components/ui/UnifiedModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PremiumPaywallModal } from "./PremiumPaywallModal";

interface PartnerInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerInputModal = ({
  isOpen,
  onClose,
}: PartnerInputModalProps) => {
  const [showPaywall, setShowPaywall] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
  });

  const handleSubmit = () => {
    // Show paywall for premium compatibility features
    setShowPaywall(true);
  };

  return (
    <>
      <UnifiedModal
        isOpen={isOpen}
        onClose={onClose}
        title="Add Partner"
        subtitle="Enter your partner's birth details to explore compatibility"
        showOverlayClose={true}
        primaryButton={{
          label: "Calculate Compatibility",
          onClick: handleSubmit,
        }}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="partner-name" className="text-subhead font-medium text-foreground">Partner Name</Label>
            <Input
              id="partner-name"
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-2 rounded-[12px] text-foreground"
              style={{
                color: 'hsl(var(--foreground))'
              }}
            />
          </div>

          <div>
            <Label htmlFor="birth-date" className="text-subhead font-medium text-foreground">Birth Date</Label>
            <div className="relative mt-2">
              <Input
                id="birth-date"
                type="text"
                placeholder="dd.mm.yyyy"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className="pr-10 rounded-[12px] text-foreground"
                style={{
                  color: 'hsl(var(--foreground))'
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="birth-time" className="text-subhead font-medium text-foreground">Birth Time</Label>
            <div className="relative mt-2">
              <Input
                id="birth-time"
                type="time"
                value={formData.birthTime}
                onChange={(e) =>
                  setFormData({ ...formData, birthTime: e.target.value })
                }
                className="pr-10 rounded-[12px] text-foreground [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-datetime-edit-hour-field]:text-muted-foreground [&::-webkit-datetime-edit-minute-field]:text-muted-foreground [&::-webkit-datetime-edit-ampm-field]:text-muted-foreground [&::-webkit-datetime-edit-text]:text-muted-foreground [&::-webkit-datetime-edit-hour-field]:bg-transparent [&::-webkit-datetime-edit-minute-field]:bg-transparent [&::-webkit-datetime-edit-ampm-field]:bg-transparent [&::-webkit-datetime-edit]:!text-foreground [&::-webkit-datetime-edit-fields-wrapper]:!text-foreground"
                style={{
                  color: 'hsl(var(--foreground))'
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="birth-location" className="text-subhead font-medium text-foreground">Birth Location</Label>
            <Input
              id="birth-location"
              type="text"
              placeholder="City, Country"
              value={formData.birthLocation}
              onChange={(e) =>
                setFormData({ ...formData, birthLocation: e.target.value })
              }
              className="mt-2 rounded-[12px] text-foreground"
              style={{
                color: 'hsl(var(--foreground))'
              }}
            />
          </div>
        </div>
      </UnifiedModal>

      <PremiumPaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        title="Unlock Compatibility Insights"
        description="Get full emotional, communication, and long-term compatibility analysis"
      />
    </>
  );
};

