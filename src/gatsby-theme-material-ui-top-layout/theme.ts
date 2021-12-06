/* eslint-disable @typescript-eslint/no-empty-interface */
import { createTheme, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface SGPalette {
    lime: Palette["primary"];
    blue: Palette["primary"];
    softBlue: Palette["primary"];
    yellow: Palette["primary"];
    orange: Palette["primary"];
    red: Palette["primary"];
    pink: Palette["primary"];
    white: Palette["primary"];
    gray: Palette["primary"];
    black: Palette["primary"];
    blackest: Palette["primary"];
    dark: Palette["primary"];
    midtoneDarker: Palette["primary"];
    midtone: Palette["primary"];
    midtoneBrighter: Palette["primary"];
    midtoneBrighterer: Palette["primary"];
    midtoneExtra: Palette["primary"];
  }

  interface SGPaletteOptions {
    lime: PaletteOptions["primary"];
    blue: PaletteOptions["primary"];
    softBlue: PaletteOptions["primary"];
    yellow: PaletteOptions["primary"];
    orange: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
    pink: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
    gray: PaletteOptions["primary"];
    black: PaletteOptions["primary"];
    blackest: PaletteOptions["primary"];
    dark: PaletteOptions["primary"];
    midtoneDarker: PaletteOptions["primary"];
    midtone: PaletteOptions["primary"];
    midtoneBrighter: PaletteOptions["primary"];
    midtoneBrighterer: PaletteOptions["primary"];
    midtoneExtra: PaletteOptions["primary"];
  }

  interface SGTypography {
    pageHeading: React.CSSProperties;
    operatorPageHeading: React.CSSProperties;
    operatorNameHeading: React.CSSProperties;
    cardHeading: React.CSSProperties;
    generalHeading: React.CSSProperties;
    generalHeadingBold: React.CSSProperties;
    skillTalentHeading: React.CSSProperties;
    body1Bold: React.CSSProperties;
    body1Bolder: React.CSSProperties;
    body2Bold: React.CSSProperties;
    body2Bolder: React.CSSProperties;
    body3: React.CSSProperties;
    smallPortraitRarity: React.CSSProperties;
    label1: React.CSSProperties;
    label2: React.CSSProperties;
    navigationLink: React.CSSProperties;
    navigationLinkBold: React.CSSProperties;
    operatorBrowserNameHeading: React.CSSProperties;
  }

  interface Palette extends SGPalette {}
  interface PaletteOptions extends SGPaletteOptions {}
  interface TypographyVariants extends SGTypography {}
  interface TypographyVariantsOptions extends Partial<SGTypography> {}

  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    maxWidth: true;
  }

  interface ThemeOptions {
    customShadows: typeof customShadows;
  }

  interface Theme {
    customShadows: typeof customShadows;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    lime: true;
    blue: true;
    softBlue: true;
    yellow: true;
    orange: true;
    red: true;
    pink: true;
    white: true;
    gray: true;
    black: true;
    dark: true;
    midtoneDarker: true;
    midtone: true;
    midtoneBrighter: true;
    midtoneBrighterer: true;
    midtoneExtra: true;
  }
}

const spacingUnit = 8;

const baseTheme = createTheme({
  spacing: spacingUnit,
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
    blackest: {
      main: "#050507",
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
      fontSize: 48,
      lineHeight: 1,
      fontWeight: 600,
    },
    operatorPageHeading: {
      fontWeight: 600,
      fontSize: 72,
      lineHeight: 1,
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
      fontWeight: 700,
    },
    label1: {
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.25,
    },
    label2: {
      fontSize: 14,
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
    values: {
      mobile: 1000,
      maxWidth: 1270 + spacingUnit * 3 * 2,
    },
  },
} as ThemeOptions);

export const customShadows = {
  titleShadow: `0 ${baseTheme.spacing(0.25)} ${baseTheme.spacing(
    1
  )} rgba(0, 0, 0, 0.5);`,
  baseShadow: `${baseTheme.spacing(0.25)} ${baseTheme.spacing(
    0.25
  )} ${baseTheme.spacing(1)} rgba(0, 0, 0, 0.15)`,
};

const defaultTheme = createTheme({
  ...baseTheme,
  customShadows,
  components: {
    MuiButton: {
      defaultProps: {
        color: "midtoneBrighter",
      },
      styleOverrides: {
        root: {
          padding: baseTheme.spacing(1, 1.5),
          fontSize: baseTheme.typography.navigationLink.fontSize,
          lineHeight: baseTheme.typography.navigationLink.lineHeight,
          boxShadow: customShadows.baseShadow,
          textTransform: "none",
          "&:hover": {
            backgroundColor: baseTheme.palette.midtoneBrighterer.main,
          },
          "&:disabled": {
            color: baseTheme.palette.midtoneBrighterer.main,
            backgroundColor: baseTheme.palette.dark.main,
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          color: baseTheme.palette.white.main,
          backgroundColor: baseTheme.palette.midtoneBrighter.main,
          boxShadow: customShadows.baseShadow,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          margin: baseTheme.spacing(1, 0, 0),
        },
        list: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: baseTheme.palette.midtoneBrighterer.main,
          },
          "& .MuiTypography-root": {
            fontSize: baseTheme.typography.navigationLink.fontSize,
            lineHeight: baseTheme.typography.navigationLink.lineHeight,
            fontWeight: baseTheme.typography.navigationLinkBold.fontWeight,
          },
        },
      },
    },
  },
});
export default defaultTheme;
