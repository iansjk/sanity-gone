import { style } from "@vanilla-extract/css";

import { spacing } from "../theme-helpers";

export const root = style({
  display: "grid",
  padding: spacing(3, 3, 5),
  gridTemplateColumns: "auto 1fr",
  gridTemplateRows: "repeat(3, auto)",
  justifyItems: "start",
  gap: spacing(3),
});

export const compareCheckbox = style({
  gridColumn: "span 2",
});
