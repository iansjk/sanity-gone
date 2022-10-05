import React from "react";
import Tippy from "@tippyjs/react";
import cx from "clsx";

import * as classes from "./styles.css";

import "tippy.js/dist/tippy.css";

import type { TippyProps } from "@tippyjs/react";

const Tooltip: React.VFC<TippyProps> = ({ children, className, ...rest }) => {
  return (
    <Tippy className={cx(classes.root, className)} {...rest}>
      <span>{children}</span>
    </Tippy>
  );
};
export default Tooltip;
