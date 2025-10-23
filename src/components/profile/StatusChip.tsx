import { cn } from "@/lib/utils";

type Status = "confirmed" | "pending" | "completed";

interface StatusChipProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    className: "bg-status-confirmed/20 text-status-confirmed border-status-confirmed/30",
  },
  pending: {
    label: "Pending",
    className: "bg-status-pending/40 text-secondary border-status-pending",
  },
  completed: {
    label: "Completed",
    className: "bg-status-completed/20 text-status-completed border-status-completed/30",
  },
};

export const StatusChip = ({ status, className }: StatusChipProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
