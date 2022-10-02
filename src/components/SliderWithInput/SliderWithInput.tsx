import React from "react";
import { SliderUnstyled, SliderUnstyledProps } from "@mui/base";
import * as classes from "./styles.css";

type SliderWithInputProps = React.HTMLAttributes<HTMLInputElement> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    sliderProps?: SliderUnstyledProps;
  };

const SliderWithInput: React.VFC<SliderWithInputProps> = (props) => {
  const { label, sliderProps, id, ...rest } = props;

  return (
    <div className={classes.root}>
      <label htmlFor={`slider-input-${id}`} className={classes.label}>
        {label}
      </label>
      <div className={classes.sliderInputContainer}>
        <input
          id={`slider-input-${id}`}
          className={classes.sliderInput}
          {...rest}
        />
      </div>
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
