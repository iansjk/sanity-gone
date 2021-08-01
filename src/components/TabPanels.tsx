import React from "react";

export type TabPanelsProps = React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;

const TabPanels = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...rest }, ref) => (
  <div {...rest} ref={ref}>
    {children}
  </div>
));
TabPanels.displayName = "TabPanels";
export default TabPanels;
