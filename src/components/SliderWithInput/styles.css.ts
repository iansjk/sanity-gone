import { globalStyle, style } from "@vanilla-extract/css";
import { sliderUnstyledClasses } from "@mui/base/SliderUnstyled";

import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  display: "flex",
  flexDirection: "row",
  height: spacing(8),
  paddingRight: spacing(2),
  "@media": {
    [breakpoints.down("mobile")]: {
      position: "relative",
      background: vars.colors.neutrals.midtone,
      paddingLeft: spacing(2),
      paddingRight: 0,
      borderRadius: spacing(0.5, 0.5, 0, 0),
    },
  },
});

export const label = style({
  margin: "auto 0",
});

export const sliderBorder = style({
  width: spacing(32),
  height: spacing(3),
  margin: "auto 0",
  padding: spacing(0.5, 2.25),
  borderRadius: spacing(0.5),
  border: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
  "@media": {
    [breakpoints.down("mobile")]: {
      flexGrow: 1,
      width: "100%",
      marginRight: spacing(2),
    },
  },
});

export const slider = style({
  display: "inline-block",
  width: spacing(32),
  height: spacing(3),
  position: "relative",
  cursor: "pointer",
  "@media": {
    [breakpoints.down("mobile")]: {
      width: "100%",
      flexGrow: 1,
    },
  },
});

globalStyle(`${slider} .${sliderUnstyledClasses.track}`, {
  display: "block",
  position: "absolute",
  height: spacing(3),
  marginLeft: spacing(-1.75),
  borderRadius: spacing(0.25),
  backgroundColor: vars.colors.neutrals.midtoneBrighter,
});

globalStyle(`${slider} .${sliderUnstyledClasses.rail}`, {
  display: "block",
  position: "absolute",
  width: "100%",
  height: spacing(3),
  paddingRight: spacing(1.75),
});

globalStyle(`${slider} .${sliderUnstyledClasses.thumb}`, {
  position: "absolute",
  display: "grid",
  marginLeft: spacing(-1.75),
  marginTop: 0,
  borderRadius: spacing(0.25),
  height: spacing(3),
  width: spacing(3.5),
  backgroundAttachment: "fixed",
  background: `url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.5 0.5C0.776143 0.5 1 0.723858 1 1L1 10C1 10.2761 0.776142 10.5 0.5 10.5C0.223858 10.5 -1.20705e-08 10.2761 0 10L3.93396e-07 1C4.05467e-07 0.723858 0.223858 0.5 0.5 0.5Z' fill='%23484858'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.5 0.5C5.77614 0.5 6 0.723858 6 1L6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10L5 1C5 0.723858 5.22386 0.5 5.5 0.5Z' fill='%23484858'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5 0.5C10.7761 0.5 11 0.723858 11 1V10C11 10.2761 10.7761 10.5 10.5 10.5C10.2239 10.5 10 10.2761 10 10V1C10 0.723858 10.2239 0.5 10.5 0.5Z' fill='%23484858'/%3E%3C/svg%3E%0A") no-repeat center ${vars.colors.neutrals.gray}`,
});

globalStyle(`${slider}:hover .${sliderUnstyledClasses.thumb}`, {
  background: `url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0.5 0.5C0.776143 0.5 1 0.723858 1 1L1 10C1 10.2761 0.776142 10.5 0.5 10.5C0.223858 10.5 -1.20705e-08 10.2761 0 10L3.93396e-07 1C4.05467e-07 0.723858 0.223858 0.5 0.5 0.5Z' fill='%2387879B'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5.5 0.5C5.77614 0.5 6 0.723858 6 1L6 10C6 10.2761 5.77614 10.5 5.5 10.5C5.22386 10.5 5 10.2761 5 10L5 1C5 0.723858 5.22386 0.5 5.5 0.5Z' fill='%2387879B'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5 0.5C10.7761 0.5 11 0.723858 11 1V10C11 10.2761 10.7761 10.5 10.5 10.5C10.2239 10.5 10 10.2761 10 10V1C10 0.723858 10.2239 0.5 10.5 0.5Z' fill='%2387879B'/%3E%3C/svg%3E%0A") no-repeat center ${vars.colors.neutrals.white}`,
});

globalStyle(
  `${slider} .${sliderUnstyledClasses.thumb}.${sliderUnstyledClasses.focusVisible}`,
  {
    boxShadow: `0 0 0 0.05em #fff, 0 0 0.15em 0.1em ${vars.colors.accents.blue}`,
  }
);

export const sliderInput = style({
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.colors.neutrals.midtoneDarker,
  width: spacing(5),
  height: spacing(4),
  margin: spacing(2, 1),
  padding: "4px 8px 5px 8px",
  color: vars.colors.neutrals.white,
  border: "none",
  borderRadius: spacing(0.5),
  textAlign: "center",
  fontSize: vars.typography.navigationLink.fontSize,
  lineHeight: vars.typography.navigationLink.lineHeight,
  selectors: {
    "&:focus": {
      outline: "none",
      boxShadow: `0 0 0 0.05em #fff, 0 0 0.15em 0.1em ${vars.colors.accents.blue};`,
    },
  },
});
