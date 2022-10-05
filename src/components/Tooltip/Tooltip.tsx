import React from "react";
import Tippy from "@tippyjs/react";

import { themeName } from "./styles.css";

import "tippy.js/dist/tippy.css";

import type { TippyProps } from "@tippyjs/react";

const Tooltip: React.VFC<TippyProps> = ({ children, theme, ...rest }) => {
  return (
    <Tippy theme={theme ?? themeName} {...rest}>
      <span>{children}</span>
    </Tippy>
  );
};
export default Tooltip;
