import * as React from "react";
import { cn } from "@/lib/components.lib";
import Spinner from "../Spinner";
import { Button } from "./button";
import { TbX } from "react-icons/tb";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
  leftIcon?: React.ReactNode;
  clearButton?: boolean;
  isPending?: boolean;
};

const Input = ({
  className,
  type,
  leftIcon,
  isPending,
  clearButton = true,
  ...props
}: InputProps) => {
  return (
    <div className={cn("relative flex w-full items-center gap-2", className)}>
      {leftIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
          {leftIcon}
        </div>
      )}
      <input
        // ref={inputRef}
        {...props}
        type={type}
        className={cn(
          "flex w-full rounded-md border border-foreground/30 bg-background px-2 py-1 text-sm shadow-md ring-offset-background transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-foreground/80 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 sm:py-2 ",
          className,
          leftIcon && "pl-8"
        )}
      />
      {isPending && (
        <Spinner className="inset-y-2 right-2 flex size-6 items-center" />
      )}
    </div>
  );
};

export { Input };
