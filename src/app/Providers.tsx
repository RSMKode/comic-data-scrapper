import React from "react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ColorThemeContextProvider } from "@/contexts/ColorThemeContext";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const defaultTheme = "dark";
  const delayDuration = 100;

  return (
    <NextThemesProvider attribute="class" defaultTheme={defaultTheme}>
      <ColorThemeContextProvider>
        <TooltipProvider delayDuration={delayDuration}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </TooltipProvider>
      </ColorThemeContextProvider>
    </NextThemesProvider>
  );
}
