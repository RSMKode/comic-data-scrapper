"use server";

import { parseJSONCookie } from "@/lib/cookies.lib";
import { authedProcedure } from "@/lib/zsa";
import { getCookie, setCookie } from "cookies-next";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { createServerAction } from "zsa";
import {
  ValidateDistNumberOptionsSchema,
  ValidateDistNumberPropsSchema,
  validateDistNumberUseCase,
} from "./dist-number.use-cases";

export const validateDistNumberAction = authedProcedure
  .createServerAction()
  .input(ValidateDistNumberPropsSchema)
  .handler(async ({ input, ctx }) => {
    const { sessionUser } = ctx;
    const { itemType, itemData, validationOptions } = input;
    if (!itemData.expirationDateApproval)
      throw new Error("Debe aportar conformidad de la fecha de caducidad");

    const validateDistNumber = await validateDistNumberUseCase(sessionUser, {
      itemType,
      itemData,
      validationOptions,
    });
    if (validateDistNumber) return itemData;
  });

export const consoleLogAction = createServerAction()
  .input(z.any())
  .handler(async ({ input }) => {
    console.log(input);
    return true;
  });

export const consoleLogCookieAction = createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    const cookie = parseJSONCookie(await getCookie(input, { cookies }));
    console.log(cookie);
    return true;
  });
