"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/components.lib";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col justify-center",
        month: "flex flex-col items-center gap-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center relative",
        button_previous: cn(
          buttonVariants({ variant: "secondary", size: "icon" }),
          "h-7 w-7 p-0 absolute left-5 top-0.5 m-0"
        ),
        button_next: cn(
          buttonVariants({ variant: "secondary", size: "icon" }),
          "h-7 w-7 p-0 absolute right-5 top-0.5 m-0"
        ),
        month_grid: "w-full border-collapse gap-y-1",
        weekdays: cn("flex", props.showWeekNumber && "justify-end"),
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-l-md rounded-r-md"
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-l-md rounded-r-md",
        today: "bg-accent text-accent-foreground rounded-l-md rounded-r-md",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) =>
          props.orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
        // Dropdown: ({ options, onSelect,...props }) => {
        //   const dayPickerState = useDayPicker();
        //   return (
        //   <ComboBox
        //   label=""
        //   options={options ?? []}
        //   onUserSelect={value => onSelect?.(value)}
        //   />
        // )}
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

