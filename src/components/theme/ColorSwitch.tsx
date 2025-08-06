"use client";

import * as React from "react";
import { cn } from "@/lib/components.lib";
import { Button } from "../ui/button";
import { TbPalette, TbPaletteOff } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { COLOR_THEMES } from "@/config/themes.config";
import { useColorThemeContext } from "@/contexts/ColorThemeContext";
import { useHydrate } from "@/hooks/useHydrate";

export type ColorSwitchProps = React.ComponentProps<typeof Button> & {
  className?: string;
};

const ColorSwitch = ({ className, ...props }: ColorSwitchProps) => {
  const { colorTheme, updateColorTheme } = useColorThemeContext();
  const isHydrated = useHydrate();

  if (!isHydrated)
    return (
      <Button disabled className="p-1" variant={"default"}>
        <TbPaletteOff className="size-4 sm:size-5" />
      </Button>
    );

  const selectedFullTheme = COLOR_THEMES.find(
    (theme) => theme.className === colorTheme,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "px-1 hover:border-transparent hover:bg-foreground hover:text-accent-primary sm:px-2",
            className,
          )}
          tooltip="Cambiar tema de color"
          variant={"default"}
          {...props}
        >
          <TbPalette className="size-4 sm:size-5" />
          {selectedFullTheme && (
            <>
              {selectedFullTheme.color1 && (
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: selectedFullTheme.color1 }}
                />
              )}
              {selectedFullTheme.color2 && (
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: selectedFullTheme.color2 }}
                />
              )}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-2 border-accent-primary bg-background/70 backdrop-blur-xs"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>Colores</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-accent-primary" />
        {COLOR_THEMES.map((theme) => {
          const { label, className, color1, color2 } = theme;
          return (
            <DropdownMenuItem
              key={label}
              className={cn(
                "flex items-center gap-2",
                colorTheme === className && "bg-accent-primary/60",
              )}
              onClick={() => updateColorTheme(className)}
            >
              <span className="flex gap-2">{label}</span>
              {color1 && (
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: color1 }}
                />
              )}
              {color2 && (
                <div
                  className="size-4 rounded-full"
                  style={{ backgroundColor: color2 }}
                />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ColorSwitch;
