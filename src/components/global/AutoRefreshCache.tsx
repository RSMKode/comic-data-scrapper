"use client";

import {
  revalidatePathClientSide,
  revalidateTagClientSide,
} from "@/app/actions";
import { FULL_CACHE_TAG } from "@/config/cache-tags.config";
import { useRouter } from "@/hooks/useRouter";
import { usePathname } from "next/navigation";
import * as React from "react";

export type AutoRefreshCacheProps = {
  refreshGlobal?: boolean;
  refreshTags?: boolean;
  refreshPath?: boolean;
  tags?: string[];
  path?: string;
};

export const AutoRefreshCache = ({
  path,
  tags = [],
  refreshGlobal = false,
  refreshTags = false,
  refreshPath = false,
}: AutoRefreshCacheProps) => {
  const componentName = "AutoRefreshCache";

  const router = useRouter();
  const pathname = usePathname();
  React.useEffect(() => {
    console.log("AutoRefreshCache", { path, pathname, tags });
    if (refreshGlobal) {
      revalidateTagClientSide(FULL_CACHE_TAG)
        .then(() =>
          console.log(`Caché global vaciada exitosamente en ${componentName}`)
        )
        .catch((error) =>
          console.error(
            error.message || `Error al vaciar caché global en ${componentName}`
          )
        );
      return;
    }
    if (refreshTags && tags.length) {
      const tagsFormatter = new Intl.ListFormat("es", {
        style: "long",
        type: "conjunction",
      });

      revalidateTagClientSide(tags)
        .then(() =>
          console.log(
            `Caché de tags: ${tagsFormatter.format(
              tags
            )} vaciada en ${componentName}`
          )
        )
        .catch((error) =>
          console.error(
            error.message ||
              `Error al vaciar caché de tags: ${tagsFormatter.format(
                tags
              )} en ${componentName}`
          )
        );
    }
    if (refreshPath) {
      revalidatePathClientSide(path || pathname)
        .then(() =>
          console.log(`Caché de ruta vaciada exitosamente en ${componentName}`)
        )
        .catch((error) =>
          console.error(
            error.message || `Error al vaciar caché de ruta en ${componentName}`
          )
        );
    }
  }, []);

  return null;
};
