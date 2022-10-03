import React from "react";
import * as classes from "./styles.css";
import cx from "clsx";

type Props = React.PropsWithChildren<
  React.HTMLAttributes<HTMLButtonElement>
> & {
  active?: boolean;
};

const RibbonButton: React.FC<Props> = ({
  children,
  className,
  active,
  ...rest
}) => {
  return (
    <button
      className={cx(classes.root, className, active && classes.active)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default RibbonButton;
