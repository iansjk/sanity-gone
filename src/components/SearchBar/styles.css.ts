import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { transparentize } from "polished";
import { breakpoints, spacing } from "../../theme-helpers";
import { rawColors, vars } from "../../theme.css";

export const results = style({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "calc(100% + 1px)",
  width: "100%",
  left: -1,
  margin: 0,
  padding: 0,
  background: vars.colors.neutrals.midtone,
  borderRadius: spacing(0, 0, 0.5, 0.5),
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: vars.colors.neutrals.midtoneBrighter,
  selectors: {
    "&:not(:empty)": {
      borderWidth: "0 1px 1px 1px",
    },
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      paddingTop: spacing(2),
      border: "none",
      borderRadius: 0,
      marginLeft: spacing(-2),
      width: `calc(100% + ${spacing(4)})`,
      top: "100%",
      left: 0,
    },
  },
});

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  maxWidth: spacing(52),
  height: spacing(4.5),
  borderRadius: spacing(0.5),
  border: `1px solid ${transparentize(0.9, rawColors.neutrals.white)}`,
  selectors: {
    [`&:has(${results}[data-headlessui-state="open"]:not(:empty))`]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  "@media": {
    [breakpoints.up("mobile")]: {
      ":hover": {
        border: `1px solid ${transparentize(0.8, rawColors.neutrals.white)}`,
        background: transparentize(0.67, rawColors.neutrals.darktone),
      },
      ":focus-within": {
        border: `1px solid ${rawColors.neutrals.gray}`,
        background: rawColors.neutrals.darktone,
      },
    },
    [breakpoints.down("mobile")]: {
      maxWidth: "unset",
      width: "auto",
      height: spacing(5),
      padding: spacing(0),
      margin: spacing(0, 2),
      border: "none",
      background: vars.colors.neutrals.midtoneDarker,
      ":focus-within": {
        border: "none",
        background: vars.colors.neutrals.darktone,
        borderRadius: spacing(0.5),
      },
    },
  },
});

export const searchIcon = style({
  margin: spacing(0, 2),
});

export const input = style({
  background: "none",
  border: "none",
  flex: "1 1 0",
  color: vars.colors.neutrals.white,
  margin: spacing(1, 0),
  fontSize: vars.typography.body2.fontSize,
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      fontSize: vars.typography.skillTalentHeading.fontSize,
    },
  },
});

globalStyle(`${input} > input::placeholder`, {
  opacity: 0.66,
});

export const optionGroup = style({
  listStyleType: "none",
  margin: 0,
  padding: 0,
});

export const optionGroupLabel = style({
  height: spacing(4.5),
  paddingLeft: spacing(2),
  display: "flex",
  alignItems: "center",
  background: vars.colors.neutrals.midtone,
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
  color: vars.colors.neutrals.gray,
});

export const option = style({
  height: spacing(8),
  paddingLeft: spacing(2),
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridTemplateRows: "repeat(2, min-content)",
  alignContent: "center",
  columnGap: spacing(2),
  selectors: {
    '&[aria-disabled="true"]': {
      opacity: 0.25,
    },
    '&:not([aria-disabled="true"])': {
      cursor: "pointer",
    },
    '&:not([aria-disabled="true"]):hover, &[data-headlessui-state~="active"]': {
      background: vars.colors.neutrals.midtoneBrighter,
    },
  },
});

const baseOptionIcon = style({
  height: spacing(5),
  borderRadius: spacing(0.5),
  objectFit: "contain",
  gridRow: "span 2",
  alignSelf: "center",
});

export const optionIcon = styleVariants({
  operator: [
    baseOptionIcon,
    {
      background: vars.colors.neutrals.midtoneDarker,
    },
  ],
  class: [baseOptionIcon],
  branch: [baseOptionIcon],
});

export const optionSubtitle = style({
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
  color: vars.colors.neutrals.gray,
});

export const baseRarity = style({
  display: "inline-block",
  width: spacing(3),
  color: vars.colors.neutrals.white,
});

export const rarity = styleVariants({
  6: [
    baseRarity,
    {
      color: vars.colors.accents.orange,
    },
  ],
  5: [
    baseRarity,
    {
      color: vars.colors.accents.yellow,
    },
  ],
  4: [
    baseRarity,
    {
      color: vars.colors.accents.softBlue,
    },
  ],
  3: [
    baseRarity,
    {
      color: vars.colors.accents.blue,
    },
  ],
  2: [baseRarity],
  1: [baseRarity],
});
