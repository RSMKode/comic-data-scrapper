"use server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Fuerza la revalidación (invalida la caché) de una ruta específica.
 */
export async function revalidatePathClientSide(
  path: string,
  params?: URLSearchParams | string
) {
  "use server";
  revalidatePath(path);
}

/**
 * Fuerza la revalidación (invalida la caché) de uno o varios tags.
 */
export async function revalidateTagClientSide(tags: string | string[]) {
  "use server";

  const allTags = [tags].flat();
  allTags.forEach((tag) => revalidateTag(tag));
}
