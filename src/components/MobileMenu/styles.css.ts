import { style, styleVariants } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const mobileMenuBase = style({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 100,
});

export const mobileMenu = styleVariants({
  close: [mobileMenuBase, { display: "none" }],
  open: [
    mobileMenuBase,
    { display: "block", backgroundColor: "rgba(0, 0, 0, 0.66)" },
  ],
});

export const topBar = style({
  height: "75px",
  padding: spacing(0, 3, 0, 2),
  display: "flex",
  alignItems: "center",
  backgroundColor: vars.colors.neutrals.darktone,
});

export const spacer = style({
  flex: "1 1 0",
});

export const closeButton = style({
  position: "relative",
  background: "none",
  border: "none",
  display: "flex",
  alignItems: "center",
});

export const closeButtonSvg = style({
  fill: vars.colors.neutrals.white,
  height: "24px",
  width: "24px",
  marginRight: spacing(-1),
});

export const listHeader = style({
  margin: 0,
  fontSize: vars.typography.skillTalentHeading.fontSize,
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
  lineHeight: vars.typography.skillTalentHeading.lineHeight,
  color: vars.colors.neutrals.gray,
  borderBottom: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
});

// TODO: Adjust depending on searchbar refactor
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
