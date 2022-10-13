import { globalStyle, style } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";

export const root = style({
  margin: spacing(0, -3),
});

export const button = style({
  padding: spacing(2, 3),
});

globalStyle(`${button} + ${button}`, {
  marginLeft: spacing(1.5),
});
