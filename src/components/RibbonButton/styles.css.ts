import { style } from "@vanilla-extract/css";
import { rgba } from "polished";
import { breakpoints, spacing } from "../../theme-helpers";
import { rawColors, vars } from "../../theme.css";

export const root = style({
  minWidth: 40,
  height: 64,
  padding: spacing(0, 2),
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: vars.colors.neutrals.white,
  color: vars.colors.neutrals.midtoneBrighterer,
  backgroundColor: "unset",
  cursor: "pointer",
  transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(0, 1.5),
      borderTopLeftRadius: spacing(0.5),
      borderTopRightRadius: spacing(0.5),
    },
  },
  selectors: {
    "&:hover": {
      backgroundColor: rgba(rawColors.neutrals.white, 0.04),
    },
    "&:first-of-type": {
      borderTopLeftRadius: spacing(0.5),
    },
    "&:active": {
      backgroundColor: rgba(rawColors.neutrals.white, 0.3),
    },
  },
});

export const active = style({
  paddingTop: 3, // to keep the contents from shifting when switching between active/inactive
  color: vars.colors.neutrals.white,
  backgroundColor: vars.colors.neutrals.midtoneBrighter,
  borderBottomWidth: 3,
  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.neutrals.midtoneBrighter,
    },
    "&:active": {
      backgroundColor: rgba(rawColors.neutrals.white, 0.3),
    },
  },
});
