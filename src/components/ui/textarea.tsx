import * as React from "react";

import { cn } from "@/lib/components.lib";

export type TextareaProps = React.ComponentProps<"textarea">;

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex max-h-[80px] min-h-[40px] w-full rounded-md border-2 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground hover:border-accent-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
