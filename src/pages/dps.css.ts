import { style } from "@vanilla-extract/css";

export const root = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gridTemplateRows: "repeat(3, auto)",
  justifyItems: "start",
});

export const compareCheckbox = style({
  gridColumn: "span 2",
});
