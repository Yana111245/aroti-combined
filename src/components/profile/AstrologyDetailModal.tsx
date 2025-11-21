import { UnifiedModal } from "@/components/ui/UnifiedModal";

interface AstrologyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  placement: {
    title: string;
    description: string;
    sign: string;
    meaning: string;
  };
}

export const AstrologyDetailModal = ({
  isOpen,
  onClose,
  placement,
}: AstrologyDetailModalProps) => {
  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title={placement.title}
      subtitle={placement.description}
      showOverlayClose={true}
    >
      <div>
        <p className="text-body text-foreground leading-relaxed">
          {placement.meaning}
        </p>
      </div>
    </UnifiedModal>
  );
};

