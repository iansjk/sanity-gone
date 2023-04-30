import { globalStyle, style } from "@vanilla-extract/css";

import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const configSection = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridTemplateRows: "auto 1fr",
  alignItems: "center",
  columnGap: spacing(4),
  rowGap: spacing(3),
});

export const configHeading = style({
  display: "inline-flex",
  margin: 0,
  alignItems: "center",
  fontWeight: "initial",
  ...vars.typography.body2,
});

export const configHeadingSeparator = style({
  margin: "-1px 0 0",
  borderTopWidth: 0,
  borderStyle: "solid",
  borderColor: vars.colors.neutrals.midtoneBrighterer,
});

export const knobs = style({
  gridColumn: "span 2",
  padding: spacing(2),
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridTemplateRows: "repeat(3, auto)",
  gridAutoFlow: "column",
  background: vars.colors.neutrals.midtone,
  boxShadow: vars.shadows.baseShadow,
  columnGap: spacing(4),
  rowGap: spacing(1),
  borderRadius: spacing(0.5),
});

globalStyle(`${knobs} > *`, {
  display: "grid",
  gridTemplateColumns: "14px 90px",
  alignItems: "center",
  columnGap: spacing(1),
  whiteSpace: "nowrap",
  ...vars.typography.body3,
  color: vars.colors.neutrals.gray,
});

globalStyle(`${knobs} input`, {
  gridColumn: -1,
  padding: spacing(0.5, 1),
  font: "inherit",
  color: "inherit",
  background: vars.colors.neutrals.midtoneDarker,
  border: "none",
  borderRadius: spacing(0.25),
  ...vars.typography.navigationLinkBold,
  lineHeight: "23px",
});
