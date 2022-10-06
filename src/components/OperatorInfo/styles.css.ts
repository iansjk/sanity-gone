import { style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "max-content 1fr max-content",
  alignItems: "center",
  "@media": {
    [breakpoints.down("mobile")]: {
      gridTemplateColumns: "1fr",
      rowGap: spacing(2),
    },
  },
});

export const operatorPortraitAndClass = style({
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "flex-end",
});

export const nameAndClass = style({
  padding: spacing(0.5, 0, 0, 3),
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  gridTemplateRows: "max-content max-content",
  alignSelf: "baseline",
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(0, 0, 0, 2),
      alignSelf: "flex-start",
    },
  },
});

export const operatorName = style({
  gridColumn: "span 2",
  marginBottom: spacing(1),
  fontSize: vars.typography.operatorNameHeading.fontSize,
  fontWeight: vars.typography.operatorNameHeading.fontWeight,
  lineHeight: vars.typography.operatorNameHeading.lineHeight,
  "@media": {
    [breakpoints.down("mobile")]: {
      fontSize: vars.typography.generalHeading.fontSize,
      fontWeight: vars.typography.generalHeadingBold.fontWeight,
      lineHeight: vars.typography.generalHeading.lineHeight,
    },
  },
});

export const alterName = style({
  "@media": {
    [breakpoints.down("mobile")]: {
      marginLeft: spacing(0.5),
      color: vars.colors.neutrals.gray,
      fontSize: vars.typography.body1.fontSize,
      fontWeight: vars.typography.body1.fontWeight,
      lineHeight: vars.typography.body1.lineHeight,
    },
  },
});

export const classAndSubclass = style({
  display: "flex",
  alignItems: "center",
  fontWeight: vars.typography.navigationLinkBold.fontWeight,
  lineHeight: 1,
  color: vars.colors.neutrals.white,
  boxShadow: vars.shadows.baseShadow,
  "@media": {
    [breakpoints.down("mobile")]: {
      fontSize: vars.typography.body1.fontSize,
    },
  },
});

export const classIconContainer = style({
  padding: spacing(1),
  display: "flex",
  alignItems: "center",
  backgroundColor: vars.colors.neutrals.midtoneExtra,
  border: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
  borderRadius: spacing(0.5, 0, 0, 0.5),
  selectors: {
    [`${classAndSubclass}:hover &`]: {
      backgroundColor: vars.colors.neutrals.midtoneBrighter,
      border: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
    },
  },
});

export const subclassIconContainer = style({
  display: "grid",
  gridAutoFlow: "column",
  columnGap: spacing(1),
  alignItems: "center",
  padding: spacing(1, 1.5),
  backgroundColor: vars.colors.neutrals.midtoneBrighter,
  border: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
  borderRadius: spacing(0, 0.5, 0.5, 0),
  selectors: {
    [`${classAndSubclass}:hover &`]: {
      backgroundColor: vars.colors.neutrals.midtoneBrighterer,
      border: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
    },
  },
});

export const attackTypeAndPosition = style({
  margin: 0,
  display: "grid",
  gridTemplateColumns: "repeat(2, max-content)",
  justifyContent: "end",
  height: "max-content",
  columnGap: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      columnGap: spacing(2),
      justifyContent: "flex-start",
    },
  },
});

const attackTypeOrPositionCellBase = style({
  background: "none",
  "@media": {
    [breakpoints.down("mobile")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
});

export const attackTypeOrPositionDetails = style({
  fontSize: vars.typography.body1.fontSize,
  fontWeight: "normal",
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(0.5, 0, 0),
      fontSize: vars.typography.body2.fontSize,
    },
  },
});

export const attackTypeCell = style([
  attackTypeOrPositionCellBase,
  {
    borderTopLeftRadius: spacing(0.5),
  },
]);

export const attackType = styleVariants({
  Physical: [
    attackTypeOrPositionDetails,
    { color: vars.colors.accents.orange },
  ],
  Arts: [attackTypeOrPositionDetails, { color: vars.colors.accents.blue }],
  Healing: [attackTypeOrPositionDetails, { color: vars.colors.accents.lime }],
  None: [attackTypeOrPositionDetails, { color: vars.colors.neutrals.gray }],
});

export const positionCell = style([
  attackTypeOrPositionCellBase,
  {
    borderBottomLeftRadius: spacing(0.5),
  },
]);
