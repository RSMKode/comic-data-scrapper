import { SessionUserT } from "@/app/(auth)/_core/auth.definitions";
import { API_BASE_URL } from "@/config/env.config";
import { callApi } from "@/lib/call-api";
import { cache } from "@/lib/cache";
import { handleResponseError } from "@/lib/error";
import { z } from "zod";
import {
  ApiItemInfoT,
  itemInfoAdapter,
  ApiStockItemT,
  stockItemAdapter,
} from "./item.definitions";
import { CACHE_TAGS } from "@/config/cache-tags.config";
import {
  LocationAttributesSchema,
  SapItemFieldsEnumSchema,
} from "../sap.config";

export const getItemInfo = async (sessionUser: SessionUserT, query: string) => {
  const params = new URLSearchParams({
    filter: query,
  });
  // const urlSufix = `/Articulos/Info?${params.toString()}`;
  const urlSufix = `/Stock/Articulo?${params.toString()}`;
  const apiUrl = API_BASE_URL + urlSufix;
  console.log({ apiUrl });

  const response = await callApi<ApiItemInfoT>(apiUrl, "GET", {
    authToken: sessionUser.token,
  });
  console.log({ response });

  handleResponseError(response);

  const itemInfo = itemInfoAdapter(response.data);
  return {
    ...response,
    itemInfo,
  };
};
export const getItemInfoCached = cache(getItemInfo, {
  revalidate: 5,
  tags: [CACHE_TAGS.sga.itemInfo],
});

export const CheckItemFiltersSchema = z.object({
  item: z.string().optional(),
  distNumber: z.string().optional(),
  location: z.string().optional(),
});
export type CheckItemFiltersT = z.infer<typeof CheckItemFiltersSchema>;

export const StockItemsOptionsSchema = z.object({
  grouped: z.boolean().optional(),
  query: z.string().optional(),
  filters: CheckItemFiltersSchema.optional(),
  order: z.array(SapItemFieldsEnumSchema).optional(),
  excludeAttributes: z
    .object({
      location: z.array(LocationAttributesSchema).optional(),
    })
    .optional(),
});
export type StockItemsOptionsT = z.infer<typeof StockItemsOptionsSchema>;

export const getStockItems = async (
  sessionUser: SessionUserT,
  options: StockItemsOptionsT,
) => {
  const { grouped = true, query, filters, order, excludeAttributes } = options;

  // if ((query && filters) || (!query && !filters)) {
  //   throw new Error(
  //     "Se debe proporcionar 'query' o 'filters', pero no ambos ni ninguno.",
  //   );
  // }

  const params = new URLSearchParams({
    grouped: grouped ? "true" : "false",
  });
  query && params.append("query", query);
  filters?.item && params.append("item", filters.item);
  filters?.distNumber && params.append("distNumber", filters.distNumber);
  filters?.location && params.append("location", filters.location);
  order?.length && order.forEach((field) => params.append("order", field));
  excludeAttributes?.location?.length &&
    excludeAttributes.location.forEach((attr) =>
      params.append("excludeAttributes", attr.apiValue),
    );

  const urlSufix = `/Stock?${params.toString()}`;
  const apiUrl = API_BASE_URL + urlSufix;
  console.log({ apiUrl });

  const response = await callApi<ApiStockItemT[]>(apiUrl, "GET", {
    authToken: sessionUser.token,
    // cacheTags: ["stockItems"],
  });
  console.log({ response });

  handleResponseError(response);

  const stockItems = response.data.map(stockItemAdapter);
  return {
    ...response,
    data: stockItems,
  };
};
export const getStockItemsCached = cache(getStockItems, {
  revalidate: 2,
  tags: [CACHE_TAGS.sga.inventory.stock.items],
});
