"use client";

import * as React from "react";

import { cn } from "@/lib/components.lib";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export type FormInputProps = React.ComponentProps<typeof Input> & {
  formControl: Control<any>;
  name: string;
  label: string;
  description?: string;
  descriptionClassName?: string;
  placeholder?: string;
  extra?: React.ReactNode;
  extraLabel?: React.ReactNode;
};

const FormInput = ({
  formControl,
  name,
  label,
  description,
  descriptionClassName,
  placeholder,
  className,
  extra,
  extraLabel,
  onClick,
  ...props
}: FormInputProps) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          <div className="flex w-full items-center justify-between gap-2">
            <FormLabel>{label}</FormLabel>
            {extraLabel}
          </div>
          <FormControl>
            <div className="flex w-full items-center justify-between gap-2">
              <Input placeholder={placeholder} {...field} {...props} />
              {extra}
            </div>
          </FormControl>
          {description && (
            <FormDescription className={cn("", descriptionClassName)}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
FormInput.displayName = "FormInput";
export { FormInput };
