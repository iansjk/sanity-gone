import { style } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 100,
});

export const overlay = style({
  position: "fixed",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.66)",
});

export const content = style({
  isolation: "isolate",
});

export const topBar = style({
  height: "75px",
  padding: spacing(0, 1, 0, 2),
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
  backgroundColor: vars.colors.neutrals.darktone,
});

export const closeButton = style({
  gridColumn: 3,
  width: spacing(6),
  height: spacing(6),
  padding: 0,
  background: "none",
  border: "none",
});

export const closeButtonSvg = style({
  fill: vars.colors.neutrals.white,
  width: 24,
  height: 24,
});

export const searchBarContainer = style({
  background: vars.colors.neutrals.midtone,
  padding: spacing(2, 0),
  margin: 0,
});

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const listLink = style({
  color: vars.colors.neutrals.white,
  margin: 0,
  display: "block",
  padding: spacing(3),
  backgroundColor: vars.colors.neutrals.midtone,
});
