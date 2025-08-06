import { PARAMS } from "@/config/params.config";
import { redirect } from "next/navigation";

// SEARCH PARAMS ----------------------------------------------
export function linkWithParams(
  url: string,
  params: Record<string, string> | URLSearchParams,
  noError: boolean = false,
) {
  const urlSearchParams =
    params instanceof URLSearchParams ? params : new URLSearchParams(params);
  if (!noError) urlSearchParams.delete(PARAMS.messages.error);

  url.replace(/\?/g, "");
  const link = `${url}?${urlSearchParams.toString()}`;
  if (link.includes("?&")) return link.replace("?&", "?");
  // if (link.endsWith("?")) return link.slice(0, -1);
  if (link.endsWith("?")) return link.replace("?", "");
  console.log("link to redirect:", link);
  return link;
}

export function redirectWithParams(
  url: string,
  params: Record<string, string> | URLSearchParams,
) {
  const link = linkWithParams(url, params, true);
  return redirect(link );
}

export function redirectWithError(
  url: string,
  errorMessage: string,
  params?: Record<string, string> | URLSearchParams,
) {
  const urlSearchParams =
    params instanceof URLSearchParams ? params : new URLSearchParams(params);
  urlSearchParams.set(PARAMS.messages.error, errorMessage);
  return redirectWithParams(url, urlSearchParams);
}
export function redirectWithSuccess(
  url: string,
  successMessage: string,
  params?: URLSearchParams,
) {
  const urlSearchParams =
    params instanceof URLSearchParams ? params : new URLSearchParams(params);
  urlSearchParams.set(PARAMS.messages.success, successMessage);
  return redirectWithParams(url, urlSearchParams);
}

