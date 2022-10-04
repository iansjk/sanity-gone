import { css, Interpolation } from "@emotion/react";
import { Theme } from "@mui/material";
import { Fragment } from "react";
import * as classes from "./styles.css";

import Card from "../Card";
import Tabs from "../Tabs";
import TabButtons from "../TabButtons";
import TabPanels from "../TabPanels";
import RomanNumeralOne from "../icons/RomanNumeralOne";
import RomanNumeralTwo from "../icons/RomanNumeralTwo";
import RomanNumeralThree from "../icons/RomanNumeralThree";
import { Tab } from "@headlessui/react";

export type CardWithTabsProps = {
  header: string;
  isSwiper?: boolean;
  css?: Interpolation<Theme>;
} & Either<
  {
    panelContent: JSX.Element[];
  } & Either<
    {
      buttonLabels: string[];
    },
    {
      buttonLabelFn: (index: number) => string;
    }
  >,
  {
    buttons: JSX.Element[];
    panels: JSX.Element[];
  }
>;

const CardWithTabs: React.VFC<CardWithTabsProps> = (props) => {
  const {
    header,
    isSwiper,
    panelContent,
    buttonLabels,
    buttonLabelFn,
    buttons,
    panels,
    ...rest
  } = props;

  return (
    <Card classes={{ content: classes.cardContent }} header={header} {...rest}>
      <Tab.Group as={"div"} className={classes.tabWrapper}>
        <Tab.List className={classes.tabButtons}>
          {panelContent
            ? panelContent.map((_, i) => (
                <Tab
                  as={Fragment}
                  key={i}
                  aria-label={
                    buttonLabelFn ? buttonLabelFn(i) : buttonLabels?.[i]
                  }
                >
                  {({ selected }) => (
                    <button
                      className={
                        selected
                          ? classes.button.active
                          : classes.button.default
                      }
                    >
                      {i === 0 && <RomanNumeralOne />}
                      {i === 1 && <RomanNumeralTwo />}
                      {i === 2 && <RomanNumeralThree />}
                    </button>
                  )}
                </Tab>
              ))
            : buttons}
        </Tab.List>
        <Tab.Panels className={classes.tabPanels}>
          {panelContent
            ? panelContent.map((panel, i) => (
                <Tab.Panel key={i}>{panel}</Tab.Panel>
              ))
            : panels}
        </Tab.Panels>
      </Tab.Group>
    </Card>
  );
};
export default CardWithTabs;

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
