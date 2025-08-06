"use client";
import { COOKIES } from "@/config/cookies.config";
import { parseJSONCookie } from "@/lib/cookies.lib";
import { deleteCookie, getCookie } from "cookies-next/client";
import { useEffect } from "react";
import { toast } from "sonner";
import z from "zod";

export const FlashMessageSchema = z.object({
  type: z.enum(["success", "info", "warning", "error"]),
  message: z.string(),
  route: z.string().optional(),
});

export type FlashMessageT = z.infer<typeof FlashMessageSchema>;

/**
 * @deprecated Usa {@link SearchParamsFlashToaster} en su lugar.
 * Función que lee un mensaje flash desde las cookies, lo muestra como un toast y elimina la cookie después de mostrarlo.
 *
 * @example
 * // Se puede usan en el layout o en el root de la aplicación
 * <CookieFlashToaster />
 *
 * @see {@link setFlashMessage} - Función usada para establecer el mensaje flash.
 * @see {@link COOKIES.flashMessage} - Clave de la cookie que contiene el mensaje flash.
 */
export default function CookieFlashToaster() {
  const flashMessage = parseJSONCookie<FlashMessageT>(
    getCookie(COOKIES.flashMessage)
  );

  useEffect(() => {
    if (flashMessage) {
      console.log({ flashMessage });
      const { type, message } = flashMessage;
      if (!type || !message) {
        console.error("Invalid flash message", flashMessage);
        return;
      }

      toast[type](message);
      deleteCookie(COOKIES.flashMessage);
    }
  }, [flashMessage]);
  return null;
}
