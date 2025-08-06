"use client";

import { ComponentProps, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { DateTimePicker } from "../ui/DateTimePicker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type FormDateTimePickerProps = ComponentProps<typeof DateTimePicker> & {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  required?: boolean;
  description?: string;
};

export function FormDateTimePicker({
  className,
  form,
  name,
  label,
  required,
  description,
  ...rest
}: FormDateTimePickerProps) {
  // {
  //   options
  // }
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('');
  const value = form.watch(name);
  // console.log("FormDateTimePicker", { label, value });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel>
            {label} {required && <sup className="text-accent-primary">*</sup>}
          </FormLabel>
          <FormControl>
            <DateTimePicker
              {...rest}
              {...field}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
