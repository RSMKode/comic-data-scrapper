"use client";

import * as React from "react";
import { cn } from "@/lib/components.lib";
import { Button } from "../ui/button";
import { useRouter } from "@/hooks/useRouter";
import { TbChevronLeft, TbRefresh } from "react-icons/tb";
import { usePathname } from "next/navigation";
import {
  revalidatePathClientSide,
  revalidateTagClientSide,
} from "@/app/actions";
import { toast } from "sonner";
import { CACHE_TAGS, FULL_CACHE_TAG } from "@/config/cache-tags.config";

export type ClearCacheButtonProps = React.ComponentProps<typeof Button> & {
  refreshPage?: boolean;
  refreshGlobal?: boolean;
  refreshTags?: boolean;
  refreshPath?: boolean;
  tags?: string[];
  path?: string;
};

export const ClearCacheButton = ({
  className,
  children,
  onClick,
  variant,
  size,
  tooltip,
  refreshPage = false,
  refreshGlobal = false,
  refreshTags = true,
  refreshPath = true,
  tags,
  path,
  ...props
}: ClearCacheButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  return (
    <Button
      {...props}
      // size={size || "icon"}
      // isPending={isPending}
      variant={variant || "default"}
      tooltip={tooltip || "Vacíar caché y recargar"}
      onClick={(event) => {
        onClick?.(event);
        startTransition(() => {
          // Caché global
          if (refreshGlobal)
            revalidateTagClientSide(FULL_CACHE_TAG)
              .then(() => toast.success("Caché global  vaciada exitosamente"))
              // .then(() => toast.success("Caché global vaciada y recarga exitosa"))
              .catch((error) =>
                toast.error(error.message || "Error al vaciar caché global"),
              );
          // Caché de ruta
          if (refreshPath)
            revalidatePathClientSide(path || pathname)
              .then(() => toast.success("Caché de ruta vaciada exitosamente"))
              .catch((error) =>
                toast.error(error.message || "Error al vaciar caché de ruta"),
              );
          if (refreshPage) router.refresh();
        });
      }}
      className={cn("", className)}
    >
      <TbRefresh
        className={cn(
          "size-4 -scale-x-100 sm:size-5",
          isPending &&
            "animate-spin duration-400 repeat-infinite",
        )}
      />
      {/* <span className="sr-only">Volver atrás</span> */}
      {children}
    </Button>
  );
};
