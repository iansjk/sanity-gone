import React, { useEffect, useRef } from "react";
import { css } from "@mui/material";

export type TabPanelsProps = React.HTMLAttributes<HTMLDivElement> &
  Partial<{
    activeTab: number;
    userActed: boolean;
  }>;

const TabPanels: React.FC<TabPanelsProps> = (props) => {
  const { children, activeTab, userActed, ...rest } = props;
  const panelsRef = useRef<HTMLDivElement>(null);
  const panelChildren = React.Children.toArray(children).filter((child) =>
    React.isValidElement<React.HTMLAttributes<HTMLDivElement>>(child)
  ) as React.ReactElement<React.HTMLAttributes<HTMLDivElement>>[];

  useEffect(() => {
    if (userActed && panelsRef.current && activeTab != null) {
      const activePanel: HTMLDivElement | null =
        panelsRef.current.querySelector(`div[data-index="${activeTab}"]`);
      if (activePanel) {
        activePanel.focus({ preventScroll: true });
      }
    }
  }, [activeTab, userActed]);

  return (
    <div css={styles} {...rest} ref={panelsRef}>
      {React.Children.map(panelChildren, (child, i) => {
        const isActiveTab = i === activeTab;
        return React.cloneElement<
          React.HTMLAttributes<HTMLDivElement> & { "data-index"?: number }
        >(child, {
          "data-index": i,
          role: "tabpanel",
          hidden: !isActiveTab,
          tabIndex: isActiveTab ? 0 : -1,
        });
      })}
    </div>
  );
};
export default TabPanels;

const styles = css`
  & > * {
    &:focus:not(:focus-visible) {
      outline: none;
    }
  }
`;
