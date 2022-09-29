import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";
import { spacing, breakpoints } from "../../theme-helpers";

export const traitContainer = style({
  marginTop: spacing(3),
  display: "flex",
  flexDirection: "row",
  "@media": {
    [breakpoints.down("mobile")]: {
      marginTop: spacing(1),
    },
  },
});

globalStyle(`${traitContainer}.subclass-hidden .trait-info`, {
  borderRadius: spacing(0.5),
  margin: 0,
});

export const subclassIcon = style({
  backgroundColor: vars.colors.neutrals.midtoneDarker,
  borderRadius: spacing(0.5, 0, 0, 0.5),
  width: 80,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
});

globalStyle(`${subclassIcon} > img`, {
  display: "block",
  height: 48,
  width: 48,
  margin: "auto",
});

export const traitInfo = style({
  backgroundColor: vars.colors.neutrals.midtoneDarker,
  borderRadius: spacing(0, 0.5, 0.5, 0),
  flex: "1 1 0",
  marginLeft: spacing(0.25),
  padding: spacing(2),
  display: "flex",
  flexDirection: "column",
});

export const traitLabel = style({
  color: vars.colors.neutrals.gray,
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
  marginBottom: spacing(0.75),
});

export const traitDescription = style({
  color: vars.colors.neutrals.white,
  fontSize: vars.typography.body1.fontSize,
  lineHeight: vars.typography.body1.lineHeight,
  "@media": {
    [breakpoints.down("mobile")]: {
      fontSize: vars.typography.body2.fontSize,
      lineHeight: vars.typography.body2.lineHeight,
    },
  },
});

globalStyle(`${traitDescription} .keyword`, {
  color: vars.colors.accents.blue,
});
