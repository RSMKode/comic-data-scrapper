"use client";
import { deleteCookie } from "cookies-next";
import { useEffect } from "react";

type DeleteCookiesProps = {
  cookies: string[];
};

export default function DeleteCookies({ cookies }: DeleteCookiesProps) {
  useEffect(() => {
    cookies.forEach((cookie) => {
      console.log("Borrando la cookie", cookie);
      deleteCookie(cookie);
    });
  }, [cookies]);
  return null;
}
