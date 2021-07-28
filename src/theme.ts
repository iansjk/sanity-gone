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
  pageHeading: {
    weight: 600,
    size: "96px",
    lineHeight: 1.25,
  },
  operatorNameHeading: {
    size: "36px",
    weight: 600,
    lineHeight: 1.25,
  },
  cardHeading: {
    size: "24px",
    textTransform: "uppercase",
    fontVariant: "small-caps",
    weight: 600,
  },
  generalHeading: {
    size: "24px",
    lineHeight: 1.25,
  },
  generalHeadingBold: {
    size: "24px",
    weight: 600,
    lineHeight: 1.25,
  },
  skillTalentHeading: {
    size: "18px",
    weight: 600,
    lineHeight: 1.25,
  },
  body: {
    size: "18px",
    family: "Source Sans Pro, sans-serif",
    lineHeight: 1.5,
  },
  body2: {
    size: "14px",
  },
  link: {
    fontStyle: "italic",
    textDecoration: "underline",
  },
  smallPortraitRarity: {
    size: "18px",
    lineHeight: 1.25,
    fontWeight: 700,
  }
};

const spacingUnit = 8;

export const defaultTheme = {
  palette,
  typography,
  spacing: (multiple: number) => `${spacingUnit * multiple}px`,
};
