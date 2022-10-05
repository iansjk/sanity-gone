import { globalStyle, style } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  backgroundColor: vars.colors.neutrals.blackest,
  padding: spacing(0.5, 1),
  borderRadius: spacing(0.25),
  fontSize: vars.typography.body2.fontSize,
  lineHeight: vars.typography.body2.lineHeight,
});

globalStyle(`${root} b, ${root} strong`, {
  fontWeight: vars.typography.body2Bold.fontWeight,
});

globalStyle(`${root} .tippy-content`, {
  padding: 0,
});

globalStyle(`${root} .tippy-arrow`, {
  borderTopColor: vars.colors.neutrals.blackest,
});
