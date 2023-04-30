/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef } from "react";

import * as classes from "./styles.css";

type Props = Omit<React.HTMLAttributes<HTMLInputElement>, "type"> & {
  value: number;
};

const PercentageInput: React.FC<Props> = ({ value, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dummySpanRef = useRef<HTMLSpanElement>(null);
  const percentSignSpanRef = useRef<HTMLSpanElement>(null);
  const computedStyle = useRef<CSSStyleDeclaration | null>(null);

  useEffect(() => {
    const inputEl = inputRef.current!;
    const inputComputedStyle = getComputedStyle(inputEl);
    dummySpanRef.current!.style.font = inputComputedStyle.font;
    computedStyle.current = inputComputedStyle;
    const inputPaddingLeft = computedStyle.current!.paddingLeft;
    const listener = () => {
      dummySpanRef.current!.innerText = inputEl.value || "0";
      const left = `calc(${
        dummySpanRef.current!.clientWidth
      }px + ${inputPaddingLeft})`;
      percentSignSpanRef.current!.style.left = left;
    };
    inputEl.addEventListener("input", listener);
    return () => {
      inputEl.removeEventListener("input", listener);
    };
  }, []);

  return (
    <div className={classes.root}>
      <input type="number" {...rest} ref={inputRef} value={value} />
      <span ref={dummySpanRef} className={classes.dummySpan} aria-hidden="true">
        {value}
      </span>
      <span className={classes.percentSignText} ref={percentSignSpanRef}>
        %
      </span>
    </div>
  );
};
export default PercentageInput;
