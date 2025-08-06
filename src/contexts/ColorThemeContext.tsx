"use client";

import Container from "@/components/_layout/Container";
import Spinner from "@/components/Spinner";
import { APP_NAME } from "@/config/env.config";
import {
  ColorThemeT,
  DEFAULT_COLOR_THEME,
  SHIMMER_CLASS,
} from "@/config/themes.config";
import { applyColorTheme } from "@/hooks/useApplyColorTheme";
import { useHydrate } from "@/hooks/useHydrate";

import { cn } from "@/lib/components.lib";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const COLOR_THEME_KEY = `${APP_NAME}-color-theme`;

type ColorThemeContextT = {
  colorTheme: ColorThemeT;
  updateColorTheme: (colorTheme: ColorThemeT) => void;
};

//Crea un contexto para el estado de la transición
const ColorThemeContext = createContext(null as unknown as ColorThemeContextT);

export const ColorThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [colorTheme, setColorTheme] =
    useState<ColorThemeT>(DEFAULT_COLOR_THEME);
  const isHydrated = useHydrate();

  const updateColorTheme = (colorTheme: ColorThemeT) => {
    setColorTheme(colorTheme);
    localStorage.setItem(COLOR_THEME_KEY, colorTheme);
    applyColorTheme(colorTheme);
  };

  useEffect(() => {
    const storedColorTheme = localStorage.getItem(
      COLOR_THEME_KEY
    ) as ColorThemeT;
    updateColorTheme(storedColorTheme || DEFAULT_COLOR_THEME);
  }, []);

  return isHydrated ? (
    <ColorThemeContext.Provider
      value={{
        colorTheme,
        updateColorTheme,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  ) : (
    <ProviderSkeleton />
  );
};

export const ProviderSkeleton = () => {
  return (
    <Container
      className={cn(
        "relative h-screen w-screen items-center justify-center overflow-clip rounded-lg border-8 border-background",
        SHIMMER_CLASS
      )}
    >
      <Spinner className="size-60 text-foreground/80" />
    </Container>
  );
};

export const useColorThemeContext = () => {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error(
      "useColorThemeContext must be used within a ColorThemeContextProvider"
    );
  }
  return context;
};
