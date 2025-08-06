//Gestionar y validar variables de entorno
import { z } from "zod";

//valores por defecto
export const DEFAULT_ENV = {
  APP_ENV: "testing",
  APP_NAME: "app-name",
  APP_LABEL: "App label",
  APP_DESCRIPTION: "App description",
  APP_ORIGIN: "http://localhost",
  API_URL: "http://localhost:3000",
  API_TOKEN_TEST: "",
  APP_PORT: 50010,
  NGINX_PORT_HTTP: 50011,
  NGINX_PORT_HTTPS: 50012,
} as const;

//esquema para validar las variables de entorno
export const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "tets", "production"])
    .default("development"),
  API_URL: z.string().trim().url().default(DEFAULT_ENV.API_URL),
  API_TOKEN_TEST: z.string().trim().default(DEFAULT_ENV.API_TOKEN_TEST),
  APP_SESSION_SECRET_KEY: z.string().trim(),
  APP_ENV: z.string().trim().default(DEFAULT_ENV.APP_ENV),
  APP_NAME: z.string().trim(),
  APP_LABEL: z.string().trim(),
  APP_DESCRIPTION: z.string().trim().optional(),
  APP_ORIGIN: z.string().trim(),
  APP_DOMAIN: z.string().trim().optional(),
  APP_PORT: z.coerce.number().default(DEFAULT_ENV.APP_PORT),
  NGINX_PORT_HTTP: z.coerce.number().default(DEFAULT_ENV.NGINX_PORT_HTTP),
  NGINX_PORT_HTTPS: z.coerce.number().default(DEFAULT_ENV.NGINX_PORT_HTTPS),
  ALLOWED_ORIGINS: z.string().trim(),
  ALLOWED_PORTS: z.string().trim(),
  // PUBLIC
  NEXT_PUBLIC_APP_NAME: z.string().trim(),
  NEXT_PUBLIC_APP_LABEL: z.string().trim(),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().trim(),
});

export type EnvT = z.infer<typeof EnvSchema>;

//exportacion de variables de entorno
export const {
  API_URL: API_BASE_URL,
  API_TOKEN_TEST,
  APP_SESSION_SECRET_KEY,
  APP_ENV,
  APP_PORT,
  APP_ORIGIN,
  APP_DOMAIN,
  NGINX_PORT_HTTP,
  NGINX_PORT_HTTPS,
  ALLOWED_ORIGINS,
  ALLOWED_PORTS,
} = process.env as unknown as EnvT;

//! En tiempo de build, se transforman a valores de string hardcoded, si se usa "const env = process.env" no funciona

export const APP_LABEL = process.env.NEXT_PUBLIC_APP_LABEL;
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION;
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEV = NODE_ENV === "development";
export const IS_TEST = NODE_ENV === "test";
export const IS_PROD = NODE_ENV === "production";
