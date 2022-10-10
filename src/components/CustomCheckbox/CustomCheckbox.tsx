import cx from "clsx";
import React from "react";
import * as classes from "./styles.css";

export interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomCheckbox = React.forwardRef<HTMLLabelElement, CustomCheckboxProps>(
  (props, ref) => {
    const { label, disabled, className, ...rest } = props;
    return (
      <label
        className={cx(
          className,
          disabled ? classes.label.disabled : classes.label.enabled
        )}
        ref={ref}
      >
        <div className={classes.checkboxContainer}>
          <input
            type="checkbox"
            className={classes.checkboxInput}
            {...{ disabled, ...rest }}
          />
          <span className={classes.checkboxControl} aria-hidden="true" />
        </div>
        {label}
      </label>
    );
  }
);
CustomCheckbox.displayName = "CustomCheckbox";
export default CustomCheckbox;
