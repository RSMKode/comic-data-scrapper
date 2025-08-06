"use client";
import { PARAMS } from "@/config/params.config";
import { cn } from "@/lib/components.lib";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useTransition } from "react";
import {
  TbLayoutGrid,
  TbStack2
} from "react-icons/tb";
import Spinner from "./Spinner";
import { Button } from "./ui/button";

type GroupedToggleProps = {
  defaultChecked?: boolean;
  label?: string;
  className?: string;
};
export default function GroupedToggle({
  defaultChecked = true,
  label,
  className,
}: GroupedToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [grouped, setGrouped] = useQueryState(
    PARAMS.grouped,
    parseAsBoolean
      .withOptions({
        shallow: false,
        startTransition,
      })
      .withDefault(defaultChecked)
  );

  return (
    <Button
      type="button"
      border={2}
      variant={grouped ? "notice_fill" : "default"}
      onClick={() => setGrouped(!grouped)}
      className={cn("", className)}
    >
      <span>
        {grouped ? "Desagrupar" : "Agrupar"} {label?.toLocaleLowerCase()}
      </span>
      {!isPending && !grouped && (
        <TbStack2 className={cn("size-5")} />
        // <TbTemplate className={cn('size-5')} />
      )}
      {!isPending && grouped && (
        <TbLayoutGrid className={cn("size-5")} />
        // <TbTemplateOff className={cn('size-5')} />
      )}
      {isPending && <Spinner className={cn("size-5")} />}
    </Button>
  );
}
