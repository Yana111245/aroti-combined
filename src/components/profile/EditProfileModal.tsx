import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { UnifiedModal } from "@/components/ui/UnifiedModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    name: string;
    birthDate: string;
    birthTime: string;
    location: string;
  };
  onSave?: (data: {
    name: string;
    birthDate: string;
    birthTime: string;
    location: string;
  }) => void;
}

export const EditProfileModal = ({
  isOpen,
  onClose,
  initialData = {
    name: "Alexandra Moon",
    birthDate: "1990-09-12",
    birthTime: "",
    location: "San Francisco, CA, USA",
  },
  onSave,
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState(initialData);

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    toast.success("Profile updated successfully");
    onClose();
  };

  return (
    <UnifiedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      subtitle="Update your personal information and birth details"
      showOverlayClose={true}
      primaryButton={{
        label: "Save Changes",
        onClick: handleSave,
      }}
      secondaryButton={{
        label: "Cancel",
        onClick: onClose,
      }}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="edit-name" className="text-subhead font-medium text-foreground">
            Full Name
          </Label>
          <Input
            id="edit-name"
            type="text"
            placeholder="Enter your full name"
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
          <Label htmlFor="edit-birth-date" className="text-subhead font-medium text-foreground">
            Birth Date
          </Label>
          <div className="relative mt-2">
            <Input
              id="edit-birth-date"
              type="date"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              className="pr-10 rounded-[12px] text-foreground [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:invert"
              style={{
                color: 'hsl(var(--foreground))'
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          <p className="text-footnote text-muted-foreground mt-1">
            Required for chart calculations
          </p>
        </div>

        <div>
          <Label htmlFor="edit-birth-time" className="text-subhead font-medium text-foreground">
            Birth Time
          </Label>
          <div className="relative mt-2">
            <Input
              id="edit-birth-time"
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
          <p className="text-footnote text-muted-foreground mt-1">
            Optional • If unknown, Rising sign will be estimated
          </p>
        </div>

        <div>
          <Label htmlFor="edit-location" className="text-subhead font-medium text-foreground">
            Birth Location
          </Label>
          <Input
            id="edit-location"
            type="text"
            placeholder="City, State, Country"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="mt-2 rounded-[12px] text-foreground"
            style={{
              color: 'hsl(var(--foreground))'
            }}
          />
          <p className="text-footnote text-muted-foreground mt-1">
            Used for accurate chart positioning
          </p>
        </div>
      </div>
    </UnifiedModal>
  );
};


