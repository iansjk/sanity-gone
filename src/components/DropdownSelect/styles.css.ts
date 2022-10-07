import { style, styleVariants } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  position: "relative",
});

export const options = style({
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
  display: "grid",
  gridTemplateColumns: "max-content",
  gridAutoFlow: "column",
  alignItems: "center",
  columnGap: spacing(1),
  padding: spacing(1, 1.5),
  fontSize: vars.typography.skillTalentHeading.fontSize,
  lineHeight: vars.typography.skillTalentHeading.lineHeight,
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
  background: vars.colors.neutrals.midtoneBrighter,
  cursor: "pointer",
  whiteSpace: "nowrap",
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
    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        color: vars.colors.neutrals.midtoneBrighterer,
        backgroundColor: vars.colors.neutrals.darktone,
      },
    },
  },
]);

export const transition = styleVariants({
  base: {
    position: "absolute",
    zIndex: 50,
    transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  enterFrom: {
    opacity: 0,
  },
  enterTo: {
    opacity: 1,
  },
  leaveFrom: {
    opacity: 1,
  },
  leaveTo: {
    opacity: 0,
  },
});
