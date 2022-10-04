import { style } from "@vanilla-extract/css";
import { spacing, breakpoints } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const stageButton = style({
  width: spacing(7.5),
  fontSize: vars.typography.generalHeadingBold.fontSize,
  fontWeight: vars.typography.generalHeadingBold.fontWeight,
  lineHeight: vars.typography.generalHeadingBold.lineHeight,
  "@media": {
    [breakpoints.down("mobile")]: {
      width: 53,
    },
  },
});
