import { SessionUserT } from "@/app/(auth)/_core/auth.definitions";
import { z } from "zod";
import { getItemTypeLabel, ItemDataSchema, ItemTypeSchema, StockItemT } from "../items/_core/item.definitions";
import { getStockItemsUseCase } from "../items/_core/item.use-cases";

export const ValidateDistNumberOptionsSchema = z.object({
  currentDistNumberList: z.array(z.string()).optional(),
  currentManufacturerDistNumberList: z.array(z.string()).optional(),
  itemId: z.string().optional(),
  location: z.string().optional(),
  serialExists: z.boolean().optional(),
  batchExists: z.boolean().optional(),
  listToCheck: z.array(z.string()).optional(),
  maxQuantity: z.number().optional(),
});
export type ValidateDistNumberOptionsT = z.infer<
  typeof ValidateDistNumberOptionsSchema
>;

export const ValidateDistNumberPropsSchema = z.object({
  itemType: ItemTypeSchema,
  itemData: ItemDataSchema,
  validationOptions: ValidateDistNumberOptionsSchema.optional(),
});
export type ValidateDistNumberPropsT = z.infer<
  typeof ValidateDistNumberPropsSchema
>;
export const validateDistNumberUseCase = async (
  sessionUser: SessionUserT,
  options: ValidateDistNumberPropsT,
) => {
  const { itemType, itemData, validationOptions } = options;
  const { distNumber, manufacturerDistNumber } = itemData;

  const distNumberLabel = getItemTypeLabel(itemType);
  if (!distNumber) {
    if (itemType === "N") return true;
    else throw new Error(`Debe introducir un ${distNumberLabel}`);
  }

  const {
    currentDistNumberList,
    currentManufacturerDistNumberList,
    itemId,
    location,
    serialExists,
    batchExists,
    listToCheck,
    maxQuantity,
  } = validationOptions || {};

  if (maxQuantity != null && itemData.quantity > maxQuantity)
    if (maxQuantity === 0) throw new Error(`No se pueden añadir más unidades`);
    else throw new Error(`No se pueden añadir más de ${maxQuantity} unidades`);

  const exists = itemType === "S" ? serialExists : batchExists;

  let checkedDistNumber: string | undefined;

  if (
    currentDistNumberList?.find(
      (item) => item.toLocaleLowerCase() === distNumber?.toLocaleLowerCase(),
    )
  )
    throw new Error(`Ya se ha añadido este ${distNumberLabel}`);

  if (manufacturerDistNumber) {
    if (
      currentManufacturerDistNumberList?.find(
        (item) =>
          item.toLocaleLowerCase() ===
          manufacturerDistNumber.toLocaleLowerCase(),
      )
    )
      throw new Error(`Ya se ha añadido este ${distNumberLabel} de fabricante`);
  }

  if (listToCheck && listToCheck.length > 0) {
    checkedDistNumber = listToCheck.find(
      (item) => item.toLocaleLowerCase() === distNumber?.toLocaleLowerCase(),
    );
    if (!checkedDistNumber) throw new Error(`El ${distNumberLabel} no existe`);
    return true;
  }

  let checkedItems: StockItemT[] = [];

  if (itemId && exists === true) {
    const { data } = await getStockItemsUseCase(sessionUser, {
      filters: {
        item: itemId,
        distNumber: distNumber,
        location,
      },
    });
    checkedItems = data;
    if (!checkedItems || checkedItems.length === 0) {
      throw new Error("No se encontró el artículo");
    }
    checkedDistNumber = checkedItems?.[0]?.itemDataList?.[0]?.distNumber;
    if (!checkedDistNumber)
      throw new Error(`No se encontró el ${distNumberLabel}`);
  } else if (itemId && exists === false) {
    try {
      const { data } = await getStockItemsUseCase(sessionUser, {
        filters: {
          item: itemId,
          distNumber: distNumber,
          // location: originLocation,
        },
      });
      checkedItems = data;
    } catch (err) {
      console.log(err);
    }
    if (checkedItems && checkedItems?.length > 0 && itemType === "S") {
      throw new Error(`El ${distNumberLabel} ya existe para este artículo`);
    }
  }
  return true;
};
