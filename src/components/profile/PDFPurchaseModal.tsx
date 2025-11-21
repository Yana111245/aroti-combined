import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { UnifiedModal } from "@/components/ui/UnifiedModal";
import { toast } from "sonner";

interface PDFPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportName: string;
  description: string;
  price: number;
  onPurchase: () => void;
}

export const PDFPurchaseModal = ({
  isOpen,
  onClose,
  reportName,
  description,
  price,
  onPurchase,
}: PDFPurchaseModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      // Simulate purchase processing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onPurchase();
      toast.success(`${reportName} purchased successfully!`);
      onClose();
    } catch (error) {
      toast.error("Purchase failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title={reportName}
      subtitle={description}
      icon={<FileText className="w-6 h-6 text-accent" />}
      showOverlayClose={false}
      primaryButton={{
        label: "Purchase & Download",
        onClick: handlePurchase,
        icon: <Download className="w-4 h-4" />,
        isLoading: isProcessing,
      }}
      secondaryButton={{
        label: "Cancel",
        onClick: onClose,
      }}
    >
      <div className="space-y-5">
        {/* Price row */}
        <div>
          <p className="text-body text-foreground">
            One-time purchase • <span className="font-semibold">${price.toFixed(2)}</span>
          </p>
        </div>

        {/* Benefits list */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-body text-foreground">
            <Download className="w-4 h-4 text-accent" />
            <span>PDF format</span>
          </div>
          <div className="flex items-center gap-2 text-body text-foreground">
            <Download className="w-4 h-4 text-accent" />
            <span>Detailed insights</span>
          </div>
          <div className="flex items-center gap-2 text-body text-foreground">
            <Download className="w-4 h-4 text-accent" />
            <span>Printable format</span>
          </div>
        </div>
      </div>
    </UnifiedModal>
  );
};

