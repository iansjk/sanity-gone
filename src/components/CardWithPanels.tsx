/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Theme, css, ClassNames } from "@emotion/react";
import Card, { CardProps } from "./Card";
import { CardPanelProps } from "./CardPanel";

export type CardWithPanelsProps = CardProps & {
  buttonPrefix?: string;
  children: React.ReactElement<CardPanelProps>[];
};

const CardWithPanels: React.FC<CardWithPanelsProps> = (props) => {
  const { header, subheader, children, buttonPrefix } = props;
  const numPanels = children.length;
  const [activePanel, setActivePanel] = useState(0);
  return (
    <Card header={header} subheader={subheader}>
      <div css={styles}>
        <div className="panel-select">
          {[...Array(numPanels).keys()].map((i) => (
            <ClassNames>
              {({ cx }) => (
                <button
                  className={cx(
                    i === activePanel && "active",
                    i !== activePanel && "inactive"
                  )}
                  onClick={() => setActivePanel(i)}
                >
                  {buttonPrefix}
                  {i + 1}
                </button>
              )}
            </ClassNames>
          ))}
        </div>
        <div className="panel-content">
          {children.map((child, i) =>
            React.cloneElement(child, { key: i, hidden: i !== activePanel })
          )}
        </div>
      </div>
    </Card>
  );
};
export default CardWithPanels;

const styles = (theme: Theme) => css`
  display: flex;

  .panel-select {
    display: flex;
    flex-direction: column;
    padding-right: ${theme.spacing(4)};
    border-right: ${theme.spacing(0.25)} solid ${theme.palette.background};

    button {
      border-radius: ${theme.spacing(2)};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      border: none;
      font-weight: ${theme.typography.highlight.weight};
      margin-bottom: ${theme.spacing(2)};
      cursor: pointer;
    }

    button:last-child {
      margin-bottom: 0;
    }

    button.active {
      background: ${theme.palette.midHighlight};
      color: ${theme.palette.white};
    }

    button.inactive {
      background: ${theme.palette.background};
      color: ${theme.palette.midHighlight};
      box-sizing: border-box;
      border: ${theme.spacing(0.25)} solid ${theme.palette.midHighlight};
    }
  }

  .panel-content {
    flex-grow: 1;
    padding-left: ${theme.spacing(4)};
  }
`;
