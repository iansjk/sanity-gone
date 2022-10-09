import { style, styleVariants } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const root = style({
  marginTop: spacing(3),
  //   display: "flex",
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

// const styles = (theme: Theme) => css`
//   margin-top: ${theme.spacing(3)};
//   flex-direction: column;

//   :not([hidden]) {
//     display: flex;
//   }

//   .synergy-header {
//     display: flex;
//     align-items: center;

//     .portrait {
//       position: relative;

//       .group-synergy-icon {
//         position: absolute;
//         right: -3px;
//         bottom: -2px;
//       }
//     }

//     .name-and-quality {
//       margin-left: ${theme.spacing(2)};

//       .operator-name {
//         margin: 0;
//         font-size: ${theme.typography.generalHeadingBold.fontSize}px;
//         font-weight: ${theme.typography.generalHeadingBold.fontWeight};
//         line-height: ${theme.typography.generalHeadingBold.lineHeight};
//       }

//       .synergy-quality {
//         font-size: ${theme.typography.label2.fontSize}px;
//         text-transform: uppercase;
//         line-height: ${theme.typography.label2.lineHeight};
//         color: ${theme.palette.gray.main};

//         &.quality--1 {
//           color: ${theme.palette.red.main};
//         }

//         &.quality-1 {
//           color: ${theme.palette.blue.main};
//         }

//         &.quality-2 {
//           color: ${theme.palette.lime.main};
//         }
//       }

//       .synergy-operator-info {
//         font-size: ${theme.typography.body3.fontSize}px;
//         line-height: ${theme.typography.body3.lineHeight};

//         .operator-class,
//         .class-subclass-separator,
//         .subclass {
//           display: inline-block;
//         }

//         .operator-class {
//           margin-left: ${theme.spacing(1)};
//         }

//         .class-subclass-separator {
//           margin: ${theme.spacing(0, 1)};
//         }
//       }
//     }
//   }
// `;
