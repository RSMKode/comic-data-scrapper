import { z } from "zod";
import { parse } from "date-fns";
import { normalizeDate } from "@/lib/normalizer";

export const GS1_SEPARATORS = ["$", String.fromCharCode(29), "<GS>", "<FNC1>"] as const
export const GS1_SEPARATOR = GS1_SEPARATORS[0]

export const GS1_APPLICATION_IDENTIFIERS = {
  "00": {
    ai: "00",
    label: "sscc",
    description: "Serial Shipping Container Code",
    alias: "registrationNumber",
    variableLength: false,
    chars: 18,
  },
  "01": {
    ai: "01",
    label: "gtin",
    description: "Global Trade Item Number",
    alias: "ean",
    variableLength: false,
    chars: 14,
  },
  "02": {
    ai: "02",
    label: "cgtin",
    description: "Identification of trade items contained in a logistic unit",
    alias: "ean",
    variableLength: false,
    chars: 14,
  },
  "03": {
    ai: "03",
    label: "mtogtin",
    description: "Identification of a Made-to-Order (MtO) trade item (GTIN)",
    variableLength: false,
    chars: 14,
  },
  "10": {
    ai: "10",
    label: "batchNumber",
    description: "Batch or lot number",
    variableLength: true,
    chars: 20,
  },
  "11": {
    ai: "13",
    label: "manufactureDate",
    variableLength: false,
    chars: 6,
  },
  "13": {
    ai: "13",
    label: "packagingDate",
    variableLength: false,
    chars: 6,
  },
  "15": {
    ai: "15",
    label: "bestBeforeDate",
    variableLength: false,
    chars: 6,
  },
  "17": {
    ai: "17",
    label: "expirationDate",
    variableLength: false,
    chars: 6,
  },
  "21": {
    ai: "21",
    label: "serialNumber",
    variableLength: true,
    chars: 20,
  },
  "37": {
    ai: "37",
    label: "quantity",
    description: "Quantity of trade items contained in a logistic unit",
    variableLength: false,
    chars: 8,
  },
  "240": {
    ai: "240",
    label: "itemId",
    description:
      "Additional product identification assigned by the manufacturer",
    variableLength: true,
    chars: 30,
  },
  // "241": {
  //   ai: "241",
  //   label: "clientItemId",
  //   description: "Client-specific item identification",
  //   variableLength: true,
  //   chars: 30,
  // }
} as const;

export const BarCodeDataSchema = z.object({
  registrationNumber: z.string().optional(),
  manufactureDate: z.date().optional(),
  packagingDate: z.date().optional(),
  bestBeforeDate: z.date().optional(),
  expirationDate: z.date().optional(),
  itemId: z.string().optional(),
  ean: z.string().optional(),
  partialDistNumber: z.string().optional(),
  fullDistNumber: z.string().optional(),
  batchNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  distNumber: z.string().optional(),
  manufacturerDistNumber: z.string().optional(),
  quantity: z.number().optional(),
  barCode: z.string().optional(),
  queryString: z.string().optional(),
});
export type BarCodeDataT = z.infer<typeof BarCodeDataSchema>;

/**
 * Adapta los valores de un código de barras GS1 a la estructura de datos del proyecto.
 *
 * @param {Record<string, string>} barCodeValues - Un objeto que contiene los valores del código de barras GS1, donde las claves son los identificadores de aplicación (AIs) y los valores son los datos asociados.
 * @param {string} queryString - La cadena completa del código de barras escaneado.
 * @returns {BarCodeDataT} Un objeto que contiene los datos adaptados del código de barras, incluyendo identificadores de producto, números de lote/serie, fechas y otros detalles.
 *
 * @description
 * Este adaptador toma los valores de un código de barras GS1 y los transforma en un formato estructurado que se ajusta a las necesidades del proyecto.
 * Los identificadores de aplicación (AIs) se utilizan para extraer información como el SSCC, GTIN, fechas, números de lote y serie, entre otros.
 *
 * @example
 * const barCodeValues = {
 *   "00": "123456789012345678",
 *   "01": "01234567890128",
 *   "10": "L12345",
 *   "17": "250430",
 * };
 * const queryString = "001234567890123456780123456789012810L1234517250430";
 * const adaptedData = gs1ApplicationIdentifierAdapter(barCodeValues, queryString);
 * console.log(adaptedData);
 */
export const gs1ApplicationIdentifierAdapter = (
  barCodeValues: Record<string, string>,
  queryString: string,
): BarCodeDataT => {
  // Identificadores de producto
  const sscc = barCodeValues["00"];
  const registrationNumber = sscc;
  const gtin = barCodeValues["01"];
  const cgtin = barCodeValues["02"];
  const mtogtin = barCodeValues["03"];
  const ean = gtin || cgtin || mtogtin;

  // Identificador de producto adicional
  const itemId = barCodeValues["240"];

  // Código de barras completo
  const barCode = ean || itemId ? queryString : undefined;

  // Números de lote y serie
  const batchNumber = barCodeValues["10"];
  const serialNumber = barCodeValues["21"];
  //? REVISAR distNumber POR PROYECTO
  const manufacturerDistNumber = serialNumber || batchNumber
  const distNumber = manufacturerDistNumber || registrationNumber;
  const fullDistNumber = distNumber;

  // Fechas
  const dateFormat = "yyMMdd";
  const manufactureDate = barCodeValues["11"]
    ? normalizeDate(parse(barCodeValues["11"], dateFormat, new Date(), {}))
    : undefined;
  const packagingDate = barCodeValues["13"]
    ? normalizeDate(parse(barCodeValues["13"], dateFormat, new Date(), {}))
    : undefined;
  const bestBeforeDate = barCodeValues["15"]
    ? normalizeDate(parse(barCodeValues["15"], dateFormat, new Date(), {}))
    : undefined;
  const expirationDate = barCodeValues["17"]
    ? normalizeDate(parse(barCodeValues["17"], dateFormat, new Date(), {}))
    : undefined;
  //? Modificar este valor en función de la empresa
  const selectedExpirationDate = bestBeforeDate ?? expirationDate;
  const quantity = barCodeValues["37"]
    ? Number(barCodeValues["37"])
    : undefined;

  return {
    registrationNumber,
    ean,
    itemId,
    batchNumber,
    serialNumber,
    distNumber,
    manufacturerDistNumber,
    fullDistNumber,
    manufactureDate,
    packagingDate,
    bestBeforeDate,
    expirationDate: selectedExpirationDate,
    quantity,
    barCode,
    queryString,
  };
};
