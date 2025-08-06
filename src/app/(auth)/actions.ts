"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { z } from "zod";
import { createServerAction } from "zsa";
import { redirect, RedirectType } from "next/navigation";
import { SessionUserT } from "@/app/(auth)/_core/auth.definitions";
import { setFlashMessage } from "@/lib/cookies.lib";
import { ROUTES } from "@/config/routes.config";
import { SessionDataT, sessionOptions } from "@/lib/session";
import { checkTokenUseCase, loginUseCase } from "./_core/auth.use-case";

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionDataT>(
    cookieStore,
    sessionOptions
  );

  // TODO - Verificar el usuario en cada request

  return session;
}

export const getSessionUser =
  // cache(
  async () => {
    const session = await getSession();

    const sessionUser: SessionUserT = {
      ...session,
    };

    return sessionUser;
  };

export const loginAction = createServerAction()
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
      database: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const user = await loginUseCase(input);

    const session = await getSession();
    session.id = user.id;
    session.username = user.username;
    session.name = user.name;
    session.database = user.database;
    session.branch = user.branch;
    session.aisles = user.aisles;
    session.roles = user.roles;
    session.permissions = user.permissions;
    session.token = user.token;

    await session.save();

    const message = `Sesión iniciada correctamente. Bienvenido ${
      user.name || user.username
    }`;
    setFlashMessage({ type: "success", message });
    redirect(ROUTES.home.self.path);
  });

export const logoutAction = createServerAction().handler(async ({ ctx }) => {
  const session = await getSession();

  try {
    session.destroy();
  } catch (error) {
    console.error(error);
  } finally {
    (await cookies()).delete("session");
  }
  redirect(ROUTES.login.self.path, RedirectType.replace);
});

export const checkTokenAction = async (sessionUser: SessionUserT) => {
  let checkedToken;
  try {
    checkedToken = await checkTokenUseCase(sessionUser);
  } catch (error) {
    console.error(error);
  }
  if (!checkedToken) {
    redirect("/logout");
  }
};
