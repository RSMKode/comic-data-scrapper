import { TransitionStartFunction } from "react";

export type SearchParamsOptionsT = {
  history?: "push" | "replace";
  scroll?: boolean;
  shallow?: boolean;
  throttleMs?: number;
  startTransition?: TransitionStartFunction;
  // startTransition?: (callback: () => void | {} | Promise<void | {}>) => void
  clearOnDefault?: boolean;
};

export const DEFAULT_SEARCH_PARAMS_OPTIONS = {
  shallow: false,
};

export const PARAMS = {
  messages: {
    self: "messages",
    success: "successMessage",
    warning: "warningMessage",
    info: "infoMessage",
    error: "errorMessage",
  },
  stock: {
    queryData: "stockQueryData",
  },
  stockModal: {
    queryData: "stockModalQueryData",
  },
  query: "query",
  grouped: "grouped",
  sga: {
    reception: {
      pallets: {
        self: "receptionPalletsFilter",
        filters: {
          showDetails: {
            self: "details",
          },
        },
      },
    },
    relocation: {
      self: "relocationFilter",
      direct: {},
      transferRequest: {
        filter: "relocationTrasnferRequestsFilter",
      },
    },
  },
  location: {
    self: "location",
    origin: "originLocation",
    destination: "destinationLocation",
  },
} as const;
