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
  // accent colors
  lime: "#a7e855",
  blue: "#49b3ff",
  softBlue: "#7f7dea",
  yellow: "#ffcf53",
  orange: "#f98d3f",
  red: "#fb4040",
  pink: "#e85593",

  // main palette
  white: "#e8e8f2",
  gray: "#87879b",
  black: "#101014",
  dark: "#14141b",
  midtoneDarker: "#191920",
  midtone: "#24242e",
  midtoneBrighter: "#363643",
  midtoneBrighterer: "#484858",
  midtoneExtra: "#1f1f27",
};

const typography = {
  pageHeading: {
    fontSize: "64px",
    lineHeight: 1.25,
    fontWeight: 600,
    textShadow: `0 ${spacing(0.25)} ${spacing(1)} rgba(0, 0, 0, 0.5)`,
  },
  operatorPageHeading: {
    fontWeight: 600,
    fontSize: "96px",
    lineHeight: 1.25,
    textShadow: `0 ${spacing(0.25)} ${spacing(1)} rgba(0, 0, 0, 0.5)`,
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
  bodyBold: {
    fontWeight: 600,
  },
  bodyBolder: {
    fontWeight: 700,
  },
  body2: {
    fontSize: "16px",
    lineHeight: "24px",
  },
  body2Bold: {
    fontWeight: 600,
  },
  body3: {
    fontSize: "14px",
    lineHeight: "21px",
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
    fontSize: "18px",
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
  maxWidth: 1270 + spacingUnit * 3 * 2,
};

const combineNumberStringWithCalc = (
  first: number,
  second: string | number
): string => {
  return `calc(${first}px + ${
    typeof second === "number" ? `${second}px` : second
  })`;
};

const generateMediaQuery = (
  type: "max-width" | "min-width",
  breakpoint: keyof typeof breakpoints,
  nudge?: number | string
): string => {
  const queryArg =
    nudge != null
      ? combineNumberStringWithCalc(breakpoints[breakpoint], nudge)
      : `${breakpoints[breakpoint]}px`;
  return `@media (${type}: ${queryArg})`;
};

export const defaultTheme = {
  palette,
  typography,
  spacing,
  breakpoints: {
    down: (
      breakpoint: keyof typeof breakpoints,
      nudge?: number | string
    ): string => generateMediaQuery("max-width", breakpoint, nudge),
    up: (
      breakpoint: keyof typeof breakpoints,
      nudge?: number | string
    ): string => generateMediaQuery("min-width", breakpoint, nudge),
  },
  containerWidth: `${breakpoints.maxWidth}px`,
};
