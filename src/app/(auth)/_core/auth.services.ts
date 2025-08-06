import { API_BASE_URL } from "@/config/env.config";
import { callApi } from "@/lib/call-api";
import { handleResponseError } from "@/lib/error";
import {
  ApiSessionUserT,
  DatabaseT,
  sessionUserAdapter,
  SessionUserT,
} from "./auth.definitions";
import { LogInFormT } from "../login/_components/LogInForm";

export const getDB = async () => {
  const urlSufix = `/Autentificacion/BasesDatos`;
  const apiUrl = API_BASE_URL + urlSufix;

  const response = await callApi<DatabaseT[]>(apiUrl, "GET");
  console.log(response);

  handleResponseError(response);

  return {
    ...response,
    databases: response.data,
    data: undefined,
  };
};

export const login = async (input: LogInFormT) => {
  const { username, password, database } = input;
  const urlSufix = `/Autentificacion/Login`;
  const apiUrl = API_BASE_URL + urlSufix;

  console.log({ apiUrl });

  const apiCallData = {
    username,
    password,
    database,
  };

  const response = await callApi<ApiSessionUserT>(apiUrl, "POST", {
    data: apiCallData,
  });

  handleResponseError(response);

  const { result, message, data } = response;
  const sessionUser = sessionUserAdapter(data);

  return {
    result,
    message,
    sessionUser,
  };
};

export const checkToken = async (sessionUser: SessionUserT) => {
  const params = new URLSearchParams({});
  const urlSufix = `/Autentificacion/Comprobar?${params.toString()}`;
  const apiUrl = API_BASE_URL + urlSufix;

  const response = await callApi<string>(apiUrl, "GET", {
    authToken: sessionUser.token,
  });

  if (response.result.startsWith("4") || response.result.startsWith("5")) {
    return false;
  }

  if (response.result === "204") {
    return false;
  }

  return true;
};
