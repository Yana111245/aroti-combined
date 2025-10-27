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
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-title-2 font-apple-display text-foreground",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "apple-touch-target-comfortable h-10 w-10 bg-transparent p-0 text-muted-foreground hover:text-accent transition-all duration-300 rounded-[16px] hover:bg-white/5",
          "hover:scale-105 active:scale-95"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1 mt-4",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-10 font-apple-text text-caption-1 font-medium",
        row: "flex w-full mt-2",
        cell: "h-10 w-10 text-center text-sm p-0 relative rounded-[12px]",
        day: cn(
          "apple-touch-target-comfortable h-10 w-10 p-0 font-apple-text font-medium rounded-[12px]",
          "transition-all duration-300 hover:bg-white/5 hover:scale-105 active:scale-95",
          "text-foreground hover:text-accent"
        ),
        day_range_end: "day-range-end",
        day_selected: cn(
          "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground rounded-[12px]",
          "shadow-lg shadow-accent/25 scale-105 font-semibold"
        ),
        day_today: cn(
          "bg-accent/20 text-accent font-semibold rounded-[12px]",
          "border border-accent/30 shadow-sm"
        ),
        day_outside: "text-muted-foreground/40 opacity-50",
        day_disabled: "text-muted-foreground/30 opacity-30 cursor-not-allowed",
        day_range_middle: "aria-selected:bg-accent/10",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
