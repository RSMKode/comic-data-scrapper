import { z } from "zod";

export const CacheTagSchema = z.enum([
  //STOCK
  "stock-items",
  "item-info",
  //RECEPTION_MAIN
  "reception-items",
  "reception-summary-items",
  //RECEPTION_REQUESTS
  "reception-requests-items",
  "reception-requests-summary-items",
  //PICKING
  "picking-routes",
  "picking-orders",
  "picking-order",
  "picking-summary-items",
  //PACKING
  "packing-routes",
  "packing-orders",
  "packing-order",
  "packing-packages",
  "packing-summary-items",
]);
export type CacheTagT = z.infer<typeof CacheTagSchema>;

export const CACHE_TAGS = {
  sga: {
    itemInfo: "item-info",
    inventory: {
      stock: {
        items: "stock-items",
      },
    },
    reception: {
      pallets: {
        pallet: "reception-pallet",
        boxes: {
          box: "reception-pallets-box",
        },
      },
    },
    relocation: {
      transferRequests: {
        requests: "relocation-transfer-requests",
        request: "relocation-transfer-request",
      },
    },
    expedition: {
      picking: {
        data: "expedition-picking-data",
        cart: "expedition-picking-cart",
        relocate: "expedition-picking-relocate",
        // data: "expedition-picking-data",
        // orders: "expedition-picking-orders",
        // order: "expedition-picking-order",
        // packages: "expedition-picking-packages",
        // summaryItems: "expedition-picking-summary-items",
      },
    },
  },
} as const;
export const FULL_CACHE_TAG = "*";
