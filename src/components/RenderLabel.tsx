import React, { ComponentProps } from "react"; // Ajusta la ruta según sea necesario
import { NotFoundError } from "@/lib/error";
import ErrorLabel from "./ErrorLabel";
import InfoLabel from "./InfoLabel";
import { normalizeString } from "@/lib/normalizer";
import SuccessLabel from "./SuccessLabel";

type RenderLabelProps = ComponentProps<"div"> & {
  data: string | Error;
};

export const RenderLabel: React.FC<RenderLabelProps> = ({ data, ...props }) => {
  console.log("RenderLabel", data, typeof data);
  if (typeof data === "string") return <SuccessLabel>{data}</SuccessLabel>;

  const isNotFoundError =
    normalizeString((data as Error).name).includes("notfound") ||
    data instanceof NotFoundError;

  const isError =
    normalizeString((data as Error).name).includes("error") ||
    data instanceof Error;

  const isSuccess = !isNotFoundError && !isError;

  const Comp = isNotFoundError ? InfoLabel : ErrorLabel;
  const message = typeof data === "string" ? data : data.message;
  return <Comp {...props}>{message}</Comp>;
};
