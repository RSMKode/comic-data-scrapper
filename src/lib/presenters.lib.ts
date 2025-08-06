// PRESENTERS --------------------------------

export const capitalizeFirstLetterFromEachWord = (str: string | undefined) => {
  if (!str) return "";

  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function toSentenceCase(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

export const getInitialsFromName = (name: string, cap?: number) => {
  if (!name) return "";

  const initials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  if (cap) return initials.slice(0, cap);
  return initials;
};

export const renderNumber = (value: number) => {
  return value.toLocaleString("es");
};
