import React, { useState } from "react";
import TabButtons, { TabButtonsProps } from "./TabButtons";
import TabPanels, { TabPanelsProps } from "./TabPanels";

const Tabs: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  const tabButtons = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement<TabButtonsProps>(child) && child.type === TabButtons
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

  return (
    <div {...rest}>
      {tabButtons &&
        React.cloneElement(tabButtons, { activeTab, onClick: handleClick })}
      {tabPanels && React.cloneElement(tabPanels, { activeTab, userActed })}
    </div>
  );
};
export default Tabs;
