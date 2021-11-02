import parse from "html-react-parser";
import { css } from "@emotion/react";
import { Theme } from "@mui/material";

import Card from "./Card";
import Tabs from "./Tabs";
import TabButtons from "./TabButtons";
import TabPanels from "./TabPanels";
import RomanNumeralOne from "./icons/RomanNumeralOne";
import RomanNumeralTwo from "./icons/RomanNumeralTwo";
import RomanNumeralThree from "./icons/RomanNumeralThree";

export type CardWithTabsProps = {
  header: string;
  isSwiper?: boolean;
} & Either<
  {
    panelContent: ReturnType<typeof parse>[];
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
    <Card header={header} css={styles} {...rest}>
      <Tabs className="tabs-wrapper">
        <TabButtons className="tab-buttons" isSwiper={isSwiper}>
          {panelContent
            ? panelContent.map((_, i) => (
                <button
                  key={i}
                  aria-label={
                    buttonLabelFn ? buttonLabelFn(i) : buttonLabels?.[i]
                  }
                >
                  {i === 0 && <RomanNumeralOne />}
                  {i === 1 && <RomanNumeralTwo />}
                  {i === 2 && <RomanNumeralThree />}
                </button>
              ))
            : buttons}
        </TabButtons>
        <TabPanels className="tab-panels">
          {panelContent
            ? panelContent.map((panel, i) => <div key={i}>{panel}</div>)
            : panels}
        </TabPanels>
      </Tabs>
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
