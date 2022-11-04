import { style, styleVariants } from "@vanilla-extract/css";

import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

const rootBase = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: spacing(0.5),
  border: `${spacing(0.25)} solid ${vars.colors.neutrals.white}`,
  background: vars.colors.neutrals.midtoneExtra,
});

export const root = styleVariants({
  normal: [
    rootBase,
    {
      marginBottom: "9px",
    },
  ],
  small: [rootBase],
});

const operatorPortraitBase = style({
  borderRadius: spacing(0.25),
  objectFit: "scale-down",
});

export const operatorPortrait = styleVariants({
  normal: [
    operatorPortraitBase,
    {
      marginBottom: spacing(0.5),
    },
  ],
  small: [
    operatorPortraitBase,
    {
      marginBottom: spacing(0.25),
    },
  ],
});

export const limitedWrapper = style({
  position: "absolute",
  left: 0,
  top: "-8px",
  width: "100%",
  lineHeight: 1,
  display: "flex",
  justifyContent: "center",
  zIndex: 1,
});

export const limitedText = style({
  display: "inline-block",
  position: "relative",
  top: "-1px",
  padding: spacing(0, 0.25),
  fontSize: vars.typography.body2.fontSize,
  fontWeight: vars.typography.body2Bold.fontWeight,
  lineHeight: 1,
  color: vars.colors.accents.red,
  textTransform: "uppercase",
  textAlign: "center",
  backgroundColor: vars.colors.neutrals.midtoneExtra,
  borderRadius: spacing(0.25),
});

const rarityWrapperBase = style({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  left: 0,
});

export const rarityWrapper = styleVariants({
  normal: [
    rarityWrapperBase,
    {
      bottom: "-18px",
    },
  ],
  small: [
    rarityWrapperBase,
    {
      bottom: "-15px",
    },
  ],
});

export const rarityNormal = style({
  display: "inline-block",
  paddingRight: 6,
});

export const rarityStarNormalSvg = style({
  marginRight: -6,
});

const rarityStarNormalPathBase = style({
  fill: vars.colors.neutrals.white,
  stroke: vars.colors.neutrals.midtoneExtra,
  strokeWidth: spacing(0.25),
});

export const rarityStarNormalPath = styleVariants({
  6: [
    rarityStarNormalPathBase,
    {
      fill: vars.colors.accents.orange,
    },
  ],
  5: [
    rarityStarNormalPathBase,
    {
      fill: vars.colors.accents.yellow,
    },
  ],
  4: [
    rarityStarNormalPathBase,
    {
      fill: vars.colors.accents.softBlue,
    },
  ],
  3: [
    rarityStarNormalPathBase,
    {
      fill: vars.colors.accents.blue,
    },
  ],
  2: [rarityStarNormalPathBase],
  1: [rarityStarNormalPathBase],
});

export const rarityStarSmall = style({
  marginLeft: 1,
  marginBottom: -1,
});

const raritySmallBase = style({
  color: vars.colors.neutrals.midtoneExtra,
  fontSize: vars.typography.smallPortraitRarity.fontSize,
  lineHeight: vars.typography.smallPortraitRarity.lineHeight,
  fontWeight: vars.typography.smallPortraitRarity.fontWeight,
  display: "inline-flex",
  alignItems: "center",
  padding: spacing(0, 0.5),
  borderRadius: spacing(0.5),
  border: `${spacing(0.25)} solid ${vars.colors.neutrals.midtoneExtra}`,
  backgroundColor: vars.colors.neutrals.white,
});

export const raritySmall = styleVariants({
  6: [
    raritySmallBase,
    {
      backgroundColor: vars.colors.accents.orange,
    },
  ],
  5: [
    raritySmallBase,
    {
      backgroundColor: vars.colors.accents.yellow,
    },
  ],
  4: [
    raritySmallBase,
    {
      backgroundColor: vars.colors.accents.softBlue,
    },
  ],
  3: [
    raritySmallBase,
    {
      backgroundColor: vars.colors.accents.blue,
    },
  ],
  2: [raritySmallBase],
  1: [raritySmallBase],
});
