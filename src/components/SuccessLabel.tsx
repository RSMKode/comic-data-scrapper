import { cn } from "@/lib/components.lib";

type SuccessLabelProps = React.ComponentProps<"p"> & {};

export default function SuccessLabel({
  className,
  children,
  ...props
}: SuccessLabelProps) {
  return (
    <p
      className={cn(
        "flex w-full flex-wrap justify-center gap-2 overflow-clip break-words rounded-lg border border-current bg-success/10 p-2 text-success",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
