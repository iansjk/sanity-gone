import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

const base = style({
  display: "inline-grid",
  gridAutoFlow: "column",
  columnGap: spacing(1),
  alignItems: "center",
});

export const label = styleVariants({
  disabled: [
    base,
    {
      opacity: 0.3,
    },
  ],
  enabled: [
    base,
    {
      cursor: "pointer",
    },
  ],
});

export const checkboxContainer = style({
  display: "grid",
  gridTemplateColumns: "20px",
  gridTemplateRows: "20px",
  alignItems: "center",
  justifyItems: "center",
});

globalStyle(`${checkboxContainer} > *`, {
  gridRow: 1,
  gridColumn: 1,
});

export const checkboxInput = style({
  opacity: 0,
  width: 20,
  height: 20,
  selectors: {
    [`${label.enabled} &`]: {
      cursor: "pointer",
    },
  },
});

export const checkboxControl = style({
  width: 14,
  height: 14,
  padding: 2,
  backgroundClip: "content-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${vars.colors.neutrals.white}`,
  borderRadius: spacing(0.5),
  selectors: {
    [`${checkboxInput}:checked + &`]: {
      borderColor: vars.colors.accents.blue,
      backgroundColor: vars.colors.accents.blue,
    },
    [`${checkboxInput}:focus-visible + &`]: {
      boxShadow: `0 0 0 0.05em #fff, 0 0 0.15em 0.1em ${vars.colors.accents.blue}`,
    },
  },
});
