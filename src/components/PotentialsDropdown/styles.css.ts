import { style } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

export const svg = style({
  width: 19,
  height: 18,
});

export const noPotentialSvgPath = style({
  fill: vars.colors.neutrals.gray,
});
