"use client";

import * as React from "react";
import { addDays, format, isValid, parse } from "date-fns";

import { cn } from "@/lib/components.lib";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComboBox } from "./ComboBox";
import { TbCalendar } from "react-icons/tb";
import { es } from "date-fns/locale";
import { Input } from "./input";
import Spinner from "../Spinner";

export type DatePickerProps = Omit<
  React.ComponentProps<typeof Button>,
  "form"
> & {
  buttonClassName?: string;
  placeholder?: string;
  showPresets?: boolean;
  selectedDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
};

const DatePicker = ({
  buttonClassName,
  placeholder,
  showPresets = true,
  selectedDate,
  onDateChange,
  className,
  isPending,
  ...props
}: DatePickerProps) => {
  const [internalDate, setInternalDate] = React.useState<Date>();

  const inputValueFormat = "yyyy-MM-dd";
  // const inputValueFormat = "dd/MM/yyyy";

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = React.useState(new Date());
  // Hold the input value in state
  const [inputValue, setInputValue] = React.useState(
    selectedDate ? format(selectedDate, inputValueFormat) : "",
  );

  console.log({ inputValue });

  const date = selectedDate ?? internalDate;
  const setDate = (date: Date | undefined) => {
    setInternalDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };
  const updateDate = (date: Date | undefined) => {
    date && date.setHours(13); // set the time to 12:00 GMT+1 to avoid timezone issues
    setDate(date);
  };

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      updateDate(undefined);
    } else {
      updateDate(date);
      setMonth(date);
      setInputValue(format(date, inputValueFormat));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // keep the input value in sync

    const parsedDate = parse(e.target.value, inputValueFormat, new Date());

    if (isValid(parsedDate)) {
      updateDate(parsedDate);
      setMonth(parsedDate);
    } else {
      updateDate(undefined);
    }
  };

  const presetOptions = [
    {
      value: "-30",
      label: "Hace una mes",
    },
    {
      value: "-7",
      label: "Hace una semana",
    },
    { value: "-1", label: "Ayer" },
    {
      value: "0",
      label: "Hoy",
    },
    {
      value: "1",
      label: "Mañana",
    },
    // {
    //   value: "3",
    //   label: "En 3 días",
    // },
    {
      value: "7",
      label: "En una semana",
    },
    {
      value: "30",
      label: "En un mes",
    },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-[240px] justify-start p-2 text-left font-normal",
            buttonClassName,
            !date && "text-muted-foreground",
          )}
          // isPending={isPending}
          {...props}
        >
          {/* <TbCalendar className="size-5" /> */}
          {isPending ? (
            <Spinner className={cn("size-4", props.spinnerClassName)} />
          ) : (
            <TbCalendar className="size-5" />
          )}
          {date ? (
            format(date, "dd/MM/yyyy", { locale: es })
          ) : (
            <span>Escoge una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col gap-y-2 p-1"
      >
        <Input
          type="date"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          max="9999-12-31"
        />
        {showPresets && (
          <ComboBox
            label="Preset"
            options={presetOptions}
            onUserSelect={(_, current) => {
              const days = parseInt(current!);
              setDate(addDays(new Date(), days));
            }}
          />
        )}
        <div className="rounded-md border">
          <Calendar
            // captionLayout="dropdown"
            mode="single"
            selected={date}
            onSelect={handleDayPickerSelect}
            month={month}
            onMonthChange={setMonth}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
export { DatePicker };
