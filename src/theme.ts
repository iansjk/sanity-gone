const palette = {
  white: "#d6d6e2",
  gray: "#87879b",
  lime: "#a7e855",
  blue: "#49b3ff",
  softBlue: "#7f7dea",
  yellow: "#ffcf53",
  orange: "#fa773f",
  red: "#fb4040",
  pink: "#e85593",
  background: "#14141b",
  mid: "#1e1e26",
  midBackground: "#191920",
  midHighlight: "#4d4d5b",
  headerBackground: "#101014"
};

const typography = {
  body: {
    family: "Source Sans Pro, sans-serif",
    size: 18
  }
};

const spacingUnit = 8;

export const defaultTheme = {
  palette,
  typography,
  spacing: (multiple: number) => `${spacingUnit * multiple}px`,
};
