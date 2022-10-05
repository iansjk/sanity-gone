import { style } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const statsChangeList = style({
  margin: 0,
  padding: 0,
  listStyleType: "none",
});

export const statChangeValue = style({
  color: vars.colors.accents.blue,
});

export const statsChangeListItem = style({
  display: "flex",
  alignItems: "center",
});

export const statsChangeListItemIcon = style({
  width: "18px",
  height: "17px",
  marginRight: spacing(1),
});

export const potentialDescription = style({
  color: vars.colors.neutrals.gray,
});
