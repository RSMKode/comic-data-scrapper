import { FlashMessageT } from "@/components/flashToaster/CookieFlashToaster";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { parse, stringify } from "superjson";
import { setCookie } from "cookies-next";
import { COOKIES } from "@/config/cookies.config";

/**
 * Serializa un objeto JSON en una cadena para almacenarlo como cookie.
 *
 * @template T - Tipo genérico del objeto a serializar.
 * @param  json - Objeto que se desea serializar.
 * @returns Cadena serializada en formato JSON
 */
export const serializeJSONCookie = <T = unknown>(json: T) => {
  const serialized = stringify(json);
  console.log({ serialized });
  return serialized;
};

/**
 * Parsea una cadena JSON (de una cookie) a su valor original
 * @template T - Tipo esperado del objeto parseado.
 * @param cookie - Cadena JSON proveniente de una cookie.
 * @returns Objeto parseado si existe, o `null` si la entrada es inválida
 */
export const parseJSONCookie = <T = unknown>(
  cookie: string | null | undefined
) => {
  const parsed = cookie ? parse<T>(cookie) : null;
  console.log({ parsed });
  return parsed;
};

/**
 * Establece un mensaje flash en las cookies del usuario.
 *
 * @param flashMessage - El mensaje flash que se desea guardar.
 * @param options - Opcionalmente, función para acceder a las cookies.
 * @see {@link COOKIES}
 */
export const setFlashMessage = (
  flashMessage: FlashMessageT,
  options?: { cookies: () => Promise<ReadonlyRequestCookies> }
) => {
  const { cookies } = options || {};
  const serializedFlashMessage = serializeJSONCookie(flashMessage);
  setCookie(COOKIES.flashMessage, serializedFlashMessage, { cookies });
};
