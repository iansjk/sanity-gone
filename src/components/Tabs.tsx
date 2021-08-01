import React from "react";
import TabButtons, { TabButtonsProps } from "./TabButtons";
import TabPanels, { TabPanelsProps } from "./TabPanels";

const Tabs: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...rest
}) => {
  const tabButtons = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement<TabButtonsProps>(child) && child.type === TabButtons
  );
  const tabPanels = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement<TabPanelsProps>(child) && child.type === TabPanels
  );
  if (!tabButtons) {
    throw new Error("<TabButtons> child is missing from <Tabs>.");
  } else if (!tabPanels) {
    throw new Error("<TabPanels> child is missing from <Tabs>.");
  }
  return <div {...rest}>{children}</div>;
};
export default Tabs;
