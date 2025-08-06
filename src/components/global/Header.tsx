"use client";

import { cn } from "@/lib/components.lib";
import { useEffect, useState } from "react";
import { AppSidebarTrigger } from "../sidebar/AppSidebarTrigger";
import ThemeSwitch from "../theme/ThemeSwitch";
import AppBreadcrumb from "./AppBreadcrumb";
import { ClearCacheButton } from "./ClearCacheButton";
import { ToastHistoryButton } from "./ToastHistoryButton";

type HeaderProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function Header({ children, className }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY > lastScrollY && window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "ease border-accent-primary bg-secondary dark:shadow-background/70 @container sticky top-0 z-20 flex w-full flex-wrap items-center justify-between gap-y-1 border-b-2 p-1.5 shadow-md transition duration-300 sm:p-2",
        className,
        isSticky && "-translate-y-60"
      )}
    >
      <div className="flex items-center gap-1 @md:gap-2">
        <AppSidebarTrigger
          variant="color_ghost"
          size="icon"
          className="backdrop-blur-none"
        />
        {/* <Separator
            orientation="vertical"
            className="h-full min-h-4 bg-accent-primary-foreground"
          />
          <BackButton
            variant="ghost"
            size="icon"
            className="text-accent-primary-foreground hover:bg-accent-primary-foreground hover:text-accent-primary backdrop-blur-none"
          /> */}
        <AppBreadcrumb homeLink="/dashboard" />
        {/* <AppBreadcrumb className="px-2 py-1 bg-background/50 rounded"/> */}
        {children}
      </div>
      <div className="flex items-center gap-1 @md:gap-2">
        <ToastHistoryButton />
        <ClearCacheButton refreshPage />
        <ThemeSwitch />
      </div>
    </header>
  );
}
