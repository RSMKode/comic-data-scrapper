"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/components.lib";
import { IoTrashBin } from "react-icons/io5";
import { AppAlertDialog } from "./AppAlertDialog";
import { TbTrash, TbX } from "react-icons/tb";

export type DeleteButtonProps = ButtonProps & {
  label?: string;
  handleDelete?: () => void;
  askConfirmation?: boolean;
};
const DeleteButton = ({
  className,
  label,
  tooltip,
  children,
  // onClick,
  handleDelete,
  askConfirmation = false,
  ...props
}: DeleteButtonProps) => {
  const title = tooltip || label
  const description = "Confirmar eliminación"

  return (
    <AppAlertDialog
      isActionDestructive={true}
      onActionClick={handleDelete}
      title={title}
      description={description}
      actionButtonChildren={
        <>
          <span>Confirmar</span>
          <TbTrash />
        </>
      }
      trigger={
        <Button
          // title={props.title || label || "Eliminar"}
          aria-label={props["aria-label"] || tooltip || "Eliminar"}
          tooltip={tooltip || "Eliminar"}
          className={cn(
            "border-2 border-danger bg-danger/20 font-semibold text-danger hover:bg-danger hover:text-danger-foreground",
            className,
          )}
          size={props.size || "icon"}
          onClick={(e) => {
            if (!askConfirmation) {
              e.preventDefault();
              // e.stopPropagation();
              // e.nativeEvent.stopImmediatePropagation();
              handleDelete?.();
            }
          }}
          {...props}
        >
          {children ? children : <IoTrashBin className="size-4" />}
        </Button>
      }
    />
  );
};
DeleteButton.displayName = "DeleteButton";
export { DeleteButton };
