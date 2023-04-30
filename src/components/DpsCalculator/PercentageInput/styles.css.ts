import { style } from "@vanilla-extract/css";

import { vars } from "../../../theme.css";

export const root = style({
  position: "relative",
  gridColumn: -1,
});

export const percentSignText = style({
  ...vars.typography.navigationLink,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  top: 0,
  bottom: 0,
  left: 15,
  paddingLeft: 2,
  color: vars.colors.neutrals.midtoneBrighterer,
  userSelect: "none",
});

export const dummySpan = style({
  position: "absolute",
  visibility: "hidden",
});
