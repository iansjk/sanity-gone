import cx from "clsx";
import * as classes from "./styles.css";

export interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomCheckbox: React.VFC<CustomCheckboxProps> = (props) => {
  const { label, disabled, className } = props;
  return (
    <label
      className={cx(
        className,
        disabled ? classes.label.disabled : classes.label.enabled
      )}
    >
      <div className={classes.checkboxContainer}>
        <input
          type="checkbox"
          className={classes.checkboxInput}
          disabled={disabled}
        />
        <span className={classes.checkboxControl} aria-hidden="true" />
      </div>
      {label}
    </label>
  );
};
export default CustomCheckbox;
