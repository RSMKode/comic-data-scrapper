import { EnvSchema, EnvT } from "../env.config";

/**
 * Valida las variables de entorno usando el esquema `EnvSchema`.
 * Si alguna variable es inválida o falta, detiene la ejecución de la app.
 */
export const validateEnv = () => {
  console.log("Validando variables de entorno...");
  const { success, error, data } = EnvSchema.safeParse(process.env);

  if (!success) {
    console.error("Error en las variables de entorno:", error.format());
    process.exit?.(1);
  }
  console.log("Variables de entorno validadas correctamente");
  return data;
};

/**
 * Genera una lista de orígenes permitidos combinando dominios y puertos a partir de las variables de entorno.
 */
export const getAllowedOrigins = (env: EnvT) => {
  const {
    APP_ORIGIN,
    APP_DOMAIN,
    APP_PORT,
    NGINX_PORT_HTTP,
    NGINX_PORT_HTTPS,
    ALLOWED_ORIGINS,
    ALLOWED_PORTS,
  } = env;

  const IPS = [
    "localhost",
    APP_ORIGIN,
    APP_DOMAIN,
    ...(ALLOWED_ORIGINS?.split(",") ?? []),
  ].filter(Boolean) as string[];

  const PORTS = [
    APP_PORT,
    NGINX_PORT_HTTP,
    NGINX_PORT_HTTPS,
    ...(ALLOWED_PORTS?.split(",") ?? []),
  ].filter(Boolean) as number[];

  const allowedOrigins = Array.from(
    new Set([
      ...IPS,
      ...IPS.flatMap((ip) => PORTS.map((port) => `${ip}:${port}`)),
    ])
  );
  console.log("allowedOrigins", allowedOrigins);
  return allowedOrigins;
};
