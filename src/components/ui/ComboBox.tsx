"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/components.lib";

import { useEffect, useRef, useState } from "react";
import Spinner from "../Spinner";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";

export type ComboboxOptionT = {
  value: string | number;
  label: string | number;
};

export interface ComboBoxProps {
  label: string;
  multiple?: boolean;
  options: ComboboxOptionT[];
  unavailableOptions?: ComboboxOptionT[];
  selected?: string | string[]; // Updated to handle multiple selections
  defaultSelected?: string | string[];
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  isPending?: boolean;
  onChange?: (fullValue: string | string[], currentValue?: string) => void; // Updated to handle multiple selections
  onUserSelect?: (fullValue: string | string[], currentValue?: string) => void;
  onCreate?: (value: string) => void;
  showSearch?: boolean;
}

export function ComboBox({
  label,
  options,
  unavailableOptions,
  selected,
  defaultSelected,
  className,
  placeholder,
  multiple = false,
  isPending,
  onChange,
  onUserSelect,
  onCreate,
  autoFocus,
  showSearch = true,
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [fieldValue, setFieldValue] = useState<string | string[]>(
    selected ?? defaultSelected ?? (multiple ? [] : "")
  );
  // const previousValue = useRef<string | string[]>(value);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (selected) {
      setFieldValue(selected);
    }
  }, [selected]);

  const updateFieldValue = (newValue: string, notifyChange = true) => {
    if (unavailableOptions?.find((option) => option.value === newValue)) return;

    let updatedValue;
    if (multiple && Array.isArray(fieldValue)) {
      if (fieldValue.includes(newValue)) {
        updatedValue = fieldValue.filter((item) => item !== newValue);
      } else {
        updatedValue = [...fieldValue, newValue];
      }
    } else {
      updatedValue = newValue === fieldValue ? "" : newValue;
      setOpen(false);
    }
    setFieldValue(updatedValue);
    if (notifyChange && onUserSelect) {
      onUserSelect(updatedValue, newValue);
    }
  };

  useEffect(() => {
    if (onChange)
      onChange(
        fieldValue,
        fieldValue === "" ? "" : fieldValue[fieldValue.length - 1]
      );
  }, [fieldValue]);

  const placeholderText =
    placeholder ?? `Selecciona ${label.toLocaleLowerCase()}`;

  //! REVISAR ESTO
  const fieldLabel =
    fieldValue &&
    fieldValue.length > 0 &&
    (multiple && Array.isArray(fieldValue)
      ? fieldValue
          .map(
            (value: string) =>
              options.find((item) => item.value === value)?.label
          )
          .join(", ")
      : !multiple && options.find((item) => item.value === fieldValue)?.label);

  console.log("ComboBox", { label, fieldValue, fieldLabel });

  return (
    // <div className={cn("block")}>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <Button
            autoFocus={autoFocus}
            key={"combobox-trigger"}
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between overflow-clip rounded-lg px-2 py-1 text-sm hover:border-accent-primary/80 hover:bg-background-shade hover:text-foreground active:scale-100 sm:py-2",
              (!fieldLabel || !fieldValue || fieldValue.length === 0) &&
                "text-muted-foreground",
              className,
            )}
          > */}
        <Button
          autoFocus={autoFocus}
          key={"combobox-trigger"}
          type="button"
          variant={"default"}
          role="combobox"
          aria-expanded={open}
          className={cn(
            "hover:border-accent-primary/80 hover:bg-background-shade hover:text-foreground justify-between overflow-clip rounded-lg px-2 py-1 text-sm active:scale-100 sm:py-2",
            (!fieldLabel || !fieldValue || fieldValue.length === 0) &&
              "text-muted-foreground",
            className
          )}
        >
          {/* {field.value
                    ? options.find(option => option.value === field.value)
                        ?.label
                    : `Selecciona ${label.toLocaleLowerCase()}`} */}
          <span className="overflow-hidden text-nowrap text-ellipsis">
            {fieldLabel || placeholderText}
          </span>
          {isPending ? (
            <Spinner className="size-4" />
          ) : (
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 max-w-sm p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command
          filter={(value, search) => {
            if (value.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
              return 1;
            return 0;
          }}
          // onValueChange={(value) => {
          //   onChange?.(value, );
          // }}
          // onInput={}
          // shouldFilter={true}
        >
          {showSearch && (
            <CommandInput
              className="truncate"
              placeholder={
                placeholder ?? `Buscar ${label?.toLocaleLowerCase()} ...`
              }
            />
          )}
          <CommandEmpty>
            No se ha encontrado {label?.toLocaleLowerCase()}
          </CommandEmpty>
          {/* <CommandEmpty
              onClick={() => {
                if (onCreate) {
                  onCreate(query);
                  setQuery('');
                }
              }}
              className="flex cursor-pointer items-center justify-center gap-1 italic">
              <p>Create: </p>
              <p className="block max-w-48 truncate font-semibold text-primary">
                {query}
              </p>
            </CommandEmpty> */}
          <ScrollArea>
            <div className="max-h-80">
              <CommandGroup>
                <CommandList>
                  {options.map((option) => (
                    <CommandItem
                      className={cn(
                        unavailableOptions?.find(
                          (uOption) => uOption.value === option.value
                        ) && "text-muted-foreground cursor-not-allowed"
                      )}
                      key={`${option.value}-${option.label}`}
                      value={option.label as string}
                      onSelect={(currentValue) => {
                        updateFieldValue(option.value as string);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4 shrink-0",
                          (
                            multiple
                              ? fieldValue?.includes(option.value as string)
                              : fieldValue === option.value
                          )
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </div>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
    // </div>
  );
}
