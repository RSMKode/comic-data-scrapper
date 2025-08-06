import { cn } from "@/lib/components.lib";
import { Card } from "./card/Card";
import { CardHeader } from "./card/CardHeader";
import { CardSection } from "./card/CardSection";
import { CardSectionItem } from "./card/CardSectionItem";
import { CardHeaderItem } from "./card/CardHeaderItem";
import { Separator } from "./ui/separator";

import { ComponentProps } from "react";
import { Badge } from "./ui/badge";
import { LabelValueItem } from "./card/LabelValueItem";
import { getItemTypeLabel, ItemTypeT } from "@/app/_shared/items/_core/item.definitions";
import { ValueLabelT } from "@/app/_shared/main.definitions";


export type ItemT = {
  id?: string;
  docId?: string;
  docVisualId?: string;
  lineId?: string;
  lineVisualOrder?: string;
  supplierId?: string;
  supplierName?: string;
  clientId?: string;
  clientName?: string;
  itemId: string;
  itemName?: string;
  itemType?: ItemTypeT;
  distNumber?: string;
  manufacturerDistNumber?: string;
  suggestedDistNumber?: string;
  transferedDistNumber?: string;
  quantity?: number;
  totalQuantity?: number;
  refQuantity?: number;
  suggestedQuantity?: number;
  quantityInLocation?: number;
  batch?: string;
  serialNumber?: string;
  availableBatches?: string[];
  availableSerialNumbers?: string[];
  unpreparedQuantity?: number;
  preparedQuantity?: number;
  preparedInTransfer?: number;
  generatedQuantity?: number;
  countedQuantity?: number;
  fromMecalux?: boolean;
  preparedMecalux?: boolean;
  transferedQuantity?: number;
  location?: string;
  suggestedLocation?: string;
  originLocation?: string;
  suggestedOriginLocation?: string;
  destinationLocation?: string;
  suggestedDestinationLocation?: string;
  inventoryUoM?: string;
  numPerMsr?: number;
  ean?: string;
  status?: string;
  notes?: string;
  substituteItem?: string;
  originLocationSituation?: string;
  destinationLocationSituation?: string;
  expirationDate?: Date | null
  minExpirationDate?: Date | null
  packageId?: string;
  packageLabel?: string;
  deliveryNote?: string;
  length?: string;
  weight?: string;
  height?: string;
  width?: string;
  additionalData?: Record<string, ValueLabelT> | ValueLabelT[];
};

type ItemCardProps = ComponentProps<typeof Card> & {
  item: ItemT;
  headerOptions?: {
    small: boolean;
    row: boolean;
  };
  options?: {
    showQuantity?: boolean;
    showTotalQuantity?: boolean;
  };
};

export default function ItemCard({
  item,
  headerOptions,
  options,
  className,
  children,
  ...props
}: ItemCardProps) {
  const {
    lineId,
    lineVisualOrder,
    itemId,
    itemName,
    itemType,
    supplierId,
    supplierName,
    clientId,
    clientName,
    distNumber,
    manufacturerDistNumber,
    suggestedDistNumber,
    transferedDistNumber,
    quantity,
    totalQuantity,
    refQuantity,
    suggestedQuantity,
    quantityInLocation,
    unpreparedQuantity,
    preparedQuantity,
    preparedInTransfer,
    generatedQuantity,
    countedQuantity,
    batch,
    serialNumber,
    availableBatches,
    availableSerialNumbers,
    fromMecalux,
    preparedMecalux,
    transferedQuantity,
    location,
    suggestedLocation,
    originLocation,
    suggestedOriginLocation,
    destinationLocation,
    suggestedDestinationLocation,
    inventoryUoM,
    numPerMsr,
    ean,
    substituteItem,
    status,
    notes,
    originLocationSituation,
    destinationLocationSituation,
    expirationDate,
    minExpirationDate,
    packageId,
    packageLabel,
    deliveryNote,
    length,
    weight,
    height,
    width,
    additionalData,
  } = item;

  const { showQuantity = true, showTotalQuantity = true } = options || {};
  const { small = true, row = true } = headerOptions || {};

  const defaultItemTypeLabel = "Nº de distribución";

  const additionalDataIterable = Array.isArray(additionalData)
    ? additionalData
    : typeof additionalData === "object"
      ? Object.values(additionalData as Record<string, ValueLabelT>)
      : [];

  return (
    <Card
      className={cn("text-foreground/80 text-sm shadow-md", className)}
      {...props}
    >
      <CardHeader
        className={cn(
          "bg-background",
          small && "text-sm",
          row && "flex-row items-center gap-4",
        )}
      >
        {lineId && (
          <>
            <CardHeaderItem
              className={cn("", small && "text-sm")}
              item={{ label: "LineNum", value: lineId }}
            />
            <Separator
              orientation={row ? "vertical" : "horizontal"}
              className="min-h-10"
            />
          </>
        )}
        {lineVisualOrder && (
          <>
            <CardHeaderItem
              className={cn("", small && "text-sm")}
              item={{ label: "Linea", value: lineVisualOrder }}
            />
            <Separator
              orientation={row ? "vertical" : "horizontal"}
              className="min-h-10"
            />
          </>
        )}
        {itemId && (
          <CardHeaderItem
            className={cn("", small && "text-sm")}
            item={{ label: "Artículo", value: itemId }}
          >
            {itemName && (
              <LabelValueItem
                // className={cn("", small && "text-sm")}
                item={{ label: itemName }}
              />
            )}
          </CardHeaderItem>
        )}
        {supplierId && (
          <>
            <Separator
              orientation={row ? "vertical" : "horizontal"}
              className="min-h-10"
            />
            <CardHeaderItem
              className={cn("", small && "text-sm")}
              item={{ label: "Proveedor", value: supplierId }}
            >
              {supplierName && (
                <LabelValueItem
                  // className={cn("", small && "text-sm")}
                  item={{ label: supplierName }}
                />
              )}
            </CardHeaderItem>
          </>
        )}
        {clientId && clientName && (
          <>
            <Separator
              orientation={row ? "vertical" : "horizontal"}
              className="min-h-10"
            />
            <CardHeaderItem
              className={cn("", small && "text-sm")}
              item={{ label: "Cliente", value: clientId }}
            />
            <CardHeaderItem
              className={cn("", small && "text-sm")}
              item={{ label: clientName }}
            />
          </>
        )}
      </CardHeader>
      {/* <hr className="w-full" /> */}
      <CardSection className="flex flex-wrap gap-2 px-2">
        {/* {itemType !== "N" && (
            <CardSectionItem
              item={{ label: "Tipo", value: getItemTypeLabel(itemType) }}
            />
          )} */}
        {itemType && itemType !== "N" && (
          <Badge>{getItemTypeLabel(itemType)}</Badge>
        )}
        {itemType && distNumber && (
          <CardSectionItem
            item={{ label: getItemTypeLabel(itemType), value: distNumber }}
          />
        )}
        {itemType && manufacturerDistNumber && (
          <CardSectionItem
            item={{
              label: `${getItemTypeLabel(itemType, true)} Fab.`,
              value: manufacturerDistNumber,
            }}
          />
        )}

        {itemType && transferedDistNumber && (
          <CardSectionItem
            item={{
              label: `${getItemTypeLabel(itemType) || defaultItemTypeLabel} Trasladado`,
              value: transferedDistNumber,
            }}
          />
        )}
        {location && (
          <CardSectionItem item={{ label: "Ubicación", value: location }} />
        )}

        {originLocation && (
          <CardSectionItem
            item={{ label: "Ubicación de Origen", value: originLocation }}
          />
        )}

        {destinationLocation && (
          <CardSectionItem
            item={{
              label: "Ubicación de Destino",
              value: destinationLocation,
            }}
          />
        )}

        {inventoryUoM && (
          <CardSectionItem
            item={{
              label: "Unidad de Medida",
              value: numPerMsr ? `${numPerMsr} ${inventoryUoM}` : inventoryUoM,
            }}
          />
        )}
        {/* {numPerMsr && (
              <CardSectionItem item={{ label: 'Cantidad por UdM', value: numPerMsr }} />
        )} */}
        {totalQuantity != null && showTotalQuantity && (
          <CardSectionItem
            item={{ label: "Cantidad total", value: totalQuantity }}
          />
        )}
        {quantity != null && showQuantity && (
          <CardSectionItem item={{ label: "Cantidad", value: quantity }} />
        )}
        {preparedQuantity != null && (
          <CardSectionItem
            item={{
              label: "Preparados",
              value: refQuantity
                ? `${preparedQuantity} / ${refQuantity}`
                : preparedQuantity,
            }}
          />
        )}
        {unpreparedQuantity != null && (
          <CardSectionItem
            item={{
              label: "Sin preparar",
              value: refQuantity
                ? `${preparedQuantity} / ${refQuantity}`
                : preparedQuantity,
            }}
          />
        )}
        {generatedQuantity != null && (
          <CardSectionItem
            item={{
              label: "Generados",
              value: refQuantity
                ? `${generatedQuantity} / ${refQuantity}`
                : generatedQuantity,
            }}
          />
        )}
        {transferedQuantity != null && (
          <CardSectionItem
            item={{
              label: "Trasladados",
              value: refQuantity
                ? `${transferedQuantity} / ${refQuantity}`
                : transferedQuantity,
            }}
          />
        )}
        {countedQuantity != null && (
          <CardSectionItem
            item={{
              label: "Contados",
              value: refQuantity
                ? `${countedQuantity} / ${refQuantity}`
                : countedQuantity,
            }}
          />
        )}
        {quantityInLocation != null && (
          <CardSectionItem
            item={{
              label: "Cantidad en Ubi.",
              value: refQuantity
                ? `${quantityInLocation} / ${refQuantity}`
                : quantityInLocation,
            }}
          />
        )}
        {availableBatches && availableBatches.length > 0 && (
          <CardSectionItem
            item={{
              label: "Lotes Disponibles",
              value: availableBatches.join(", "),
            }}
          />
        )}
        {availableSerialNumbers && availableSerialNumbers.length > 0 && (
          <CardSectionItem
            item={{
              label: "Nº Serie Disponibles",
              value: availableSerialNumbers.join(", "),
            }}
          />
        )}
        {fromMecalux && (
          <CardSectionItem
            item={{
              label: "Preparado Mecalux",
              value: preparedMecalux ? "Sí" : "No",
            }}
          />
        )}
        {ean && (
          <CardSectionItem item={{ label: "Código de Barrasa", value: ean }} />
        )}
        {substituteItem && (
          <CardSectionItem
            item={{ label: "Artículo Sustituto", value: substituteItem }}
          />
        )}
        {originLocationSituation && (
          <CardSectionItem
            item={{
              label: "Situación de ubicación de origen",
              value: originLocationSituation,
            }}
          />
        )}
        {destinationLocationSituation && (
          <CardSectionItem
            item={{
              label: "Situación de ubicación de destino",
              value: destinationLocationSituation,
            }}
          />
        )}
        {expirationDate && (
          <CardSectionItem
            item={{
              label: "Fecha de caducidad",
              value: expirationDate.toLocaleDateString("es"),
            }}
          />
        )}
        {minExpirationDate && (
          <CardSectionItem
            item={{
              label: "Fecha de caducidad mínima",
              value: minExpirationDate.toLocaleDateString("es"),
            }}
          />
        )}
        {packageLabel && (
          <CardSectionItem
            item={{
              label: "Bulto",
              value: packageLabel,
            }}
          />
        )}
        {deliveryNote && (
          <CardSectionItem
            item={{
              label: "Albarán",
              value: deliveryNote,
            }}
          />
        )}

        {/* SUGGESTED */}
        {suggestedLocation && (
          <CardSectionItem
            item={{
              label: "Ubicación Propuesta",
              value: suggestedLocation,
            }}
          />
        )}
        {suggestedOriginLocation && (
          <CardSectionItem
            item={{
              label: "Ubicación de Origen Propuesta",
              value: suggestedOriginLocation,
            }}
          />
        )}
        {suggestedDestinationLocation && (
          <CardSectionItem
            item={{
              label: "Ubicación de Destino Propuesta",
              value: suggestedDestinationLocation,
            }}
          />
        )}
        {itemType && suggestedDistNumber && (
          <CardSectionItem
            item={{
              label: `${getItemTypeLabel(itemType) || defaultItemTypeLabel} Propuesto/a`,
              value: suggestedDistNumber,
            }}
          />
        )}
        {suggestedQuantity ? (
          <CardSectionItem
            item={{ label: "Cantidad Propuesta", value: suggestedQuantity }}
          />
        ) : null}

        {/* ADDITIONAL */}
        {status && (
          <CardSectionItem
            item={{
              label: "Estado",
              value: status,
            }}
          />
        )}
        {notes && (
          <CardSectionItem
            item={{
              label: "Notas",
              value: notes,
            }}
          />
        )}
        {length && (
          <CardSectionItem
            item={{
              label: "Largo",
              value: length,
            }}
          />
        )}
        {weight && (
          <CardSectionItem
            item={{
              label: "Peso",
              value: weight,
            }}
          />
        )}
        {height && (
          <CardSectionItem
            item={{
              label: "Alto",
              value: height,
            }}
          />
        )}
        {width && (
          <CardSectionItem
            item={{
              label: "Ancho",
              value: width,
            }}
          />
        )}
        {additionalDataIterable &&
          additionalDataIterable.length > 0 &&
          additionalDataIterable.map((data, index) => (
            <CardSectionItem
              key={`${data.label}-${data.value}-${index}`}
              item={{
                label: data.label,
                value: data.value,
              }}
            />
          ))}

        {children}
      </CardSection>
    </Card>
  );
}
