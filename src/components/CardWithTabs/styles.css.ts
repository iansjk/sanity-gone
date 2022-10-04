import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const cardContent = style({
  padding: "0 !important",
});

export const tabWrapper = style({
  display: "flex",
  height: "100%",
  "@media": {
    [breakpoints.down("mobile")]: {
      flexDirection: "column",
    },
  },
});

export const tabPanels = style({
  flexGrow: 1,
  padding: spacing(0, 4, 4),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(0, 2, 2),
    },
  },
});

export const tabButtons = style({
  minWidth: spacing(12),
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: spacing(3, 0, 4),
  background: vars.colors.neutrals.midtone,
  "@media": {
    [breakpoints.down("mobile")]: {
      flexDirection: "row",
      justifyContent: "center",
      padding: spacing(2, 0),
      paddingBottom: 0,
      background: "none",
    },
  },
});

export const buttonBase = style({
  borderRadius: spacing(1),
  width: spacing(6),
  height: spacing(6),
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
  cursor: "pointer",
  backgroundColor: vars.colors.neutrals.midtoneDarker,
  boxSizing: "border-box",
  border: `${spacing(0.25)} solid ${vars.colors.neutrals.midtoneBrighter}`,
  padding: 0,
  marginBottom: spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": {
    borderColor: `var(--accent-color, ${vars.colors.neutrals.midtoneBrighter})`,
  },
  ":last-child": {
    margin: 0,
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      marginBottom: 0,
      marginRight: spacing(2),
      ":last-of-type": {
        marginLeft: 0,
      },
    },
  },
});

export const button = styleVariants({
  default: [buttonBase],
  active: [
    buttonBase,
    {
      borderColor: `var(--accent-color, transparent)`,
      backgroundColor: `var(--accent-color, ${vars.colors.neutrals.midtoneBrighter})`,
      color: vars.colors.neutrals.white,
    },
  ],
});

//TODO: replace these global styles with proper styles once Tabs have been completely migrated
globalStyle(`${buttonBase} svg path`, {
  fill: vars.colors.neutrals.midtoneBrighter,
});

globalStyle(`${button.default}:hover svg path`, {
  fill: `var(--accent-color, ${vars.colors.neutrals.midtoneBrighter})`,
});

globalStyle(`${buttonBase}.inactive:hover`, {
  borderColor: vars.colors.neutrals.gray,
  color: vars.colors.neutrals.gray,
});
