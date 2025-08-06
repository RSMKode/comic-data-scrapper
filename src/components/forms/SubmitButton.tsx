"use client";

import { cn } from "@/lib/components.lib";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type SubmitButtonProps = React.ComponentProps<typeof Button>;

const SubmitButton = ({
  children,
  className,
  spinnerClassName,
  isPending,
  disabled,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  // console.log({ pending });

  return (
    // <Button
    //   onClick={onClick}
    //   type="submit"
    //   disabled={disabled || pending || isPending}
    //   className={cn("disabled:cursor-progress", className)}
    //   isPending={isPending}
    //   spinnerClassName={spinnerClassName}
    // >
    //   {children}
    // </Button>
    <Button
      type="submit"
      disabled={disabled || pending || isPending}
      className={cn("disabled:cursor-progress", className)}
      isPending={isPending}
      {...props}
    >
      {children}
    </Button>
  );
};

export { SubmitButton };
