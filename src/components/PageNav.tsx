"use client";

import { ComponentProps } from "react";
import { cn } from "@/lib/components.lib";
import { BackButton } from "./BackButton";

type PageNavProps = ComponentProps<"nav"> & {
  backLink?: string;
  backLabel?: string;
};

export function PageNav({
  backLink,
  backLabel = "Volver",
  children,
  className,
  ...props
}: PageNavProps) {
  return (
    <nav
      className={cn(
        "sticky top-0 z-10 flex w-full flex-wrap items-center justify-between gap-2 rounded-b-md bg-background/60 py-2 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <BackButton backLink={backLink} className="flex-1" variant={"secondary"}>
        {backLabel}
      </BackButton>
      {/* {children && (
        <div className="flex gap-2 flex-wrap flex-1">{children}</div>
      )} */}
      {children}
    </nav>
  );
}
