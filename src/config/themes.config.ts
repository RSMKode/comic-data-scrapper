export type LightDarkThemeT = "light" | "dark";

export type ColorThemeT =
  | "color-theme-base"
  | "color-theme-blue"
  | "color-theme-orange"
  | "color-theme-magenta"
  | "color-theme-turquoise"
  | "color-theme-green"
  | "color-theme-purple"
  | "color-theme-dark-blue"
  | "color-theme-red"
  | "color-theme-yellow"
  | "color-theme-sipel";

export const LIGHT_DARK_THEMES: {
  [key: string]: LightDarkThemeT;
} = {
  light: "light",
  dark: "dark",
};

export const DEFAULT_COLOR_THEME: ColorThemeT = "color-theme-turquoise";

export const COLOR_THEMES: {
  label: string;
  className: ColorThemeT;
  color1: string;
  color2?: string;
}[] = [
  {
    label: "Base",
    className: "color-theme-base",
    color1: "hsl(220 32.6% 40%)",
  },
  {
    label: "Sipel",
    className: "color-theme-sipel",
    color1: "#c21b53", //! CAMBIAR EL COLOR PARA EL TEMA DE SIPEL.
  },
  {
    label: "Azul",
    className: "color-theme-blue",
    color1: "#449ff4",
    // color2: '#e09706',
  },
  {
    label: "Naranja",
    className: "color-theme-orange",
    color1: "#e09706",
    // color2: '#449ff4',
  },
  {
    label: "Magenta",
    className: "color-theme-magenta",
    color1: "#c21b53",
    // color2: '#1ac1ae',
  },
  {
    label: "Turquesa",
    className: "color-theme-turquoise",
    color1: "#1ac1ae",
    // color2: '#ee3f68',
  },
  {
    label: "Verde",
    className: "color-theme-green",
    color1: "#1cba86",
    // color2: '#ee3f68',
  },
  {
    label: "Purpura",
    className: "color-theme-purple",
    color1: "#a14591",
  },
  {
    label: "Azul Oscuro",
    className: "color-theme-dark-blue",
    color1: "#334ccc",
  },
  {
    label: "Rojo",
    // label: 'ESPAÑA',
    className: "color-theme-red",
    color1: "#a51818",
    // color2: '#e5c038',
  },
  {
    label: "Amarillo",
    className: "color-theme-yellow",
    color1: "#e5c038",
    // color2: '#a51818',
  },
];

export const SHIMMER_CLASS =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-linear-to-r before:from-transparent before:via-white dark:before:via-foreground/30 before:to-transparent";

export const APP_MAX_WIDTH = "max-w-3xl";
