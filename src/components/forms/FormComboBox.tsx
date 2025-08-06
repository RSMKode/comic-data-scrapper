"use client";

import { cn } from "@/lib/components.lib";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ComboBox, ComboBoxProps } from "../ui/ComboBox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type FormComboBoxProps = ComboBoxProps & {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  required?: boolean;
  description?: string;
};

export function FormComboBox({
  form,
  name,
  label,
  required,
  description,
  ...rest
}: FormComboBoxProps) {
  // {
  //   options
  // }
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState('');
  const value = form.watch(name);
  // console.log("FormComboBox", { label, value });

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col">
          <FormLabel>
            {label}{" "}
            {required && (
              <sup className={cn("text-accent-primary", "text-danger")}>*</sup>
            )}
          </FormLabel>
          <FormControl>
            <ComboBox
              {...rest}
              {...field}
              label={label}
              options={rest.options}
              unavailableOptions={rest.unavailableOptions}
              selected={value}
              onChange={(fullValue, currentValue) => {
                form.setValue(name, fullValue);
                rest.onChange?.(fullValue, currentValue);
              }}
              onUserSelect={(fullValue, currentValue) => {
                rest.onUserSelect?.(fullValue, currentValue);
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
