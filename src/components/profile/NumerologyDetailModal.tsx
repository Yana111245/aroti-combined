import { UnifiedModal } from "@/components/ui/UnifiedModal";

interface NumerologyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lifePath: {
    number: number;
    name: string;
    traits: string[];
    meaning: string;
  };
}

export const NumerologyDetailModal = ({
  isOpen,
  onClose,
  lifePath,
}: NumerologyDetailModalProps) => {
  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Life Path ${lifePath.number} — ${lifePath.name}`}
      showOverlayClose={true}
    >
      <div className="space-y-5">
        {/* Traits as chips */}
        <div className="flex flex-wrap gap-2">
          {lifePath.traits.map((trait, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-accent/20 text-accent text-footnote font-medium"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Meaning paragraph */}
        <p className="text-body text-foreground leading-relaxed">
          {lifePath.meaning}
        </p>
      </div>
    </UnifiedModal>
  );
};

