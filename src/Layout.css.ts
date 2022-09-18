import { style } from "@vanilla-extract/css";

export const siteWrapper = style({
  height: "100vh",
  display: "grid",
  gridTemplateAreas: "'top-fold''footer'",
  gridTemplateRows: "1fr max-content",
  gridTemplateColumns: "100%",
});

export const siteBanner = style({
  background: "pink",
});
