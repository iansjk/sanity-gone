import React from "react";

export type CardPanelProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

const CardPanel: React.FC<CardPanelProps> = (props) => {
  const { children, ...rest } = props;
  return <div {...rest}>{children}</div>;
};
export default CardPanel;
