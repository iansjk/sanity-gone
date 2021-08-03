import React from "react";

export type TabButtonsProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onClick"
> &
  Partial<{
    activeTab: number;
    onClick: (index: number) => void;
  }>;

const TabButtons: React.FC<TabButtonsProps> = (props) => {
  const { activeTab, onClick, children, ...rest } = props;
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
      (e.target as HTMLButtonElement).parentElement
        ?.querySelectorAll("button")
        [tabToFocus].focus();
    }
  };

  return (
    <div role="tablist" {...rest}>
      {React.Children.map(children, (child, i) => {
        if (
          React.isValidElement<React.HTMLAttributes<HTMLButtonElement>>(
            child
          ) &&
          child.type === "button"
        ) {
          const isActiveTab = i === activeTab;
          const className = isActiveTab ? "active" : "inactive";
          return React.cloneElement<
            React.HTMLAttributes<HTMLButtonElement> & { "data-index"?: number }
          >(child, {
            ...child.props,
            role: "tab",
            className: child.props.className
              ? `${child.props.className} ${className}`
              : className,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick: () => onClick!(i),
            onKeyDown: handleKeyDown,
            tabIndex: isActiveTab ? 0 : -1,
            "data-index": i,
            "aria-selected": isActiveTab,
          });
        }
        return child;
      })}
    </div>
  );
};
export default TabButtons;
