// import React from 'react';
import type { SVGProps } from "react";
import { ExpertOneLogo } from "../icons/ExpertOneLogo";
import { cn } from "@/lib/components.lib";
import SipelLogo from "../icons/SipelLogo";
import SipelFullLogo from "../icons/SipelFullLogo";
// import MerceVLogo from "../icons/MerceVLogo";

export type MainLogoProps = SVGProps<SVGSVGElement> & {
  showIcon: boolean;
};
export function MainLogo({ className, showIcon = true }: MainLogoProps) {
  return (
    <h1 className={cn("flex items-center gap-2 text-lg", className)}>
      {showIcon && <SipelLogo className="size-7 max-w-full shrink-0" />}
      {<SipelFullLogo className="h-5"/>}
      {/* <MerceVLogo className="size-5 shrink-0 max-w-full" /> */}
      {/* <span className="font-semibold uppercase">Sipel</span> */}
    </h1>
  );
}
