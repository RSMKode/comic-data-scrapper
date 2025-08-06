"use client";

import * as React from "react";
import { cn } from "@/lib/components.lib";
import { Button } from "./ui/button";
import { useRouter } from "@/hooks/useRouter";
import { TbChevronLeft } from "react-icons/tb";

export type BackButtonProps = React.ComponentProps<typeof Button> & {
  backLink?: string;
};

const BackButton = ({
  className,
  children,
  backLink,
  onClick,
  ...props
}: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      tooltip={props.tooltip || "Volver atrás"}
      onClick={(event) => {
        onClick?.(event);
        backLink ? router.replace(backLink) : router.back();
      }}
      className={cn("", className)}
      {...props}
    >
      <TbChevronLeft className="-ml-[0.1rem] size-4 sm:size-5" />
      <span className="sr-only">Volver atrás</span>
      {children}
    </Button>
  );
};
export { BackButton };
