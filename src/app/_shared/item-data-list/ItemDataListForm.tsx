"use client";

import ErrorLabel from "@/components/ErrorLabel";
import { FormDatePicker } from "@/components/forms/FormDatePicker";
import { FormInput } from "@/components/forms/FormInput";
import { SubmitButton } from "@/components/forms/SubmitButton";
import InfoLabel from "@/components/InfoLabel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PARAMS } from "@/config/params.config";
import { serializeJSONCookie } from "@/lib/cookies.lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useQueryState } from "nuqs";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { TbCheck, TbPlaylistAdd, TbPlaylistX, TbX } from "react-icons/tb";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { useServerAction } from "zsa-react";

import {
  getItemTypeLabel,
  ItemDataT,
  ItemTypeSchema,
  ItemTypeT,
} from "../items/_core/item.definitions";
import { validateDistNumberAction } from "./actions";
import ItemDataCard from "./ItemDataCard";
import { useItemDataList } from "./useItemDataList";
import { parseAsStockQueryData } from "../items/_core/item.search-params";
import { getBarCodeData } from "../items/bar-code.lib";
import { getStockItemsAction } from "@/app/(main)/sga/inventory/stock/actions";
import { StockSearchButton } from "@/components/StockSearchButton";
import { AppAlertDialog } from "@/components/AppAlertDialog";

export const ItemDataListFormFieldsSchema = z.object({
  barCode: z.union([z.boolean(), z.literal("optional")]).optional(),
  itemId: z.union([z.boolean(), z.literal("optional")]).optional(),
  quantity: z.union([z.boolean(), z.literal("optional")]).optional(),
  location: z.union([z.boolean(), z.literal("optional")]).optional(),
  distNumber: z.union([z.boolean(), z.literal("optional")]).optional(),
  manufacturerDistNumber: z
    .union([z.boolean(), z.literal("optional")])
    .optional(),
  expirationDate: z.union([z.boolean(), z.literal("optional")]).optional(),
});
export type ItemDataListFormFieldsT = z.infer<
  typeof ItemDataListFormFieldsSchema
>;

const ItemDataListFormSchema = z
  .object({
    fields: ItemDataListFormFieldsSchema.optional(),
    itemType: ItemTypeSchema,
    barCode: z
      .string()
      .trim()
      .min(2, {
        message: "Debe contener al menos 2 caracteres",
      })
      .or(z.literal(""))
      .optional(),
    itemId: z
      .string()
      .trim()
      .min(2, {
        message: "Debe contener al menos 2 caracteres",
      })
      .or(z.literal(""))
      .optional(),
    quantity: z.coerce.number().positive({
      message: "Debe introducir una cantidad válida",
    }),
    location: z
      .string()
      .trim()
      .min(2, {
        message: "Debe introducir una ubicación válida",
      })
      .or(z.literal(""))
      .optional(),
    distNumber: z
      .string()
      .trim()
      .min(2, {
        message: "Debe introducir un valor válido",
      })
      .or(z.literal(""))
      .optional(),
    manufacturerDistNumber: z
      .string()
      .trim()
      .min(2, {
        message: "Debe introducir un valor válido",
      })
      .or(z.literal(""))
      .optional(),
    // expirationDate: z.string().date().or(z.literal("")).optional(),
    expirationDate: z.coerce
      .date({
        message: "Debe introducir una fecha válida",
      })
      .or(z.null())
      .optional(),
    expirationDateApproval: z.boolean().optional(),
  })
  .refine((data) => data.fields?.itemId !== true || data.itemId, {
    message: "Debe introducir un valor válido",
    path: ["itemId"],
  })
  .refine(
    (data) =>
      data.itemType === "N" ||
      data.fields?.distNumber !== true ||
      data.distNumber !== "",
    {
      message: "Debe introducir un valor válido",
      path: ["distNumber"],
    }
  )
  .refine(
    (data) =>
      data.itemType === "N" ||
      data.fields?.manufacturerDistNumber !== true ||
      data.manufacturerDistNumber !== "",
    {
      message: "Debe introducir un valor válido",
      path: ["manufacturerDistNumber"],
    }
  )
  .refine((data) => data.fields?.location !== true || data.location !== "", {
    message: "Debe introducir una ubicación válida",
    path: ["location"],
  })
  .refine(
    (data) => data.fields?.expirationDate !== true || data.expirationDate,
    {
      message: "Debe introducir una fecha valida",
      path: ["expirationDate"],
    }
  );
// .refine(
//   (data) =>
//     data.fields?.expirationDate !== true ||
//     data.expirationDateApproval != null,
//   {
//     message: "Debe introducir la conformidad de la fecha de caducidad",
//     path: ["expirationDate"],
//   },
// );

type ItemDataListFormT = z.infer<typeof ItemDataListFormSchema>;

type ItemDataListFormProps<T extends ItemDataT> = {
  cookieWhereSaved?: string;
  pathToRevalidate?: string;
  validationOptions: {
    itemType: ItemTypeT;
    listToCheck?: string[];
    itemId?: string;
    originLocation?: string;
    maxQuantity?: number;
    minExpirationDate?: Date;
    serialExists?: boolean;
    batchExists?: boolean;
  };
  fields?: ItemDataListFormFieldsT;
  initialState?: Partial<T>;
  initialDateNull?: boolean;
  todayDateNull?: boolean;
  showActions?: {
    showStock?: boolean;
  };
  uniqueItem?: boolean;
  onValueChange?: (itemDataList: T[]) => void;
};

export default function ItemDataListForm<T extends ItemDataT = ItemDataT>({
  cookieWhereSaved,
  pathToRevalidate,
  // itemType,
  // listToCheck,
  // itemId,
  // originLocation,
  // maxQuantity,
  // minExpirationDate,
  // serialExists,
  // batchExists,
  validationOptions,
  fields,
  initialState,
  initialDateNull,
  todayDateNull = false,
  showActions,
  uniqueItem = false,
  onValueChange,
}: ItemDataListFormProps<T>) {
  // const router = useRouter();
  const { itemType } = validationOptions;

  const defaultShowActions = {
    showStock: true,
  };
  showActions = {
    ...defaultShowActions,
    ...showActions,
  };

  const defaultFields = {
    barCode: true,
    itemId: false,
    quantity: true,
    distNumber: true,
    manufacturerDistNumber: false,
    expirationDate: false,
    location: false,
  };
  fields = {
    ...defaultFields,
    ...fields,
  };

  const {
    itemDataList,
    setItemDataList,
    clearItemDataList,
    addItemDataEntry,
    removeItemDataEntry,
  } = useItemDataList<T>({
    itemType,
    // onUserUpdate: cookieWhereSaved
    //   ? (itemDataList) =>
    //       setCookie(cookieWhereSaved, serializeJSONCookie(itemDataList))
    //   : undefined,
  });
  console.log({ itemDataList });

  const currentQuantity = itemDataList.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  //? POR ALGUN MOTIVO SI ESTA ACTIVADO EL REACT COMPILER ESTE USE EFFECT NO FUNCIONA
  useEffect(() => {
    onValueChange?.(itemDataList);
    if (cookieWhereSaved)
      setCookie(cookieWhereSaved, serializeJSONCookie(itemDataList));
  }, [itemDataList]);

  const currentDistNumberList = itemDataList
    .map((item) => item.distNumber ?? "")
    .filter(Boolean);

  const defaultQuantity = 1;

  const formDefaultValues = useMemo(
    () => ({
      fields,
      itemType,
      barCode: initialState?.barCode || "",
      distNumber:
        // Si ya se ha añadido un número de distribución, no volver a autocompletarlo
        initialState?.distNumber || "",
      manufacturerDistNumber: initialState?.manufacturerDistNumber || "",
      quantity:
        (itemType !== "S" ? initialState?.quantity : 1) ?? defaultQuantity,
      // Si ya se ha añadido una ubicación, mantenerla en las siguientes
      location: itemDataList[0]?.location || initialState?.location || "",
      expirationDate:
        initialState?.expirationDate ||
        (initialDateNull || !fields.expirationDate ? undefined : new Date()),
      expirationDateApproval: true,
    }),
    [JSON.stringify(fields), itemType, initialState, itemDataList]
  );

  // 1. Define your form.
  const form = useForm<ItemDataListFormT>({
    resolver: zodResolver(ItemDataListFormSchema),
    defaultValues: formDefaultValues,
  });
  const calculatedDate = useMemo(() => {
    const value = form.watch("expirationDate");
    if (!value) return undefined;
    let date: Date;
    if (value instanceof Date) date = value;
    else date = new Date(value);

    if (todayDateNull && date.toDateString() === new Date().toDateString()) {
      return null;
    }
    return date;
  }, [todayDateNull, form.watch("expirationDate")]);
  const formValues = {
    ...form.watch(),
    quantity: +form.watch("quantity"),
    expirationDate: calculatedDate,
    // distNumber:
    //   getBarCodeData(form.watch("distNumber") ?? "").distNumber ||
    //   form.watch("distNumber"),
    // manufacturerDistNumber:
    //   getBarCodeData(form.watch("manufacturerDistNumber") ?? "")
    //     .manufacturerDistNumber || form.watch("manufacturerDistNumber"),
  };

  const { isPending, execute, error, isError } = useServerAction(
    validateDistNumberAction,
    {
      onError: ({ err }) => {
        toast.error(err.message);
      },
      onSuccess: ({ data }) => {
        addItemDataEntry(data as T);
        toast.success("Añadido correctamente");
        form.reset({
          ...formDefaultValues,
          distNumber: "",
          location: formValues.location,
          quantity:
            (itemType !== "S" && initialState?.quantity
              ? initialState?.quantity - currentQuantity - formValues.quantity
              : 1) || defaultQuantity,
        });
      },
    }
  );

  // 2. Define a submit handler.
  function onSubmit(values: ItemDataListFormT) {
    execute({
      itemType,
      itemData: {
        ...formValues,
        expirationDate: formValues.expirationDate
          ? new Date(formValues.expirationDate)
          : undefined,
      },
      validationOptions: {
        currentDistNumberList,
        listToCheck: validationOptions.listToCheck,
        itemId: validationOptions.itemId,
        serialExists: validationOptions.serialExists,
        batchExists: validationOptions.batchExists,
        maxQuantity: validationOptions.maxQuantity
          ? validationOptions.maxQuantity - currentQuantity
          : undefined,
        location:
          (fields?.location
            ? formValues.location
            : validationOptions.originLocation) ??
          validationOptions.originLocation,
      },
    });
    toast.dismiss();
  }
  const itemTypeLabel = getItemTypeLabel(itemType);
  const manufacturerItemTypeLabel = getItemTypeLabel(itemType, true);

  const triggerFormAndSetData = useCallback(async () => {
    const isFormValid = await form.trigger();
    if (isFormValid)
      setItemDataList([
        {
          distNumber: formValues.distNumber,
          manufacturerDistNumber: formValues.manufacturerDistNumber,
          quantity: formValues.quantity,
          location: formValues.location,
          expirationDate: formValues.expirationDate,
          expirationDateApproval: formValues.expirationDateApproval,
        },
      ] as T[]);
    else setItemDataList([]);
  }, [JSON.stringify(formValues)]);
  const debouncedTriggerFormAndSetData = useDebouncedCallback(
    triggerFormAndSetData,
    300
  );

  // Si solo hay que añadir uno, añadirlo a la lista de datos.
  useEffect(() => {
    if (uniqueItem) debouncedTriggerFormAndSetData();
  }, [
    JSON.stringify(formValues),
    // formValues.distNumber,
    // formValues.manufacturerDistNumber,
    // formValues.quantity,
    // formValues.location,
    // formValues.expirationDate,
    // formValues.expirationDateApproval,
  ]);

  useEffect(() => {
    if (
      fields.expirationDate &&
      formValues.expirationDate &&
      validationOptions.minExpirationDate
    ) {
      const isExpirationDateValid =
        formValues.expirationDate >= validationOptions.minExpirationDate;

      if (!isExpirationDateValid) setOpenExpirationDateDialog(true);
    }
  }, [formValues.expirationDate]);

  const [openExpirationDateDialog, setOpenExpirationDateDialog] =
    useState(false);

  const [isPendingStockSearch, startTransitionStockSearch] = useTransition();
  const searchParamsOptions = {
    shallow: false,
    startTransition: startTransitionStockSearch,
  };
  const [stockModalQueryData, setStockModalQueryData] = useQueryState(
    PARAMS.stockModal.queryData,
    parseAsStockQueryData.withOptions(searchParamsOptions)
  );
  const stockSearchMinLength = 2;

  const [barCode, setBarCode] = useState(formDefaultValues.barCode);
  const debouncedSetBarCode = useDebouncedCallback(setBarCode, 300);

  // READ BAR CODES
  const barCodeData = useMemo(() => getBarCodeData(barCode), [barCode]);
  const {
    data: stockData,
    execute: executeGetStock,
    isPending: isPendingGetStock,
  } = useServerAction(getStockItemsAction);
  const { data: stockItems } = stockData ?? {};
  const checkedItem =
    stockItems?.length && stockItems.length === 1 ? stockItems[0] : null;
  const checkedItemData = checkedItem?.itemDataList?.[0];

  useEffect(() => {
    if (!barCode) return;
    executeGetStock({ query: barCode });

    fields.distNumber && barCodeData.distNumber && itemType !== "N"
      ? form.setValue("distNumber", barCodeData.distNumber)
      : form.setValue("distNumber", "");

    fields.manufacturerDistNumber &&
    barCodeData.manufacturerDistNumber &&
    itemType !== "N"
      ? form.setValue(
          "manufacturerDistNumber",
          barCodeData.manufacturerDistNumber
        )
      : form.setValue("manufacturerDistNumber", "");

    fields.expirationDate && barCodeData.expirationDate
      ? form.setValue("expirationDate", barCodeData.expirationDate)
      : form.setValue("expirationDate", undefined);

    fields.quantity && barCodeData.quantity
      ? form.setValue("quantity", barCodeData.quantity)
      : form.setValue("quantity", 1);
  }, [barCode, JSON.stringify(fields)]);

  useEffect(() => {
    if (!barCode) return;

    if (checkedItem) {
      const { itemId } = checkedItem;
      itemId ? form.setValue("itemId", itemId) : form.setValue("itemId", "");
    }
    fields.location && checkedItemData?.location
      ? form.setValue("location", checkedItemData.location)
      : form.setValue("location", "");

    // fields.distNumber && checkedItemData?
    //   ? form.setValue("distNumber", checkedItemData?)
    //   : form.setValue("distNumber", "");
  }, [
    barCode,
    checkedItem?.itemId,
    checkedItemData?.location,
    JSON.stringify(fields),
  ]);
  // }, [barCode, JSON.stringify(checkedItem), JSON.stringify(checkedItemData), JSON.stringify(fields)]);

  return (
    <Form {...form}>
      <form
        onKeyDown={(e) => {
          if (e.key === "Enter" && uniqueItem) e.preventDefault();
        }}
        onSubmit={form.handleSubmit(onSubmit, (errors) =>
          console.log({ errors })
        )}
        className="flex w-full flex-col gap-4"
      >
        {fields.barCode && (
          <>
            <FormInput
              // isPending={isPendingGetStock}
              type="search"
              formControl={form.control}
              label={"Código de barras"}
              name="barCode"
              placeholder={`Introduce código de barras`}
              description={
                "(Opcional) Introducir primero y rellenar los campos que no se completen automáticamente"
              }
              descriptionClassName="text-notice"
              onInput={(e) => {
                const value = (e.target as HTMLInputElement).value;
                form.setValue("barCode", value);
                debouncedSetBarCode(value);
              }}
              isPending={isPendingGetStock}
              autoFocus
            />
            <hr className="w-full" />
          </>
        )}
        {fields.itemId && (
          <FormInput
            className="grow"
            formControl={form.control}
            label={"Código de artículo"}
            name="itemId"
            placeholder={`Introduce código de artículo`}
            description={fields.itemId === "optional" ? "(Opcional)" : ""}
            extra={
              showActions.showStock &&
              formValues.itemId && (
                <StockSearchButton
                  className="h-10 self-center"
                  size={"icon"}
                  onClick={() => {
                    if (formValues.itemId!.length > stockSearchMinLength) {
                      setStockModalQueryData({
                        filters: {
                          item: formValues.itemId,
                        },
                      });
                    }
                  }}
                />
              )
            }
          />
        )}
        {fields.distNumber && itemType !== "N" && (
          <FormInput
            formControl={form.control}
            label={`${itemTypeLabel}`}
            name="distNumber"
            placeholder={`Introduce ${itemTypeLabel.toLocaleLowerCase()}`}
            description={fields.distNumber === "optional" ? "(Opcional)" : ""}
            value={formValues.distNumber}
            extra={
              showActions.showStock &&
              formValues.distNumber &&
              formValues.distNumber.length > stockSearchMinLength && (
                <StockSearchButton
                  size={"icon"}
                  onClick={() =>
                    setStockModalQueryData({
                      filters: {
                        distNumber: formValues.distNumber,
                      },
                    })
                  }
                />
              )
            }
          />
        )}
        {fields.manufacturerDistNumber && itemType !== "N" && (
          <FormInput
            formControl={form.control}
            label={`${manufacturerItemTypeLabel} de Fabricante`}
            name="manufacturerDistNumber"
            placeholder={`Introduce ${manufacturerItemTypeLabel.toLocaleLowerCase()} de fabricante`}
            description={
              fields.manufacturerDistNumber === "optional" ? "(Opcional)" : ""
            }
            value={formValues.manufacturerDistNumber}
            extra={
              showActions.showStock &&
              formValues.manufacturerDistNumber &&
              formValues.manufacturerDistNumber.length >
                stockSearchMinLength && (
                <StockSearchButton
                  size={"icon"}
                  onClick={() =>
                    setStockModalQueryData({
                      filters: {
                        distNumber: formValues.manufacturerDistNumber,
                      },
                    })
                  }
                />
              )
            }
          />
        )}
        {fields.location && (
          <FormInput
            formControl={form.control}
            label="Ubicación de origen"
            name="location"
            placeholder="Introduce ubicación"
            description={fields.location === "optional" ? "(Opcional)" : ""}
            extra={
              showActions.showStock &&
              formValues.location &&
              formValues.location.length > stockSearchMinLength && (
                <StockSearchButton
                  size={"icon"}
                  onClick={() =>
                    setStockModalQueryData({
                      filters: {
                        location: formValues.location,
                      },
                    })
                  }
                />
              )
            }
          />
        )}
        {fields.quantity && itemType !== "S" && (
          <FormInput
            formControl={form.control}
            label="Cantidad"
            name="quantity"
            type="number"
            placeholder="Introduce cantidad"
          />
        )}
        {fields.expirationDate && (
          <>
            <FormDatePicker
              showPresets={false}
              form={form}
              label="Fecha de caducidad"
              name="expirationDate"
              description={
                fields.expirationDate === "optional" ? "(Opcional)" : ""
              }
            />
            {!formValues.expirationDateApproval && (
              <Badge variant="danger_fill" className="w-fit">
                No conforme
              </Badge>
            )}
          </>
        )}
        {/* //TODO mejorar reenderizados */}
        {/* {fields.expirationDate && (
          <FormDateTimePicker
            form={form}
            label="Fecha de caducidad"
            name="expirationDate"
            granularity="day"
            locale={es}
          />
        )} */}
        {!uniqueItem && (
          <div className="[>*:w-full] flex gap-2">
            <SubmitButton
              className="w-full"
              isPending={isPending}
              // disabled={isPending}
            >
              Añadir
              <TbPlaylistAdd className="size-5" />
            </SubmitButton>
            <Button
              onClick={clearItemDataList}
              className="w-full"
              type="button"
              disabled={isPending || !itemDataList.length}
            >
              Borrar lista
              <TbPlaylistX className="size-5" />
            </Button>
          </div>
        )}
      </form>
      {validationOptions.minExpirationDate && (
        <AppAlertDialog
          open={openExpirationDateDialog}
          title="Confirmar conformidad con la fecha"
          description={
            <>
              <span>
                Parece que la fecha de caducidad es menor a la fecha de
                caducidad aceptable, o el producto ya ha caducado.
              </span>
              <span>¿Estás conforme con la fecha?</span>
            </>
          }
          onActionClick={() => {
            form.setValue("expirationDateApproval", true);
            setOpenExpirationDateDialog(false);
          }}
          onCancelClick={() => {
            form.setValue("expirationDateApproval", false);
            setOpenExpirationDateDialog(false);
          }}
          actionButtonChildren={
            <>
              <span>Sí</span>
              <TbCheck className="size-5" />
            </>
          }
          cancelButtonChildren={
            <>
              <span>No</span>
              <TbX className="size-5" />
            </>
          }
        />
      )}

      {/* <pre>{JSON.stringify(itemDataList, null, 2)}</pre> */}
      {isError && <ErrorLabel>{error?.message}</ErrorLabel>}
      {!uniqueItem ? (
        itemDataList.length ? (
          <section className="flex w-full gap-2">
            {itemDataList.map((item, index) => (
              <ItemDataCard
                key={index}
                itemType={itemType}
                itemData={item}
                handleDelete={() => removeItemDataEntry(index)}
                className="flex"
              />
            ))}
          </section>
        ) : (
          <InfoLabel>Todavía no se han añadido elementos</InfoLabel>
        )
      ) : null}
    </Form>
  );
}
