"use client";

import { Card } from "@/components/card/Card";
import { CardSection } from "@/components/card/CardSection";
import { DeleteButton } from "@/components/DeleteButton";
import { TbPlaylistX } from "react-icons/tb";
import { ItemDataT, ItemTypeT } from "../items/_core/item.definitions";

type ItemDataCardProps = React.ComponentProps<typeof Card> & {
  itemType?: ItemTypeT;
  itemData: ItemDataT;
  showItemData?: Partial<Record<keyof ItemDataT, boolean>>;
  index?: number;
  handleDelete?: () => void;
};
export default function ItemDataCard({
  itemType,
  itemData,
  showItemData,
  index,
  handleDelete,
}: ItemDataCardProps) {
  const {
    distNumber,
    manufacturerDistNumber,
    quantity,
    location,
    expirationDate,
  } = itemData;
  const {
    distNumber: showDistNumber = true,
    manufacturerDistNumber: showManufacturerDistNumber = false,
    quantity: showQuantity = true,
    location: showLocation = true,
    expirationDate: showExpirationDate = true,
  } = showItemData || {};

  return (
    <Card className="bg-background flex-row items-center border-2 p-2 text-xs">
      <CardSection className="gap-1">
        {/* <CardSectionItem
          className="gap-1"
          item={{
            label: itemType ? getItemTypeLabel(itemType) : "Nº Dist",
            value: distNumber,
          }}
        />
        {(quantity > 1 || !distNumber) && (
          <>
            <CardSectionItem
              className="gap-1"
              item={{
                label: "Cantidad",
                value: quantity,
              }}
            />
          </>
        )} */}
        {showDistNumber && distNumber && <span>{distNumber}</span>}
        {showManufacturerDistNumber && manufacturerDistNumber && (
          <span>{manufacturerDistNumber}</span>
        )}
        {showQuantity && (quantity > 1 || !distNumber) && (
          <span className="text-foreground/70 flex flex-wrap gap-1 text-xs">
            <span>-</span>
            <span>{quantity}</span>
          </span>
        )}
        {showLocation && location && (
          <span className="text-foreground/70 flex flex-wrap gap-1 text-xs">
            <span>-</span>
            <span>{location}</span>
          </span>
        )}
        {showExpirationDate && expirationDate && (
          <span className="text-foreground/70 flex flex-wrap gap-1 text-xs">
            <span>-</span>
            <span>{expirationDate.toLocaleDateString("es")}</span>
          </span>
        )}
      </CardSection>
      {handleDelete && (
        <DeleteButton handleDelete={handleDelete} askConfirmation={false}>
          {/* <TbTrash /> */}
          <TbPlaylistX className="size-4" />
        </DeleteButton>
      )}
    </Card>
  );
}
