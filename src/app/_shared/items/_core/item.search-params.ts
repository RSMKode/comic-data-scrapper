import {
  DEFAULT_SEARCH_PARAMS_OPTIONS,
  PARAMS,
  SearchParamsOptionsT,
} from "@/config/params.config";
import { createSearchParamsCache, createParser } from "nuqs/server";
import { StockItemsOptionsSchema, StockItemsOptionsT } from "./item.services";

export const parseAsStockQueryData = createParser({
  parse(queryData) {
    const parsedQueryData = JSON.parse(queryData);
    const parsedQueryDataSchema =
      StockItemsOptionsSchema.parse(parsedQueryData);
    return parsedQueryDataSchema;
  },
  serialize(value: StockItemsOptionsT) {
    const stringifiedValue = JSON.stringify(value);
    return stringifiedValue;
  },
});

export const itemsSearchParams = (options?: SearchParamsOptionsT) => {
  const newOptions = { ...DEFAULT_SEARCH_PARAMS_OPTIONS, ...options };
  return {
    [PARAMS.stock.queryData]: parseAsStockQueryData.withOptions(newOptions),
  };
};
export const itemsSearchParamsCache =
  createSearchParamsCache(itemsSearchParams());
