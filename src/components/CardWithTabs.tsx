import React, { useRef, useState } from "react";
import { Theme, css } from "@emotion/react";
import Card, { CardProps } from "./Card";
import CardPanel, { CardPanelProps } from "./CardPanel";
import { slugify } from "../utils/globals";

export type CardWithTabsProps = React.PropsWithChildren<
  CardProps & {
    tabType: string;
    buttonRenderer?: (
      index: number
    ) => React.ReactElement<React.HTMLAttributes<HTMLButtonElement>>;
  }
>;

const CardWithTabs: React.FC<CardWithTabsProps> = (props) => {
  const {
    header,
    subheader,
    children,
    tabType,
    buttonRenderer,
    ...rest
  } = props;
  const [activePanel, setActivePanel] = useState(0);
  const [userHasInteracted, setUserHasInteracted] = useState(false);
  const cardPanelChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement<CardPanelProps>(child) && child.type === CardPanel
  ) as React.ReactElement<CardPanelProps>[];
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
      let tabToFocus = currentTab;
      switch (e.key) {
        case "Down":
        case "ArrowDown":
        case "Right":
        case "ArrowRight":
          // next tab, wrapping if necessary
          tabToFocus = (currentTab + 1) % numTabs;
          e.preventDefault();
          break;
        case "Up":
        case "ArrowUp":
        case "Left":
        case "ArrowLeft":
          // previous tab, wrapping if necessary
          // (need to add numTabs first to avoid negative numbers)
          tabToFocus = (currentTab + numTabs - 1) % numTabs;
          e.preventDefault();
          break;
      }
      if (tabsRef.current) {
        tabsRef.current.querySelectorAll("button").item(tabToFocus)?.focus();
      }
    }
  };

  return (
    <Card header={header} subheader={subheader} css={styles} {...rest}>
      <div className="tabs-panels-wrapper">
        <div className="tabs" role="tablist" ref={tabsRef}>
          {cardPanelChildren.map((_, i) => {
            const isActivePanel = i === activePanel;
            const groupingKey = cardPanelChildren[i].props.groupingKey;
            const baseButton = buttonRenderer ? (
              buttonRenderer(i)
            ) : (
              <button>
                {buttonPrefix}
                {i + 1}
              </button>
            );
            const newClassName = isActivePanel ? "active" : "inactive";
            const button = React.cloneElement(baseButton, {
              role: "tab",
              className: baseButton.props.className
                ? `${baseButton.props.className} ${newClassName}`
                : newClassName,
              onClick: () => handleClick(i),
              onKeyDown: handleKeyDown,
              tabIndex: isActivePanel ? 0 : -1,
              id: `tab-${i + 1}`,
              "aria-label": `${tabType} ${i + 1}`,
              "aria-selected": isActivePanel,
              "aria-controls": `panel-${i + 1}`,
              key: i,
            });
            return groupingKey &&
              (i === 0 ||
                cardPanelChildren[i - 1].props.groupingKey !== groupingKey) ? (
              <React.Fragment key={i}>
                <span
                  className={`grouping-key ${slugify(groupingKey)}`}
                  aria-label={`Group: ${groupingKey}`}
                >
                  {groupingKey}
                </span>
                {button}
              </React.Fragment>
            ) : (
              button
            );
          })}
        </div>
        <div className="panels">
          {cardPanelChildren.map((child, i) => {
            const isActivePanel = i === activePanel;
            return React.cloneElement(child, {
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
    min-width: ${theme.spacing(12)};
    display: flex;
    align-items: center;
    flex-direction: column;
    border-right: ${theme.spacing(0.25)} solid ${theme.palette.background};
    padding: ${theme.spacing(3)} 0 ${theme.spacing(4)};

    .grouping-key {
      text-align: center;
      font-size: ${theme.typography.body2.size};
      text-transform: uppercase;
      width: 100%;
      overflow: hidden;

      &::after {
        content: " ";
        display: block;
        width: ${theme.spacing(3)};
        margin: ${theme.spacing(1)} auto ${theme.spacing(2)};
        border-bottom: 1px solid ${theme.palette.midHighlight};
      }
    }

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
      &:last-child {
        margin-bottom: 0;
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

  .panels {
    flex-grow: 1;
    padding: 0 ${theme.spacing(4)} ${theme.spacing(4)};
  }
`;
