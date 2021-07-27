import React, { useEffect, useRef } from "react";

export type CardPanelProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

const CardPanel: React.FC<CardPanelProps> = (props) => {
  const { children, "aria-expanded": ariaExpanded, ...rest } = props;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ariaExpanded && panelRef.current) {
      panelRef.current.focus();
    }
  }, [ariaExpanded]);

  return (
    <div ref={panelRef} {...rest}>
      {children}
    </div>
  );
};
export default CardPanel;
