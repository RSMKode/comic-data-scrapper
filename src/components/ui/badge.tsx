import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/components.lib";
import { Slot } from "@radix-ui/react-slot";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { colorVariants } from "./_variants";
// import { colorVariants } from "./button";

const badgeVariants = cva(
  "inline-flex justify-center items-center border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-lg",
  {
    variants: {
      variant: colorVariants,
      size: {
        xs: "px-2.5 py-0.5 text-xs gap-x-1 [&_svg]:size-4 [&_svg]:shrink-0",
        sm: "px-3 py-1 text-sm gap-x-1.5 [&_svg]:size-5 [&_svg]:shrink-0",
        md: "px-4 py-2 text-base gap-x-2.5",
        lg: "px-4 py-2 text-lg gap-x-2.5",
        icon: "p-1 w-fit",
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
      variant: "fill",
      size: "xs",
      border: 1,
      rounded: "lg",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  tooltip?: string;
}

function Badge({
  className,
  variant,
  size,
  border,
  rounded,
  asChild,
  tooltip,
  ...props
}: BadgeProps) {
  const TempBadge = asChild ? (
    <Slot
      className={cn(
        badgeVariants({ variant, size, border, rounded }),
        className,
      )}
      {...props}
    />
  ) : (
    <div
      className={cn(
        badgeVariants({ variant, size, border, rounded }),
        className,
      )}
      {...props}
    />
  );

  return tooltip ? (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{TempBadge}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  ) : (
    TempBadge
  );
}

export { Badge, badgeVariants };
