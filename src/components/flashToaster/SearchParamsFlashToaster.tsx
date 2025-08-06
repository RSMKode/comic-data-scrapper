"use client";
import { messagesSearchParams } from "@/app/_shared/main.search-params";
import { PARAMS } from "@/config/params.config";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryStates } from "nuqs";
import { useEffect } from "react";
import { toast } from "sonner";

export type FlashMessageT = {
  type: "success" | "error" | "info" | "warning";
  message: string;
  route?: string;
};

// export type SearchParamsFlashToasterProps = {};

/**
 * Detecta los mensajes en la URL, los muestra con `toast`, y luego elimina los parámetros automáticamente.
 *
 * @example
 * // URL: /form?successMessage=Guardado%20Correctamente
 * // -> Muestra un toast de éxito y elimina el parámetro
 *
 * @see {@link PARAMS.messages}
 * @see {@link messagesSearchParams}
 */
export default function SearchParamsFlashToaster() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryStateOptions = {
    shallow: false,
  };

  const [messages, setMessages] = useQueryStates(
    messagesSearchParams(queryStateOptions)
  );

  useEffect(() => {
    if (messages[PARAMS.messages.success]) {
      toast.success(messages[PARAMS.messages.success]);
      setMessages({ ...messages, [PARAMS.messages.success]: null });
    }
    if (messages[PARAMS.messages.info]) {
      toast.info(messages[PARAMS.messages.info]);
      setMessages({ ...messages, [PARAMS.messages.info]: null });
    }
    if (messages[PARAMS.messages.error]) {
      toast.error(messages[PARAMS.messages.error]);
      setMessages({ ...messages, [PARAMS.messages.error]: null });
    }
  }, [messages]);

  return null;
}
