import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const statsChangeList = style({
  margin: 0,
  padding: 0,
  listStyleType: "none",
});

export const statChangeValue = style({
  color: vars.colors.accents.blue,
});

export const statsChangeListItem = style({
  display: "flex",
  alignItems: "center",
});

export const statsChangeListItemIcon = style({
  width: "18px",
  height: "17px",
  marginRight: spacing(1),
});

export const potentialDescription = style({
  color: vars.colors.neutrals.gray,
});

export const statsControls = style({
  display: "flex",
  flexDirection: "row",
  height: spacing(8),
  background: vars.colors.neutrals.midtone,
  marginTop: spacing(3),
  borderBottom: `${spacing(0.125)} solid ${
    vars.colors.neutrals.midtoneBrighterer
  }`,
  borderRadius: spacing(0.5, 0.5, 0, 0),
  "@media": {
    [breakpoints.down("mobile")]: {
      flexDirection: "column-reverse",
      borderRadius: 0,
      marginTop: spacing(9),
    },
  },
});

export const trustAndEliteButtons = style({
  display: "flex",
  height: spacing(8),
});

export const checkboxContainer = style({
  display: "grid",
  alignItems: "center",
  justifyItems: "start",
  gridAutoFlow: "column",
  columnGap: spacing(3),
  paddingLeft: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      paddingLeft: 0,
      paddingRight: spacing(2),
      columnGap: spacing(2),
    },
  },
});

export const sliderContainer = style({
  marginRight: spacing(2),
  "@media": {
    [breakpoints.down("mobile")]: {
      position: "relative",
      marginRight: 0,
      paddingLeft: spacing(2),
      background: vars.colors.neutrals.midtone,
      borderRadius: spacing(0.5, 0.5, 0, 0),
    },
  },
});

export const spacer = style({
  flex: "1 1 0",
});

export const mobileSpacer = style({
  "@media": {
    [breakpoints.down("mobile")]: {
      flex: "1 1 0",
    },
  },
});

const statsListBase = style({
  display: "grid",
  gridTemplateRows: "repeat(2, 1fr)",
  gridAutoFlow: "column",
  gap: spacing(0.25),
  marginTop: 0,
  "@media": {
    [breakpoints.down("mobile")]: {
      gridAutoFlow: "unset",
    },
  },
});

export const statsList = styleVariants({
  operator: [
    statsListBase,
    {
      gridTemplateColumns: "repeat(4, 195fr) 224fr",
      "@media": {
        [breakpoints.down("mobile")]: {
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(5, max-content)",
        },
      },
    },
  ],
  summon: [
    statsListBase,
    {
      gridTemplateColumns: "88fr repeat(4, 149fr) 224fr",
      "@media": {
        [breakpoints.down("mobile")]: {
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(6, max-content)",
        },
      },
    },
  ],
});

export const statsListNoStatChanges = style({
  marginTop: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      marginTop: spacing(2),
    },
  },
});

export const summonIcon = style({
  gridRowStart: "span 2",
  justifyContent: "center",
  borderRadius: spacing(0, 0, 0, 0.5),
  "@media": {
    [breakpoints.down("mobile")]: {
      gridRowStart: "unset",
      gridColumn: "span 2",
      borderRadius: 0,
    },
  },
  selectors: {
    [`${statsListNoStatChanges} &`]: {
      borderRadius: spacing(0.5, 0, 0, 0.5),
      "@media": {
        [breakpoints.down("mobile")]: {
          borderRadius: spacing(0.5, 0.5, 0, 0),
        },
      },
    },
  },
});

globalStyle(`${summonIcon} img`, {
  margin: "auto",
});

export const range = style({
  gridRowStart: "span 2",
  position: "relative",
  borderRadius: spacing(0, 0, 0.5, 0),
  "@media": {
    [breakpoints.down("mobile")]: {
      gridRow: 5,
      gridColumnStart: "span 2",
      borderRadius: spacing(0, 0, 0.5, 0.5),
    },
  },
  selectors: {
    [`${statsList.summon} &`]: {
      "@media": {
        [breakpoints.down("mobile")]: {
          gridRow: 6,
        },
      },
    },
    [`${statsListNoStatChanges} &`]: {
      borderRadius: spacing(0, 0.5, 0.5, 0),
      "@media": {
        [breakpoints.down("mobile")]: {
          borderRadius: spacing(0, 0, 0.5, 0.5),
        },
      },
    },
  },
});

export const rangeDetails = style({
  position: "absolute",
  top: -5 /* this is needed to counteract extra space made by .visually-hidden */,
  left: -5,
  marginTop: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media": {
    [breakpoints.down("mobile")]: {
      position: "relative",
      top: -2.5,
      left: -2.5,
    },
  },
});

export const attackPower = style({
  selectors: {
    [`${statsList.operator} &`]: {
      borderBottomLeftRadius: spacing(0.5),
      "@media": {
        [breakpoints.down("mobile")]: {
          borderBottomLeftRadius: 0,
        },
      },
    },
  },
});

export const healthIconPath = style({
  fill: vars.colors.accents.lime,
});
export const attackPowerIconPath = style({ fill: vars.colors.accents.red });
export const defenseIconPath = style({ fill: vars.colors.accents.orange });
export const attackSpeedIconPath = style({ fill: vars.colors.accents.yellow });
export const artsResistanceIconPath = style({ fill: vars.colors.accents.blue });
export const blockIconPath = style({ fill: vars.colors.accents.softBlue });
export const redeployTimeIconPath = style({
  fill: vars.colors.accents.magenta,
});
export const dpCostIconPath = style({ fill: vars.colors.neutrals.white });
