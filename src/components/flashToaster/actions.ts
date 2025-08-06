"use server";

import { setCookie } from "cookies-next";
import { FlashMessageT } from "./CookieFlashToaster";
import { COOKIES } from "@/config/cookies.config";
import { serializeJSONCookie } from "@/lib/cookies.lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/routes.config";

export const flashMessageTestAction = async () => {
  console.log("Flash message test action");

  const flashMessages: FlashMessageT[] = [
    {
      type: "success",
      message: "Flash message test",
    },
    {
      type: "error",
      message: "Flash message test",
    },
    {
      type: "info",
      message: "Flash message test",
    },
    {
      type: "warning",
      message: "Flash message test",
    },
  ];

  setCookie(COOKIES.flashMessage, serializeJSONCookie(flashMessages[0]), {
    cookies,
  });

  redirect(ROUTES.home.self.path);
};
