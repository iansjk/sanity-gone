import { style } from "@vanilla-extract/css";
import { rgba } from "polished";
import { breakpoints, spacing } from "../theme-helpers";
import { rawColors, vars } from "../theme.css";

export const root = style({
  margin: spacing(0, 3),
  background: rgba(rawColors.neutrals.midtone, 0.66),
  boxShadow: "2px 4px 8px rgba(0, 0, 0, 0.15)",
  backdropFilter: "blur(8px)",
  borderRadius: spacing(1),
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: 0,
    },
  },
});

export const title = style({
  textTransform: "uppercase",
  fontSize: vars.typography.cardHeading.fontSize,
  fontWeight: vars.typography.cardHeading.fontWeight,
  lineHeight: vars.typography.cardHeading.lineHeight,
});

export const pageHeading = style([
  title,
  {
    margin: spacing(0, 0, 3),
  },
]);

export const teamMembers = style({
  display: "flex",
  margin: spacing(4, 0, 0),
  flexDirection: "column",
  alignItems: "flex-start",
  padding: spacing(3, 3, 3),
  gap: spacing(3, 0, 0),
});

export const teamGroups = style({
  display: "grid",
  gridTemplateColumns: "1.5fr auto 1fr auto",
  gap: spacing(4),
  width: "100%",
  "@media": {
    [breakpoints.down("mobile")]: {
      display: "flex",
      flexDirection: "column",
      gap: spacing(3),
    },
  },
});

export const memberList = style({
  listStyle: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: spacing(3),
  margin: spacing(3, 0, 0),
  flexWrap: "wrap",
  maxHeight: "500px",
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: 0,
      display: "flex",
      maxHeight: "none",
    },
  },
});

export const teamGroupTitle = style({
  margin: 0,
  fontSize: vars.typography.teamGroupHeading.fontSize,
  fontWeight: vars.typography.teamGroupHeading.fontWeight,
  lineHeight: vars.typography.teamGroupHeading.lineHeight,
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: spacing(4),
  color: vars.colors.neutrals.white,
  "@media": {
    [breakpoints.down("mobile")]: {
      width: "100%",
    },
  },
});

export const divider = style({
  display: "inline-block",
  width: "100%",
  height: "1px",
  background: vars.colors.neutrals.midtoneBrighterer,
  "@media": {
    [breakpoints.down("mobile")]: {
      marginRight: spacing(4),
    },
  },
});

export const memberCard = style({
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
});

export const memberInfo = style({
  display: "flex",
  flexDirection: "column",
  margin: spacing(0, 0, 0, 2),
});

export const avatar = style({
  borderRadius: "50%",
});

export const memberName = style({
  margin: 0,
  fontSize: vars.typography.memberNameHeading.fontSize,
  fontWeight: vars.typography.memberNameHeading.fontWeight,
  lineHeight: vars.typography.memberNameHeading.lineHeight,
  justifySelf: "flex-start",
  color: vars.colors.neutrals.white,
  gridArea: "name",
});

export const role = style({
  color: vars.colors.neutrals.gray,
  fontSize: vars.typography.memberRoleHeading.fontSize,
  fontWeight: vars.typography.memberRoleHeading.fontWeight,
  lineHeight: vars.typography.memberRoleHeading.lineHeight,
});

export const aboutFooter = style({
  background: vars.colors.neutrals.midtoneDarker,
  borderRadius: spacing(0, 0, 1, 1),
  display: "flex",
  justifyContent: "space-between",
  "@media": {
    [breakpoints.down("mobile")]: {
      flexDirection: "column",
    },
  },
});

export const specialThanks = style({
  padding: spacing(3, 3, 3),
});

export const specialThanksTitle = style([
  title,
  {
    margin: 0,
  },
]);

export const specialThanksList = style({
  margin: spacing(3, 0, 0),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: 0,
      paddingLeft: "20px",
    },
  },
});

export const specialThanksParagraph = style({
  margin: spacing(2, 0, 0),
});

export const discordButton = style({
  backgroundImage: `url("/images/page-banners/about_discord.png")`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "340px",
  position: "relative",
  "@media": {
    [breakpoints.down("mobile")]: {
      width: "100%",
      height: "210px",
    },
  },
});

export const discordButtonIcon = style({
  zIndex: 1,
});

export const background = style({
  width: "100%",
  height: "100%",
  position: "absolute",
});

export const disclosureButton = style({
  display: "flex",
  alignItems: "center",
  padding: 0,
  background: "transparent",
  border: "none",
});

export const disclosureChevron = style({
  transform: "rotate(90deg)",
  selectors: {
    [`${disclosureButton}[data-headlessui-state~=open] &`]: {
      transform: "rotate(0)",
    },
  },
});
