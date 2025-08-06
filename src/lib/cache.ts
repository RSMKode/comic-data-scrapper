import { FULL_CACHE_TAG } from "@/config/cache-tags.config";
import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";
import SuperJSON from "superjson";
import { ValidCacheTagT } from "./cache-tags.lib";

type CallbackT = <P = unknown, T = unknown>(...params: P[]) => Promise<T>;

// export const cache = <T extends Callback>(
//   fn: T,
//   keyParts: string[],
//   options: {
//     revalidate?: number | false;
//     tags?: string[];
//   } = {}
// ) => {
export const cache = <T, P extends unknown[]>(
  fn: (...params: P) => Promise<T>,
  // options: Parameters<typeof nextCache>[2] & { tags?: (ValidCacheTagT|string)[] },
  options: { tags?: (ValidCacheTagT | string)[]; revalidate?: number | false },
  keyParts?: Parameters<typeof nextCache>[1],
) => {
  const { tags = [], revalidate = 5 } = options || {};
  const fullKeyParts = keyParts ? [...keyParts, ...tags] : tags;
  const fullOptions = {
    ...options,
    tags: [...tags, FULL_CACHE_TAG],
    revalidate: revalidate,
  };

  const wrap = async (params: unknown[]): Promise<string> => {
    const result = await fn(...(params as P));
    return SuperJSON.stringify(result);
  };
  const cachedFn = reactCache(nextCache(wrap, fullKeyParts, fullOptions));
  return async (...params: P): Promise<T> => {
    const result = await cachedFn(params);
    return SuperJSON.parse(result);
  };

  //? CACHE NORMAL
  // return reactCache(
  //   nextCache(fn, keyParts, {
  //     ...options,
  //     tags: [...tags, FULL_CACHE_TAG],
  //     revalidate: revalidate,
  //   }),
  // );
};
