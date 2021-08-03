import React, { useState } from "react";
import TabButtons, { TabButtonsProps } from "./TabButtons";
import TabPanels, { TabPanelsProps } from "./TabPanels";

type TabsProps = React.HTMLAttributes<HTMLDivElement> & { component?: string };

const Tabs = React.forwardRef<HTMLElement, TabsProps>(
  ({ component = "div", children, ...rest }, ref) => {
    const tabButtons = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement<TabButtonsProps>(child) &&
        child.type === TabButtons
    ) as React.ReactElement<TabButtonsProps>;
    const tabPanels = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement<TabPanelsProps>(child) && child.type === TabPanels
    ) as React.ReactElement<TabPanelsProps>;
    if (!tabButtons) {
      console.error("<TabButtons> child is missing from <Tabs>.");
    } else if (!tabPanels) {
      console.error("<TabPanels> child is missing from <Tabs>.");
    }

    const [activeTab, setActiveTab] = useState(0);
    const [userActed, setUserActed] = useState(false);

    const handleClick = (index: number) => {
      setActiveTab(index);
      setUserActed(true);
    };

    return React.createElement(
      component,
      {
        ref,
        ...rest,
      },
      React.Children.map(children, (child) => {
        if (
          React.isValidElement<TabButtonsProps>(child) &&
          child.type === TabButtons
        ) {
          return React.cloneElement(child, { activeTab, onClick: handleClick });
        } else if (
          React.isValidElement<TabPanelsProps>(child) &&
          child.type === TabPanels
        ) {
          return React.cloneElement(child, { activeTab, userActed });
        }
        return child;
      })
    );
  }
);
Tabs.displayName = "Tabs";
export default Tabs;
