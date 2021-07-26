/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Theme, css } from "@emotion/react";
import Card, { CardProps } from "./Card";
import { CardPanelProps } from "./CardPanel";

export type CardWithPanelsProps = CardProps & {
  children: React.ReactElement<CardPanelProps>[];
};

const CardWithPanels: React.FC<CardWithPanelsProps> = (props) => {
  const { header, subheader, children } = props;
  const numPanels = children.length;
  const [activePanel, setActivePanel] = useState(0);
  return (
    <Card header={header} subheader={subheader}>
      <div css={styles}>
        <div className="panel-select">
          {[...Array(numPanels).keys()].map((i) => (
            <button onClick={() => setActivePanel(i)}>Panel {i + 1}</button>
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

const styles = (theme: Theme) => css``;
