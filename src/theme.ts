const palette = {
  white: "#d6d6e2",
  gray: "#87879b",
  lime: "#a7e855",
  blue: "#49b3ff",
  softBlue: "#7f7dea",
  yellow: "#ffcf53",
  orange: "#f98d3f",
  red: "#fb4040",
  pink: "#e85593",
  background: "#14141b",
  mid: "#1e1e26",
  midRarity: "#1b1b22",
  midBackground: "#191920",
  midHighlight: "#4d4d5b",
  headerBackground: "#101014",
};  

const typography = {
  body: {
    family: "Source Sans Pro, sans-serif",
    size: 18,
    lineHeight: 1.5,
  },
  highlight: {
    weight: 600,
  },
  link: {
    fontStyle: "italic",
    textDecoration: "underline",
  },
  header: {
    size: 36,
    weight: 600,
  },
  header2: {
    size: 36,
  },
  cardHeader: {
    size: 24,
    textTransform: "uppercase",
    fontVariant: "small-caps",
    weight: 600,
  },
  subtitle: {
    size: 14,
  }
};

const spacingUnit = 8;

export const defaultTheme = {
  palette,
  typography,
  spacing: (multiple: number) => `${spacingUnit * multiple}px`,
};
