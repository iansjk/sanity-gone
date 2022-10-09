import { style } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const modulesContainer = style({});

export const button = style({
  position: "relative",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  opacity: 0.34,
  backgroundColor: vars.colors.neutrals.midtoneDarker,
  /* workaround for a Chrome bug where mix-blend-mode: difference breaks backdrop-filter on panels;
           see https://stackoverflow.com/questions/66204563/backdrop-filter-not-working-when-mix-blend-mode-of-another-element-on-the-page-i */
  backdropFilter: "opacity(1)",

  ":hover": {
    opacity: 0.67,
    backgroundColor: vars.colors.neutrals.midtone,
    border: `${spacing(0.25)} solid ${vars.colors.neutrals.gray}`,
  },
  selectors: {
    [`${modulesContainer} &[data-headlessui-state~=selected]`]: {
      opacity: 1,
      backgroundColor: vars.colors.neutrals.white,
      border: `${spacing(0.25)} solid ${vars.colors.neutrals.white}`,
    },
  },
});

export const moduleIcon = style({
  borderRadius: spacing(1),
  selectors: {
    [`${button}[data-headlessui-state~=selected] &`]: {
      mixBlendMode: "difference",
    },
  },
});
