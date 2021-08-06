
const spacingUnit = 8;

// adaptation of @material-ui/core's Spacing theme type
// (note that we're only accepting numbers for arguments and only returning strings)
interface Spacing {
  (): string;
  (value: number): string;
  (topBottom: number, rightLeft: number): string;
  (top: number, rightLeft: number, bottom: number): string;
  (
    top: number,
    right: number,
    bottom: number,
    left: number
  ): string;
}

const spacing: Spacing = (...args: number[]) => {
  if (!args || args.length === 0) {
    return `${spacingUnit}px`;
  }
  return args.map((multiple) => multiple === 0 ? '0' : `${multiple * spacingUnit}px`).join(" ");
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
  fallbackFontFamily: "Arial, sans-serif",
  fallbackFontCss: `
    font-size: 17px;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: 0.1px;
    word-spacing: -1px;
  `,
  pageHeading: {
    weight: 600,
    size: "96px",
    lineHeight: 1.25,
    textShadow: `${spacing(0.25)} ${spacing(0.5)} ${spacing(1)} rgba(0, 0, 0, 0.25)`,
  },
  operatorNameHeading: {
    size: "36px",
    weight: 600,
    lineHeight: 1.25,
  },
  cardHeading: {
    size: "24px",
    textTransform: "uppercase",
    weight: 700,
    lineHeight: 1.25,
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
    family: "Source Sans Pro",
    lineHeight: 1.5,
  },
  body2: {
    size: "14px",
    lineHeight: "24px",
  },
  smallPortraitRarity: {
    size: "18px",
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
    lineHeight: 1.25
  },
  navigationLinkActive: {
    fontWeight: 600
  }
};

export const defaultTheme = {
  palette,
  typography,
  spacing,
  containerWidth: "1270px",
  contentY: "384px",
};
