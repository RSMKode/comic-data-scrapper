import {
  DEFAULT_SEARCH_PARAMS_OPTIONS,
  PARAMS,
  SearchParamsOptionsT,
} from "@/config/params.config";
import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const messagesSearchParams = (options?: SearchParamsOptionsT) => {
  const newOptions = { ...DEFAULT_SEARCH_PARAMS_OPTIONS, ...options };
  return {
    [PARAMS.messages.success]: parseAsString
      .withDefault("")
      .withOptions(newOptions),
    [PARAMS.messages.info]: parseAsString
      .withDefault("")
      .withOptions(newOptions),
    [PARAMS.messages.warning]: parseAsString
      .withDefault("")
      .withOptions(newOptions),
    [PARAMS.messages.error]: parseAsString
      .withDefault("")
      .withOptions(newOptions),
  };
};

export const messagesSearchParamsCache = createSearchParamsCache(
  messagesSearchParams()
);
