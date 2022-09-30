import { globalStyle, style } from "@vanilla-extract/css";
import { spacing, breakpoints } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const RangeTable = style({
  flexShrink: 0,
});

export const RangeRow = style({
  width: spacing(2),
  height: spacing(2),
  boxSizing: "border-box",

  "@media": {
    [breakpoints.down("mobile")]: {
      width: spacing(1.5),
      height: spacing(1.5),
    },
  },
});

globalStyle(`${RangeRow}.active`, {
  border: `2px solid ${vars.colors.neutrals.gray}`,
});

globalStyle(`${RangeRow}.operator`, {
  backgroundColor: vars.colors.neutrals.white,
});
