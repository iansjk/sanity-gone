import { style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

// const styles = (theme: Theme) => css`
// width: 100%;
// display: grid;
// grid-template-columns: max-content 1fr max-content;
// align-items: center;

// ${theme.breakpoints.down("mobile")} {
//   grid-template-columns: 1fr;
//   row-gap: ${theme.spacing(2)};
// }

// .operator-portrait-and-class {
//   display: flex;
//   flex-direction: row-reverse;
//   justify-content: flex-end;

//   .name-and-class {
//     padding: ${theme.spacing(0.5, 0, 0, 3)};
//     display: grid;
//     grid-template-columns: max-content 1fr;
//     grid-template-rows: repeat(2, max-content);
//     align-self: baseline;

//     ${theme.breakpoints.down("mobile")} {
//       padding: ${theme.spacing(0, 0, 0, 2)};
//       align-self: flex-start;
//     }

//     .operator-name {
//       grid-column: span 2;
//       font-size: ${theme.typography.operatorNameHeading.fontSize}px;
//       font-weight: ${theme.typography.operatorNameHeading.fontWeight};
//       line-height: ${theme.typography.operatorNameHeading.lineHeight};
//       margin-bottom: ${theme.spacing(1)};

//       ${theme.breakpoints.down("mobile")} {
//         align-items: baseline;
//         font-size: ${theme.typography.generalHeading.fontSize}px;
//         line-height: ${theme.typography.generalHeading.lineHeight};
//         font-weight: ${theme.typography.generalHeadingBold.fontWeight};

//         .alter-name {
//           margin-left: ${theme.spacing(0.5)};
//           color: ${theme.palette.gray.main};
//           font-size: ${theme.typography.body1.fontSize}px;
//           font-weight: ${theme.typography.body1.fontWeight};
//           line-height: ${theme.typography.body1.lineHeight};
//         }
//       }
//     }

//     .class-and-subclass {
//       display: flex;
//       align-items: center;
//       font-weight: ${theme.typography.navigationLinkBold.fontWeight};
//       line-height: 1;
//       color: ${theme.palette.white.main};
//       box-shadow: ${theme.customShadows.baseShadow};

//       &:hover {
//         .class-icon-container {
//           border: 1px solid ${theme.palette.midtoneBrighterer.main};
//           background-color: ${theme.palette.midtoneBrighter.main};
//         }

//         .subclass-icon-container {
//           background-color: ${theme.palette.midtoneBrighterer.main};
//           border: 1px solid ${theme.palette.midtoneBrighterer.main};
//         }
//       }

//       ${theme.breakpoints.down("mobile")} {
//         font-size: ${theme.typography.body1.fontSize}px;
//       }

//       .class-icon-container {
//         padding: ${theme.spacing(1)};
//         display: flex;
//         align-items: center;
//         background-color: ${theme.palette.midtoneExtra.main};
//         border: 1px solid ${theme.palette.midtoneBrighter.main};
//         border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};
//       }

//       .subclass-icon-container {
//         display: grid;
//         grid-auto-flow: column;
//         column-gap: ${theme.spacing(1)};
//         align-items: center;
//         padding: ${theme.spacing(1, 1.5)};
//         background-color: ${theme.palette.midtoneBrighter.main};
//         border: 1px solid ${theme.palette.midtoneBrighter.main};
//         border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};
//       }
//     }
//   }
// }

// .attack-type-and-position {
//   margin: 0;
//   display: grid;
//   grid-template-columns: repeat(2, max-content);
//   justify-content: end;
//   height: max-content;
//   column-gap: ${theme.spacing(3)};

//   ${theme.breakpoints.down("mobile")} {
//     grid-template-columns: repeat(2, 1fr);
//     column-gap: ${theme.spacing(2)};
//     justify-content: flex-start;
//   }

//   & > div {
//     background: none;

//     ${theme.breakpoints.down("mobile")} {
//       flex-direction: column;
//       align-items: flex-start;
//     }

//     dd {
//       font-size: ${theme.typography.body1.fontSize}px;
//       font-weight: normal;

//       ${theme.breakpoints.down("mobile")} {
//         margin: ${theme.spacing(0.5, 0, 0)};
//         font-size: ${theme.typography.body2.fontSize}px;
//       }
//     }
//   }

//   .attack-type {
//     border-top-left-radius: ${theme.spacing(0.5)};

//     .physical {
//       color: ${theme.palette.orange.main};
//     }

//     .arts {
//       color: ${theme.palette.blue.main};
//     }

//     .healing {
//       color: ${theme.palette.lime.main};
//     }

//     .none {
//       color: ${theme.palette.gray.main};
//     }
//   }

//   .position {
//     border-bottom-left-radius: ${theme.spacing(0.5)};
//   }
// }
// `;

export const root = style({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "max-content 1fr max-content",
  alignItems: "center",
  "@media": {
    [breakpoints.down("mobile")]: {
      gridTemplateColumns: "1fr",
      rowGap: spacing(2),
    },
  },
});

export const operatorPortraitAndClass = style({
  display: "flex",
  flexDirection: "row-reverse",
  justifyContent: "flex-end",
});

export const nameAndClass = style({
  padding: spacing(0.5, 0, 0, 3),
  display: "grid",
  gridTemplateColumns: "max-content 1fr",
  gridTemplateRows: "max-content max-content",
  alignSelf: "baseline",
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(0, 0, 0, 2),
      alignSelf: "flex-start",
    },
  },
});

export const operatorName = style({
  gridColumn: "span 2",
  marginBottom: spacing(1),
  fontSize: vars.typography.operatorNameHeading.fontSize,
  fontWeight: vars.typography.operatorNameHeading.fontWeight,
  lineHeight: vars.typography.operatorNameHeading.lineHeight,
  "@media": {
    [breakpoints.down("mobile")]: {
      fontSize: vars.typography.generalHeading.fontSize,
      fontWeight: vars.typography.generalHeadingBold.fontWeight,
      lineHeight: vars.typography.generalHeading.lineHeight,
    },
  },
});

export const alterName = style({
  "@media": {
    [breakpoints.down("mobile")]: {
      marginLeft: spacing(0.5),
      color: vars.colors.neutrals.gray,
      fontSize: vars.typography.body1.fontSize,
      fontWeight: vars.typography.body1.fontWeight,
      lineHeight: vars.typography.body1.lineHeight,
    },
  },
});

export const classAndSubclass = style({
  display: "flex",
  alignItems: "center",
  fontWeight: vars.typography.navigationLinkBold.fontWeight,
  lineHeight: 1,
  color: vars.colors.neutrals.white,
  boxShadow: vars.shadows.baseShadow,
  "@media": {
    [breakpoints.down("mobile")]: {
      fontSize: vars.typography.body1.fontSize,
    },
  },
});

export const classIconContainer = style({
  padding: spacing(1),
  display: "flex",
  alignItems: "center",
  backgroundColor: vars.colors.neutrals.midtoneExtra,
  border: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
  borderRadius: spacing(0.5, 0, 0, 0.5),
  selectors: {
    [`${classAndSubclass}:hover &`]: {
      backgroundColor: vars.colors.neutrals.midtoneBrighter,
      border: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
    },
  },
});

export const subclassIconContainer = style({
  display: "grid",
  gridAutoFlow: "column",
  columnGap: spacing(1),
  alignItems: "center",
  padding: spacing(1, 1.5),
  backgroundColor: vars.colors.neutrals.midtoneBrighter,
  border: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
  borderRadius: spacing(0, 0.5, 0.5, 0),
  selectors: {
    [`${classAndSubclass}:hover &`]: {
      backgroundColor: vars.colors.neutrals.midtoneBrighterer,
      border: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
    },
  },
});

export const attackTypeAndPosition = style({
  margin: 0,
  display: "grid",
  gridTemplateColumns: "repeat(2, max-content)",
  justifyContent: "end",
  height: "max-content",
  columnGap: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
      columnGap: spacing(2),
      justifyContent: "flex-start",
    },
  },
});

const attackTypeOrPositionCellBase = style({
  background: "none",
  "@media": {
    [breakpoints.down("mobile")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
});

export const attackTypeOrPositionDetails = style({
  fontSize: vars.typography.body1.fontSize,
  fontWeight: "normal",
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(0.5, 0, 0),
      fontSize: vars.typography.body2.fontSize,
    },
  },
});

export const attackTypeCell = style([
  attackTypeOrPositionCellBase,
  {
    borderTopLeftRadius: spacing(0.5),
  },
]);

export const attackType = styleVariants({
  Physical: [
    attackTypeOrPositionDetails,
    { color: vars.colors.accents.orange },
  ],
  Arts: [attackTypeOrPositionDetails, { color: vars.colors.accents.blue }],
  Healing: [attackTypeOrPositionDetails, { color: vars.colors.accents.lime }],
  None: [attackTypeOrPositionDetails, { color: vars.colors.neutrals.gray }],
});

export const positionCell = style([
  attackTypeOrPositionCellBase,
  {
    borderBottomLeftRadius: spacing(0.5),
  },
]);
