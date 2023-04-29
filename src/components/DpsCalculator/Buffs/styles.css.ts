import { style } from "@vanilla-extract/css";

import { vars } from "../../../theme.css";

export const attackIconPath = style({
  fill: vars.colors.accents.red,
});

export const attackSpeedIconPath = style({
  fill: vars.colors.accents.yellow,
});

export const spIconPath = style({
  fill: vars.colors.accents.lime,
});
