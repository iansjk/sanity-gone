import { createTheme } from "@mui/material";

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

// export const defaultTheme = {
//   palette,
//   typography,
//   spacing,
//   breakpoints: {
//     down: (
//       breakpoint: keyof typeof breakpoints,
//       nudge?: number | string
//     ): string => generateMediaQuery("max-width", breakpoint, nudge),
//     up: (
//       breakpoint: keyof typeof breakpoints,
//       nudge?: number | string
//     ): string => generateMediaQuery("min-width", breakpoint, nudge),
//   },
//   containerWidth: `${breakpoints.maxWidth}px`,
// };

export const defaultTheme = createTheme({
  palette: {
    lime: {
      main: "#a7e855",
    },
    blue: {
      main: "#49b3ff",
    },
    softBlue: {
      main: "#7f7dea",
    },
    yellow: {
      main: "#ffcf53",
    },
    orange: {
      main: "#f98d3f",
    },
    red: {
      main: "#fb4040",
    },
    pink: {
      main: "#e85593",
    },
    white: {
      main: "#e8e8f2",
    },
    gray: {
      main: "#87879b",
    },
    black: {
      main: "#101014",
    },
    dark: {
      main: "#14141b",
    },
    midtoneDarker: {
      main: "#191920",
    },
    midtone: {
      main: "#24242e",
    },
    midtoneBrighter: {
      main: "#363643",
    },
    midtoneBrighterer: {
      main: "#484858",
    },
    midtoneExtra: {
      main: "#1f1f27",
    },
  },
  typography: {
    fontFamily: "Source Sans Pro",
    pageHeading: {
      fontSize: 64,
      lineHeight: 1.25,
      fontWeight: 600,
      textShadow: `0 ${spacing(0.25)} ${spacing(1)} rgba(0, 0, 0, 0.5)`,
    },
    operatorPageHeading: {
      fontWeight: 600,
      fontSize: 96,
      lineHeight: 1.25,
      textShadow: `0 ${spacing(0.25)} ${spacing(1)} rgba(0, 0, 0, 0.5)`,
    },
    operatorNameHeading: {
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 1.25,
    },
    cardHeading: {
      fontSize: 24,
      textTransform: "uppercase",
      fontWeight: 700,
      lineHeight: 1.25,
    },
    generalHeading: {
      fontSize: 24,
      lineHeight: 1.25,
    },
    generalHeadingBold: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.25,
    },
    skillTalentHeading: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.25,
    },
    body1: {
      fontSize: 18,
      lineHeight: 1.5,
      fontWeight: 400,
    },
    body1Bold: {
      fontWeight: 600,
    },
    body1Bolder: {
      fontWeight: 700,
    },
    body2: {
      fontSize: 16,
      lineHeight: 1.5,
    },
    body2Bold: {
      fontWeight: 600,
    },
    body3: {
      fontSize: 14,
      lineHeight: 1.5,
    },
    smallPortraitRarity: {
      fontSize: 18,
      lineHeight: 1.25,
    },
    label1: {
      size: 12,
      fontWeight: 600,
      lineHeight: 1.25,
    },
    label2: {
      size: 14,
      fontWeight: 600,
      lineHeight: 1.25,
    },
    navigationLink: {
      fontSize: 18,
      lineHeight: 1.25,
    },
    navigationLinkBold: {
      fontWeight: 600,
    },
    operatorBrowserNameHeading: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.25,
    },
  },
  breakpoints: {
    mobile: 700,
    maxWidth: 1270 + spacingUnit * 3 * 2,
  },
} as any);
