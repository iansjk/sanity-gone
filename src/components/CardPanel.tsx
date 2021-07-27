import React, { useEffect, useRef } from "react";

export type CardPanelProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    userHasInteracted: boolean;
  }
>;

const CardPanel: React.FC<CardPanelProps> = (props) => {
  const {
    children,
    "aria-expanded": ariaExpanded,
    userHasInteracted,
    ...rest
  } = props;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ariaExpanded && userHasInteracted && panelRef.current) {
      panelRef.current.focus();
    }
  }, [ariaExpanded, userHasInteracted]);

  return (
    <div ref={panelRef} aria-expanded={ariaExpanded} {...rest}>
      {children}
    </div>
  );
};
export default CardPanel;
