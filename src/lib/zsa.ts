import { getSessionUser } from "@/app/(auth)/actions";
import { createServerActionProcedure } from "zsa";

export const authedProcedure = createServerActionProcedure().handler(
  async () => {
    try {
      const sessionUser = await getSessionUser();
      if (!sessionUser) {
        throw new Error("Usuario no autenticado");
      }
      return { sessionUser };
    } catch {
      throw new Error("Usuario no autenticado");
    }
  }
);

import { ZSAError } from "zsa";
export function toZSAError(error: Error) {
  throw new ZSAError("ERROR", error.message);
}
