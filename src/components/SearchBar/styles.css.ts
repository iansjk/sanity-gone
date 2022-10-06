import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { transparentize } from "polished";
import { spacing } from "../../theme-helpers";
import { rawColors, vars } from "../../theme.css";

export const root = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  maxWidth: spacing(52),
});

globalStyle(`${root} img`, {
  objectFit: "contain",
});

const baseSearchBar = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  height: spacing(4.5),
  borderRadius: spacing(0.5),
  border: `1px solid ${transparentize(0.9, rawColors.neutrals.white)}`,
  selectors: {
    "&:hover": {
      border: `1px solid ${transparentize(0.8, rawColors.neutrals.white)}`,
      background: transparentize(0.67, rawColors.neutrals.darktone),
    },
    "&:focus-within": {
      border: `1px solid ${rawColors.neutrals.gray}`,
      background: rawColors.neutrals.darktone,
    },
  },
});

export const searchBar = styleVariants({
  unfocused: [baseSearchBar],
  focused: [
    baseSearchBar,
    {
      borderRadius: spacing(0.5, 0.5, 0, 0),
    },
  ],
});

export const searchIcon = style({
  margin: spacing(0, 2),
});

export const searchInput = style({
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
});

globalStyle(`${searchInput} > input::placeholder`, {
  opacity: 0.66,
});

export const searchResults = style({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "100%",
  width: "100%",
  zIndex: 3,
  background: vars.colors.neutrals.midtone,
  borderRadius: spacing(0, 0, 0.5, 0.5),
  border: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
  selectors: {
    [`${searchBar.unfocused} ~ &`]: {
      display: "none",
    },
  },
});

export const categoryLabel = style({
  height: spacing(4.5),
  paddingLeft: spacing(2),
  display: "flex",
  alignItems: "center",
  background: vars.colors.neutrals.midtone,
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
  color: vars.colors.neutrals.gray,
});

export const operatorResults = style({
  display: "flex",
  flexDirection: "column",
});

const baseOperatorCard = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: spacing(8),
  paddingLeft: spacing(2),
});

export const operatorCard = styleVariants({
  enabled: [
    baseOperatorCard,
    {
      selectors: {
        "&:hover": {
          background: vars.colors.neutrals.midtoneBrighter,
        },
      },
    },
  ],
  disabled: [
    baseOperatorCard,
    {
      cursor: "default",
      opacity: 0.25,
    },
  ],
});

globalStyle(`${baseOperatorCard} img`, {
  height: spacing(5),
  borderRadius: spacing(0.5),
  background: vars.colors.neutrals.midtoneDarker,
});

export const operatorInfo = style({
  display: "flex",
  flexDirection: "column",
  color: vars.colors.neutrals.white,
  marginLeft: spacing(2),
});

export const rarityAndClass = style({
  display: "flex",
  flexDirection: "row",
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
});

export const classAndSubclass = style({
  color: vars.colors.neutrals.gray,
});

export const classesResults = style({
  display: "flex",
  flexDirection: "column",
});

export const classesCard = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: spacing(8),
  paddingLeft: spacing(2),
  selectors: {
    "&:hover": {
      background: vars.colors.neutrals.midtoneBrighter,
    },
  },
});

globalStyle(`${classesCard} img`, {
  height: spacing(5),
  width: spacing(5),
  borderRadius: spacing(0.5),
});

export const classesInfo = style({
  display: "flex",
  flexDirection: "column",
  color: vars.colors.neutrals.white,
  marginLeft: spacing(2),
});

export const className = style({
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
  color: vars.colors.neutrals.gray,
});

export const baseRarity = style({
  width: spacing(3),
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
  2: [baseRarity, {}],
  1: [baseRarity, {}],
});
