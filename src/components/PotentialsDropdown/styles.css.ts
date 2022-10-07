import { style } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  position: "relative",
});

export const options = style({
  position: "absolute",
  margin: 0,
  padding: spacing(1, 0, 0, 0),
  listStyle: "none",
  boxShadow: vars.shadows.baseShadow,
  selectors: {
    "&:focus:not(:focus-visible)": {
      outline: "none",
    },
  },
});

export const baseOption = style({
  display: "flex",
  alignItems: "center",
  columnGap: spacing(1),
  padding: spacing(1, 1.5),
  fontSize: vars.typography.skillTalentHeading.fontSize,
  lineHeight: vars.typography.skillTalentHeading.lineHeight,
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
  background: vars.colors.neutrals.midtoneBrighter,
  cursor: "pointer",
});

export const option = style([
  baseOption,
  {
    selectors: {
      '&[data-headlessui-state~="active"], &:hover': {
        backgroundColor: vars.colors.neutrals.midtoneBrighterer,
      },
      "&:first-child": {
        borderTopLeftRadius: spacing(0.5),
        borderTopRightRadius: spacing(0.5),
      },
      "&:last-child": {
        borderBottomLeftRadius: spacing(0.5),
        borderBottomRightRadius: spacing(0.5),
      },
    },
  },
]);

export const button = style([
  baseOption,
  {
    height: spacing(5),
    color: "inherit",
    border: "none",
    borderRadius: spacing(0.5),
    boxShadow: vars.shadows.baseShadow,
  },
]);

export const svg = style({
  width: 19,
  height: 18,
});

export const noPotentialSvgPath = style({
  fill: vars.colors.neutrals.gray,
});
