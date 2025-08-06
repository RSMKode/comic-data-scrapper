const numberFormatter = new Intl.NumberFormat("es");

export const FORMATTER = {
  number: numberFormatter,
} as const;
