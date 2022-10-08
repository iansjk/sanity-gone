import { createVar, style } from "@vanilla-extract/css";
import { transparentize } from "polished";
import { breakpoints, spacing } from "../../theme-helpers";
import { rawColors, vars } from "../../theme.css";

export const accentColor = createVar() as string;

export const tabContainer = style({
  padding: spacing(0, 3),
  margin: spacing(3, 0, 0),
  display: "grid",
  gridTemplateRows: "max-content max-content 1fr",
  gridTemplateColumns: "max-content 1fr",
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: spacing(2, 0, 0),
      padding: 0,
      gridTemplateColumns: "1fr",
    },
  },
});

export const tabButtons = style({
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
  "@media": {
    [breakpoints.down("mobile")]: {
      backgroundColor: transparentize(0.34, rawColors.neutrals.darktone),
      backdropFilter: "blur(8px)",
      flexDirection: "row",
    },
  },
});

export const button = style({
  width: "192px",
  height: spacing(6),
  paddingLeft: spacing(2),
  marginTop: spacing(1),
  textAlign: "start",
  lineHeight: vars.typography.navigationLink.lineHeight,
  border: 0,
  borderRadius: spacing(0.5, 0, 0, 0.5),
  background: "none",
  color: vars.colors.neutrals.gray,
  cursor: "pointer",
  selectors: {
    "&:hover:not([data-headlessui-state~=selected])": {
      backgroundColor: transparentize(0.9, rawColors.neutrals.gray),
      color: vars.colors.neutrals.white,
    },
    "&[data-headlessui-state~=selected]": {
      background: `linear-gradient(
            90deg,
            var(--accent-color-transparentized-09),
            var(--accent-color-transparentized-08)
          )`,
      color: `rgb(var(--accent-color-tinted-027))`,
      borderRight: `3px solid rgb(var(--accent-color-tinted-027))`,
      fontWeight: vars.typography.navigationLinkBold.fontWeight,
    },
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      margin: 0,
      height: "unset",
      boxSizing: "border-box",
      padding: spacing(2),
      width: "max-content",
      position: "relative",
      background: "none",
      border: "none",
      fontSize: vars.typography.cardHeading.fontSize,
      fontWeight: vars.typography.cardHeading.fontWeight,
      lineHeight: vars.typography.cardHeading.lineHeight,
      textTransform: vars.typography.cardHeading.textTransform,
      selectors: {
        "&[data-headlessui-state~=selected]": {
          border: "none",
          background: "none",
          color: "var(--accent-color)",
          fontWeight: vars.typography.cardHeading.fontWeight,
        },
        "&[data-headlessui-state~=selected]:after": {
          content: " ",
          display: "inline-block",
          width: spacing(4),
          position: "absolute",
          left: `calc(50% - ${spacing(2)})`,
          bottom: 0,
          borderBottomWidth: "3px",
          borderBottomStyle: "solid",
        },
      },
    },
  },
});

export const leftSidebar = style({
  gridRowStart: 2,
  paddingRight: spacing(4),
  "@media": {
    [breakpoints.down("mobile")]: {
      gridRow: 3,
      padding: spacing(0, 2, 3),
    },
  },
});

export const separator = style({
  border: 0,
  borderTop: `1px solid ${vars.colors.neutrals.midtoneBrighter}`,
  margin: spacing(3, 0, 0, 0),
});

export const leftSidebarSection = style({
  paddingLeft: spacing(2),
  marginTop: spacing(3),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: 0,
    },
  },
});

export const sectionLabel = style({
  display: "block",
  marginBottom: spacing(1),
  fontSize: vars.typography.body3.fontSize,
  lineHeight: vars.typography.body3.lineHeight,
  color: vars.colors.neutrals.gray,
});

export const externalLink = style({
  marginRight: spacing(1),
  display: "inline-block",
  padding: spacing(0, 0.5),
  borderRadius: spacing(0.25),
  transition: "all 50ms ease-out",
  color: "rgba(var(--accent-color-tinted-027), 0.66)",
  backgroundColor: "rgba(var(--accent-color-rgb), 0.08)",

  ":hover": {
    color: "var(--accent-color-tinted-027)",
    backgroundColor: "rgba(var(--accent-color-rgb), 0.4)",
    //             color: ${tint(0.27, accentColor)};
    //             background-color: ${rgba(accentColor, 0.4)};
  },
});

export const lastUpdated = style({
  fontStyle: "italic",
});

export const panels = style({
  gridRowStart: "span 3",
  gridColumn: "2 / span 2",
  marginLeft: "-1px",
  height: "100%",
  borderLeft: `1px solid ${vars.colors.neutrals.gray}`,
  position: "relative",
  ":before": {
    content: "''",
    backdropFilter: "blur(8px)",
    position: "absolute",
    width: "100%",
    height: "350px",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      gridRow: 2,
      gridColumn: 1,
      border: "none",
      backdropFilter: "unset",
    },
  },
});
//     padding: ${theme.spacing(0, 3)};
//     margin: ${theme.spacing(3, 0, 0)};
//     display: grid;
//     grid-template-rows: max-content max-content 1fr;
//     grid-template-columns: max-content 1fr;

//     ${theme.breakpoints.down("mobile")} {
//       margin: ${theme.spacing(2, 0, 0)};
//       padding: 0;
//       grid-template-columns: 1fr;
//     }

//     .fresnel-container {
//       display: grid;
//     }

//     .fresnel-container > .swiper-container {
//       background-color: ${transparentize(0.34, theme.palette.dark.main)};
//       backdrop-filter: blur(8px);

//       button:not(.synergy-operator-button):not(.module-button) {
//         box-sizing: border-box;
//         padding: ${theme.spacing(2)};
//         width: max-content;
//         position: relative;
//         background: none;
//         border: none;
//         cursor: pointer;
//         font-size: ${theme.typography.cardHeading.fontSize}px;
//         font-weight: ${theme.typography.cardHeading.fontWeight};
//         line-height: ${theme.typography.cardHeading.lineHeight};
//         text-transform: ${theme.typography.cardHeading.textTransform};

//         &:not(.active) {
//           color: ${theme.palette.gray.main};
//         }

//         &.active {
//           &::after {
//             content: " ";
//             display: inline-block;
//             width: ${theme.spacing(4)};
//             position: absolute;
//             left: calc(50% - ${theme.spacing(2)});
//             bottom: 0;
//             border-bottom-width: 3px;
//             border-bottom-style: solid;
//           }
//         }
//       }

//       button:not(.synergy-operator-button):not(.module-button).active {
//         color: ${accentColor};

//         &::after {
//           border-bottom-color: ${accentColor};
//         }
//       }
//     }

//     .fresnel-container > .tabs {
//       display: flex;
//       flex-direction: column;
//       z-index: 1;

//       button {
//         width: 192px;
//         height: ${theme.spacing(6)};
//         padding-left: ${theme.spacing(2)};
//         margin-top: ${theme.spacing(1)};
//         text-align: start;
//         line-height: ${theme.typography.navigationLink.lineHeight};
//         border: 0;
//         border-radius: ${theme.spacing(0.5, 0, 0, 0.5)};
//         background: none;
//         color: ${theme.palette.gray.main};
//         cursor: pointer;

//         :disabled {
//           cursor: initial;
//           color: ${rgba(theme.palette.gray.main, 0.5)};
//         }

//         &:not(:disabled):not(.active):hover {
//           background-color: ${transparentize(0.9, theme.palette.gray.main)};
//           color: ${theme.palette.white.main};
//         }

//         &.active {
//           background: linear-gradient(
//             90deg,
//             ${transparentize(0.9, accentColor)},
//             ${transparentize(0.8, accentColor)}
//           );
//           color: ${tint(0.27, accentColor)};
//           border-right: 3px solid ${tint(0.27, accentColor)};
//           font-weight: ${theme.typography.navigationLinkBold.fontWeight};
//         }

//         ${theme.breakpoints.down("mobile")} {
//           font-size: ${theme.typography.cardHeading.fontSize}px;
//           line-height: ${theme.typography.cardHeading.lineHeight};
//           font-weight: ${theme.typography.cardHeading.fontWeight};
//           text-transform: ${theme.typography.cardHeading.textTransform};
//         }
//       }
//     }

//     .left-sidebar {
//       grid-row-start: 2;
//       padding-right: ${theme.spacing(4)};

//       ${theme.breakpoints.down("mobile")} {
//         grid-row: 3;
//         padding: ${theme.spacing(0, 2, 3)};
//       }

//       hr {
//         border: 0;
//         border-top: 1px solid ${theme.palette.midtoneBrighter.main};
//         margin: ${theme.spacing(3)} 0 0 0;
//       }

//       .external-links,
//       .metadata {
//         padding-left: ${theme.spacing(2)};

//         ${theme.breakpoints.down("mobile")} {
//           padding: 0;
//         }
//       }

//       .external-links,
//       .authors-section,
//       .last-updated-section {
//         margin-top: ${theme.spacing(3)};
//       }

//       .section-label {
//         display: block;
//         margin-bottom: ${theme.spacing(1)};
//         font-size: ${theme.typography.body3.fontSize}px;
//         line-height: ${theme.typography.body3.lineHeight};
//         color: ${theme.palette.gray.main};
//       }

//       .metadata {
//         ${theme.breakpoints.down("mobile")} {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//         }
//       }

//       .external-links {
//         a {
//           margin-right: ${theme.spacing(1)};

//           color: ${rgba(tint(0.27, accentColor), 0.66)};
//           background-color: ${rgba(accentColor, 0.08)};

//           &:hover {
//             color: ${tint(0.27, accentColor)};
//             background-color: ${rgba(accentColor, 0.4)};
//           }
//         }
//       }

//       .last-updated-section {
//         .last-updated {
//           font-style: italic;
//         }
//       }
//     }

//     & > .panels {
//       grid-row-start: span 3;
//       grid-column: 2 / span 2;
//       margin-left: -1px;
//       height: 100%;
//       border-left: 1px solid ${theme.palette.gray.main};
//       position: relative;

//       &::before {
//         content: "";
//         backdrop-filter: blur(8px);
//         position: absolute;
//         width: 100%;
//         height: 350px;
//         top: 0;
//         left: 0;
//         z-index: -1;
//       }

//       ${theme.breakpoints.down("mobile")} {
//         grid-row: 2;
//         grid-column: 1;
//         border: none;
//         backdrop-filter: unset;
//       }

//       .analysis-section {
//         height: 100%;

//         section {
//           height: 100%;

//           .card-content {
//             box-sizing: border-box;
//             height: calc(
//               100% - ${theme.typography.cardHeading.fontSize}px *
//                 ${theme.typography.cardHeading.lineHeight} - ${theme.spacing(4)}
//             );

//             ${theme.breakpoints.down("mobile")} {
//               height: 100%;
//             }

//             .tabs-wrapper {
//               height: 100%;
//             }
//           }
//         }
//       }

//       .analysis-section:not(.synergies):not(.modules) {
//         .tab-buttons {
//           button.active {
//             background-color: ${accentColor};
//             border-color: ${accentColor};

//             svg path {
//               fill: ${theme.palette.dark.main};
//             }
//           }

//           button.inactive:hover {
//             border-color: ${accentColor};

//             svg path {
//               fill: ${accentColor};
//             }
//           }
//         }
//       }
//     }
//   `;
