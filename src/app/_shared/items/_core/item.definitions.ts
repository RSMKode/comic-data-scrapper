import { z } from "zod";
import {
  apiExtendedBooleanAdapter,
  ApiExtendedBooleanSchema,
  extendedBooleanAdapter,
  ExtendedBooleanSchema,
} from "../../documents/_core/document.definitions";

// ITEM TYPE -------------------------------------------------------------------
export const ItemTypeSchema = z.enum(["L", "S", "N"]);
export type ItemTypeT = z.infer<typeof ItemTypeSchema>;

export const getItemTypeLabel = (
  itemType: ItemTypeT,
  manufacturer: boolean = false
): string => {
  switch (itemType) {
    case "L":
      return "Lote";
    case "S":
      return "Nº Serie";
    case "N":
      return "";
  }
};

// ITEM DATA -------------------------------------------------------------------
export const ApiItemDataSchema = z.object({
  LotNumber: z.string().optional(),
  DistNumber: z.string().optional(),
  BinCode: z.string().optional(),
  WhsCode: z.string().optional(),
  OnHandQtty: z.number(),
  Quantity: z.number().optional(),
  ExpDate: z.string().optional(),
  Approval: ApiExtendedBooleanSchema.optional(),
});
export type ApiItemDataT = z.infer<typeof ApiItemDataSchema>;

export const ItemDataSchema = z.object({
  barCode: z.string().optional(),
  itemId: z.string().optional(),
  manufacturerDistNumber: z.string().optional(),
  distNumber: z.string().optional(),
  location: z.string().optional(),
  quantity: z.number(),
  warehouse: z.string().optional(),
  expirationDate: z.date().or(z.null()).optional(),
  expirationDateApproval: ExtendedBooleanSchema.optional(),
});
export type ItemDataT = z.infer<typeof ItemDataSchema>;

export const itemDataAdapter = (
  item: ApiItemDataT,
  options?: {
    fixedDecimal?: boolean;
  }
): ItemDataT => ({
  manufacturerDistNumber: item.LotNumber,
  distNumber: item.DistNumber,
  location: item.BinCode,
  warehouse: item.WhsCode,
  quantity: options?.fixedDecimal
    ? +Number(item.OnHandQtty).toFixed(2)
    : item.OnHandQtty,
  expirationDate: item.ExpDate ? new Date(item.ExpDate) : undefined,
  expirationDateApproval: item.Approval
    ? extendedBooleanAdapter(item.Approval)
    : undefined,
});

export const apiItemDataAdapter = (
  item: ItemDataT,
  options?: {
    fixedDecimal?: boolean;
  }
): ApiItemDataT => ({
  LotNumber: item.manufacturerDistNumber,
  DistNumber: item.distNumber,
  BinCode: item.location,
  WhsCode: item.warehouse,
  OnHandQtty: options?.fixedDecimal
    ? +Number(item.quantity).toFixed(2)
    : item.quantity,
  ExpDate: item.expirationDate ? item.expirationDate.toISOString() : undefined,
  Approval: item.expirationDateApproval
    ? apiExtendedBooleanAdapter(item.expirationDateApproval)
    : undefined,
});

// ITEM INFO ------------------------------------------------------------------
export const ApiItemInfoSchema = z.object({
  ItemCode: z.string(),
  ItemName: z.string(),
  ItemType: ItemTypeSchema,
  InvntryUom: z.string(),
  NumPerMsr: z.number(),
  ColdConservation: ApiExtendedBooleanSchema.optional(),
  Global: ApiExtendedBooleanSchema.optional(),
  Length: z.number(),
  Weight: z.number(),
  Height: z.number(),
  Width: z.number(),
  Notes: z.string().optional(),
  CodeBars: z.string().optional(),
});
export type ApiItemInfoT = z.infer<typeof ApiItemInfoSchema>;

export const ItemInfoSchema = z.object({
  itemId: z.string(),
  itemName: z.string(),
  itemType: ItemTypeSchema,
  inventoryUoM: z.string(),
  numPerMsr: z.number(),
  hasColdConservation: ExtendedBooleanSchema.optional(),
  isGlobalItem: ExtendedBooleanSchema.optional(),
  length: z.number(),
  weight: z.number(),
  height: z.number(),
  width: z.number(),
  notes: z.string().optional(),
  barCode: z.string().optional(),
  bindedData: ItemDataSchema.partial().optional(),
});
export type ItemInfoT = z.infer<typeof ItemInfoSchema>;

export const itemInfoAdapter = (item: ApiItemInfoT): ItemInfoT => ({
  itemId: item.ItemCode,
  itemName: item.ItemName,
  itemType: item.ItemType,
  inventoryUoM: item.InvntryUom,
  numPerMsr: item.NumPerMsr,
  isGlobalItem: item.Global ? extendedBooleanAdapter(item.Global) : undefined,
  hasColdConservation: item.ColdConservation
    ? extendedBooleanAdapter(item.ColdConservation)
    : undefined,
  length: item.Length,
  weight: item.Weight,
  height: item.Height,
  width: item.Width,
  notes: item.Notes,
  barCode: item.CodeBars,
});

// STOCK ITEM DATA -------------------------------------------------------------
export const ApiStockItemDataSchema = ApiItemDataSchema.extend({
  Status: z.string().optional(),
  Notes: z.string().optional(),
});
export type ApiStockItemDataT = z.infer<typeof ApiStockItemDataSchema>;

export const StockItemDataSchema = ItemDataSchema.extend({
  status: z.string().optional(),
  notes: z.string().optional(),
});
export type StockItemDataT = z.infer<typeof StockItemDataSchema>;

export const stockItemDataAdapter = (
  item: ApiStockItemDataT,
  options?: {
    fixedDecimal?: boolean;
  }
): StockItemDataT => ({
  ...itemDataAdapter(item, options),
  manufacturerDistNumber: item.LotNumber,
  status: item.Status,
  notes: item.Notes,
});

// STOCK ITEMS ------------------------------------------------------------
export const ApiStockItemSchema = z.object({
  ItemCode: z.string(),
  ItemName: z.string(),
  ItemType: ItemTypeSchema,
  ItemDataList: z.array(ApiStockItemDataSchema),
  TotalQtty: z.number().optional(),
  InvntryUom: z.string(),
  NumPerMsr: z.number(),
  CodeBars: z.string().optional(),
});
export type ApiStockItemT = z.infer<typeof ApiStockItemSchema>;

export const StockItemSchema = z.object({
  id: z.string(),
  itemId: z.string(),
  itemName: z.string(),
  itemType: ItemTypeSchema,
  itemDataList: z.array(StockItemDataSchema),
  totalQuantity: z.number().optional(),
  inventoryUoM: z.string(),
  numPerMsr: z.number(),
  barCode: z.string().optional(),
  bindedData: ItemDataSchema.partial().optional(),
});
export type StockItemT = z.infer<typeof StockItemSchema>;

export const stockItemAdapter = (item: ApiStockItemT): StockItemT => ({
  id: `${item.ItemCode}_${item.ItemDataList[0].DistNumber}_${item.ItemDataList[0].BinCode}_${item.ItemDataList[0].LotNumber}`,
  itemId: item.ItemCode,
  itemType: item.ItemType,
  itemName: item.ItemName,
  totalQuantity: item.TotalQtty,
  itemDataList: item.ItemDataList.map((item) => stockItemDataAdapter(item)),
  inventoryUoM: item.InvntryUom,
  numPerMsr: item.NumPerMsr,
  barCode: item.CodeBars,
});
