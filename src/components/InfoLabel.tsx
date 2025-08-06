import { cn } from "@/lib/components.lib";
import { ComponentProps } from "react";

type InfoLabelProps = ComponentProps<"p"> & {};

export default function InfoLabel({
  className,
  children,
  ...props
}: InfoLabelProps) {
  return (
    <p
      className={cn(
        "flex w-full flex-wrap justify-center gap-2 overflow-clip break-words rounded-lg border border-current bg-notice/10 p-2 text-notice",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
