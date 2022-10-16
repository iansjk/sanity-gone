import { globalStyle, style } from "@vanilla-extract/css";
import { rgba, tint, transparentize } from "polished";
import { breakpoints, spacing } from "../../theme-helpers";
import { rawColors, vars } from "../../theme.css";

const defaultBlendPoint = "576px";

globalStyle("html", {
  ...vars.typography.body1,
  fontFamily: `${vars.typography.fontFamily}, Arial, sans-serif`,
  color: vars.colors.neutrals.white,
  backgroundColor: vars.colors.neutrals.darktone,
  overflowY: "scroll",
  scrollbarWidth: "auto",
  scrollbarColor: `${rgba(rawColors.neutrals.white, 0.8)} transparent`,
  "@media": {
    [breakpoints.down("mobile")]: {
      fontSize: vars.typography.body2.fontSize,
    },
  },
});

globalStyle("html, body, #__next", {
  height: "100%",
});

globalStyle("b, strong", {
  fontWeight: vars.typography.body1Bolder.fontWeight,
});

globalStyle("a, a:link, a:visited", {
  textDecoration: "none",
});

globalStyle(".emphasized-link", {
  display: "inline-block",
  padding: spacing(0, 0.5),
  borderRadius: spacing(0.25),
  transition: "all 50ms ease-out",
  color: rgba(tint(0.27, rawColors.accents.blue), 0.66),
  backgroundColor: rgba(rawColors.accents.blue, 0.08),
});

globalStyle(".emphasized-link:hover", {
  color: tint(0.27, rawColors.accents.blue),
  backgroundColor: rgba(rawColors.accents.blue, 0.4),
});

globalStyle(".visually-hidden:not(:focus):not(:active)", {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  width: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
});

globalStyle("dl > div", {
  padding: spacing(2),
  backgroundColor: vars.colors.neutrals.midtoneDarker,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(1.5, 2),
      flexDirection: "row",
      alignItems: "center",
    },
  },
});

globalStyle("dl dt", {
  display: "flex",
  alignItems: "center",
  color: vars.colors.neutrals.gray,
  ...vars.typography.body3,
});

globalStyle("dl dt svg", {
  marginRight: spacing(1),
});

globalStyle("dl dd", {
  margin: spacing(1, 0, 0),
  ...vars.typography.generalHeadingBold,
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: 0,
      ...vars.typography.skillTalentHeading,
    },
  },
});

globalStyle("p", {
  margin: spacing(3, 0, 0),
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(2, 0, 0),
    },
  },
});

globalStyle(
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button",
  {
    // @ts-expect-error vanilla-extract doesn't like -webkit-appearance
    "-webkit-appearance": "none",
    margin: 0,
  }
);

globalStyle("input[type=number]", {
  // @ts-expect-error vanilla-extract doesn't like -moz-appearance
  "-moz-appearance": "textfield",
});

globalStyle("img", {
  objectFit: "contain",
});

globalStyle("body::-webkit-scrollbar", {
  width: spacing(2),
});

globalStyle("body::-webkit-scrollbar-thumb", {
  borderRadius: spacing(1),
  border: `${spacing(0.5)} solid transparent`,
  backgroundClip: "content-box",
  backgroundColor: rgba(rawColors.neutrals.white, 0.3),
});

globalStyle("body::-webkit-scrollbar-thumb:hover", {
  backgroundColor: rgba(rawColors.neutrals.white, 0.5),
});

globalStyle("body::-webkit-scrollbar-thumb:active", {
  backgroundColor: rgba(rawColors.neutrals.white, 0.8),
});

export const siteWrapper = style({
  height: "100%",
  display: "grid",
  gridTemplateAreas: '"top-fold" "footer"',
  gridTemplateRows: "1fr auto",
  gridTemplateColumns: "1fr",
});

export const topFold = style({
  gridArea: "top-fold",
});

export const bannerImageContainer = style({
  gridArea: "top-fold",
  display: "flex",
  justifyContent: "center",
  background: `linear-gradient(to bottom, transparent calc(0.3576 * var(--blend-point, ${defaultBlendPoint})), ${rgba(
    rawColors.neutrals.darktone,
    0.75
  )} calc(0.7083 * var(--blend-point, ${defaultBlendPoint})), ${
    vars.colors.neutrals.darktone
  } var(--blend-point, ${defaultBlendPoint})),
  linear-gradient(to bottom, ${vars.colors.neutrals.black}, ${
    vars.colors.neutrals.black
  } var(--blend-point, ${defaultBlendPoint}), ${
    vars.colors.neutrals.darktone
  } var(--blend-point, ${defaultBlendPoint}))`,
});

export const bannerImageWrapper = style({
  display: "grid",
  gridTemplateAreas: "'banner'",
  width: "min(100%, 1920px)",
  height: 576,
  position: "relative",
  "::before": {
    content: '""',
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    backgroundImage: `linear-gradient(to bottom, transparent calc(0.3576 * var(--blend-point, ${defaultBlendPoint})), ${rgba(
      rawColors.neutrals.darktone,
      0.75
    )} calc(0.7083 * var(--blend-point, ${defaultBlendPoint})), ${
      vars.colors.neutrals.darktone
    } var(--blend-point, ${defaultBlendPoint}))`,
  },
});

globalStyle(`${bannerImageWrapper} > *`, {
  gridArea: "banner",
});

export const headerMainWrapper = style({
  maxWidth: breakpoints.maxWidth,
  margin: "auto",
  position: "relative",
  zIndex: 1,
});

export const navbar = style({
  position: "relative",
  zIndex: 2,
  display: "grid",
  gridTemplateAreas: '"navbar"',
  alignItems: "center",
  height: spacing(8.5),
  "@media": {
    [breakpoints.down("mobile")]: {
      height: 75,
    },
  },
});

export const navbarBackground = style({
  gridArea: "navbar",
  height: spacing(8.5),
  width: "100%",
  display: "flex",
  justifyContent: "center",
  zIndex: 1,
  "::before": {
    content: '""',
    position: "absolute",
    height: "100%",
    width: "100%",
    backdropFilter: "blur(8px)",
    background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70.31%, rgba(0, 0, 0, 0.4) 100%)
    ${transparentize(0.8, rawColors.neutrals.black)}`,
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      height: 75,
    },
  },
});

export const flexSpacer = style({
  flex: "1 1 0",
});

export const weirdDeathSphere = style({
  position: "relative",
  transform: "translateY(-100%)",
  top: 97,
  "@media": {
    [breakpoints.down("mobile")]: {
      display: "none",
    },
  },
});

export const logoBg = style({
  "@media": {
    [breakpoints.down("mobile")]: {
      display: "none",
    },
  },
});

export const navbarContainer = style({
  gridArea: "navbar",
  zIndex: 3,
  width: "100%",
  maxWidth: breakpoints.maxWidth,
  margin: "0 auto",
});

export const navbarContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: spacing(0, 3),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: "unset",
    },
  },
});

export const skipLinkContainer = style({
  position: "absolute",
  top: spacing(8.6),
  padding: spacing(0.4),
  overflow: "hidden",
});

export const skipLink = style({
  display: "block",
  padding: spacing(1, 1.5),
  color: vars.colors.neutrals.white,
  backgroundColor: rgba(rawColors.neutrals.midtone, 0.66),
  borderRadius: spacing(0, 0, 0.5, 0.5),
  ...vars.typography.navigationLink,
  fontWeight: vars.typography.navigationLinkBold.fontWeight,
  transform: `translateY(-${spacing(15)})`,
  transition: "transform 0.3s ease-in-out",
  ":focus": {
    transform: "translateY(0)",
  },
});

export const navbarLeft = style({
  flex: "1 1 0",
  "@media": {
    [breakpoints.down("mobile")]: {
      display: "none",
    },
  },
});

export const navbarCenter = style({
  margin: spacing(0, 10),
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: 0,
      width: "auto",
      flex: "1 1 0",
    },
  },
});

export const navbarCenterContainer = style({
  display: "flex",
  alignItems: "center",
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(0, 0, 0, 2),
    },
  },
});

export const navbarRight = style({
  flex: "1 1 0",
  "@media": {
    [breakpoints.down("mobile")]: {
      flex: 0,
      marginRight: spacing(1),
    },
  },
});

export const headerLinks = style({
  display: "flex",
  alignItems: "center",
  flexGrow: 1,
  textAlign: "end",
  "@media": {
    [breakpoints.down("mobile")]: {
      display: "none",
    },
  },
});

export const headerLink = style({
  marginLeft: spacing(8),
  color: vars.colors.neutrals.white,
  height: "100%",
  textDecoration: "none",
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  ...vars.typography.operatorBrowserNameHeading,
});

export const mobileMenuButton = style({
  width: 48,
  height: 48,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "none",
  border: "none",
  "@media": {
    [breakpoints.up("mobile")]: {
      display: "none",
    },
  },
});

export const header = style({
  padding: spacing(3, 3, 0),
  height: spacing(22.5),
  display: "flex",
  flexDirection: "column-reverse",
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(2, 2, 0),
    },
  },
});

export const headingAndBreadcrumb = style({
  display: "flex",
  flexDirection: "column",
});

export const heading = style({
  margin: spacing(1, 0, 0),
  textShadow: vars.shadows.titleShadow,
  textTransform: "uppercase",
  ...vars.typography.pageHeading,
  "@media": {
    [breakpoints.down("mobile")]: {
      fontSize: vars.typography.operatorNameHeading.fontSize,
    },
  },
});

export const breadcrumb = style({
  lineHeight: 1.5,
  fontSize: vars.typography.navigationLink.fontSize,
});

export const breadcrumbLink = style({
  display: "inline-block",
  marginRight: spacing(1),
  padding: spacing(0, 0.5),
  textDecoration: "none",
  fontStyle: "normal",
  borderRadius: spacing(0.25),
});

export const footer = style({
  gridArea: "footer",
  marginTop: spacing(8),
  backgroundColor: vars.colors.neutrals.black,
  "@media": {
    [breakpoints.down("mobile")]: {
      marginTop: spacing(4),
    },
  },
});

export const footerContent = style({
  boxSizing: "border-box",
  margin: "auto",
  padding: spacing(8, 3),
  maxWidth: breakpoints.maxWidth,
  display: "grid",
  gridTemplateColumns: "50% repeat(2, 1fr)",
  color: vars.colors.neutrals.gray,
  "@media": {
    [breakpoints.down("mobile")]: {
      gridTemplateRows: "repeat(2, max-content)",
      gridTemplateColumns: "repeat(2, 1fr)",
      padding: spacing(4, 3),
    },
  },
});

export const logoAndDescription = style({
  "@media": {
    [breakpoints.down("mobile")]: {
      gridColumn: "span 2",
    },
  },
});

export const logo = style({
  padding: 0,
});

export const footerLink = style({
  padding: 0,
  color: vars.colors.neutrals.gray,
  ":hover": {
    color: vars.colors.neutrals.white,
  },
});

const baseLinksSocialSection = style({
  justifySelf: "flex-end",
  "@media": {
    [breakpoints.down("mobile")]: {
      marginTop: spacing(4),
      justifySelf: "flex-start",
      gridRow: 2,
    },
  },
});

export const linksSection = style([
  baseLinksSocialSection,
  {
    "@media": {
      [breakpoints.down("mobile")]: {
        gridColumn: 1,
      },
    },
  },
]);

export const socialSection = style([
  baseLinksSocialSection,
  {
    "@media": {
      [breakpoints.down("mobile")]: {
        gridColumn: 2,
      },
    },
  },
]);

export const linksSocialListTitle = style({
  position: "relative",
  paddingLeft: spacing(2),
  color: vars.colors.neutrals.white,
  ...vars.typography.generalHeading,
  fontWeight: vars.typography.generalHeadingBold.fontWeight,
  ":before": {
    content: '""',
    position: "absolute",
    display: "inline-block",
    borderLeft: `${spacing(0.25)} solid ${vars.colors.accents.blue}`,
    height: spacing(1.5),
    top: `calc(50% - ${spacing(0.75)})`,
    left: `-${spacing(0.25)}`,
  },
});

const baseLinksSocialList = style({
  listStyle: "none",
  margin: spacing(3, 0, 0),
  padding: spacing(0, 0, 0, 2),
});

const baseLinksSocialListItem = style({
  marginTop: spacing(2),
});

export const linksList = baseLinksSocialList;
export const linksListItem = baseLinksSocialListItem;

export const socialList = style([
  baseLinksSocialList,
  {
    display: "flex",
  },
]);

export const socialListItem = style([
  baseLinksSocialListItem,
  {
    marginTop: 0,
    selectors: {
      "&:not(:last-of-type)": {
        marginRight: spacing(2),
      },
    },
  },
]);

globalStyle(`${baseLinksSocialList} a`, {
  color: vars.colors.neutrals.gray,
});

globalStyle(`${baseLinksSocialListItem} a:hover`, {
  color: vars.colors.neutrals.white,
});
