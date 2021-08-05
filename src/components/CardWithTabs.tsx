import parse from "html-react-parser";
import Card from "./Card";
import Tabs from "./Tabs";
import TabButtons from "./TabButtons";
import TabPanels from "./TabPanels";
import RomanNumeralOne from "./icons/RomanNumeralOne";
import RomanNumeralTwo from "./icons/RomanNumeralTwo";
import RomanNumeralThree from "./icons/RomanNumeralThree";
import { css, Theme } from "@emotion/react";

export type CardWithTabsProps = {
  header: string;
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
        <TabButtons className="tab-buttons">
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

    .tab-panels {
      flex-grow: 1;
      padding: ${theme.spacing(0, 4, 4)};
    }

    .tab-buttons {
      min-width: ${theme.spacing(12)};
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: ${theme.spacing(3, 0, 4)};
      background: ${theme.palette.mid};

      button {
        border-radius: ${theme.spacing(1)};
        width: ${theme.spacing(6)};
        height: ${theme.spacing(6)};
        border: none;
        font-weight: ${theme.typography.skillTalentHeading.weight};
        cursor: pointer;
        background-color: ${theme.palette.background};
        color: ${theme.palette.midHighlight};
        box-sizing: border-box;
        border: ${theme.spacing(0.25)} solid ${theme.palette.midHighlight};
        margin-bottom: ${theme.spacing(2)};
        display: flex;
        align-items: center;
        justify-content: center;

        svg path {
          fill: ${theme.palette.midHighlight};
        }

        &.last-child {
          margin: 0;
        }

        &.inactive:hover {
          border-color: ${theme.palette.gray};
          color: ${theme.palette.gray};
        }

        &.active {
          background-color: ${theme.palette.midHighlight};
          color: ${theme.palette.white};
        }
      }
    }
  }
`;
