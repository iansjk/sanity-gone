import { style, globalStyle } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";

export const scrollerContents = style({
  padding: spacing(0, 2),
  flexGrow: 1,
});

globalStyle(`${scrollerContents} > * ~ *`, {
  marginLeft: spacing(2),
});
