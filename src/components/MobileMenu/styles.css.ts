import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const mobileMenuBase = style({
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 100,
});

export const mobileMenu = styleVariants({
  close: [mobileMenuBase, { display: "none" }],
  open: [
    mobileMenuBase,
    { display: "block", backgroundColor: "rgba(0, 0, 0, 0.66)" },
  ],
});

export const topBar = style({
  height: "75px",
  padding: spacing(0, 3, 0, 2),
  display: "flex",
  alignItems: "center",
  backgroundColor: vars.colors.neutrals.darktone,
});

export const spacer = style({
  flex: "1 1 0",
});

export const closeButton = style({
  position: "relative",
  background: "none",
  border: "none",
  display: "flex",
  alignItems: "center",
});

export const closeButtonSvg = style({
  fill: vars.colors.neutrals.white,
  height: "24px",
  width: "24px",
  marginRight: spacing(-1),
});

export const listHeader = style({
  margin: 0,
  fontSize: vars.typography.skillTalentHeading.fontSize,
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
  lineHeight: vars.typography.skillTalentHeading.lineHeight,
  color: vars.colors.neutrals.gray,
  borderBottom: `1px solid ${vars.colors.neutrals.midtoneBrighterer}`,
});

// TODO: Adjust depending on searchbar refactor
export const searchBarContainer = style({
  background: vars.colors.neutrals.midtone,
  padding: spacing(2, 0),
  margin: 0,
});

export const list = style({
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const listLink = style({
  color: vars.colors.neutrals.white,
  margin: 0,
  display: "block",
  padding: spacing(3),
  backgroundColor: vars.colors.neutrals.midtone,
});

// TODO: Remove once all the styles from the searchbar have been ported
globalStyle(`${searchBarContainer} .search`, { maxWidth: "unset" });
globalStyle(`${searchBarContainer} .search-bar`, {
  border: "none !important",
  background: vars.colors.neutrals.midtoneDarker,
  maxWidth: "unset",
  width: "auto",
  height: spacing(5),
  padding: spacing(0),
  margin: spacing(0, 2),
});
globalStyle(`${searchBarContainer} .search-bar.menu-down`, {
  borderRadius: spacing(0.5),
});
globalStyle(`${searchBarContainer} .search-bar:focus-within`, {
  background: vars.colors.neutrals.darktone,
});
globalStyle(`${searchBarContainer} .search-bar .search-input`, {
  fontSize: vars.typography.skillTalentHeading.fontSize,
});
globalStyle(`${searchBarContainer} .search .search-results`, {
  paddingTop: spacing(2),
  borderRadius: 0,
});
globalStyle(`${searchBarContainer} .search-results`, {
  width: "100%",
  maxWidth: "unset",
  marginRight: spacing(2),
  border: "none",
});

//     .search {
//       max-width: unset;

//       .search-bar {
//         border: none !important;
//         background: ${theme.palette.midtoneDarker.main};
//         max-width: unset;
//         width: auto;
//         height: ${theme.spacing(5)};
//         padding: ${theme.spacing(0)};
//         margin: ${theme.spacing(0, 2)};

//         &.menu-down {
//           border-radius: ${theme.spacing(0.5)};
//         }

//         &:focus-within {
//           background: ${theme.palette.dark.main};
//         }

//         .search-input {
//           font-size: ${theme.typography.skillTalentHeading.fontSize}px;
//         }
//       }

//       .search-results {
//         padding-top: ${theme.spacing(2)};
//         border-radius: 0;
//       }
//     }

//   .list-header,
//   ul > li > a {
//     margin: 0;
//     padding: ${theme.spacing(3)};
//     background-color: ${theme.palette.midtone.main};
//   }

// const styles = (theme: Theme) => css`
//   position: absolute;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 100;

//   &.closed {
//     display: none;
//   }

//   &.open {
//     display: block;
//     background-color: rgba(0, 0, 0, 0.66);
//   }

//   .top-bar {
//     height: 75px;
//     padding: ${theme.spacing(0, 3, 0, 2)};
//     display: flex;
//     align-items: center;
//     background-color: ${theme.palette.dark.main};

//     .spacer {
//       flex: 1 1 0;
//     }

//     .close-button {
//       position: relative;
//       background: none;
//       border: none;
//       display: flex;
//       align-items: center;

//       svg {
//         fill: ${theme.palette.white.main};
//         height: 24px;
//         width: 24px;
//         margin-right: ${theme.spacing(-1)};
//       }
//     }
//   }

//   .list-header {
//     margin: 0;
//     font-size: ${theme.typography.skillTalentHeading.fontSize}px;
//     font-weight: ${theme.typography.skillTalentHeading.fontWeight};
//     line-height: ${theme.typography.skillTalentHeading.lineHeight};
//     color: ${theme.palette.gray.main};
//     border-bottom: 1px solid ${theme.palette.midtoneBrighterer.main};
//   }

//   .list-header,
//   ul > li > a {
//     margin: 0;
//     padding: ${theme.spacing(3)};
//     background-color: ${theme.palette.midtone.main};
//   }

//   ul li .search-bar-container {
//     background: ${theme.palette.midtone.main};
//     padding: ${theme.spacing(2, 0)};
//     margin: 0;

//     .search {
//       max-width: unset;

//       .search-bar {
//         border: none !important;
//         background: ${theme.palette.midtoneDarker.main};
//         max-width: unset;
//         width: auto;
//         height: ${theme.spacing(5)};
//         padding: ${theme.spacing(0)};
//         margin: ${theme.spacing(0, 2)};

//         &.menu-down {
//           border-radius: ${theme.spacing(0.5)};
//         }

//         &:focus-within {
//           background: ${theme.palette.dark.main};
//         }

//         .search-input {
//           font-size: ${theme.typography.skillTalentHeading.fontSize}px;
//         }
//       }

//       .search-results {
//         padding-top: ${theme.spacing(2)};
//         border-radius: 0;
//       }
//     }

//     .search-results {
//       width: 100%;
//       max-width: unset;
//       margin-right: ${theme.spacing(2)};
//       border: none;
//     }
//   }

//   ul {
//     margin: 0;
//     padding: 0;
//     list-style: none;

//     a {
//       color: ${theme.palette.white.main};
//     }
//   }

//   ul li a {
//     display: block;
//   }
// `;
