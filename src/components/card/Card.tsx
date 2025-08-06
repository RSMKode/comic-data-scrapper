import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/components.lib";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  disabled?: boolean;
  hover?: boolean;
}

const Card = ({
  className,
  asChild = false,
  hover = false,
  disabled,
  ...props
}: CardProps) => {
  const Comp = asChild ? Slot : "article";
  return (
    <Comp
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-transparent bg-secondary p-3 shadow-md transition-all duration-300",
        hover &&
          "hover:border-accent-primary hover:shadow-lg sm:hover:-translate-y-1 cursor-pointer",
        className,
        disabled && "pointer-events-none opacity-70"
      )}
      {...props}
    />
  );
};
export { Card };
