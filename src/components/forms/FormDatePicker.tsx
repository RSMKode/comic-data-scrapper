"use client";

import { cn } from "@/lib/components.lib";
import { ComponentProps, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { DatePicker } from "../ui/DatePicker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type FormDatePickerProps = ComponentProps<typeof DatePicker> & {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  required?: boolean;
  description?: string;
  formItemClassName?: string;
};

export function FormDatePicker({
  className,
  form,
  name,
  label,
  required,
  description,
  formItemClassName,
  ...rest
}: FormDatePickerProps) {
  // {
  //   options
  // }
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('');
  const value = form.watch(name);
  // console.log("FormDatePicker", { label, value });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex w-full flex-col", formItemClassName)}>
          <FormLabel className={cn(rest.disabled && "pointer-events-none")}>
            {label} {required && <sup className="text-accent-primary">*</sup>}
          </FormLabel>
          <FormControl>
            <DatePicker
              {...rest}
              {...field}
              selectedDate={value}
              onDateChange={(date) => {
                form.setValue(name, date);
                rest.onDateChange?.(date);
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
