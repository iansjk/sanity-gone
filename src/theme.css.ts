import {
  createGlobalThemeContract,
  createGlobalTheme,
} from "@vanilla-extract/css";

export const vars = createGlobalThemeContract({
  colors: {
    neutrals: {
      white: "#000000",
      gray: "#000000",
      black: "#000000",
      blackest: "#000000",
      darktone: "#000000",
      midtoneDarker: "#000000",
      midtone: "#000000",
      midtoneBrighter: "#000000",
      midtoneBrighterer: "#000000",
      midtoneExtra: "#000000",
    },
    accents: {
      red: "#000000",
      orange: "#000000",
      yellow: "#000000",
      lime: "#000000",
      blue: "#000000",
      softBlue: "#000000",
      purple: "000000",
      magenta: "#000000",
    },
  },
  typography: {
    fontFamily: "",
    pageHeading: {
      fontSize: "",
      lineHeight: "",
      fontWeight: "",
    },
    operatorPageHeading: {
      fontSize: "",
      fontWeight: "",
      lineHeight: "",
    },
    operatorNameHeading: {
      fontSize: "",
      fontWeight: "",
      lineHeight: "",
    },
    cardHeading: {
      fontSize: "",
      fontWeight: "",
      lineHeight: "",
      textTransform: "",
    },
    generalHeading: {
      fontSize: "",
      lineHeight: "",
    },
    generalHeadingBold: {
      fontSize: "",
      fontWeight: "",
      lineHeight: "",
    },
    skillTalentHeading: {
      fontSize: "",
      fontWeight: "",
      lineHeight: "",
    },
    body1: {
      fontSize: "",
      lineHeight: "",
      fontWeight: "",
    },
    body1Bold: {
      fontWeight: "",
    },
    body1Bolder: {
      fontWeight: "",
    },
    body2: {
      fontSize: "",
      lineHeight: "",
    },
    body2Bold: {
      fontWeight: "",
    },
    body3: {
      fontSize: "",
      lineHeight: "",
    },
    smallPortraitRarity: {
      fontSize: "",
      lineHeight: "",
      fontWeight: "",
    },
    label1: {
      fontSize: "",
      fontWeight: "",
      lineHeight: "",
    },
    label2: {
      fontSize: "",
      fontWeight: "",
      lineHeight: "",
    },
    navigationLink: {
      fontSize: "",
      lineHeight: "",
    },
    navigationLinkBold: {
      fontWeight: "",
    },
    operatorBrowserNameHeading: {
      fontSize: "",
      fontWeight: "",
      lineHeight: "",
    },
    operatorCardAlterName: {
      fontSize: "",
      fontWeight: "",
      lineHeight: "",
      textTransform: "",
    },
  },
});

createGlobalTheme(":root", vars, {
  colors: {
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
      purple: "7F7DEA",
      magenta: "#e85593",
    },
  },
  typography: {
    fontFamily: "Source Sans Pro",
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
      lineHeight: "18px", // ha ha hah ah aah hash ah ah ah
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
  },
});
