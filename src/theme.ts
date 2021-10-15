const spacingUnit = 8;

// adaptation of @material-ui/core's Spacing theme type
// (note that we're only accepting numbers for arguments and only returning strings)
interface Spacing {
  (): string;
  (value: number): string;
  (topBottom: number, rightLeft: number): string;
  (top: number, rightLeft: number, bottom: number): string;
  (top: number, right: number, bottom: number, left: number): string;
}

const spacing: Spacing = (...args: number[]) => {
  if (!args || args.length === 0) {
    return `${spacingUnit}px`;
  }
  return args
    .map((multiple) => (multiple === 0 ? "0" : `${multiple * spacingUnit}px`))
    .join(" ");
};

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
  midHighlight: "#4d4d5b",
  headerBackground: "#101014",
};

const typography = {
  pageHeading: {
    fontWeight: 600,
    fontSize: "96px",
    lineHeight: 1.25,
    textShadow: `${spacing(0.25)} ${spacing(0.5)} ${spacing(
      1
    )} rgba(0, 0, 0, 0.25)`,
  },
  operatorNameHeading: {
    fontSize: "36px",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  cardHeading: {
    fontSize: "24px",
    textTransform: "uppercase",
    fontWeight: 700,
    lineHeight: 1.25,
  },
  generalHeading: {
    fontSize: "24px",
    lineHeight: 1.25,
  },
  generalHeadingBold: {
    fontSize: "24px",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  skillTalentHeading: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  body: {
    fontSize: "18px",
    fontFamily: "Source Sans Pro",
    lineHeight: 1.5,
    fontWeight: 400,
  },
  body2: {
    fontSize: "14px",
    lineHeight: "24px",
  },
  smallPortraitRarity: {
    fontSize: "18px",
    lineHeight: 1.25,
    fontWeight: 700,
  },
  label1: {
    size: "12px",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  label2: {
    size: "14px",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  navigationLink: {
    lineHeight: 1.25,
  },
  navigationLinkBold: {
    fontWeight: 600,
  },
  operatorBrowserNameHeading: {
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1.25,
  },
};

export const breakpoints = {
  mobile: 700,
};

export const defaultTheme = {
  palette,
  typography,
  spacing,
  breakpoints: {
    down: (breakpoint: keyof typeof breakpoints): string =>
      `@media (max-width: ${breakpoints[breakpoint]}px)`,
    up: (breakpoint: keyof typeof breakpoints): string =>
      `@media (min-width: ${breakpoints[breakpoint]}px)`,
  },
  containerWidth: "1270px",
};
