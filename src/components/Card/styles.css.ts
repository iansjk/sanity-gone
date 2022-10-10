import { globalStyle, style } from "@vanilla-extract/css";
import { transparentize } from "polished";
import { breakpoints, spacing } from "../../theme-helpers";
import { rawColors, vars } from "../../theme.css";
import { cardWithTabsRoot } from "../CardWithTabs/styles.css";

export const root = style({
  borderRadius: spacing(1),
  padding: 0,
  boxShadow: `${spacing(0.25)} ${spacing(0.5)} ${spacing(
    1
  )} rgba(0, 0, 0, 0.05)`,
});

export const headingBlock = style({
  padding: spacing(2, 0, 2, 4),
  borderTopRightRadius: spacing(1),
  "@media": {
    [breakpoints.down("mobile")]: {
      display: "none",
    },
  },
});

export const heading = style({
  margin: 0,
  textTransform: vars.typography.cardHeading.textTransform,
  fontSize: vars.typography.cardHeading.fontSize,
  fontWeight: vars.typography.cardHeading.fontWeight,
  lineHeight: vars.typography.cardHeading.lineHeight,
  color: vars.colors.neutrals.white,
});

export const cardContent = style({
  padding: spacing(3, 4, 4),
  background: transparentize(0.34, rawColors.neutrals.midtone),
  borderBottomRightRadius: spacing(1),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(2),
      borderBottomRightRadius: "unset",
    },
  },
  selectors: {
    [`${cardWithTabsRoot} &`]: {
      padding: 0,
    },
  },
});

globalStyle(`${cardContent} > p`, {
  margin: spacing(3, 0, 0),
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(2, 0, 0),
    },
  },
});
