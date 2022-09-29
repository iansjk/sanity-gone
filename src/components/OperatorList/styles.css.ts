import { style } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const noResults = style({
  margin: spacing(3, 0),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.colors.neutrals.midtoneBrighterer,
});
