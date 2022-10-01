import { style } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../theme-helpers";

export const root = style({
  padding: spacing(1, 3, 0, 3),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(1, 2, 0, 2),
    },
  },
});
