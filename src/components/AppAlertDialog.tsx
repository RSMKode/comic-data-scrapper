"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/components.lib";
import * as React from "react";
import { MdOutlineCancel, MdSave } from "react-icons/md";

type AppAlertDialogProps = React.ComponentProps<typeof AlertDialog> & {
  open?: boolean;
  // setOpen?: (open: boolean) => void;
  trigger?: React.ReactNode;
  renderContent?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footerButtons?: React.ReactNode;
  footer?: React.ReactNode;
  onActionClick?: () => void;
  onCancelClick?: () => void;
  isActionDestructive?: boolean;
  isActionDisabled?: boolean;
  actionButtonChildren?: React.ReactNode;
  cancelButtonChildren?: React.ReactNode;
};

const AppAlertDialog = ({
  open,
  // setOpen,
  trigger,
  renderContent = true,
  title,
  description,
  header,
  body,
  footerButtons,
  footer,
  onActionClick,
  onCancelClick,
  isActionDestructive = false,
  isActionDisabled = false,
  actionButtonChildren,
  cancelButtonChildren,
  ...props
}: AppAlertDialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false);

  // const open =

  return (
    <AlertDialog open={open} {...props}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent className="max-h-[90dvh] max-w-[90dvw] overflow-y-auto sm:max-w-lg">
        <AlertDialogHeader>
          {title && (
            <AlertDialogTitle className="decoration-accent-primary flex items-center gap-x-2 underline underline-offset-4">
              {title}
            </AlertDialogTitle>
          )}
          {description && (
            <AlertDialogDescription className="flex flex-wrap items-center gap-1">
              {description}
            </AlertDialogDescription>
          )}
          {header && <div className="flex flex-col gap-2">{header}</div>}
        </AlertDialogHeader>
        {body && <div className="flex w-full flex-col gap-2">{body}</div>}
        <AlertDialogFooter className={cn("w-full")}>
          {footer && <div className="flex flex-col gap-2">{footer}</div>}
          <div className="flex w-full flex-col-reverse flex-wrap-reverse items-center justify-between gap-2 sm:flex-row-reverse">
            <div className="flex w-fit flex-wrap items-center gap-2">
              <AlertDialogCancel asChild>
                <Button className={cn("")} onClick={() => onCancelClick?.()}>
                  {cancelButtonChildren ?? (
                    <>
                      <span>Cancelar</span>
                      <MdOutlineCancel className="size-5" />
                    </>
                  )}
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction
                asChild
                isActionDestructive={isActionDestructive}
              >
                <Button
                  // variant={isActionDestructive ? "danger_fill" : "notice_fill"}
                  className={cn("")}
                  border={2}
                  onClick={() => onActionClick?.()}
                  disabled={isActionDisabled}
                >
                  {actionButtonChildren ?? (
                    <>
                      <span>Aceptar</span>
                      <MdSave className="size-5" />
                    </>
                  )}
                </Button>
              </AlertDialogAction>
            </div>
            {footerButtons}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { AppAlertDialog };
