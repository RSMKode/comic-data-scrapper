import { cn } from "@/lib/components.lib";
import { ComponentProps } from "react";

type MainContainerProps = ComponentProps<"main"> & {

}

export default function MainContainer({ className, children, ...props }: MainContainerProps) {
  return (
    <main
      className={cn(
        "relative flex w-full flex-col items-center justify-start gap-2",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
