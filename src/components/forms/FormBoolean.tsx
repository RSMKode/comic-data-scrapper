"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { useState, useEffect, ComponentProps } from "react";
import { ComboBox, ComboBoxProps } from "../ui/ComboBox";
import { BooleanButton } from "../BooleanButton";

type FormComboBoxProps = ComponentProps<typeof BooleanButton> & {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  required?: boolean;
  description?: string;
};

export function FormComboBox({
  className,
  form,
  name,
  label,
  required = true,
  description,
  onValueChange,
  ...rest
}: FormComboBoxProps) {
  const value = form.watch(name);

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
            <BooleanButton
              {...rest}
              {...field}
              value={value}
              onValueChange={(value) => {
                form.setValue(name, value);
                onValueChange?.(value);
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
