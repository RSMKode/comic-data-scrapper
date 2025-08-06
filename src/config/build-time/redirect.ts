import { Redirect } from "next/dist/lib/load-custom-routes";

export type NextConfigRedirectT = {
  source: string;
  destination: string;
  permanent: boolean;
};

export const getAppRedirects = (): Redirect[] => {
  return [
    {
      source: "/",
      destination: "/dashboard",
      permanent: true,
    },
    {
      source: "/sga/inventory/manual-entries",
      destination: "/sga/inventory/manual-entries/check",
      permanent: true,
    },
    {
      source: "/sga/relocation/direct",
      destination: "/sga/relocation/direct/check",
      permanent: true,
    },
    {
      source: "/sga/relocation/direct",
      destination: "/sga/relocation/direct/check",
      permanent: true,
    },
  ];
};
