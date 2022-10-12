import { style } from "@vanilla-extract/css";
import { transparentize } from "polished";
import { breakpoints, spacing } from "../../theme-helpers";
import { rawColors, vars } from "../../theme.css";
import { heading as defaultHeading } from "../../components/Layout/styles.css";

export const tabContainer = style({
  padding: spacing(0, 3),
  margin: spacing(3, 0, 0),
  display: "grid",
  gridTemplateRows: "max-content max-content 1fr",
  gridTemplateColumns: "max-content 1fr",
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(2, 0, 0),
      padding: 0,
      gridTemplateColumns: "1fr",
    },
  },
});

export const tabButtons = style({
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
  "@media": {
    [breakpoints.down("mobile")]: {
      backgroundColor: transparentize(0.34, rawColors.neutrals.darktone),
      backdropFilter: "blur(8px)",
      flexDirection: "row",
    },
  },
});

export const button = style({
  width: "192px",
  height: spacing(6),
  paddingLeft: spacing(2),
  marginTop: spacing(1),
  textAlign: "start",
  lineHeight: vars.typography.navigationLink.lineHeight,
  border: 0,
  borderRadius: spacing(0.5, 0, 0, 0.5),
  background: "none",
  color: vars.colors.neutrals.gray,
  cursor: "pointer",
  selectors: {
    "&:hover:not([data-headlessui-state~=selected])": {
      backgroundColor: transparentize(0.9, rawColors.neutrals.gray),
      color: vars.colors.neutrals.white,
    },
    "&[data-headlessui-state~=selected]": {
      background: `linear-gradient(
            90deg,
            var(--accent-color-transparentized-09),
            var(--accent-color-transparentized-08)
          )`,
      color: `rgb(var(--accent-color-tinted-027))`,
      borderRight: `3px solid rgb(var(--accent-color-tinted-027))`,
      fontWeight: vars.typography.navigationLinkBold.fontWeight,
    },
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: 0,
      height: "unset",
      boxSizing: "border-box",
      padding: spacing(2),
      width: "max-content",
      position: "relative",
      background: "none",
      border: "none",
      fontSize: vars.typography.cardHeading.fontSize,
      fontWeight: vars.typography.cardHeading.fontWeight,
      lineHeight: vars.typography.cardHeading.lineHeight,
      textTransform: vars.typography.cardHeading.textTransform,
      selectors: {
        "&[data-headlessui-state~=selected]": {
          border: "none",
          background: "none",
          color: "var(--accent-color)",
          fontWeight: vars.typography.cardHeading.fontWeight,
        },
        "&[data-headlessui-state~=selected]:after": {
          content: " ",
          display: "inline-block",
          width: spacing(4),
          position: "absolute",
          left: `calc(50% - ${spacing(2)})`,
          bottom: 0,
          borderBottomWidth: "3px",
          borderBottomStyle: "solid",
        },
      },
    },
  },
});

export const leftSidebar = style({
  gridRowStart: 2,
  paddingRight: spacing(4),
  "@media": {
    [breakpoints.down("mobile")]: {
      gridRow: 3,
      padding: spacing(0, 2, 3),
    },
  },
});

export const separator = style({
  border: 0,
  borderTop: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
  margin: spacing(3, 0, 0, 0),
});

export const leftSidebarSection = style({
  paddingLeft: spacing(2),
  marginTop: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: 0,
    },
  },
});

export const sectionLabel = style({
  display: "block",
  marginBottom: spacing(1),
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
  color: vars.colors.neutrals.gray,
});

const accentColorEmphasizedLink = style({
  transition: "all 50ms ease-out",
  color: "rgba(var(--accent-color-tinted-027), 0.66)",
  backgroundColor: "rgba(var(--accent-color-rgb), 0.08)",

  ":hover": {
    color: "rgb(var(--accent-color-tinted-027))",
    backgroundColor: "rgba(var(--accent-color-rgb), 0.4)",
  },
});

export const externalLink = style([
  accentColorEmphasizedLink,
  {
    marginRight: spacing(1),
    display: "inline-block",
    padding: spacing(0, 0.5),
    borderRadius: spacing(0.25),
  },
]);

export const lastUpdated = style({
  fontStyle: "italic",
});

export const panels = style({
  gridRowStart: "span 3",
  gridColumn: "2 / span 2",
  marginLeft: "-1px",
  height: "100%",
  borderLeft: `1px solid ${vars.colors.neutrals.gray}`,
  position: "relative",
  ":before": {
    content: "''",
    backdropFilter: "blur(8px)",
    position: "absolute",
    width: "100%",
    height: "350px",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      gridRow: 2,
      gridColumn: 1,
      border: "none",
      backdropFilter: "unset",
    },
  },
});

export const header = style({
  height: spacing(30.5),
  "@media": {
    [breakpoints.down("mobile")]: {
      position: "relative",

      "::before": {
        content: '""',
        position: "absolute",
        bottom: -16,
        left: 0,
        width: "100%",
        height: 260,
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0) 63.34%, rgba(0, 0, 0, 0.5) 100%)",
      },
    },
  },
});

export const headingAndBreadcrumb = style({
  "@media": {
    [breakpoints.down("mobile")]: {
      zIndex: 1,
    },
  },
});

export const heading = style([
  defaultHeading,
  {
    ...vars.typography.operatorPageHeading,
    textShadow: vars.shadows.titleShadow,
    "@media": {
      [breakpoints.down("mobile")]: {
        marginTop: 0,
        ...vars.typography.operatorNameHeading,
      },
    },
  },
]);

export const alterName = style({
  marginTop: 0,
  ...vars.typography.generalHeading,
  fontWeight: "normal",
  display: "block",
});

export const breadcrumbLink = accentColorEmphasizedLink;

export const cardHeadingBlock = style({
  background: `linear-gradient(to right, var(--accent-color-transparentized-09),
    transparent
  ),
  ${transparentize(0.67, rawColors.neutrals.midtoneBrighter)}`,
});

export const cardHeading = style({
  color: "rgb(var(--accent-color-tinted-027))",
});

export const imgEmbed = style({
  width: `min(100vw - 32px, 360px)`,
  display: "block",
  margin: "0 auto",
});
