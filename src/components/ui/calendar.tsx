import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-5 w-full",
        caption: "flex justify-center pt-2 pb-2 relative items-center",
        caption_label: "text-title-2 font-apple-display text-foreground font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "apple-touch-target-comfortable h-11 w-11 bg-transparent p-0 text-foreground/70 hover:text-accent transition-all duration-300 rounded-[16px] hover:bg-accent/10",
          "hover:scale-110 active:scale-95 flex items-center justify-center"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse mt-5",
        head_row: "flex justify-between mb-3",
        head_cell: "text-foreground/60 rounded-md w-11 font-apple-text text-caption-1 font-semibold uppercase tracking-wide flex items-center justify-center",
        row: "flex justify-between w-full mt-2.5",
        cell: "h-11 w-11 text-center text-sm p-0 relative flex items-center justify-center",
        day: cn(
          "apple-touch-target-comfortable h-11 w-11 p-0 font-apple-text font-medium rounded-[14px]",
          "transition-all duration-300 hover:bg-accent/15 hover:scale-105 active:scale-95",
          "text-foreground hover:text-accent flex items-center justify-center"
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "!bg-accent !text-white hover:!bg-accent/90 hover:!text-white rounded-[14px]",
          "shadow-[0_0_20px_rgba(209,122,82,0.4)] !scale-105 font-bold ring-2 ring-accent/30 ring-offset-2 ring-offset-[rgba(23,20,31,0.85)]"
        ),
        day_today: cn(
          "bg-accent/15 text-accent font-semibold rounded-[14px]",
          "border-2 border-accent/40 shadow-sm"
        ),
        day_outside: "text-muted-foreground/50 opacity-60",
        day_disabled: "text-muted-foreground/40 opacity-45 cursor-not-allowed hover:bg-transparent hover:scale-100",
        day_range_middle: "aria-selected:bg-accent/10",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-5 w-5" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-5 w-5" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
