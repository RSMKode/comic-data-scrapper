"use client";

import { useRouter } from "@/hooks/useRouter";
import { cn } from "@/lib/components.lib";
import * as React from "react";
import { TbCheck, TbX } from "react-icons/tb";
import { colorVariants } from "./ui/_variants";
import { Button } from "./ui/button";

export type BooleanButtonProps = React.ComponentProps<typeof Button> & {
  trueVariant?: keyof typeof colorVariants;
  falseVariant?: keyof typeof colorVariants;
  undefinedVariant?: keyof typeof colorVariants;
  trueChildren?: React.ReactNode;
  falseChildren?: React.ReactNode;
  undefinedChildren?: React.ReactNode;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
};

export const BooleanButton = ({
  className,
  children,
  onClick,
  onValueChange ,
  value = undefined,
  trueVariant = "success_fill",
  trueChildren = (
    <>
      <span>Sí</span>
      <TbCheck className="size-4 sm:size-5" />
    </>
  ),
  falseVariant = "danger_fill",
  falseChildren = (
    <>
      <span>No</span>
      <TbX className="size-4 sm:size-5" />
    </>
  ),
  undefinedVariant = "notice_fill",
  undefinedChildren = "Selecciona",
  ...props
}: BooleanButtonProps) => {
  const router = useRouter();

  return (
    <Button
      tooltip={props.tooltip || "Volver atrás"}
      onClick={(event) => {
        onClick?.(event);
      }}
      className={cn(
        "",

        className,
      )}
      {...props}
    >
      {value === true && trueChildren}
      {value === false && falseChildren}
      {value === undefined && undefinedChildren}
      {children}
    </Button>
  );
};
