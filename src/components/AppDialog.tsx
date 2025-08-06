"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/components.lib";

type AppDialogProps = React.ComponentProps<typeof Dialog> & {
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
  onInteractOutside?: () => void;
};

const AppDialog = ({
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
  onInteractOutside,
  ...props
}: AppDialogProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false);

  // const open =

  return (
    <Dialog open={open} {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className="max-h-[90dvh] max-w-[90dvw] overflow-y-auto md:max-w-[80dvw] border-accent-primary"
        onInteractOutside={onInteractOutside}
        // specialOverlay
      >
        <DialogHeader>
          {title && (
            <DialogTitle className="decoration-accent-primary flex items-center gap-x-2 underline underline-offset-4">
              {title}
            </DialogTitle>
          )}
          {description && <DialogDescription>{description}</DialogDescription>}
          {header && <div className="flex w-full flex-col gap-2">{header}</div>}
        </DialogHeader>
        {body && (
          <div className="flex w-full flex-col items-center gap-2 overflow-auto">{body}</div>
        )}
        <DialogFooter className={cn("w-full")}>
          {footer && <div className="flex flex-col gap-2">{footer}</div>}
          <div className="flex w-full flex-col-reverse flex-wrap-reverse items-center justify-between gap-2 sm:flex-row-reverse">
            {footerButtons}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AppDialog };
