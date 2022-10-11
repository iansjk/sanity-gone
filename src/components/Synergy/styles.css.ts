import { style, styleVariants } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  marginTop: spacing(3),
  flexDirection: "column",
});

export const synergyHeader = style({
  display: "flex",
  alignItems: "center",
});

export const portrait = style({
  position: "relative",
});

export const groupSynergyIcon = style({
  position: "absolute",
  right: "-3px",
  bottom: "-2px",
});

export const nameAndQuality = style({
  marginLeft: spacing(2),
});

export const operatorName = style({
  margin: 0,
  fontSize: vars.typography.generalHeadingBold.fontSize,
  fontWeight: vars.typography.generalHeadingBold.fontWeight,
  lineHeight: vars.typography.generalHeadingBold.lineHeight,
});

export const synergyQualityBase = style({
  fontSize: vars.typography.label2.fontSize,
  textTransform: "uppercase",
  lineHeight: vars.typography.label2.lineHeight,
  color: vars.colors.neutrals.gray,
});

export const synergyQuality = styleVariants({
  "quality--1": [synergyQualityBase, { color: vars.colors.accents.red }],
  "quality-1": [synergyQualityBase, { color: vars.colors.accents.blue }],
  "quality-2": [synergyQualityBase, { color: vars.colors.accents.lime }],
});

export const synergyOperatorInfo = style({
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
});

export const operatorClass = style({
  marginLeft: spacing(1),
  display: "inline-block",
});

export const subclass = style({
  display: "inline-block",
});

export const classSubclassSeparator = style({
  margin: spacing(0, 1),
  display: "inline-block",
});

export const rarity = styleVariants({
  "rarity-6-stars": [
    {
      color: vars.colors.accents.orange,
    },
  ],
  "rarity-5-stars": [
    {
      color: vars.colors.accents.yellow,
    },
  ],
  "rarity-4-stars": [
    {
      color: vars.colors.accents.softBlue,
    },
  ],
  "rarity-3-stars": [
    {
      color: vars.colors.accents.blue,
    },
  ],
  "rarity-2-stars": [
    {
      color: vars.colors.neutrals.white,
    },
  ],
  "rarity-1-stars": [{ color: vars.colors.neutrals.white }],
});
