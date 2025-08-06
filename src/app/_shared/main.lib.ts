import { normalizeString } from "@/lib/normalizer";

export const getMapObjectValue = <T extends object, K extends keyof T>(
  mapObject: Record<string | number | symbol, T>,
  objectKey: K,
  objectValue: T[K],
  options?: Parameters<typeof normalizeString>[1]
) => {
  const { ignoreCase = false } = options || {};

  const objectEntries = Object.entries(mapObject);
  const entry = objectEntries.find(([key, value]) => {
    const objectEntryValue = normalizeString(
      value[objectKey] as string,
      options
    );
    const objectValueToCompare = normalizeString(
      objectValue as string,
      options
    );

    return objectEntryValue === objectValueToCompare;
  });
  const value = entry ? entry[1] : undefined;
  return value as T;
};
