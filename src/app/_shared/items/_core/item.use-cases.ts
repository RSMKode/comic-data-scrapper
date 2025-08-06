import { SessionUserT } from "@/app/(auth)/_core/auth.definitions";
import {
  getItemInfoCached,
  getStockItemsCached,
  StockItemsOptionsT,
} from "./item.services";
import { StockItemT } from "./item.definitions";
import { getBarCodeData } from "../bar-code.lib";

export const getItemInfoUseCase = async (
  sessionUser: SessionUserT,
  query: string,
) => {
  const barCodeData = getBarCodeData(query);
  const { itemId, ean } = barCodeData;
  const newQuery = (ean || itemId || query).trim();

  // const { itemInfo } = await getItemInfo(sessionUser, newQuery);
  const { message, itemInfo } = await getItemInfoCached(sessionUser, newQuery);
  return { message, itemInfo };
};

export const getStockItemsUseCase = async (
  sessionUser: SessionUserT,
   options: StockItemsOptionsT & {
    searchBarCodeDistNumber?: boolean;
  },
) => {
  const { query, filters, searchBarCodeDistNumber = true } = options;

  if ((query && filters) || (!query && !filters)) {
    throw new Error(
      "Se debe proporcionar 'query' o 'filters', pero no ambos ni ninguno.",
    );
  }

  const newOptions = { ...options };

  if (query && !filters) {
    const barCodeData = query ? getBarCodeData(query) : {};
    const newFilters = {
      item: barCodeData.itemId ?? barCodeData.ean,
      distNumber: searchBarCodeDistNumber
        ? (barCodeData.distNumber ??
          barCodeData.manufacturerDistNumber ??
          barCodeData.registrationNumber)
        : undefined,
    };
    if (Object.values(newFilters).some((value) => value)) {
      newOptions.filters = newFilters;
      newOptions.query = undefined;
    }
  }

  const response = await getStockItemsCached(sessionUser, newOptions);
  // const response = await getStockItems(sessionUser, newOptions);
  return response;
};

export const getQueryTypeFromCheckedItemsUseCase = (
  checkedItems: StockItemT[],
  query: string,
) => {
  const allItemIds = new Set<string>();
  const allBarCodes = new Set<string>();
  const allDistNumbers = new Set<string>();
  const allManufacturerDistNumbers = new Set<string>();
  const allLocations = new Set<string>();

  checkedItems?.forEach((item) => {
    allItemIds.add(item.itemId);
    item.barCode && allBarCodes.add(item.barCode);
    item.itemDataList.forEach((subItem) => {
      subItem.location && allLocations.add(subItem.location);
      subItem.distNumber && allDistNumbers.add(subItem.distNumber);
      subItem.manufacturerDistNumber &&
        allManufacturerDistNumbers.add(subItem.manufacturerDistNumber);
    });
  });

  const uniqueItemIds = Array.from(allItemIds);
  const uniqueBarCodes = Array.from(allBarCodes);
  const uniqueDistNumbers = Array.from(allDistNumbers);
  const uniqueManufacturerDistNumbers = Array.from(allManufacturerDistNumbers);
  const uniqueLocations = Array.from(allLocations);

  const uniqueValues: {
    itemId?: string;
    barCode?: string;
    distNumber?: string;
    manufacturerDistNumber?: string;
    location?: string;
  } = {};

  // if (uniqueDistNumbers.length === 1 && query === uniqueDistNumbers[0]) {
  // } else if (uniqueItemIds.length === 1 && query === uniqueItemIds[0]) {
  //   uniqueValues["uniqueItem"] = query;
  // } else if (uniqueLocations.length === 1 && query === uniqueLocations[0]) {
  //   uniqueValues["uniqueLocation"] = query;
  // }
  // return uniqueValues;
  let queryType = null;

  if (uniqueDistNumbers.length === 1 && query === uniqueDistNumbers[0]) {
    queryType = "distNumber";
  } else if (query === uniqueManufacturerDistNumbers[0]) {
    queryType = "manufacturerDistNumber";
  } else if (uniqueLocations.length === 1 && query === uniqueLocations[0]) {
    queryType = "location";
  } else if (uniqueItemIds.length === 1 && query === uniqueItemIds[0]) {
    queryType = "itemId";
  } else if (uniqueBarCodes.length === 1 && query === uniqueBarCodes[0]) {
    queryType = "barCode";
  } else queryType = "unknown";

  if (uniqueDistNumbers.length === 1) {
    uniqueValues["distNumber"] = uniqueDistNumbers[0];
  }
  if (uniqueManufacturerDistNumbers.length === 1) {
    uniqueValues["manufacturerDistNumber"] = uniqueManufacturerDistNumbers[0];
  }
  if (uniqueLocations.length === 1) {
    console.log("uniqueLocations", uniqueLocations);
    uniqueValues["location"] = uniqueLocations[0];
  }
  if (uniqueItemIds.length === 1) {
    uniqueValues["itemId"] = uniqueItemIds[0];
  }
  if (uniqueItemIds.length === 1) {
    uniqueValues["barCode"] = uniqueBarCodes[0];
  }

  return { queryType, uniqueValues };
};
