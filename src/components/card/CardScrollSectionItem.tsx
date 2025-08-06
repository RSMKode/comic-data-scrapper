import { cn } from "@/lib/components.lib";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

export interface CardScrollSectionItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}
const CardScrollSectionItem = ({
  className,
  asChild = false,
  children,
  ...props
}: CardScrollSectionItemProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn("flex w-full min-w-0 flex-col gap-x-2 gap-y-1", className)}
      {...props}
    >
      {children}
    </Comp>
  );
};
export { CardScrollSectionItem };
