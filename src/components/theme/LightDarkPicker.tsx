"use client";

import * as React from "react";
import { cn } from "@/lib/components.lib";
import { Button } from "../ui/button";
import { TbMoonFilled, TbSunFilled } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { VscColorMode } from "react-icons/vsc";
import { useTheme } from "next-themes";
import { IconType } from "react-icons";
import { useHydrate } from "@/hooks/useHydrate";

const THEMES: {
  label: string;
  className: string;
  Icon: IconType;
}[] = [
  {
    label: "Claro",
    className: "light",
    Icon: TbSunFilled,
  },
  {
    label: "Oscuro",
    className: "dark",
    Icon: TbMoonFilled,
  },
  {
    label: "Sistema",
    className: "system",
    Icon: VscColorMode,
  },
];

export type LightDarkPickerProps = React.ComponentProps<typeof Button> & {
  className?: string;
};

const LightDarkPicker = ({ className, ...props }: LightDarkPickerProps) => {
  const { theme, setTheme } = useTheme();
  const isHydrated = useHydrate();

  if (!isHydrated)
    return (
      <Button disabled className="p-1" variant={"default"}>
        <VscColorMode className="size-4 sm:size-5" />
      </Button>
    );

  const Icon = THEMES.find((t) => t.className === theme)?.Icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "px-1 hover:border-transparent hover:bg-foreground hover:text-accent-primary sm:px-2",
            className,
          )}
          tooltip="Cambiar tema"
          variant={"default"}
          {...props}
        >
          {Icon && <Icon className="size-4 sm:size-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-2 border-accent-primary bg-background/70 backdrop-blur-xs"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>Tema</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-accent-primary" />
        {THEMES.map((t) => {
          const { label, className, Icon } = t;
          return (
            <DropdownMenuItem
              key={label}
              className={cn(
                "flex items-center gap-2",
                theme === className && "bg-accent-primary/40",
              )}
              onClick={() => setTheme(className)}
            >
              <Icon className="size-4 sm:size-5" />
              <span>{label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LightDarkPicker;
