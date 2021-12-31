import React, { Fragment } from "react";
import { css } from "@emotion/react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useMediaQuery, useTheme } from "@mui/material";

import { Media } from "../Media";

export type TabButtonsProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onClick"
> &
  Partial<{
    activeTab: number;
    onClick: (index: number) => void;
    isSwiper: boolean;
  }>;

const TabButtons: React.FC<TabButtonsProps> = (props) => {
  const { activeTab, onClick, isSwiper, children, ...rest } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  const buttonChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement<React.HTMLAttributes<HTMLButtonElement>>(child) &&
      child.type === "button"
  ) as React.ReactElement<React.HTMLAttributes<HTMLButtonElement>, "button">[];
  const numTabs = buttonChildren.length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const currentTab = +button.getAttribute("data-index")!;
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
      (e.target as HTMLButtonElement)
        .closest('[role="tablist"]')
        ?.querySelectorAll("button")
        [tabToFocus].focus();
    }
  };

  let buttonIndex = 0;
  const newChildren = [];
  const childrenAsArray = React.Children.toArray(children);
  for (let i = 0; i < childrenAsArray.length; i++) {
    const child = childrenAsArray[i];
    if (
      React.isValidElement<React.HTMLAttributes<HTMLButtonElement>>(child) &&
      child.type === "button"
    ) {
      const isActiveTab = buttonIndex === activeTab;
      const className = isActiveTab ? "active" : "inactive";
      newChildren.push(
        React.cloneElement<
          React.HTMLAttributes<HTMLButtonElement> & { "data-index"?: number }
        >(child, {
          ...child.props,
          role: "tab",
          className: child.props.className
            ? `${child.props.className} ${className}`
            : className,
          onClick: ((noClosureIndex) => () => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick!(noClosureIndex);
          })(buttonIndex),
          onKeyDown: handleKeyDown,
          tabIndex: isActiveTab ? 0 : -1,
          "data-index": buttonIndex,
          "aria-selected": isActiveTab,
        })
      );
      buttonIndex++;
    } else {
      newChildren.push(child);
    }
  }

  return isSwiper ? (
    <Fragment>
      <Media lessThan="mobile">
        <ScrollContainer
          css={swiperStyles}
          className="tab-buttons swiper-container"
        >
          {newChildren}
        </ScrollContainer>
      </Media>
      <Media greaterThanOrEqual="mobile">
        <div role="tablist" {...rest}>
          {newChildren}
        </div>
      </Media>
    </Fragment>
  ) : (
    <div role="tablist" {...rest}>
      {newChildren}
    </div>
  );
};
export default TabButtons;

const swiperStyles = css`
  display: flex;
`;
