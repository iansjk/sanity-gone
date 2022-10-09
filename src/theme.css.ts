import { createGlobalTheme } from "@vanilla-extract/css";
import { spacing } from "./theme-helpers";

export const rawColors = {
  neutrals: {
    white: "#e8e8f2",
    gray: "#87879b",
    black: "#101014",
    blackest: "#050507",
    darktone: "#14141b",
    midtoneDarker: "#191920",
    midtone: "#24242e",
    midtoneBrighter: "#363643",
    midtoneBrighterer: "#484858",
    midtoneExtra: "#1f1f27",
  },
  accents: {
    red: "#fb4040",
    orange: "#f98d3f",
    yellow: "#ffcf53",
    lime: "#a7e855",
    blue: "#49b3ff",
    softBlue: "#7f7dea",
    purple: "#7f7dea",
    magenta: "#e85593",
  },
  fallbackAccentColor: "#ffffff",
};

export const vars = createGlobalTheme(":root", {
  colors: rawColors,
  typography: {
    fontFamily: "Source Sans Pro, sans-serif",
    pageHeading: {
      fontSize: "48px",
      fontWeight: "600",
      lineHeight: "1",
    },
    operatorPageHeading: {
      fontSize: "72px",
      fontWeight: "600",
      lineHeight: "1",
    },
    operatorNameHeading: {
      fontSize: "36px",
      fontWeight: "600",
      lineHeight: "1.25",
    },
    cardHeading: {
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "1.25",
      textTransform: "uppercase",
    },
    generalHeading: {
      fontSize: "24px",
      lineHeight: "1.25",
    },
    generalHeadingBold: {
      fontSize: "24px",
      fontWeight: "600",
      lineHeight: "1.25",
    },
    skillTalentHeading: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.25",
    },
    body1: {
      fontSize: "18px",
      lineHeight: "1.5",
      fontWeight: "400",
    },
    body1Bold: {
      fontWeight: "600",
    },
    body1Bolder: {
      fontWeight: "700",
    },
    body2: {
      fontSize: "16px",
      lineHeight: "1.5",
    },
    body2Bold: {
      fontWeight: "600",
    },
    body3: {
      fontSize: "14px",
      lineHeight: "18px",
    },
    smallPortraitRarity: {
      fontSize: "18px",
      lineHeight: "1.25",
      fontWeight: "700",
    },
    label1: {
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "1.25",
    },
    label2: {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "1.25",
    },
    navigationLink: {
      fontSize: "18px",
      lineHeight: "1.25",
    },
    navigationLinkBold: {
      fontWeight: "600",
    },
    operatorBrowserNameHeading: {
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "1.25",
    },
    operatorCardAlterName: {
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.25",
      textTransform: "uppercase",
    },
    teamGroupHeading: {
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    memberNameHeading: {
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "1.5",
    },
    memberRoleHeading: {
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.52",
    },
  },
  shadows: {
    titleShadow: `${spacing(0.25)} ${spacing(1)} rgba(0, 0, 0, 0.6)`,
    baseShadow: `${spacing(0.25)} ${spacing(0.25)} ${spacing(
      1
    )} rgba(0, 0, 0, 0.15)`,
  },
});
