import { style } from "@vanilla-extract/css";

import { spacing } from "../../../theme-helpers";
import { vars } from "../../../theme.css";

export const root = style({
  gridColumn: "span 2",
});

export const rowHeader = style({
  padding: spacing(2),
  background: vars.colors.neutrals.black,
  ...vars.typography.body3,
  fontWeight: "normal",
  color: vars.colors.neutrals.gray,
  textAlign: "start",
});

export const operatorRowHeader = style([
  rowHeader,
  {
    background: vars.colors.neutrals.midtoneDarker,
  },
]);
