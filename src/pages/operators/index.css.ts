import { globalStyle, style } from "@vanilla-extract/css";
import { rgba, tint } from "polished";
import { breakpoints, spacing } from "../../theme-helpers";
import { rawColors, vars } from "../../theme.css";

export const main = style({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 0",
});

export const mainContainer = style({
  maxWidth: breakpoints.maxWidth,
  margin: "0 auto",
  width: "100%",
});

globalStyle(`${mainContainer} > *`, {
  padding: spacing(0, 3),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: 0,
    },
  },
});

export const lastUpdated = style({
  padding: spacing(0, 3),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(0, 2),
    },
  },
});

export const lastUpdatedDate = style({
  fontWeight: vars.typography.body1Bold.fontWeight,
});

export const mobileSortFilterScroller = style({
  whiteSpace: "nowrap",
});

export const sortAndFilterOptions = style({
  alignItems: "center",
  margin: spacing(2, 0, 3),
  fontSize: vars.typography.navigationLink.fontSize,
  lineHeight: vars.typography.navigationLink.lineHeight,
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(4, auto) 1fr",
  "@media": {
    [breakpoints.down("mobile")]: {
      display: "flex",
      backgroundColor: `${rgba(rawColors.neutrals.darktone, 0.66)}`,
      padding: spacing(2, 0),
      margin: spacing(2, 0, 0),
    },
  },
});

export const guideAvailableCheckbox = style({
  gridColumn: -1,
});

globalStyle(`${sortAndFilterOptions} > * ~ *`, {
  marginLeft: spacing(2),
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: 0,
    },
  },
});

export const filterVisualLabel = style({
  fontSize: vars.typography.skillTalentHeading.fontSize,
  lineHeight: vars.typography.skillTalentHeading.lineHeight,
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
});

globalStyle(`${filterVisualLabel} svg`, {
  marginRight: spacing(1),
});

export const scrollerContents = style({
  padding: spacing(0, 2),
  flexGrow: 1,
});

globalStyle(`${scrollerContents} > * ~ *`, {
  marginLeft: spacing(2),
});

export const sortAndFilterButton = style({
  display: "grid",
  gridAutoFlow: "column",
  columnGap: spacing(1),
  transitionProperty: "background-color, box-shadow, border-color",
  fontWeight: vars.typography.navigationLinkBold.fontWeight,
});

export const resetFiltersButton = style([
  sortAndFilterButton,
  {
    backgroundColor: `${rgba(rawColors.neutrals.white, 0.08)}`,
    color: `${rgba(rawColors.neutrals.white, 0.8)}`,
    border: "none",
    borderRadius: spacing(0.25),
    lineHeight: vars.typography.body1.lineHeight,
    cursor: "pointer",
    transition: "all 50ms ease-out, margin-bottom 0ms",
    fontWeight: 500,
    selectors: {
      "&:hover": {
        color: `${tint(0.27, rawColors.neutrals.white)}`,
        backgroundColor: `${rgba(rawColors.neutrals.white, 0.4)}`,
      },
    },
  },
]);

export const toggleButtonContainer = style({
  display: "flex",
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(2, 2, 0),
      backgroundColor: `${rgba(rawColors.neutrals.midtone, 0.66)}`,
    },
  },
});

export const toggleClassDescriptionsButton = style({
  display: "flex",
  alignItems: "center",
  backgroundColor: `${rgba(rawColors.neutrals.white, 0.08)}`,
  color: `${rgba(rawColors.neutrals.white, 0.8)}`,
  border: "none",
  borderRadius: spacing(0.25),
  lineHeight: vars.typography.body1.lineHeight,
  cursor: "pointer",
  transition: "all 50ms ease-out, margin-bottom 0ms",
  margin: spacing(0, 2, 2, 0),
  selectors: {
    "&:hover": {
      color: `${tint(0.27, rawColors.neutrals.white)}`,
      backgroundColor: `${rgba(rawColors.neutrals.white, 0.4)}`,
    },
    '&[aria-expanded="true"]': {
      marginBottom: 0,
    },
  },
});

globalStyle(`${toggleClassDescriptionsButton} svg`, {
  transition: "transform 50ms ease-in-out",
  marginLeft: 10,
  width: 13,
  height: 13,
});

globalStyle(`${toggleClassDescriptionsButton}[aria-expanded="true"] svg`, {
  transform: "rotate(90deg)",
});

export const classSubclassDescriptions = style({
  margin: spacing(1, 3, 0),
  padding: 0,
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: 0,
      backgroundColor: `${rgba(rawColors.neutrals.midtone, 0.66)}`,
    },
  },
});

const descriptionCard = style({
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  alignItems: "center",
});

export const nameContainer = style({
  display: "flex",
  alignItems: "center",
  padding: spacing(3, 0, 0, 4),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(2, 0, 0),
    },
  },
});

globalStyle(`${nameContainer} h2, h3`, {
  margin: spacing(0, 1.5, 0, 0),
  fontSize: vars.typography.generalHeading.fontSize,
  lineHeight: vars.typography.generalHeading.lineHeight,
  fontWeight: vars.typography.generalHeadingBold.fontWeight,
  textTransform: "uppercase",
});

export const headingType = style({
  color: `${rgba(rawColors.neutrals.white, 0.5)}`,
  fontSize: vars.typography.generalHeading.fontSize,
  lineHeight: vars.typography.generalHeading.lineHeight,
});

export const traitInfoContainer = style({
  padding: spacing(0, 4),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(1, 2, 0),
      gridColumn: "1 / span 2",
    },
  },
});

export const classOrSubclassDescription = style({
  padding: spacing(3, 4),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(2),
      gridColumn: "1 / span 2",
    },
  },
});

globalStyle(`${classOrSubclassDescription} p`, {
  margin: 0,
});

export const classDescriptionCard = style([descriptionCard, {}]);

export const subclassDescriptionCard = style([
  descriptionCard,
  {
    marginBottom: spacing(3),
    backgroundColor: vars.colors.neutrals.midtoneExtra,
    borderTop: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
    borderBottomLeftRadius: spacing(1),
    borderBottomRightRadius: spacing(1),
    "@media": {
      [breakpoints.down("mobile")]: {
        margin: 0,
        backgroundColor: vars.colors.neutrals.midtone,
      },
    },
  },
]);

export const descriptionIconContainer = style({
  boxSizing: "border-box",
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: spacing(4),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(2, 2, 0, 2),
      gridRow: "unset",
    },
  },
  selectors: {
    [`${classDescriptionCard}:not(:last-child) &`]: {
      borderBottom: `${spacing(1)} solid ${vars.colors.neutrals.gray}`,
      "@media": {
        [breakpoints.down("mobile")]: {
          borderBottom: "none",
        },
      },
    },
  },
});

export const descriptionIcon = style({
  margin: "auto",
  width: spacing(8),
  height: spacing(8),
  "@media": {
    [breakpoints.down("mobile")]: {
      width: spacing(3),
      height: spacing(3),
    },
  },
});

export const classDescriptionIconContainer = style([
  descriptionIconContainer,
  {
    gridRow: "span 2",
  },
]);

export const subclassDescriptionIconContainer = style([
  descriptionIconContainer,
  {
    gridRow: "span 3",
    backgroundColor: vars.colors.neutrals.midtone,
    borderBottomLeftRadius: spacing(1),
  },
]);

export const resultsContainer = style({
  backgroundColor: vars.colors.neutrals.darktone,
  borderTop: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
  flex: "1 1 0",
  "@media": {
    [breakpoints.down("mobile")]: {
      borderTop: "none",
    },
  },
});

export const results = style({
  margin: `${spacing(3)} auto ${spacing(9.5)} auto`,
  maxWidth: breakpoints.maxWidth,
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(0, 0, 4),
      padding: spacing(2),
    },
  },
});

export const resultsHeading = style({
  fontSize: vars.typography.generalHeading.fontSize,
  lineHeight: vars.typography.generalHeading.lineHeight,
  fontWeight: vars.typography.generalHeadingBold.fontWeight,
  margin: spacing(0, 3),
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: 0,
    },
  },
});
