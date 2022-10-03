import {
  style,
  globalStyle,
  styleVariants,
  createVar,
} from "@vanilla-extract/css";
import { spacing, breakpoints } from "../../theme-helpers";
import { rawColors, vars } from "../../theme.css";
import { rgba } from "polished";

export const rarities = styleVariants({
  rarity1Star: [{ display: "inherit" }],
  rarity2Stars: [{ display: "inherit" }],
  rarity3Stars: [{ display: "inherit" }],
  rarity4Stars: [{ display: "inherit" }],
  rarity5Stars: [{ display: "inherit" }],
  rarity6Stars: [{ display: "inherit" }],
});

export const operatorList = style({
  margin: spacing(3, 3, 0),
  padding: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: spacing(3),
  listStyle: "none",
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(2, 0, 0),
      gap: spacing(2),
    },
  },
});

export const operatorCardBase = style({
  width: "100%",
  height: "280px",
  flexGrow: 1,
  display: "grid",
  gridTemplateAreas: "'x'",
  borderRadius: spacing(0.5),
  boxShadow: vars.shadows.baseShadow,
  transition: "filter 0.15s ease-in-out",
  willChange: "filter",
  contain: "content",
});

export const operatorCard = styleVariants({
  hasGuide: [
    operatorCardBase,
    {
      cursor: "pointer",
      ":hover": {
        filter: "brightness(110%)",
      },
    },
  ],
  noGuide: [operatorCardBase, { opacity: 0.33 }],
});

export const operatorCardContent = style({
  gridArea: "x",
  display: "grid",
  position: "relative",
  gridTemplateAreas: "'subclass dummy' 'info info' 'link link'",
  gridTemplateColumns: "max-content 1fr",
  gridTemplateRows: "max-content 1fr min-content",
  overflow: "hidden",
  borderRadius: spacing(0.5),
  color: vars.colors.neutrals.white,
});

export const dummyClickableArea = style({
  gridArea: "dummy",
  position: "relative",
  width: `calc(100% + ${spacing(1)})`,
  left: `-${spacing(1)}`,
  height: "100%",
});

export const gradientEnd = createVar();
export const operatorInfo = style({
  vars: {
    [gradientEnd]: "#1c1c1c",
  },
  gridArea: "info",
  alignContent: "end",
  display: "grid",
  gridTemplateRows: "repeat(2, max-content)",
  gridTemplateColumns: "1fr max-content",
  padding: spacing(1.5),
  rowGap: spacing(1),
  color: vars.colors.neutrals.white,
  background: `linear-gradient(
    to bottom,
    transparent 40%,
    ${rgba(rawColors.neutrals.blackest, 0.7)} 67%,
    ${gradientEnd} 100%
  )`,
  selectors: {
    [`${rarities["rarity2Stars"]} &`]: {
      vars: {
        [gradientEnd]: "#1c1e16",
      },
    },
    [`${rarities["rarity3Stars"]} &`]: {
      vars: {
        [gradientEnd]: "#161b1e",
      },
    },
    [`${rarities["rarity4Stars"]} &`]: {
      vars: {
        [gradientEnd]: "#1c1921",
      },
    },
    [`${rarities["rarity5Stars"]} &`]: {
      vars: {
        [gradientEnd]: "#201d1a",
      },
    },
    [`${rarities["rarity6Stars"]} &`]: {
      vars: {
        [gradientEnd]: "#201916",
      },
    },
  },
});

export const operatorName = style({
  gridColumn: "span 2",
  display: "flex",
  margin: 0,
  flexDirection: "column",
  fontSize: vars.typography.skillTalentHeading.fontSize,
  lineHeight: vars.typography.skillTalentHeading.lineHeight,
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
});

export const alterName = style({
  marginTop: spacing(0.75),
  fontSize: vars.typography.operatorCardAlterName.fontSize,
  fontWeight: vars.typography.operatorCardAlterName.fontWeight,
  lineHeight: vars.typography.operatorCardAlterName.lineHeight,
  textTransform: vars.typography.operatorCardAlterName.textTransform,
});

export const rarity = style({
  gridColumn: 2,
  display: "flex",
  alignItems: "center",
  fontSize: vars.typography.operatorBrowserNameHeading.fontSize,
  fontWeight: vars.typography.operatorBrowserNameHeading.fontWeight,
  lineHeight: vars.typography.operatorBrowserNameHeading.lineHeight,
});

export const rarityNumber = style({
  marginRight: spacing(0.25),
  selectors: {
    [`${rarities["rarity2Stars"]} &`]: {
      color: "#d3ff77",
    },
    [`${rarities["rarity3Stars"]} &`]: {
      color: "#7cd8ff",
    },
    [`${rarities["rarity4Stars"]} &`]: {
      color: "#d1d0ee",
    },
    [`${rarities["rarity5Stars"]} &`]: {
      color: "#ffe9b0",
    },
    [`${rarities["rarity6Stars"]} &`]: {
      color: "#ff9254",
    },
  },
});

export const rarityStar = style({
  width: "13px",
  height: "13px",
});

export const operatorClass = style({
  gridRow: "2",
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
  selectors: {
    [`${rarities["rarity2Stars"]} &`]: {
      color: "#d3ff77",
    },
    [`${rarities["rarity3Stars"]} &`]: {
      color: "#7cd8ff",
    },
    [`${rarities["rarity4Stars"]} &`]: {
      color: "#d1d0ee",
    },
    [`${rarities["rarity5Stars"]} &`]: {
      color: "#ffe9b0",
    },
    [`${rarities["rarity6Stars"]} &`]: {
      color: "#ff9254",
    },
  },
});

export const operatorSubclass = style({
  gridArea: "subclass",
  padding: spacing(0.75),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  backgroundColor: rgba(rawColors.neutrals.darktone, 0.66),
  border: "none",
  borderBottomRightRadius: spacing(1),
  cursor: "pointer",
  transition: "background-color 0.15s ease-in-out",
  willChange: "background-color",
  ":hover": {
    backgroundColor: vars.colors.neutrals.midtoneDarker,
  },
});

export const operatorSubclassIcon = style({
  filter: `drop-shadow(
    0 ${spacing(0.25)} ${spacing(1)} rgba(0, 0, 0, 0.5)
  )`,
  pointerEvents: "none",
});

export const goToGuideLink = style({
  gridArea: "link",
  width: "100%",
  fontSize: vars.typography.label2.fontSize,
  lineHeight: vars.typography.label2.lineHeight,
  fontWeight: vars.typography.label2.fontWeight,
  textTransform: "uppercase",
  textAlign: "center",
  color: vars.colors.neutrals.blackest,
  backgroundColor: vars.colors.neutrals.white,
  transition: "height 0.15s ease-in-out",
  height: spacing(0.5),
  willChange: "height",
  selectors: {
    "&:hover, &:focus": {
      height: spacing(3.75),
    },
    [`${dummyClickableArea}:hover ~ &, ${operatorInfo}:hover ~ &`]: {
      height: "30px",
    },
    [`${rarities["rarity2Stars"]} &`]: {
      background: "linear-gradient(to right, #d3ff77, #a7e855)",
    },
    [`${rarities["rarity3Stars"]} &`]: {
      background: "linear-gradient(to right, #7cd8ff, #49b3ff)",
    },
    [`${rarities["rarity4Stars"]} &`]: {
      background: "linear-gradient(to right, #d1d0ee, #9d9bf4)",
    },
    [`${rarities["rarity5Stars"]} &`]: {
      background: "linear-gradient(to right, #ffe9b0, #e5c675)",
    },
    [`${rarities["rarity6Stars"]} &`]: {
      background: "linear-gradient(to right, #ff9254, #ede637)",
    },
  },
});

export const goToGuideLinkText = style({
  display: "inline-block",
  marginTop: spacing(0.75),
});

export const noResults = style({
  margin: spacing(3, 0),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.colors.neutrals.midtoneBrighterer,
});

globalStyle(`${rarities["rarity1Star"]} ${rarityStar} path`, {
  fill: vars.colors.neutrals.white,
});

globalStyle(`${rarities["rarity2Stars"]} ${rarityStar} path`, {
  fill: "url(#rarity-2-gradient)",
});

globalStyle(`${rarities["rarity3Stars"]} ${rarityStar} path`, {
  fill: "url(#rarity-3-gradient)",
});

globalStyle(`${rarities["rarity4Stars"]} ${rarityStar} path`, {
  fill: "url(#rarity-4-gradient)",
});

globalStyle(`${rarities["rarity5Stars"]} ${rarityStar} path`, {
  fill: "url(#rarity-5-gradient)",
});

globalStyle(`${rarities["rarity6Stars"]} ${rarityStar} path`, {
  fill: "url(#rarity-6-gradient)",
});
