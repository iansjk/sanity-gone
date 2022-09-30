import { styleVariants } from "@vanilla-extract/css";
import { globalStyle, style } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  display: "grid",
  gridTemplateRows: "repeat(3, max-content)",
  gridTemplateColumns: "672fr 244fr",
  gap: spacing(0.25),
  marginTop: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      marginTop: spacing(2),
    },
  },
});

globalStyle(`${root} > *`, {
  backgroundColor: vars.colors.neutrals.midtoneDarker,
});

export const rootNoRange = style([
  root,
  {
    gridTemplateColumns: "1fr",
  },
]);

export const talentName = style({
  fontSize: vars.typography.skillTalentHeading.fontSize,
  lineHeight: vars.typography.skillTalentHeading.lineHeight,
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
  padding: spacing(2),
  margin: 0,
  borderTopLeftRadius: spacing(0.5),
  selectors: {
    [`${rootNoRange} &`]: {
      borderRadius: spacing(0.5, 0.5, 0, 0),
      gridColumnStart: 1,
      gridColumn: "span 2",
    },
  },
});

export const talentDescription = style({
  margin: 0,
  padding: spacing(2),
  borderBottomLeftRadius: spacing(0.5),
  selectors: {
    [`${rootNoRange} &`]: {
      borderRadius: spacing(0, 0, 0.5, 0.5),
      gridColumnStart: 1,
      gridColumn: "span 2",
    },
  },
});

export const talentHeader = style({
  height: spacing(8),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gridColumn: "span 2",
  marginBottom: spacing(-0.25),
  borderBottom: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
  background: vars.colors.neutrals.midtone,
  borderRadius: spacing(0.5, 0.5, 0, 0),
  "@media": {
    [breakpoints.down("mobile")]: {
      paddingRight: spacing(2),
    },
  },
});

export const eliteButtonGroup = style({
  marginRight: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      marginRight: 0,
      flexGrow: 1,
    },
  },
});

export const eliteButton = style({
  height: spacing(8),

  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(0, 1.5),
      borderRadius: 0,
      selectors: {
        "&:first-of-type": {
          borderTopLeftRadius: spacing(0.5),
        },
      },
    },
  },
});

export const range = style({
  gridColumn: 2,
  gridRow: "2 / span 2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: spacing(0, 0.5, 0.5, 0),
});
