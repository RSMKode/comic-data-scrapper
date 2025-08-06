"use client";

import { logoutAction } from "@/app/(auth)/actions";
import { cn } from "@/lib/components.lib";
import * as React from "react";
import { IoMdLogOut } from "react-icons/io";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import { Button } from "../ui/button";

const LogoutButton = ({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { isPending, execute, data, error, isError } = useServerAction(
    logoutAction,
    {
      onError: (error) => {
        toast.error(error.err.message);
      },
      // onSuccess: () => {
      //   toast.success(data);
      // },
    }
  );

  // 2. Define a submit handler.
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick?.(event);
    execute();
  };

  return (
    <Button
      className={cn(
        "border-current bg-danger-background text-sm font-semibold text-danger hover:border-danger hover:bg-danger hover:text-danger-foreground",
        className
      )}
      onClick={handleClick}
      isPending={isPending}
      spinnerClassName="fill-danger"
    >
      <IoMdLogOut className="size-4 sm:size-5" />
      <span>Salir</span>
    </Button>
  );
};

export { LogoutButton };

