import { globalStyle } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const themeName = "sg";
const baseTippySelector = `.tippy-box[data-theme~="${themeName}"]`;

globalStyle(baseTippySelector, {
  backgroundColor: vars.colors.neutrals.blackest,
  padding: spacing(0.5, 1),
  borderRadius: spacing(0.25),
  color: vars.colors.neutrals.white,
  fontSize: vars.typography.body2.fontSize,
  lineHeight: vars.typography.body2.lineHeight,
});

globalStyle(`${baseTippySelector} b, ${baseTippySelector} strong`, {
  fontWeight: vars.typography.body2Bold.fontWeight,
});

globalStyle(`${baseTippySelector} .tippy-content`, {
  padding: 0,
});

globalStyle(`${baseTippySelector} .tippy-arrow::before`, {
  borderTopColor: vars.colors.neutrals.blackest,
});
