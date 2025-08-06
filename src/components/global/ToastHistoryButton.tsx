"use client";

import { APP_NAME, IS_DEV } from "@/config/env.config";
import { cn } from "@/lib/components.lib";
import { getCookie, setCookie } from "cookies-next/client";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  TbNotification,
  TbTrash
} from "react-icons/tb";
import { toast, useSonner } from "sonner";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { parseJSONCookie, serializeJSONCookie } from "@/lib/cookies.lib";
import { getPathnameData } from "@/lib/pathname";
import { ExtendedToastT } from "@/lib/toast.lib";
import { flashMessageTestAction } from "../flashToaster/actions";
import InfoLabel from "../InfoLabel";
import { Badge } from "../ui/badge";

export type ToastHistoryButtonProps = React.ComponentProps<typeof Button> & {};

export const ToastHistoryButton = ({
  className,
  children,
  onClick,
  variant,
  size,
  tooltip,
  ...props
}: ToastHistoryButtonProps) => {
  const APP_TOAST_LABEL = `${APP_NAME}-toastHistory`;
  const pathname = usePathname();

  //? _toasts necesario para que se actualice currentToastHistory
  const { toasts } = useSonner();
  const currentToastHistory = toast.getHistory();

  const [toastHistory, setToastHistory] = React.useState<ExtendedToastT[]>([]);
  const updateToastHistory = (
    updaterOrValue: React.SetStateAction<ExtendedToastT[]>
  ) => {
    setToastHistory(updaterOrValue);
  };
  console.log({ currentToastHistory, toastHistory });

  React.useEffect(() => {
    const persistedToastHistory = parseJSONCookie<ExtendedToastT[]>(
      getCookie(APP_TOAST_LABEL) as string
    );
    console.log({ persistedToastHistory });
    if (persistedToastHistory && persistedToastHistory?.length > 0) {
      setToastHistory(persistedToastHistory);
    }
  }, []);
  React.useEffect(() => {
    const maxValues = 20;
    const valuesToPersist = toastHistory.slice(-maxValues);

    setCookie(APP_TOAST_LABEL, serializeJSONCookie(valuesToPersist));
  }, [toastHistory]);

  React.useEffect(() => {
    const toastToAdd = currentToastHistory[currentToastHistory.length - 1];

    if (toastToAdd) {
      updateToastHistory((prev) => [
        ...prev,
        { ...toastToAdd, pathname: pathname },
      ]);
    }
  }, [currentToastHistory]);

  const title = "Historial de notificaciones";
  const description = "Historial de notificaciones de la aplicación";

  const testButton = (
    <Button
      onClick={() => {
        const random = Math.round(Math.random());

        if (random === 0) {
          toast.success("¡Éxito! Notificación de éxito");
        } else if (random === 1) {
          toast.error("¡Error! Notificación de error");
        }
      }}
    >
      Toast
    </Button>
  );

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            {...props}
            tooltip={tooltip || title}
            className={cn("", className)}
          >
            <TbNotification className={cn("size-4 sm:size-5")} />
            {children}
          </Button>
        </SheetTrigger>
        <SheetContent className="gap-2 bg-background/50 backdrop-blur-sm">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className="sr-only">
              {description}
            </SheetDescription>
          </SheetHeader>

          <div className="my-2 flex h-[90%] flex-col gap-1 overflow-y-auto">
            {toastHistory.length ? (
              toastHistory.toReversed().map((toastItem, index) => {
                return <ToastCard key={index} {...toastItem} />;
              })
            ) : (
              <InfoLabel>Todavía no hay notificaciones</InfoLabel>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={"danger_fill"}
              onClick={() => {
                toast.dismiss();
                updateToastHistory([]);
              }}
            >
              Borrar historial <TbTrash />
            </Button>
            {IS_DEV && testButton}
            {IS_DEV && <Button onClick={flashMessageTestAction}>Flash</Button>}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export const ToastCard = (toastItem: ExtendedToastT) => {
  const { id, title, type, duration, pathname } = toastItem as ExtendedToastT;
  const resolvedTitle = typeof title === "function" ? title() : title;
  const { parsedPathname } = pathname ? getPathnameData(pathname) : {};

  return (
    <Badge
      className="group flex flex-col text-center"
      variant={
        type === "success"
          ? "success_fill"
          : type === "error"
          ? "danger_fill"
          : type === "warning"
          ? "warning_fill"
          : type === "info"
          ? "notice_fill"
          : "default"
      }
    >
      {resolvedTitle}
      {parsedPathname && (
        <span className="text-xs font-normal text-foreground/40 group-hover:text-foreground/75">
          {parsedPathname}
        </span>
      )}
    </Badge>
    // <>{title}</>
  );
};
