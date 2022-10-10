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

// const styles = (theme: Theme) => css`
//   .stats-controls {
//     display: flex;
//     flex-direction: row;
//     height: ${theme.spacing(8)};
//     background: ${theme.palette.midtone.main};
//     margin-top: ${theme.spacing(3)};
//     border-bottom: ${theme.spacing(0.125)} solid
//       ${theme.palette.midtoneBrighterer.main};
//     border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};

//     ${theme.breakpoints.down("mobile")} {
//       flex-direction: column-reverse;
//       border-radius: 0;
//       margin-top: ${theme.spacing(9)};
//     }

//     .trust-and-elite-buttons {
//       display: flex;
//       height: ${theme.spacing(8)};

//       .checkbox-container {
//         margin: ${theme.spacing(2, 2, 2, 0)};
//         display: flex;
//         flex-direction: row;

//         ${theme.breakpoints.down("mobile")} {
//           border: none;
//         }

//         .checkbox {
//           margin-left: ${theme.spacing(3)};

//           ${theme.breakpoints.down("mobile")} {
//             margin-left: ${theme.spacing(2)};
//           }

//           label {
//             padding: ${theme.spacing(0.25)} 0;

//             ${theme.breakpoints.down("mobile")} {
//               padding: ${theme.spacing(0.5)} 0;
//             }
//           }
//         }
//       }
//     }

//     .slider-container {
//       margin-right: ${theme.spacing(2)};

//       ${theme.breakpoints.down("mobile")} {
//         position: relative;
//         margin-right: 0;
//         background: ${theme.palette.midtone.main};
//         padding-left: ${theme.spacing(2)};
//         border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
//       }
//     }

//     .mobile-spacer {
//       ${theme.breakpoints.down("mobile")} {
//         flex: 1 1 0;
//       }
//     }

//     .spacer {
//       flex: 1 1 0;
//     }
//   }

//   dl {
//     display: grid;
//     grid-template-rows: repeat(2, 1fr);
//     grid-auto-flow: column;
//     gap: ${theme.spacing(0.25)};
//     margin-top: 0;

//     ${theme.breakpoints.down("mobile")} {
//       grid-auto-flow: unset;
//     }

//     &.operator-stats {
//       grid-template-columns: repeat(4, 195fr) 224fr;

//       ${theme.breakpoints.down("mobile")} {
//         grid-template-columns: repeat(2, 1fr);
//         grid-template-rows: repeat(5, max-content);
//       }

//       .attack-power {
//         border-bottom-left-radius: ${theme.spacing(0.5)};

//         ${theme.breakpoints.down("mobile")} {
//           border-bottom-left-radius: 0;
//           border-top-right-radius: ${theme.spacing(0.5)};
//         }
//       }
//     }

//     &.summon-stats {
//       grid-template-columns: 88fr repeat(4, 149fr) 224fr;

//       ${theme.breakpoints.down("mobile")} {
//         grid-template-columns: repeat(2, 1fr);
//         grid-template-rows: repeat(6, max-content);

//         .range {
//           grid-row: 6;
//         }
//       }
//       &.no-stat-changes {
//         margin-top: ${theme.spacing(3)};

//         ${theme.breakpoints.down("mobile")} {
//           margin-top: ${theme.spacing(2)};
//         }
//         .summon-icon {
//           border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};
//           ${theme.breakpoints.down("mobile")} {
//             border-radius: ${theme.spacing(0.5, 0.5, 0, 0)};
//           }
//         }
//         .range {
//           border-radius: ${theme.spacing(0, 0.5, 0.5, 0)};
//         }
//       }
//     }

//     .summon-icon {
//       grid-row-start: span 2;

//       justify-content: center;

//       ${theme.breakpoints.down("mobile")} {
//         grid-row-start: unset;
//         grid-column: span 2;
//       }

//       img {
//         margin: auto;
//       }
//     }

//     .health {
//       svg path {
//         fill: ${theme.palette.lime.main};
//       }
//     }

//     .attack-power {
//       svg path {
//         fill: ${theme.palette.red.main};
//       }
//     }

//     .defense {
//       svg path {
//         fill: ${theme.palette.orange.main};
//       }
//     }

//     .attack-speed {
//       svg path {
//         fill: ${theme.palette.yellow.main};
//       }
//     }

//     .arts-resistance {
//       svg path {
//         fill: ${theme.palette.blue.main};
//       }
//     }

//     .block {
//       svg path {
//         fill: ${theme.palette.softBlue.main};
//       }
//     }

//     .redeploy-time {
//       svg path {
//         fill: ${theme.palette.pink.main};
//       }
//     }

//     .dp-cost {
//       svg path {
//         fill: ${theme.palette.white.main};
//       }
//     }

//     .range {
//       grid-row-start: span 2;
//       position: relative;
//       border-radius: ${theme.spacing(0, 0, 0.5, 0)};

//       ${theme.breakpoints.down("mobile")} {
//         grid-row: 5;
//         grid-column-start: span 2;
//         border-radius: ${theme.spacing(0, 0, 0.5, 0.5)};
//       }

//       dd {
//         position: absolute;
//         top: -5px; /* this is needed to counteract extra space made by .visually-hidden */
//         left: -5px;
//         margin-top: 0;
//         width: 100%;
//         height: 100%;
//         display: flex;
//         align-items: center;
//         justify-content: center;

//         ${theme.breakpoints.down("mobile")} {
//           position: relative;
//           top: -2.5px;
//           left: -2.5px;
//         }
//       }
//     }
//   }
// `;
