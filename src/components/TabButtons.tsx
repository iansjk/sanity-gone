import React, { useState } from "react";

export type TabButtonsProps = React.HTMLAttributes<HTMLDivElement>;

const TabButtons: React.FC<TabButtonsProps> = ({ children, ...rest }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [userActed, setUserActed] = useState(false);
  const buttonChildren = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement<React.HTMLAttributes<HTMLButtonElement>>(child) &&
      child.type === "button"
  ) as React.ReactElement<React.HTMLAttributes<HTMLButtonElement>, "button">[];
  const numTabs = buttonChildren.length;

  const handleClick = (index: number) => {
    setActiveTab(index);
    setUserActed(true);
  };

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
      (e.target as HTMLButtonElement).parentElement
        ?.querySelectorAll("button")
        [tabToFocus].focus();
    }
  };

  return (
    <div role="tablist" {...rest}>
      {buttonChildren.map((button, i) => {
        const isActiveTab = i === activeTab;
        const className = isActiveTab ? "active" : "inactive";
        return React.cloneElement<
          React.HTMLAttributes<HTMLButtonElement> & { "data-index"?: number }
        >(button, {
          ...button.props,
          role: "tab",
          className: button.props.className
            ? `${button.props.className} ${className}`
            : className,
          onClick: () => handleClick(i),
          onKeyDown: handleKeyDown,
          tabIndex: isActiveTab ? 0 : -1,
          "data-index": i,
          "aria-selected": isActiveTab,
        });
      })}
    </div>
  );
};
export default TabButtons;
