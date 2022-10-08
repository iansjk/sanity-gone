import { style } from "@vanilla-extract/css";
import { rgba } from "polished";
import { spacing } from "../theme-helpers";
import { rawColors, vars } from "../theme.css";

export const root = style({
  padding: spacing(0, 3),
});

export const pageHeading = style({
  margin: spacing(4, 0, 0),
  fontSize: vars.typography.generalHeadingBold.fontSize,
  fontWeight: vars.typography.generalHeadingBold.fontWeight,
  lineHeight: vars.typography.generalHeadingBold.lineHeight,
});

export const teamMembers = style({
  margin: spacing(4, 0, 0),
  padding: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
  listStyle: "none",
  gap: spacing(3),
  textAlign: "center",
});

export const memberCard = style({
  padding: spacing(4),
  display: "grid",
  gridTemplateRows: "repeat(3, max-content)",
  justifyItems: "center",
  backgroundColor: rgba(rawColors.neutrals.midtone, 0.66),
  backdropFilter: `blur(${spacing(1)})`,
  boxShadow: `${spacing(0.25)} ${spacing(0.5)} ${spacing(
    1
  )} rgba(0, 0, 0, 0.15)`,
  borderRadius: spacing(1),
});

export const avatar = style({
  borderRadius: "50%",
});

export const memberName = style({
  margin: spacing(2, 0, 0),
  fontSize: vars.typography.generalHeadingBold.fontSize,
  fontWeight: vars.typography.generalHeadingBold.fontWeight,
  lineHeight: vars.typography.generalHeadingBold.lineHeight,
});

export const memberRole = style({
  color: vars.colors.neutrals.gray,
});

export const specialThanksHeading = style({
  margin: spacing(3, 0, 0),
});
