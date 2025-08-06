"use client";

import { cn } from "@/lib/components.lib";
import * as React from "react";
import { LuPanelLeftClose, LuPanelLeftOpen } from "react-icons/lu";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
type AppSidebarTriggerProps = React.ComponentProps<typeof Button> & {};

const AppSidebarTrigger = ({
  className,
  onClick,
  ...props
}: AppSidebarTriggerProps) => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      tooltip={
        props.tooltip ||
        (state === "expanded" ? "Cerrar" : "Abrir") + " menú lateral"
      }
      data-sidebar="trigger"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      className={cn("", className)}
      {...props}
    >
      {state === "expanded" ? (
        <LuPanelLeftClose className="size-4 sm:size-5" />
      ) : (
        <LuPanelLeftOpen className="size-4 sm:size-5" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export { AppSidebarTrigger };
