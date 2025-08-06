import { z } from "zod";
import {
  IdNameSchema,
  idNameToValueLabelAdapter,
  ValueLabelSchema,
} from "../../main.definitions";

// EXTENDED BOOLEAN -------------------------------------------------------------

export const ApiExtendedBooleanSchema = z.boolean().or(z.enum(["Y", "P", "N"]));
export type ApiExtendedBooleanT = z.infer<typeof ApiExtendedBooleanSchema>;

export const ExtendedBooleanSchema = z.boolean().or(z.enum(["partial"]));
export type ExtendedBooleanT = z.infer<typeof ExtendedBooleanSchema>;

export const extendedBooleanAdapter = (
  value: ApiExtendedBooleanT
): ExtendedBooleanT =>
  typeof value === "boolean"
    ? value
    : value.toLowerCase() === "p"
    ? "partial"
    : value.toLowerCase() === "y";

export const apiExtendedBooleanAdapter = (
  value: ExtendedBooleanT
): ApiExtendedBooleanT =>
  typeof value === "boolean"
    ? value
    : value.toLowerCase() === "partial"
    ? "P"
    : "N";

// ACCEPTED OR REJECTED -------------------------------------------------------------
export const ApiAcceptedRejectedEnumSchema = z.enum(["A", "R"]);
export type ApiAcceptedRejectedEnumT = z.infer<
  typeof ApiAcceptedRejectedEnumSchema
>;

export const AcceptedRejectedEnumSchema = z.enum(["accepted", "rejected"]);
export type AcceptedRejectedEnumT = z.infer<typeof AcceptedRejectedEnumSchema>;

export const AcceptedRejectedSchema = ValueLabelSchema.extend({
  apiValue: ApiAcceptedRejectedEnumSchema,
  value: AcceptedRejectedEnumSchema,
});
export type AcceptedRejectedT = z.infer<typeof AcceptedRejectedSchema>;

export const acceptedRejectedMapAdapter = {
  A: { apiValue: "A", value: "accepted", label: "Aceptado" },
  R: { apiValue: "R", value: "rejected", label: "Rechazado" },
} as const;

// DOCUMENT TYPE -------------------------------------------------------------

export const ApiDocumentTypeEnumSchema = z.enum([
  "ST",
  "PE",
  "PV",
  "PC",
  "AL",
  "FA",
]);
export type ApiDocumentTypeEnumT = z.infer<typeof ApiDocumentTypeEnumSchema>;

export const DocumentTypeEnumSchema = z.enum([
  "transfer-request",
  "order",
  "purchase-order",
  "sales-order",
  "deliveryNote",
  "invoice",
]);
export type DocumentTypeEnumT = z.infer<typeof DocumentTypeEnumSchema>;

// export const DocumentTypeSchema = z.object({
//   apiValue: ApiDocumentTypeEnumSchema,
//   value: DocumentTypeEnumSchema,
//   label: z.string(),
// });
export const DocumentTypeSchema = ValueLabelSchema.extend({
  apiValue: ApiDocumentTypeEnumSchema,
  value: DocumentTypeEnumSchema,
});
export type DocumentTypeT = z.infer<typeof DocumentTypeSchema>;

export const documentTypeMapAdapter = {
  ST: {
    apiValue: "ST",
    value: "transfer-request",
    label: "Solicitud de traslado",
  },
  PE: { apiValue: "PE", value: "order", label: "Pedido" },
  PV: { apiValue: "PV", value: "sales-order", label: "Pedido de venta" },
  PC: { apiValue: "PC", value: "purchase-order", label: "Pedido de compra" },
  AL: { apiValue: "AL", value: "deliveryNote", label: "Albarán" },
  FA: { apiValue: "FA", value: "invoice", label: "Factura" },
} as const;
export const getDocumentTypeLabel = ({ value }: DocumentTypeT) => {
  switch (value) {
    case "transfer-request":
      return "Solicitud de traslado";
    case "order":
      return "Pedido";
    case "purchase-order":
      return "Pedido de compra";
    case "sales-order":
      return "Pedido de venta";
  }
};

// OPEN-CLOSED STATUS -------------------------------------------------------------

export const ApiOCStatusEnumSchema = z.enum(["O", "C"]);
export type ApiOCStatusEnumT = z.infer<typeof ApiOCStatusEnumSchema>;

export const OCStatusEnumSchema = z.enum(["open", "closed"]);
export type OCStatusEnumT = z.infer<typeof OCStatusEnumSchema>;

export const OCStatusSchema = ValueLabelSchema.extend({
  apiValue: ApiOCStatusEnumSchema,
  value: OCStatusEnumSchema,
});
export type OCStatusT = z.infer<typeof OCStatusSchema>;

export const openClosedStatusMapAdapter = {
  O: { apiValue: "O", value: "open", label: "Abierto" },
  C: { apiValue: "C", value: "closed", label: "Cerrado" },
} as const;

// STATUS -------------------------------------------------------------

export const ApiStatusEnumSchema = z.enum(["P", "E", "C"]);
export type ApiStatusEnumT = z.infer<typeof ApiStatusEnumSchema>;

export const StatusEnumSchema = z.enum(["pending", "on-process", "completed"]);
export type StatusEnumT = z.infer<typeof StatusEnumSchema>;

export const StatusSchema = ValueLabelSchema.extend({
  apiValue: ApiStatusEnumSchema,
  value: StatusEnumSchema,
});
export type StatusT = z.infer<typeof StatusSchema>;

export const statusMapAdapter = {
  pending: { apiValue: "P", value: "pending", label: "Pendiente" },
  "on-process": { apiValue: "E", value: "on-process", label: "En proceso" },
  completed: { apiValue: "C", value: "completed", label: "Completado" },
} as const;

export const getStatusLabel = (type: StatusEnumT) => {
  switch (type) {
    case "pending":
      return "Pendiente";
    case "on-process":
      return "En proceso";
    case "completed":
      return "Completado";
  }
};

// CONFIRMED STATUS -------------------------------------------------------------
export const ApiConfirmedStatusEnumSchema = ApiExtendedBooleanSchema;
export type ApiConfirmedStatusEnumT = z.infer<
  typeof ApiConfirmedStatusEnumSchema
>;

export const ConfirmedStatusEnumSchema = z.enum([
  "confirmed",
  "partial",
  "pending",
]);
export type ConfirmedStatusEnumT = z.infer<typeof ConfirmedStatusEnumSchema>;

export const ConfirmedStatusSchema = ValueLabelSchema.extend({
  apiValue: ApiConfirmedStatusEnumSchema,
  value: ConfirmedStatusEnumSchema,
});
export type ConfirmedStatusT = z.infer<typeof ConfirmedStatusSchema>;

export const confirmedStatusMapAdapter = {
  Y: { apiValue: "Y", value: "confirmed", label: "Confirmado" },
  P: { apiValue: "P", value: "partial", label: "Parcial" },
  N: { apiValue: "N", value: "pending", label: "Pendiente" },
};

// SGA ROUTE -------------------------------------------------------------
export const ApiSGARouteSchema = z.object({
  RouteId: z.string(),
  RouteName: z.string(),
  BinCode: z.string(),
});
export type ApiSGARouteT = z.infer<typeof ApiSGARouteSchema>;

export const SGARouteSchema = z.object({
  value: z.string(),
  label: z.string(),
  packingLocation: z.string(),
});
export type SGARouteT = z.infer<typeof SGARouteSchema>;

export const routeAdapter = (route: ApiSGARouteT): SGARouteT => ({
  value: route.RouteId,
  label: route.RouteName,
  packingLocation: route.BinCode,
});

// SHIPPER -------------------------------------------------------------

export const ApiShipperSchema = IdNameSchema.extend({});
export type ApiShipperT = z.infer<typeof ApiShipperSchema>;

export const ShipperSchema = ValueLabelSchema.extend({});
export type ShipperT = z.infer<typeof ShipperSchema>;

export const shipperAdapter = (shipper: ApiShipperT): ShipperT => ({
  ...idNameToValueLabelAdapter(shipper),
});

// BAY -------------------------------------------------------------

// export const ApiBaySchema = IdNameSchema.extend({});
export const ApiBaySchema = z.string();
export type ApiBayT = z.infer<typeof ApiBaySchema>;

export const BaySchema = ValueLabelSchema.extend({});
export type BayT = z.infer<typeof BaySchema>;

export const bayAdapter = (shipper: ApiBayT): BayT => ({
  ...idNameToValueLabelAdapter(shipper),
});

// PACKAGE -------------------------------------------------------------

export const ApiPackageTypeSchema = z.enum(["C", "P"]);
export type ApiPackageTypeT = z.infer<typeof ApiPackageTypeSchema>;

export const PackageTypeSchema = z.enum(["box", "pallet"]);
export type PackageTypeT = z.infer<typeof PackageTypeSchema>;

export const packageTypeMapAdapter: {
  [key in ApiPackageTypeT]: { value: PackageTypeT; label: string };
} = {
  C: { value: "box", label: "Caja" },
  P: { value: "pallet", label: "Palet" },
};
