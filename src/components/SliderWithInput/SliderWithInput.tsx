import React from "react";
import { SliderUnstyled, SliderUnstyledProps } from "@mui/base";
import cx from "clsx";

import * as classes from "./styles.css";

type SliderWithInputProps = React.HTMLAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    sliderProps?: SliderUnstyledProps;
  };

const SliderWithInput: React.VFC<SliderWithInputProps> = (props) => {
  const { label, sliderProps, id, className, ...rest } = props;

  return (
    <div className={cx(className, classes.root)}>
      <label htmlFor={`slider-input-${id}`} className={classes.label}>
        {label}
      </label>
      <input
        id={`slider-input-${id}`}
        className={classes.sliderInput}
        {...rest}
      />
      <div className={classes.sliderBorder}>
        <SliderUnstyled
          aria-label={`${id} slider`}
          className={classes.slider}
          {...sliderProps}
        />
      </div>
    </div>
  );
};
export default SliderWithInput;
