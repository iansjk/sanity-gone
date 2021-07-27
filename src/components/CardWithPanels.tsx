/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Theme, css, ClassNames } from "@emotion/react";
import Card, { CardProps } from "./Card";
import CardPanel, { CardPanelProps } from "./CardPanel";

export type CardWithPanelsProps = React.PropsWithChildren<CardProps>;

const CardWithPanels: React.FC<CardWithPanelsProps> = (props) => {
  const { header, subheader, children, ...rest } = props;
  const [activePanel, setActivePanel] = useState(0);
  const cardPanelChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement<CardPanelProps>(child) && child.type === CardPanel
  );
  const buttonPrefix = header[0].toUpperCase();
  return (
    <Card header={header} subheader={subheader} css={styles} {...rest}>
      <div className="panels-wrapper">
        <div className="panel-select">
          {cardPanelChildren.map((_, i) => (
            <ClassNames key={i}>
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
          {cardPanelChildren.map((child, i) =>
            React.cloneElement(child as any, {
              key: i,
              hidden: i !== activePanel,
            })
          )}
        </div>
      </div>
    </Card>
  );
};
export default CardWithPanels;

const styles = (theme: Theme) => css`
  .card-content {
    padding: 0;
  }

  .panels-wrapper {
    display: flex;
  }

  .panel-select {
    display: flex;
    flex-direction: column;
    padding-right: ${theme.spacing(4)};
    border-right: ${theme.spacing(0.25)} solid ${theme.palette.background};
    padding: ${theme.spacing(3)} ${theme.spacing(4)} ${theme.spacing(4)};

    button {
      border-radius: ${theme.spacing(2)};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
      border: none;
      font-weight: ${theme.typography.highlight.weight};
      cursor: pointer;
      background: ${theme.palette.background};
      color: ${theme.palette.midHighlight};
      box-sizing: border-box;
      border: ${theme.spacing(0.25)} solid ${theme.palette.midHighlight};

      margin-bottom: ${theme.spacing(2)};
      &:last-child {
        margin-bottom: 0;
      }

      &.inactive:hover {
        border-color: ${theme.palette.gray};
        color: ${theme.palette.gray};
      }

      &.active {
        background: ${theme.palette.midHighlight};
        color: ${theme.palette.white};
      }
    }
  }

  .panel-content {
    flex-grow: 1;
    padding: 0 ${theme.spacing(4)} ${theme.spacing(4)};

    b,
    strong {
      color: ${theme.palette.pink};
    }
  }
`;
