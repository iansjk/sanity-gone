/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import { Theme, css, ClassNames } from "@emotion/react";
import Card, { CardProps } from "./Card";
import CardPanel, { CardPanelProps } from "./CardPanel";

export type CardWithTabsProps = React.PropsWithChildren<
  CardProps & {
    tabType: string;
  }
>;

const CardWithTabs: React.FC<CardWithTabsProps> = (props) => {
  const { header, subheader, children, tabType, ...rest } = props;
  const [activePanel, setActivePanel] = useState(0);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const cardPanelChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement<CardPanelProps>(child) && child.type === CardPanel
  );
  const numTabs = cardPanelChildren.length;
  const buttonPrefix = tabType[0].toUpperCase();
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleClick = (i: number) => {
    setActivePanel(i);
    setUserHasInteracted(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentTabId = (e.target as HTMLButtonElement).id;
    const currentTab =
      parseInt(currentTabId.charAt(currentTabId.length - 1), 10) - 1;
    if (!Number.isNaN(currentTab)) {
      console.log("Currently focused", currentTab);
      let tabToFocus = currentTab;
      switch (e.key) {
        case "Down":
        case "ArrowDown":
        case "Right":
        case "ArrowRight":
          // next tab, wrapping if necessary
          tabToFocus = (currentTab + 1) % numTabs;
          break;
        case "Up":
        case "ArrowUp":
        case "Left":
        case "ArrowLeft":
          // previous tab, wrapping if necessary
          // (need to add numTabs first to avoid negative numbers)
          tabToFocus = (currentTab + numTabs - 1) % numTabs;
          break;
      }
      console.log("Going to focus", tabToFocus);
      if (tabsRef.current) {
        (tabsRef.current.children.item(
          tabToFocus
        ) as HTMLDivElement | null)?.focus();
      }
    }
  };

  return (
    <Card header={header} subheader={subheader} css={styles} {...rest}>
      <div className="tabs-panels-wrapper">
        <div className="tabs" role="tablist" ref={tabsRef}>
          {cardPanelChildren.map((_, i) => (
            <ClassNames key={i}>
              {({ cx }) => {
                const isActivePanel = i === activePanel;
                return (
                  <button
                    role="tab"
                    className={cx(isActivePanel ? "active" : "inactive")}
                    onClick={() => handleClick(i)}
                    onKeyDown={handleKeyDown}
                    tabIndex={isActivePanel ? 0 : -1}
                    id={`tab-${i + 1}`}
                    aria-label={`${tabType} ${i + 1}`}
                    aria-selected={isActivePanel}
                    aria-controls={`panel-${i + 1}`}
                  >
                    {buttonPrefix}
                    {i + 1}
                  </button>
                );
              }}
            </ClassNames>
          ))}
        </div>
        <div className="panels">
          {cardPanelChildren.map((child, i) => {
            const isActivePanel = i === activePanel;
            return React.cloneElement(child as any, {
              key: i,
              id: `panel-${i + 1}`,
              role: "tabpanel",
              "aria-expanded": isActivePanel,
              hidden: !isActivePanel,
              "aria-labelledby": `tab-${i + 1}`,
              tabIndex: isActivePanel ? 0 : -1,
              userHasInteracted,
            });
          })}
        </div>
      </div>
    </Card>
  );
};
export default CardWithTabs;

const styles = (theme: Theme) => css`
  .card-content {
    padding: 0;
  }

  .tabs-panels-wrapper {
    display: flex;
  }

  .tabs {
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

  .panels {
    flex-grow: 1;
    padding: 0 ${theme.spacing(4)} ${theme.spacing(4)};

    b,
    strong {
      color: ${theme.palette.pink};
    }
  }
`;
