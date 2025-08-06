"use client";
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
import { Textarea } from "../ui/textarea";

type Props = {
  formControl: Control<any>;
  name: string;
  label: string;
  required?: boolean;
  description?: string;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormTextarea({
  formControl,
  name,
  label,
  required,
  description,
  placeholder,
  autoFocus,
  disabled,
  className,
  onChange,
}: Props) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel>
            {label} {required && <sup className="text-accent-primary">*</sup>}
          </FormLabel>
          <FormControl>
            <Textarea
              autoFocus={autoFocus}
              placeholder={placeholder}
              disabled={disabled}
              className={cn("", className)}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
