import { ObjectKeys } from "node_modules/react-hook-form/dist/types/path/common";
import { StatusEnumT } from "../documents/_core/document.definitions";
import { ItemDataT } from "./_core/item.definitions";
import { normalizeString } from "@/lib/normalizer";

export const checkFilterQuery = async <T>(
  query: string,
  items?: T[],
  options?: { itemLabel?: string; minLength?: number; maxLength?: number }
) => {
  const {
    itemLabel = "artículos",
    minLength = 3,
    maxLength = 50,
  } = options || {};

  if (!items || items.length === 0) {
    throw new Error(`No se han encontrado ${itemLabel} para filtrar`);
  }
  // if (!query) return { items: items };
  if (query.length < minLength) {
    throw new Error(`El filtro debe tener al menos ${minLength} caracteres`);
  }
  if (query.length > maxLength) {
    throw new Error(`El filtro debe tener menos de ${maxLength} caracteres`);
  }
};

export const getMinExpirationDate = (options: {
  days?: number;
  months?: number;
  years?: number;
}) => {
  const { days, months, years } = options;
  const minExpirationDate = new Date();
  if (days) minExpirationDate.setDate(minExpirationDate.getDate() + days);
  if (months) minExpirationDate.setMonth(minExpirationDate.getMonth() + months);
  if (years)
    minExpirationDate.setFullYear(minExpirationDate.getFullYear() + years);
  console.log({ minExpirationDate });
  return minExpirationDate;
};

export const getStatusFromQuantity = (options: {
  totalQuantity: number;
  preparedQuantity?: number;
  unpreparedQuantity?: number;
  generatedQuantity?: number;
}): StatusEnumT => {
  const {
    totalQuantity,
    preparedQuantity = 0,
    unpreparedQuantity = 0,
    generatedQuantity = 0,
  } = options;
  const completedQuantity = preparedQuantity + generatedQuantity;

  if (completedQuantity === totalQuantity) return "completed";
  if (completedQuantity > 0) return "on-process";
  return "pending";
};

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

export const reduceItemDataListSize = <T extends { itemDataList: ItemDataT[] }>(
  item: T,
  maxSize: number = 3
) => {
  const maxItemDataListSize = maxSize;
  if (item.itemDataList.length > maxItemDataListSize)
    item.itemDataList = item.itemDataList.slice(0, maxItemDataListSize);

  return item;
};
