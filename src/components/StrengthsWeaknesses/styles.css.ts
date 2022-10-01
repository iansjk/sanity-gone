import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const container = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "repeat(2, max-content)",
  gap: spacing(0.25),
  margin: spacing(3, 0, 0),
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(2, 0, 0),
      gridTemplateColumns: "1fr",
      gridTemplateRows: "repeat(4, max-content)",
    },
  },
});

globalStyle(`${container} > *`, {
  margin: 0,
  backgroundColor: vars.colors.neutrals.midtoneDarker,
});

export const titleBase = style({
  padding: spacing(2, 3),
  fontSize: vars.typography.generalHeading.fontSize,
  fontWeight: 400,
  lineHeight: vars.typography.generalHeading.lineHeight,
});

export const title = styleVariants({
  strengths: [
    titleBase,
    {
      color: vars.colors.accents.lime,
      borderTopLeftRadius: spacing(0.5),
      "@media": {
        [breakpoints.down("mobile")]: {
          borderTopRightRadius: spacing(0.5),
        },
      },
    },
  ],
  weaknesses: [
    titleBase,
    {
      color: vars.colors.accents.red,
      borderTopRightRadius: spacing(0.5),
      "@media": {
        [breakpoints.down("mobile")]: {
          borderRadius: 0,
        },
      },
    },
  ],
});

export const listBase = style({
  gridRow: 2,
});

export const list = styleVariants({
  strengths: [
    listBase,
    {
      borderBottomLeftRadius: spacing(0.5),
      "@media": {
        [breakpoints.down("mobile")]: {
          borderRadius: 0,
        },
      },
    },
  ],
  weaknesses: [
    listBase,
    {
      borderBottomRightRadius: spacing(0.5),
      "@media": {
        [breakpoints.down("mobile")]: {
          gridRow: 4,
          borderBottomLeftRadius: spacing(0.5),
        },
      },
    },
  ],
});

globalStyle(`${listBase} ul`, {
  listStyleType: "none",
  margin: 0,
  padding: spacing(2, 3),
});

globalStyle(`${listBase} li`, {
  marginLeft: spacing(2),
  textIndent: `-${spacing(2 + 2 + 1)}`,
});

globalStyle(`${listBase} li:before`, {
  content: "",
  display: "inline-block",
  width: spacing(1),
  margin: spacing(0, 2),
  verticalAlign: "middle",
  borderTop: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
  borderBottom: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
});

globalStyle(`${listBase} li ~ li`, {
  marginTop: spacing(1),
});
