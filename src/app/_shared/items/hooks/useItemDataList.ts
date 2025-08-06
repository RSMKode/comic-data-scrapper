import useArray from "@/hooks/useArray";
import { ItemDataT, ItemTypeT } from "../_core/item.definitions";

export type useItemDataListProps<T extends ItemDataT> = {
  itemType?: ItemTypeT;
  initialItemDataList?: T[];
  onUserUpdate?: (itemDataList?: T[]) => void;
};

export const useItemDataList = <T extends ItemDataT = ItemDataT>({
  itemType,
  initialItemDataList = [],
  onUserUpdate,
}: useItemDataListProps<T>) => {
  const {
    array: itemDataList,
    set,
    update,
    remove,
    clear,
    push,
  } = useArray<T>(initialItemDataList);

  const setItemDataList = set;

  const updateItemDataEntry = update;
  const addItemDataEntry = (itemData: T) => {
    const existingItem = itemDataList.find(
      (item) => item.distNumber === itemData.distNumber
    );
    // Si el item ya existe, se actualiza la cantidad
    if (existingItem) {
      // Si el tipo de item es "S" no se puede agregar
      if (itemType && itemType === "S") return;

      const existingItemIndex = itemDataList.indexOf(existingItem);
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + itemData.quantity,
      };
      updateItemDataEntry(existingItemIndex, updatedItem);
      return;
    }
    push(itemData);
  };
  const removeItemDataEntry = remove;

  const clearItemDataList = clear;

  return {
    itemDataList,
    setItemDataList,
    updateItemDataEntry,
    addItemDataEntry,
    removeItemDataEntry,
    clearItemDataList,
  };
};
