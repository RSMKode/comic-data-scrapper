import { SessionUserT } from "@/app/(auth)/_core/auth.definitions";
import { APP_NAME, APP_SESSION_SECRET_KEY } from "@/config/env.config";
import { SessionOptions } from "iron-session";

export type SessionDataT = SessionUserT;

const SESSION_KEY = `${APP_NAME}_session`;
const ttl = 2147483647;

export const sessionOptions: SessionOptions = {
  password: APP_SESSION_SECRET_KEY,
  cookieName: SESSION_KEY,
  ttl,
  cookieOptions: {
    httpOnly: true,
    secure: false,
    maxAge: ttl - 60,
    path: "/",
  },
};
