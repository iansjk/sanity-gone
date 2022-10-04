import { styleVariants } from "@vanilla-extract/css";
import { vars } from "../../../theme.css";

export const eliteIconPath = styleVariants({
  inactive: { fill: vars.colors.neutrals.midtoneBrighterer },
  active: { fill: vars.colors.neutrals.white },
});

export const eliteZeroIconPath = styleVariants({
  inactive: {
    fill: "transparent",
    stroke: vars.colors.neutrals.midtoneBrighterer,
  },
  active: { fill: "transparent", stroke: vars.colors.neutrals.white },
});
