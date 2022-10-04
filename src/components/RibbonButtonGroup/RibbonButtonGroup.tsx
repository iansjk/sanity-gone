import React from "react";
import cx from "clsx";
import * as classes from "./styles.css";

type Props = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

const RibbonButtonGroup: React.FC<Props> = ({
  children,
  className,
  role: _,
  ...rest
}) => {
  return (
    <div role="group" className={cx(className, classes.root)} {...rest}>
      {children}
    </div>
  );
};
export default RibbonButtonGroup;
