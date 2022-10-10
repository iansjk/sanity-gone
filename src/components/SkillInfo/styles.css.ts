import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

const baseRoot = style({
  display: "grid",
  gridTemplateRows: "repeat(3, max-content) 1fr",
  gap: spacing(0.25),
  marginTop: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      marginTop: spacing(2),
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(3, max-content)",
    },
  },
});

export const root = styleVariants({
  withRange: [
    baseRoot,
    {
      gridTemplateColumns: "3fr 1fr",
    },
  ],
  noRange: [
    baseRoot,
    {
      gridTemplateColumns: "1fr",
    },
  ],
});

export const baseCell = style({
  backgroundColor: vars.colors.neutrals.midtoneDarker,
});

export const skillHeader = style([
  baseCell,
  {
    gridRowStart: 1,
    gridColumn: "span 2",
    marginBottom: spacing(-0.25),
    background: vars.colors.neutrals.midtone,
    borderBottom: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
    borderRadius: spacing(0.5, 0.5, 0, 0),
    display: "flex",
    flexDirection: "row",
    width: "100%",
    "@media": {
      [breakpoints.down("mobile")]: {
        flexDirection: "column",
        marginRight: spacing(2),
      },
    },
  },
]);

export const recommendedSkill = style({
  display: "inline-flex",
  color: vars.colors.accents.yellow,
  fontSize: vars.typography.skillTalentHeading.fontSize,
  lineHeight: vars.typography.skillTalentHeading.lineHeight,
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
  alignItems: "center",
  whiteSpace: "nowrap",
  marginLeft: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      marginLeft: spacing(2),
      height: spacing(8),
    },
  },
});

export const recommendedSkillSvg = style({
  marginRight: spacing(1),
});

export const recommendedSkillSvgPath = style({
  fill: vars.colors.accents.yellow,
});

export const spacer = style({
  flex: "1 1 0",
});

export const sliderContainer = style({
  marginRight: spacing(2),
  height: spacing(8),
  "@media": {
    [breakpoints.down("mobile")]: {
      position: "relative",
      marginRight: spacing(0),
      paddingLeft: spacing(2),
      borderRadius: spacing(0.5, 0.5, 0, 0),
    },
  },
});

export const skillNameAndType = style([
  baseCell,
  {
    gridRowStart: 2,
    display: "grid",
    gridTemplateColumns: "max-content 1fr",
    gridTemplateRows: "repeat(2, max-content)",
    columnGap: spacing(2),
    alignItems: "center",
    padding: spacing(2),
    "@media": {
      [breakpoints.down("mobile")]: {
        gridColumnStart: "span 2",
      },
    },
    selectors: {
      [`${root.noRange} &`]: {
        gridColumn: "span 2",
      },
    },
  },
]);

export const skillName = style({
  fontSize: vars.typography.skillTalentHeading.fontSize,
  lineHeight: vars.typography.skillTalentHeading.lineHeight,
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
  margin: 0,
});

export const skillIcon = style({
  gridRowStart: "span 2",
  width: 50,
  height: 50,
  boxSizing: "border-box",
  border: `${spacing(0.25)} solid ${vars.colors.neutrals.white}`,
  borderRadius: spacing(0.5),
});

export const skillAndSpType = style({
  display: "block",
  fontSize: vars.typography.body2.fontSize,
  lineHeight: vars.typography.body2.lineHeight,
  "@media": {
    [breakpoints.down("mobile")]: {
      fontSize: vars.typography.body3.fontSize,
      lineHeight: vars.typography.body3.lineHeight,
    },
  },
});

export const spType = styleVariants({
  1: {
    color: vars.colors.accents.lime,
  },
  2: {
    color: vars.colors.accents.orange,
  },
  3: {},
  4: {
    color: vars.colors.accents.yellow,
  },
});

export const skillType = style({
  color: vars.colors.neutrals.gray,
});

export const spAndDuration = style([
  baseCell,
  {
    backgroundColor: "inherit",
    gridRowStart: 3,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: spacing(0.25),
    margin: 0,
    "@media": {
      [breakpoints.down("mobile")]: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "repeat(3, 1fr)",
      },
    },
    selectors: {
      [`${root.noRange} &`]: {
        gridColumn: "span 2",
      },
    },
  },
]);

export const iconPath = styleVariants({
  initialSp: {
    fill: vars.colors.neutrals.white,
  },
  spCost: {
    fill: vars.colors.accents.lime,
  },
  duration: {
    fill: vars.colors.accents.magenta,
  },
});

export const skillDescription = style([
  baseCell,
  {
    gridRowStart: 4,
    gridColumnStart: "span 2",
    padding: spacing(2),
    margin: 0,
    borderRadius: spacing(0, 0, 0.5, 0.5),
  },
]);

globalStyle(`${skillDescription} .value-up`, {
  color: vars.colors.accents.blue,
});
globalStyle(`${skillDescription} .value-down`, {
  color: vars.colors.accents.orange,
});
globalStyle(`${skillDescription} .reminder-text`, {
  color: vars.colors.accents.yellow,
});

export const range = style([
  baseCell,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridRowStart: "span 2",
    "@media": {
      [breakpoints.down("mobile")]: {
        gridRow: 3,
        gridColumn: 2,
      },
    },
  },
]);
