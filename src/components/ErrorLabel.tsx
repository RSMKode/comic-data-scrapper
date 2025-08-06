import { cn } from "@/lib/components.lib";
import { ComponentProps } from "react";

type ErrorLabelProps = ComponentProps<"p"> & {};

export default function ErrorLabel({
  className,
  children,
  ...props
}: ErrorLabelProps) {
  return (
    <p
      className={cn(
        "flex w-full flex-wrap justify-center gap-2 overflow-clip break-words rounded-lg border border-current bg-danger/10 p-2 text-danger",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
