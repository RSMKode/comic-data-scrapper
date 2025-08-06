// NORMALIZER

export const normalizeString = (
  text: string,
  options?: {
    ignoreCase?: boolean;
    ignoreAccents?: boolean;
  }
): string => {
  const { ignoreCase = true, ignoreAccents = false } = options || {};

  let normalizedText = text;
  if (ignoreCase) normalizedText = normalizedText.toLowerCase();
  if (ignoreAccents)
    normalizedText = normalizedText
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  return normalizedText;
};

export const normalizeNumber = (
  value: number | string,
  options?: {
    fixedDecimals?: number | false;
  }
) => {
  const { fixedDecimals = 2 } = options || {};
  let parsedValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(parsedValue)) {
    return 0;
  }
  if (fixedDecimals !== false) {
    // parsedValue = Math.round(parsedValue);
    parsedValue = parseFloat(parsedValue.toFixed(fixedDecimals));
  }
  return parsedValue;
};

export const normalizeDate = (date: Date) => {
  // Para ignorar la zona horaria y que no devuelva un dia menos

  const normalizedDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // normalizedDate.setUTCHours(0, 0, 0, 0);

  return normalizedDate;
};
