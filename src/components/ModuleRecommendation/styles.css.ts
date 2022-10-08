import { style } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const moduleRecommendation = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: spacing(0.25),
  "@media": {
    [breakpoints.down("mobile")]: {
      gridTemplateColumns: "unset",
    },
  },
});

const baseCell = style({
  flexDirection: "row",
  alignItems: "center",
});

export const recommendedStage = style([
  baseCell,
  {
    borderRadius: spacing(0.5, 0, 0, 0.5),
    "@media": {
      [breakpoints.down("mobile")]: {
        borderRadius: spacing(0.5, 0.5, 0, 0),
      },
    },
  },
]);

export const priority = style([
  baseCell,
  {
    borderRadius: spacing(0, 0.5, 0.5, 0),
    "@media": {
      [breakpoints.down("mobile")]: {
        borderRadius: spacing(0, 0, 0.5, 0.5),
      },
    },
  },
]);

export const term = style({
  fontSize: vars.typography.body1.fontSize,
  lineHeight: vars.typography.body1.lineHeight,
});

export const details = style({
  margin: 0,
  fontSize: vars.typography.body1.fontSize,
  lineHeight: vars.typography.body1.lineHeight,
  fontWeight: vars.typography.body1Bold.fontWeight,
});
