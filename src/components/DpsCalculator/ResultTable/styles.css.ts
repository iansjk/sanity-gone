import { globalStyle, style } from "@vanilla-extract/css";

import { spacing } from "../../../theme-helpers";
import { vars } from "../../../theme.css";

export const root = style({
  gridColumn: "span 2",
});

globalStyle(`${root} tbody > tr:last-of-type th[scope="row"]`, {
  borderBottomLeftRadius: spacing(0.5),
  borderBottomRightRadius: spacing(0.5),
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
    borderTopLeftRadius: spacing(0.5),
    borderTopRightRadius: spacing(0.5),
  },
]);

export const newOperator = style({
  minWidth: 251,
  minHeight: 293,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "unset",
  border: "1px solid",
  borderColor: vars.colors.neutrals.midtone,
  borderRadius: spacing(0.5),
  cursor: "pointer",
});

export const newOperatorIconPath = style({
  fill: vars.colors.neutrals.midtoneBrighterer,
});
