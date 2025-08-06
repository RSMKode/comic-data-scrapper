import * as React from "react";
import { cn } from "@/lib/components.lib";
import { Slot } from "@radix-ui/react-slot";

export interface LabelValueItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  item?: {
    label?: string | number;
    value?: string | number;
  };
  labelClassName?: string;
  valueClassName?: string;
  asChild?: boolean;
}
const LabelValueItem = ({
  className,
  asChild = false,
  children,
  item,
  labelClassName,
  valueClassName,
  ...props
}: LabelValueItemProps) => {
  const Comp = asChild ? Slot : "div";
  const { label, value } = item || {};

  return (
    <Comp
      className={cn(
        "inline-flex w-fit min-w-0 max-w-full flex-wrap items-center gap-x-2 break-words overflow-hidden",
        className,
      )}
      {...props}
    >
      {label && <span className={cn("text-current/80 font-semibold overflow-hidden break-words", labelClassName)}>
        {label}
      </span>}
      {value && <span className={cn("overflow-auto break-words", valueClassName)}>{value}</span>}
      {children}
    </Comp>
  );
};
export { LabelValueItem };
