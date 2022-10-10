import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { spacing, breakpoints } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const moduleControls = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: spacing(8),
  marginTop: spacing(3),
  background: vars.colors.neutrals.midtone,
  borderBottom: `${spacing(0.125)} solid ${
    vars.colors.neutrals.midtoneBrighterer
  }`,
  borderRadius: spacing(0.5, 0.5, 0, 0),
  "@media": {
    [breakpoints.down("mobile")]: {
      paddingRight: spacing(2),
    },
  },
});

export const stageButtons = style({
  marginRight: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      marginRight: 0,
      flexGrow: 1,
    },
  },
});

export const stageButton = style({
  width: spacing(7.5),
  fontSize: vars.typography.generalHeadingBold.fontSize,
  fontWeight: vars.typography.generalHeadingBold.fontWeight,
  lineHeight: vars.typography.generalHeadingBold.lineHeight,
  "@media": {
    [breakpoints.down("mobile")]: {
      width: 53,
    },
  },
});

const baseModuleAttributes = style({
  margin: spacing(0, 0, 0.25, 0),
  display: "grid",
  gridAutoFlow: "row",
  position: "relative",
  gridTemplateColumns: "304px 1fr 1fr",
  gridTemplateRows: "88px 88px",
  gap: spacing(0.25),
  "@media": {
    [breakpoints.down("mobile")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "178px repeat(2, max-content)",
      gridAutoFlow: "row",
    },
  },
});

export const moduleAttributes = styleVariants({
  default: [baseModuleAttributes],
  threeBonuses: [
    baseModuleAttributes,
    {
      gridTemplateColumns: "304px repeat(3, 1fr)",
      "@media": {
        [breakpoints.down("mobile")]: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "178px repeat(4, max-content)",
          gridAutoFlow: "column",
          columnGap: 0,
        },
      },
    },
  ],
});

export const moduleLabels = style({
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  gridTemplateRows: "repeat(2, max-content)",
  minWidth: 0,
  columnGap: spacing(2),
  rowGap: spacing(0.5),
  alignItems: "center",
  padding: spacing(2),
  gridColumnStart: "span 2",
  selectors: {
    [`${moduleAttributes.threeBonuses} &`]: {
      gridColumn: "span 3",
      "@media": {
        [breakpoints.down("mobile")]: {
          gridRowStart: "unset",
        },
      },
    },
  },
});

export const moduleImageContainer = style({
  gridRowStart: "span 2",
  position: "relative",
  overflow: "hidden",
  background: vars.colors.neutrals.midtoneDarker,
  "@media": {
    [breakpoints.down("mobile")]: {
      gridColumnStart: "span 2",
      gridRowStart: 1,
    },
  },
});

// hack for setting padding inside of next/image component
globalStyle(`${moduleImageContainer} > span > img`, {
  padding: `${spacing(2)} !important`,
});

export const moduleIcon = style({
  gridRowStart: "span 2",
  width: 42,
  height: 42,
  padding: spacing(0.75),
  borderRadius: spacing(1),
  background: vars.colors.neutrals.darktone,
});

export const moduleName = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  padding: 0,
  margin: 0,
  textOverflow: "ellipsis",
  ...vars.typography.skillTalentHeading,
});

export const moduleType = style({
  margin: 0,
  padding: 0,
  color: vars.colors.neutrals.gray,
  overflow: "hidden",
  ...vars.typography.skillTalentHeading,
});

export const moduleAttributeIconPath = styleVariants({
  atk: {
    fill: vars.colors.accents.red,
  },
  max_hp: {
    fill: vars.colors.accents.lime,
  },
  def: {
    fill: vars.colors.accents.orange,
  },
  attack_speed: {
    fill: vars.colors.accents.yellow,
  },
  magic_resistance: {
    fill: vars.colors.accents.blue,
  },
  cost: {
    fill: vars.colors.neutrals.white,
  },
  respawn_time: {
    fill: vars.colors.accents.magenta,
  },
  block_cnt: {
    fill: vars.colors.accents.softBlue,
  },
});

const baseModuleEffects = style({
  display: "grid",
  "@media": {
    [breakpoints.down("mobile")]: {
      rowGap: spacing(0.25),
    },
  },
});

globalStyle(
  `${baseModuleEffects} span.keyword, ${baseModuleEffects} span.potential`,
  {
    color: vars.colors.accents.blue,
  }
);

const baseHasRange = style({
  columnGap: spacing(0.25),
  "@media": {
    [breakpoints.up("mobile")]: {
      gridTemplateColumns: "704fr 228fr",
    },
  },
});

export const moduleEffects = styleVariants({
  "talent-false-range-false": [baseModuleEffects, {}],
  "talent-false-range-true": [baseModuleEffects, baseHasRange, {}],
  "talent-true-range-false": [
    baseModuleEffects,
    {
      rowGap: spacing(0.25),
    },
  ],
  "talent-true-range-true": [
    baseModuleEffects,
    baseHasRange,
    { rowGap: spacing(0.25) },
  ],
});

const baseModuleEffectCell = style({
  background: vars.colors.neutrals.midtoneDarker,
  padding: spacing(2),
});

export const moduleEffectDt = style({
  marginBottom: spacing(1),
  color: vars.colors.neutrals.gray,
  fontSize: vars.typography.label2.fontSize,
  lineHeight: vars.typography.label2.lineHeight,
});

const baseModuleEffectLabel = style({
  marginRight: spacing(1),
  textTransform: "uppercase",
  fontWeight: vars.typography.label2.fontWeight,
});

export const moduleEffectAdded = style([
  baseModuleEffectLabel,
  {
    color: vars.colors.accents.lime,
  },
]);

export const moduleEffectUpdated = style([
  baseModuleEffectLabel,
  {
    color: vars.colors.accents.yellow,
  },
]);

export const moduleEffectDd = style({
  margin: 0,
  ...vars.typography.body1,
});

export const traitEffect = style([
  baseModuleEffectCell,
  {
    gridColumnStart: 1,
    gridRowStart: 1,
    "@media": {
      [breakpoints.down("mobile")]: {
        gridRowStart: 1,
        gridColumnStart: 1,
        selectors: {
          [`${moduleEffects["talent-false-range-false"]} &`]: {
            borderRadius: spacing(0, 0, 0.5, 0.5),
          },
        },
      },
      [breakpoints.up("mobile")]: {
        selectors: {
          [`${moduleEffects["talent-false-range-true"]} &`]: {
            borderBottomLeftRadius: spacing(0.5),
          },
        },
      },
    },
  },
]);

export const talentEffect = style([
  baseModuleEffectCell,
  {
    gridColumnStart: 1,
    gridRowStart: 2,
    selectors: {
      [`${moduleEffects["talent-true-range-false"]} &`]: {
        borderRadius: spacing(0, 0, 0.5, 0.5),
      },
    },
    "@media": {
      [breakpoints.up("mobile")]: {
        selectors: {
          [`${moduleEffects["talent-true-range-true"]} &`]: {
            borderBottomLeftRadius: spacing(0.5),
          },
        },
      },
    },
  },
]);

export const moduleRange = style([
  baseModuleEffectCell,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridColumnStart: 2,
    borderBottomRightRadius: spacing(0.5),
    "@media": {
      [breakpoints.down("mobile")]: {
        gridColumn: 1,
        borderBottomLeftRadius: spacing(0.5),
      },
    },
    selectors: {
      [`${moduleEffects["talent-true-range-true"]} &`]: {
        gridRow: "span 2",
      },
    },
  },
]);
