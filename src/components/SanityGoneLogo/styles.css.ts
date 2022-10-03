import { style, globalStyle } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  marginTop: 2,
  padding: spacing(1),
  lineHeight: 1,
});

globalStyle(`${root} > svg > path`, {
  fill: vars.colors.neutrals.white,
});
