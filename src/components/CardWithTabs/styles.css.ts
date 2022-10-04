import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { breakpoints, spacing } from "../../theme-helpers";
import { vars } from "../../theme.css";

export const cardContent = style({
  padding: "0 !important",
});

export const tabWrapper = style({
  display: "flex",
  height: "100%",
  "@media": {
    [breakpoints.down("mobile")]: {
      flexDirection: "column",
    },
  },
});

export const tabPanels = style({
  flexGrow: 1,
  padding: spacing(0, 4, 4),
  "@media": {
    [breakpoints.down("mobile")]: {
      padding: spacing(0, 2, 2),
    },
  },
});

export const tabButtons = style({
  minWidth: spacing(12),
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: spacing(3, 0, 4),
  background: vars.colors.neutrals.midtone,
  "@media": {
    [breakpoints.down("mobile")]: {
      flexDirection: "row",
      justifyContent: "center",
      padding: spacing(2, 0),
      paddingBottom: 0,
      background: "none",
    },
  },
});

export const buttonBase = style({
  borderRadius: spacing(1),
  width: spacing(6),
  height: spacing(6),
  fontWeight: vars.typography.skillTalentHeading.fontWeight,
  cursor: "pointer",
  backgroundColor: vars.colors.neutrals.midtoneDarker,
  boxSizing: "border-box",
  border: `${spacing(0.25)} solid ${vars.colors.neutrals.midtoneBrighter}`,
  padding: 0,
  marginBottom: spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": {
    borderColor: `var(--accent-color, ${vars.colors.neutrals.midtoneBrighter})`,
  },
  ":last-child": {
    margin: 0,
  },
  "@media": {
    [breakpoints.down("mobile")]: {
      marginBottom: 0,
      marginRight: spacing(2),
      ":last-of-type": {
        marginLeft: 0,
      },
    },
  },
});

export const button = styleVariants({
  default: [buttonBase],
  active: [
    buttonBase,
    {
      borderColor: `var(--accent-color, transparent)`,
      backgroundColor: `var(--accent-color, ${vars.colors.neutrals.midtoneBrighter})`,
      color: vars.colors.neutrals.white,
    },
  ],
});

//TODO: replace these global styles with proper styles once Tabs have been completely migrated
globalStyle(`${buttonBase} svg path`, {
  fill: vars.colors.neutrals.midtoneBrighter,
});

globalStyle(`${button.default}:hover svg path`, {
  fill: `var(--accent-color, ${vars.colors.neutrals.midtoneBrighter})`,
});

globalStyle(`${buttonBase}.inactive:hover`, {
  borderColor: vars.colors.neutrals.gray,
  color: vars.colors.neutrals.gray,
});

const styles = (theme: Theme) => css`
  .card-content {
    padding: 0;
  }

  .tabs-wrapper {
    display: flex;

    ${theme.breakpoints.down("mobile")} {
      flex-direction: column;
    }

    .tab-panels {
      flex-grow: 1;
      padding: ${theme.spacing(0, 4, 4)};

      ${theme.breakpoints.down("mobile")} {
        padding: ${theme.spacing(0, 2, 2)};
      }
    }

    .tab-buttons {
      min-width: ${theme.spacing(12)};
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: ${theme.spacing(3, 0, 4)};
      background: ${theme.palette.midtone.main};

      ${theme.breakpoints.down("mobile")} {
        flex-direction: row;
        justify-content: center;
        padding: ${theme.spacing(2, 0)};
        padding-bottom: 0;
        background: none;
      }

      button {
        border-radius: ${theme.spacing(1)};
        width: ${theme.spacing(6)};
        height: ${theme.spacing(6)};
        border: none;
        font-weight: ${theme.typography.skillTalentHeading.fontWeight};
        cursor: pointer;
        background-color: ${theme.palette.midtoneDarker.main};
        color: ${theme.palette.midtoneBrighter.main};
        box-sizing: border-box;
        border: ${theme.spacing(0.25)} solid
          ${theme.palette.midtoneBrighter.main};
        padding: 0;
        margin-bottom: ${theme.spacing(2)};
        display: flex;
        align-items: center;
        justify-content: center;

        ${theme.breakpoints.down("mobile")} {
          margin-bottom: 0;
          margin-right: ${theme.spacing(2)};

          &:last-of-type {
            margin-left: 0;
          }
        }

        svg path {
          fill: ${theme.palette.midtoneBrighter.main};
        }

        &.last-child {
          margin: 0;
        }

        &.inactive:hover {
          border-color: ${theme.palette.gray.main};
          color: ${theme.palette.gray.main};
        }

        &.active {
          background-color: ${theme.palette.midtoneBrighter.main};
          color: ${theme.palette.white.main};
        }
      }
    }
  }
`;
