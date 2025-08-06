import * as React from "react";
import { cn } from "@/lib/components.lib";
import { Slot } from "@radix-ui/react-slot";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const CardHeader = ({
  className,
  asChild = false,
  children,
  ...props
}: CardHeaderProps) => {
  const Comp = asChild ? Slot : "header";

  return (
    <Comp
      className={cn(
        "flex flex-col gap-2 rounded-lg border bg-background p-2",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export { CardHeader };
