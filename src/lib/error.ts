import { ApiResponseT } from "./call-api";

export const AUTHENTICATION_ERROR_MESSAGE =
  "Tienes que iniciar sesión para ver esta página";

export const AuthenticationError = class AuthenticationError extends Error {
  constructor(message?: string) {
    super(message ?? AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
};

export const AUTHORIZATION_ERROR_MESSAGE = "No tienes permisos";
export const AuthorizationError = class AuthorizationError extends Error {
  constructor(message?: string) {
    super(message ?? AUTHORIZATION_ERROR_MESSAGE);
    this.name = "AuthorizationError";
  }
};

export const NOT_FOUND_ERROR_MESSAGE = "No se ha encontrado el recurso";
export const NotFoundError = class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? NOT_FOUND_ERROR_MESSAGE);
    this.name = "NotFoundError";
  }
};

export const handleAsync = async <T>(
  callback: () => Promise<T>
): Promise<[T | null, Error | null]> => {
  try {
    const data = await callback();
    return [data, null];
  } catch (err) {
    return [null, err as Error];
  }
};

export const handleResponseError = (
  response: ApiResponseT,
  options?: {
    authentication?: boolean;
    authorization?: boolean;
    notFound?: boolean;
    dataNull: boolean;
  }
): void => {
  const {
    authentication = true,
    authorization = true,
    notFound = true,
    dataNull = false,
  } = options ?? {};

  if (authentication && response.result === "401") {
    throw new AuthenticationError(`${response.message}`);
  }
  if (authorization && response.result === "403") {
    throw new AuthorizationError(`${response.message}`);
  }
  if (response.result.startsWith("4") || response.result.startsWith("5")) {
    throw new Error(`${response.message}`);
  }
  if (notFound && response.result === "204") {
    throw new NotFoundError(`${response.message}`);
  }
  if (dataNull && response.data === null) {
    throw new Error(`${response.message}`);
  }
};
