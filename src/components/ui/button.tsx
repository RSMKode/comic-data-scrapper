"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/components.lib";
import Spinner from "../Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { colorVariants } from "./_variants";

const buttonVariants = cva(
  "inline-flex gap-1 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 backdrop-blur-sm active:scale-95 disabled:pointer-events-none disabled:cursor-auto" +
    "disabled:bg-background/30 disabled:text-foreground/30 disabled:border-foreground/30 disabled:shadow-none",
  {
    variants: {
      variant: colorVariants,
      size: {
        sm: "px-2 py-1 text-xs [&_svg]:size-4 [&_svg]:shrink-0",
        md: "px-2 py-1 [&_svg]:size-5 [&_svg]:shrink-0",
        lg: "px-3 py-2 text-base",
        icon: "p-1 w-fit h-fit",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      border: {
        0: "border-0",
        1: "border",
        2: "border-2",
        3: "border-3",
        4: "border-4",
      },
      rounded: {
        none: "rounded-none",
        full: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
        sm: "rounded-sm",
        xs: "rounded-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      border: 1,
      rounded: "md",
      shadow: "none",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isPending?: boolean;
  spinnerClassName?: string;
  tooltip?: string;
}

const Button = ({
  children,
  tooltip,
  isPending,
  className,
  spinnerClassName,
  variant,
  size,
  border,
  rounded,
  shadow,
  asChild = false,
  ...props
}: ButtonProps) => {
  // const Comp = asChild ? Slot : "button";
  const TempButton = asChild ? (
    <Slot
      data-slot="button"
      className={cn(
        buttonVariants({ shadow, variant, size, border, rounded, className })
      )}
      data-pending={isPending}
      {...props}
    >
      {children}
    </Slot>
  ) : (
    <button
      data-slot="button"
      className={cn(
        buttonVariants({ shadow, variant, size, border, rounded, className })
      )}
      data-pending={isPending}
      {...props}
    >
      {children}
      {isPending && <Spinner className={cn("size-4", spinnerClassName)} />}
    </button>
  );

  return tooltip ? (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{TempButton}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  ) : (
    TempButton
  );
};

export { Button, buttonVariants };
