import * as React from "react";
import { cn } from "@/lib/components.lib";
import { Slot } from "@radix-ui/react-slot";
import { LabelValueItem } from "./LabelValueItem";

export interface CardHeaderItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item?: {
    label?: string | number;
    value?: string | number;
  };
  asChild?: boolean;
  row?: boolean;
}
const CardHeaderItem = ({
  className,
  asChild = false,
  children,
  item,
  row,
  ...props
}: CardHeaderItemProps) => {
  const Comp = asChild ? Slot : "h3";
  const { label, value } = item || {};

  return (
    <Comp
      className={cn(
        "flex flex-wrap gap-x-2 text-base text-foreground/80",
        row && "flex-row",
        className,
      )}
      {...props}
    >
      <LabelValueItem
        item={{ label, value }}
        labelClassName="text-inherit font-normal"
        valueClassName="text-foreground"
      />
      {children}
    </Comp>
  );
};
export { CardHeaderItem };
