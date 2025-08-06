import * as React from "react";
import { cn } from "@/lib/components.lib";
import { Slot } from "@radix-ui/react-slot";

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardSection = ({
  className,
  asChild = false,
  children,
  ...props
}: CardSectionProps) => {
  const Comp = asChild ? Slot : "section";

  return (
    <Comp
      className={cn(
        "flex min-w-0 max-w-full flex-wrap gap-x-2 gap-y-2",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { CardSection };
