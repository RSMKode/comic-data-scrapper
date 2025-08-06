import { CacheTagT, FULL_CACHE_TAG } from "@/config/cache-tags.config";
import { revalidateTag } from "next/cache";

export type ValidCacheTagT =
  | ReturnType<typeof getGlobalCacheTag>
  | ReturnType<typeof getUserCacheTag>
  | ReturnType<typeof getIdCacheTag>
  | CacheTagT;

export function getGlobalCacheTag(tag: CacheTagT) {
  return `global:${tag}` as const;
}

export function getUserCacheTag(userId: string, tag: CacheTagT) {
  return `user:${userId}-${tag}` as const;
}

export function getIdCacheTag(id: string, tag: CacheTagT) {
  return `id:${id}-${tag}` as const;
}

export function clearFullCache() {
  revalidateTag(FULL_CACHE_TAG);
}
