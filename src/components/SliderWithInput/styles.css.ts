import { style } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const sliderInputContainer = style({
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.colors.neutrals.midtoneDarker,
  width: spacing(5),
  height: spacing(4),
  margin: spacing(2, 1),
  color: vars.colors.neutrals.white,
  borderRadius: spacing(0.5),
  padding: spacing(0.5, 1),
  selectors: {
    "&:focus-within": {
      boxShadow: `0 0 0 0.05em #fff, 0 0 0.15em 0.1em ${vars.colors.accents.blue};`,
    },
  },
});

export const sliderInput = style({
  padding: "4px 0 5px",
  height: 26,
  border: 0,
  background: "none",
  color: vars.colors.neutrals.white,
  textAlign: "center",
  minWidth: spacing(3),
  fontSize: vars.typography.navigationLink.fontSize,
  lineHeight: vars.typography.navigationLink.lineHeight,
  selectors: {
    "&:focus": {
      outline: "none",
    },
  },
});
