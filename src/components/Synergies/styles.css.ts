import { style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const synergyContainer = style({});

export const tabsContainer = style({
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(2),
      justifyContent: "flex-start",
    },
  },
});

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
    [`${synergyContainer} &[data-headlessui-state~=selected]`]: {
      opacity: 1,
      backgroundColor: vars.colors.neutrals.white,
      border: `${spacing(0.25)} solid ${vars.colors.neutrals.white}`,
    },
  },
});

export const indicator = style({
  display: "block",
  width: "19px",
  height: "15px",
  position: "absolute",
  right: "-4px",
  bottom: "-2px",
});

export const operatorImage = style({
  borderRadius: spacing(1),
});

export const invertOnHighlight = style({
  mixBlendMode: "difference",
});

export const synergyGroup = style({
  ":after": {
    content: `url("data:image/svg+xml,%3Csvg width='19' height='15' viewBox='0 0 19 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 13V14H2H17H18V13C18 10.7398 16.5435 8.81315 14.5155 8.13512C15.7724 7.53028 16.6364 6.23805 16.6364 4.75C16.6364 2.68677 14.9754 1 12.9091 1C11.383 1 10.0781 1.92005 9.5 3.2323C8.92194 1.92005 7.61698 1 6.09091 1C4.02459 1 2.36364 2.68677 2.36364 4.75C2.36364 6.23805 3.2276 7.53028 4.48449 8.13512C2.45647 8.81315 1 10.7398 1 13ZM9.5 6.2677C9.85993 7.08477 10.5017 7.74979 11.3031 8.13533C10.6278 8.36125 10.0157 8.72554 9.5 9.19388C8.98429 8.72554 8.37224 8.36125 7.69688 8.13533C8.49833 7.74979 9.14007 7.08477 9.5 6.2677ZM13.2727 4.75C13.2727 4.96495 13.1021 5.125 12.9091 5.125C12.7161 5.125 12.5455 4.96495 12.5455 4.75C12.5455 4.53505 12.7161 4.375 12.9091 4.375C13.1021 4.375 13.2727 4.53505 13.2727 4.75Z' fill='%23E8E8F2' stroke='%2324242E' stroke-width='2'/%3E%3C/svg%3E%0A")`,
    display: "block",
    width: "19px",
    height: "15px",
    position: "absolute",
    right: "-4px",
    bottom: "-2px",
  },
});

export const syngergyQualityBase = style({
  fontSize: vars.typography.body2.fontSize,
  lineHeight: vars.typography.body2.lineHeight,
  fontWeight: vars.typography.body2Bold.fontWeight,
  textTransform: "uppercase",
  "@media": {
    [breakpoints.up("mobile")]: {
      margin: spacing(0, 0, 2),
      textAlign: "center",
      width: "100%",

      ":before": {
        content: "''",
        display: "block",
        width: spacing(3),
        margin: `${spacing(1)} auto ${spacing(2)}`,
        borderTop: `2px solid ${vars.colors.neutrals.midtoneBrighter};`,
      },
    },
    [breakpoints.down("mobile")]: {
      display: "flex",
      alignItems: "center",
      margin: spacing(0, 2, 0, 0),

      ":before": {
        content: " ",
        display: "block",
        margin: spacing(0, 3, 0, 1),
        borderLeft: `2px solid ${vars.colors.neutrals.midtoneBrighter}`,
        height: spacing(3),
      },
    },
  },
});

export const synergyQuality = styleVariants({
  "quality-2": [
    syngergyQualityBase,
    {
      color: vars.colors.accents.lime,
    },
  ],
  "quality-1": [
    syngergyQualityBase,
    {
      color: vars.colors.accents.blue,
    },
  ],
  "quality-0": [
    syngergyQualityBase,
    {
      color: vars.colors.neutrals.gray,
    },
  ],
  "quality--1": [
    syngergyQualityBase,
    {
      color: vars.colors.accents.red,
    },
  ],
});
