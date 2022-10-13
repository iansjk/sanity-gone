import { style, globalStyle } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";

export const root = style({
  width: "calc(100vw - var(--scrollbar-width, 0px))",
  overflow: "auto",
  boxSizing: "border-box",
});

export const scrollerContents = style({
  display: "flex",
  alignItems: "center",
  padding: spacing(0, 2),
  flexGrow: 1,
  overflow: "auto",
  whiteSpace: "nowrap",
  maskImage: `linear-gradient(
    to right,
    transparent,
    black clamp(0px, var(--scroll-left, 0px), ${spacing(3)}),
    black calc(
      100% - clamp(
        0px,
        calc(
          var(--scroll-width, 999px) - var(--offset-width, 0px) - var(--scroll-left, 0px)
        ),
        ${spacing(3)}
      )
    ), transparent)`,
});

globalStyle(`${scrollerContents} > *`, { flexShrink: 0 });

globalStyle(`${scrollerContents} > * ~ *`, {
  marginLeft: spacing(2),
});
