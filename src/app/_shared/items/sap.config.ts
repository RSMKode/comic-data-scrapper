import { z } from "zod";
import { ValueLabelSchema } from "../main.definitions";

export const SapItemFieldsEnumSchema = z.enum([
    "ExpDate",
    "BinCode",
    ]);
export type SapItemFieldsEnumT = z.infer<typeof SapItemFieldsEnumSchema>;

export const SAP_FIELDS = {
  item: {
    expirationDate: "ExpDate",
    location: "BinCode",
  },
} as const;

// LOCATION ATTRIBUTES -------------------------------------------------------------
export const ApiLocationAttributesEnumSchema = z.enum(["Bahía", "No conforme"]);
export type ApiLocationAttributesEnumT = z.infer<
  typeof ApiLocationAttributesEnumSchema
>;

export const LocationAttributesEnumSchema = z.enum(["bay", "non-conforming"]);
export type LocationAttributesEnumT = z.infer<
  typeof LocationAttributesEnumSchema
>;

export const LocationAttributesSchema = ValueLabelSchema.extend({
  apiValue: ApiLocationAttributesEnumSchema,
  value: LocationAttributesEnumSchema,
});
export type LocationAttributesT = z.infer<typeof LocationAttributesSchema>;

export const LOCATION_ATTRIBUTES = {
  bay: { apiValue: "Bahía", value: "bay", label: "Bahía" },
  nonConforming: {
    apiValue: "No conforme",
    value: "non-conforming",
    label: "No conforme",
  },
} as const;