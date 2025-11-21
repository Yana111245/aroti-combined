import { useNavigate } from "react-router-dom";
import { Lock, Sparkles, Check } from "lucide-react";
import { UnifiedModal } from "@/components/ui/UnifiedModal";

interface PremiumPaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const premiumBenefits = [
  "All tarot spreads",
  "Full Astrology & Numerology",
  "Complete Cosmic Blueprint",
  "Compatibility insights",
  "Unlimited AI guidance",
  "Ad-free experience",
];

export const PremiumPaywallModal = ({
  isOpen,
  onClose,
  title = "Premium Feature",
  description = "Get full access to your cosmic blueprint and spiritual insights",
}: PremiumPaywallModalProps) => {
  const navigate = useNavigate();

  const handleUnlock = () => {
    onClose();
    navigate("/profile/subscription");
  };

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={description}
      showOverlayClose={false}
      primaryButton={{
        label: "Unlock Full Access",
        onClick: handleUnlock,
        icon: <Sparkles className="w-4 h-4" />,
      }}
      secondaryButton={{
        label: "Maybe Later",
        onClick: onClose,
      }}
    >
      <div className="space-y-3">
        {premiumBenefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-3">
            <Check className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-body text-foreground">{benefit}</span>
          </div>
        ))}
      </div>
    </UnifiedModal>
  );
};

