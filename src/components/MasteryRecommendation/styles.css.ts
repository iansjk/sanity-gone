import { style } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const title = style({
  fontSize: vars.typography.generalHeading.fontSize,
  lineHeight: vars.typography.generalHeading.lineHeight,
  fontWeight: vars.typography.generalHeadingBold.fontWeight,
});

export const masteryRecommendation = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: spacing(0.25),
  "@media": {
    [breakpoints.down("mobile")]: {
      gridTemplateColumns: "unset",
    },
  },
});

export const row = style({
  flexDirection: "row",
  alignItems: "center",
});

export const recommendedRank = style([
  row,
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
  row,
  {
    borderRadius: spacing(0, 0.5, 0.5, 0),
    "@media": {
      [breakpoints.down("mobile")]: {
        borderRadius: spacing(0, 0, 0.5, 0.5),
      },
    },
  },
]);

export const descriptionTitle = style({
  fontSize: vars.typography.body1.fontSize,
  lineHeight: vars.typography.body1.lineHeight,
});

export const description = style({
  margin: 0,
  fontSize: vars.typography.body1.fontSize,
  lineHeight: vars.typography.body1.lineHeight,
  fontWeight: vars.typography.body1Bold.fontWeight,
});
