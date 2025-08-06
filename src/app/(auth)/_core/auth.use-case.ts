import { LogInFormT } from "../login/_components/LogInForm";
import { SessionUserT } from "./auth.definitions";
import { checkToken, getDB, login } from "./auth.services";

export const getDBUseCase = async () => {
  return await getDB();
};

export const loginUseCase = async (input: LogInFormT) => {
  const { sessionUser } = await login(input);
  return sessionUser;
};

export const checkTokenUseCase = async (sessionUser: SessionUserT) => {
  return await checkToken(sessionUser);
};
