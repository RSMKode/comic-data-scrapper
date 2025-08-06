import { cn } from "@/lib/components.lib";
import Container from "../_layout/Container";
import { ComponentProps } from "react";
import { SHIMMER_CLASS } from "@/config/themes.config";

type FormSkeletonProps = ComponentProps<typeof Container> & {
  rows: number;
};

export default function FormSkeleton({
  rows,
  className,
  ...props
}: FormSkeletonProps) {
  const array = Array.from({ length: rows });

  return (
    <Container
      className={cn(
        "relative items-start overflow-clip",
        SHIMMER_CLASS,
        className
      )}
      {...props}
    >
      {array.map((item, index) => (
        <div key={index} className="flex w-full flex-col gap-3">
          <div
            className={`h-6 w-1/2 min-w-32 max-w-48 overflow-hidden rounded-lg bg-background/50`}
          />
          <div className="h-11 w-full min-w-60 rounded-lg border bg-background/80" />
        </div>
      ))}
      <div className="flex h-10 w-full items-center justify-center rounded border bg-background p-2">
        <div className="h-6 w-1/2 min-w-32 max-w-48 rounded-lg bg-secondary/50" />
      </div>
    </Container>
  );
}
