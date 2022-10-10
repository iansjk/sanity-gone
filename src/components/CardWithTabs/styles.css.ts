import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";
import { synergyContainer } from "../Synergies/styles.css";

export const cardWithTabsRoot = style({});

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

export const button = style({
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
    borderColor: `var(--accent-color, ${vars.colors.neutrals.white})`,
  },
  selectors: {
    "&[data-headlessui-state~=selected]": {
      borderColor: `var(--accent-color, ${vars.colors.neutrals.white})`,
      backgroundColor: `var(--accent-color, ${vars.colors.neutrals.white})`,
      color: vars.colors.neutrals.white,
    },
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      marginBottom: 0,
      marginRight: spacing(2),
    },
  },
});

export const romanNumerals = style({
  fill: vars.colors.neutrals.midtoneBrighter,

  selectors: {
    [`${button}[data-headlessui-state~=selected] &`]: {
      fill: vars.colors.neutrals.darktone,
    },
    [`${button}:not([data-headlessui-state~=selected]):hover &`]: {
      fill: `var(--accent-color, ${vars.colors.neutrals.white})`,
    },
  },
});

// globalStyle(`${buttonBase}:not(${button.active}):hover svg path`, {
//   fill: `var(--accent-color, ${vars.colors.neutrals.midtoneBrighter})`,
// });

// globalStyle(`${buttonBase}.inactive:hover`, {
//   borderColor: vars.colors.neutrals.gray,
//   color: vars.colors.neutrals.gray,
// });
